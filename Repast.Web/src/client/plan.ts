import { Models } from '../models/generalModels';
import { bindable } from 'aurelia-framework';

export class Plan {
    constructor() {
        this.sourceFoods = [
            { id: "01", name: "Zereshk Polo", mainPart: Models.MainPartType.chicken, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "02", name: "Reshte Polo ba Morgh", mainPart: Models.MainPartType.chicken, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "03", name: "Havij Polo", mainPart: Models.MainPartType.chicken, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "04", name: "Sabzi Polo ba Morgh", mainPart: Models.MainPartType.chicken, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "05", name: "Polo Yoonani", mainPart: Models.MainPartType.chicken, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "06", name: "Khorak ba Morgh", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "07", name: "Chicken Straganov", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "08", name: "Corden Blue", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.low },
            { id: "09", name: "Sandwich Morgh Doodi", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "10", name: "Morghe Feri ba Sabzijat", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "11", name: "Morghe Sokhari", mainPart: Models.MainPartType.chicken, type: Models.FoodType.bread, difficulty: Models.DifficultyType.low },
            { id: "12", name: "Ghormeh Sabzi", mainPart: Models.MainPartType.meal, type: Models.FoodType.stew, difficulty: Models.DifficultyType.high },
            { id: "13", name: "Gheymeh", mainPart: Models.MainPartType.meal, type: Models.FoodType.stew, difficulty: Models.DifficultyType.high },
            { id: "14", name: "Fesenjoon", mainPart: Models.MainPartType.meal, type: Models.FoodType.stew, difficulty: Models.DifficultyType.high },
            { id: "15", name: "Gheymeh Bademjan", mainPart: Models.MainPartType.meal, type: Models.FoodType.stew, difficulty: Models.DifficultyType.high },
            { id: "16", name: "Baghali Polo", mainPart: Models.MainPartType.meal, type: Models.FoodType.rice, difficulty: Models.DifficultyType.high },
            { id: "17", name: "Loobia Polo", mainPart: Models.MainPartType.meal, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "18", name: "Kalam Polo", mainPart: Models.MainPartType.meal, type: Models.FoodType.rice, difficulty: Models.DifficultyType.medium },
            { id: "19", name: "Kotlet", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "20", name: "Khorak ba Gosht", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "21", name: "Beef Straganov", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "22", name: "Haleem Bademjan", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.high },
            { id: "23", name: "Lazania", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "24", name: "Spagetti ba Ghosht", mainPart: Models.MainPartType.meal, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
            { id: "25", name: "Mirza Ghasemi", mainPart: Models.MainPartType.vegetables, type: Models.FoodType.bread, difficulty: Models.DifficultyType.medium },
        ];
    }

    sourceFoods: Models.FoodModel[];
    phaseModel: Models.PhaseModel;
    planSchema: Models.PlanModel[][] = [];
    foodPlan: Models.SimpleFoodModel[][] = [];

    createPlanFrom = (): void => {
        this.planSchema = [];
        this.foodPlan = [];
        for (var i = 0; i < this.phaseModel.count; i++) {
            const phasePlan: Models.PlanModel[] = [];
            const foodPlanItem: Models.SimpleFoodModel[] = [];
            for (var j = 0; j < this.phaseModel.length; j++) {
                phasePlan.push({
                    conditionCount: 0
                });
                foodPlanItem.push(null);
            }
            this.planSchema.push(phasePlan);
            this.foodPlan.push(foodPlanItem);
        }
    }

    submitPlan = (): void => {
        this.createFoodPlan();
    }

    createFoodPlan = (): void => {
        let rowPlan: Models.PlanningModel[] = [];
        for (var i = 0; i < this.planSchema.length; i++) {
            for (var j = 0; j < this.planSchema[i].length; j++) {
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

        let plannedFood: Models.PlannedFoodModel[] = [];
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
                const randomIndex = this.getRandom(0, selectedFoods.length - 1);
                plannedFood.push({
                    phaseIndex: rowPlan[i].phaseIndex,
                    inPhaseIndex: rowPlan[i].inPhaseIndex,
                    food: {
                        id: selectedFoods[randomIndex].id,
                        name: selectedFoods[randomIndex].name
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
                    foodPlanItem.push({ id: currentFood.food.id, name: currentFood.food.name });
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
            const randomIndex = this.getRandom(0, selectedFoods.length - 1);
            foodPlanCopy[index1][index2] = {
                id: selectedFoods[randomIndex].id,
                name: selectedFoods[randomIndex].name
            };
        }
        this.foodPlan = foodPlanCopy;
    }

    private getRandom = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
