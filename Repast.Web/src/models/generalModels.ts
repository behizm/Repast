export module Models {

    export class FoodModel {
        id: string;
        name: string;
        mainPart: MainPartType;
        type: FoodType;
        difficulty?: DifficultyType;
    }

    export enum MainPartType {
        meal = 1,
        chicken = 2,
        sea = 3,
        vegetables = 4
    }

    export enum FoodType {
        stew = 1,
        rice = 2,
        bread = 3,
        dish = 4
    }

    export enum DifficultyType {
        veryLow = 1,
        low = 2,
        medium = 3,
        high = 4,
        veryHigh = 5
    }

    export class SimpleFoodModel {
        id: string;
        name: string;
        lock: boolean;
    }

    export class PhaseModel {
        length: number;
        count: number;
    }

    export class PlanModel {
        mainPartType?: MainPartType;
        foodType?: FoodType;
        difficultyType?: DifficultyType;
        conditionCount: number;
    }

    export class PlanningModel {
        phaseIndex: number;
        inPhaseIndex: number;
        mainPartType?: MainPartType;
        foodType?: FoodType;
        difficultyType?: DifficultyType;
        conditionCount: number;
    }

    export class PlannedFoodModel {
        phaseIndex: number;
        inPhaseIndex: number;
        food: SimpleFoodModel;
    }
}
