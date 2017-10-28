import { Models } from '../models/generalModels';
import { bindable, inject } from 'aurelia-framework';
import { PlanService } from './service';

@inject(PlanService)
export class Plan {

    constructor(private planService: PlanService) {
        planService.getAllFoods().then(r => this.sourceFoods = r);
    }
    
    sourceFoods: Models.FoodModel[];
    phaseModel: Models.PhaseModel;
    planSchema: Models.PlanModel[][] = [];
    foodPlan: Models.SimpleFoodModel[][] = [];

    createPlanFrom = (): void => {
        if (!this.phaseModel) {
            return;
        }
        const phaseCount = Number(this.phaseModel.count);
        const phaseLength = Number(this.phaseModel.length);
        if (!phaseCount || !phaseLength || phaseCount < 1 || phaseCount > 4 || phaseLength < 1 || phaseLength > 7) {
            return;
        }

        const planSchemaCopy: Models.PlanModel[][] = [];
        const foodPlanCopy: Models.SimpleFoodModel[][] = [];
        for (var i = 0; i < this.phaseModel.count; i++) {
            const phasePlan: Models.PlanModel[] = [];
            const foodPlanItem: Models.SimpleFoodModel[] = [];
            for (var j = 0; j < this.phaseModel.length; j++) {
                phasePlan.push({
                    conditionCount: 0
                });
                foodPlanItem.push(null);
            }
            planSchemaCopy.push(phasePlan);
            foodPlanCopy.push(foodPlanItem);
        }
        this.planSchema = planSchemaCopy;
        this.foodPlan = foodPlanCopy;
    }

    submitPlan = (): void => {
        this.createFoodPlan();
    }

    createFoodPlan = (): void => {
        let plannedFood: Models.PlannedFoodModel[] = [];
        let rowPlan: Models.PlanningModel[] = [];
        for (var i = 0; i < this.planSchema.length; i++) {
            for (var j = 0; j < this.planSchema[i].length; j++) {
                if (this.foodPlan[i][j] && this.foodPlan[i][j].lock) {
                    plannedFood.push({
                        phaseIndex: i,
                        inPhaseIndex: j,
                        food: {
                            id: this.foodPlan[i][j].id,
                            name: this.foodPlan[i][j].name,
                            lock: true
                        }
                    });
                    continue;
                }

                let conditionCount = 0;
                if (this.planSchema[i][j].mainPartType) conditionCount++;
                if (this.planSchema[i][j].foodType) conditionCount++;
                if (this.planSchema[i][j].difficultyType) conditionCount++;
                rowPlan.push({
                    phaseIndex: i,
                    inPhaseIndex: j,
                    conditionCount: conditionCount,
                    mainPartType: this.planSchema[i][j].mainPartType,
                    foodType: this.planSchema[i][j].foodType,
                    difficultyType: this.planSchema[i][j].difficultyType
                });
            }
        }
        rowPlan = rowPlan.sort((a, b) => { return a.conditionCount - b.conditionCount >= 0 ? 1 : -1 }).reverse();
                
        for (var i = 0; i < rowPlan.length; i++) {
            let selectedFoods =
                this.sourceFoods.filter(x =>
                    plannedFood.findIndex(f => f.food && f.food.id == x.id) == -1 &&
                    (!rowPlan[i].mainPartType || x.mainPart == rowPlan[i].mainPartType) &&
                    (!rowPlan[i].foodType || x.type == rowPlan[i].foodType) &&
                    (!rowPlan[i].difficultyType || x.difficulty == rowPlan[i].difficultyType));

            if (!selectedFoods.length) {
                plannedFood.push({
                    phaseIndex: rowPlan[i].phaseIndex,
                    inPhaseIndex: rowPlan[i].inPhaseIndex,
                    food: null
                });
            }
            else {
                const randomIndex = this.planService.getRandom(0, selectedFoods.length - 1);
                plannedFood.push({
                    phaseIndex: rowPlan[i].phaseIndex,
                    inPhaseIndex: rowPlan[i].inPhaseIndex,
                    food: {
                        id: selectedFoods[randomIndex].id,
                        name: selectedFoods[randomIndex].name,
                        lock: false
                    }
                });
            }
        }

        this.foodPlan = [];
        for (var i = 0; i < this.planSchema.length; i++) {
            let foodPlanItem: Models.SimpleFoodModel[] = [];
            for (var j = 0; j < this.planSchema[i].length; j++) {
                var currentFood = plannedFood.find(x => x.phaseIndex == i && x.inPhaseIndex == j);
                if (currentFood.food) {
                    foodPlanItem.push({ id: currentFood.food.id, name: currentFood.food.name, lock: currentFood.food.lock });
                }
                else {
                    foodPlanItem.push(null);
                }
            }
            this.foodPlan.push(foodPlanItem);
        }
    }

    getFood = (index1: number, index2: number): void => {
        const plan = this.planSchema[index1][index2];
        const initialFood = this.foodPlan[index1][index2];
        let selectedFoods =
            this.sourceFoods.filter(x =>
                (!initialFood || x.id != initialFood.id) &&
                this.foodPlan.findIndex(f => f.findIndex(ff => ff && ff.id == x.id) != -1) == -1 &&
                (!plan.mainPartType || x.mainPart == plan.mainPartType) &&
                (!plan.foodType || x.type == plan.foodType) &&
                (!plan.difficultyType || x.difficulty == plan.difficultyType));

        let foodPlanCopy: Models.SimpleFoodModel[][] = Object.assign([], this.foodPlan);
        if (!selectedFoods.length) {
            foodPlanCopy[index1][index2] = null;
        }
        else {
            const randomIndex = this.planService.getRandom(0, selectedFoods.length - 1);
            foodPlanCopy[index1][index2] = {
                id: selectedFoods[randomIndex].id,
                name: selectedFoods[randomIndex].name,
                lock: false
            };
        }
        this.foodPlan = foodPlanCopy;
    }

    clearFood = (index1: number, index2: number): void => {
        const foodPlanCopy: Models.SimpleFoodModel[][] = Object.assign([], this.foodPlan);
        foodPlanCopy[index1][index2] = null;
        this.foodPlan = foodPlanCopy;
    }

    changeLock = (index1: number, index2: number): void => {
        const foodPlanCopy: Models.SimpleFoodModel[][] = Object.assign([], this.foodPlan);
        if (!foodPlanCopy[index1][index2]) {
            return;
        }
        foodPlanCopy[index1][index2].lock = !foodPlanCopy[index1][index2].lock;
        this.foodPlan = foodPlanCopy;
    }

}
