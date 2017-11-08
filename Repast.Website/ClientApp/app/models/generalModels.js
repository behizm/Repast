"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Models;
(function (Models) {
    class FoodModel {
    }
    Models.FoodModel = FoodModel;
    let MainPartType;
    (function (MainPartType) {
        MainPartType[MainPartType["meal"] = 0] = "meal";
        MainPartType[MainPartType["chicken"] = 1] = "chicken";
        MainPartType[MainPartType["sea"] = 2] = "sea";
        MainPartType[MainPartType["Vegetables"] = 3] = "Vegetables";
    })(MainPartType = Models.MainPartType || (Models.MainPartType = {}));
    let FoodType;
    (function (FoodType) {
        FoodType[FoodType["stew"] = 0] = "stew";
        FoodType[FoodType["rice"] = 1] = "rice";
        FoodType[FoodType["bread"] = 2] = "bread";
        FoodType[FoodType["dish"] = 3] = "dish";
    })(FoodType = Models.FoodType || (Models.FoodType = {}));
    let DifficultyType;
    (function (DifficultyType) {
        DifficultyType[DifficultyType["veryLow"] = 1] = "veryLow";
        DifficultyType[DifficultyType["low"] = 2] = "low";
        DifficultyType[DifficultyType["medium"] = 3] = "medium";
        DifficultyType[DifficultyType["high"] = 4] = "high";
        DifficultyType[DifficultyType["veryHigh"] = 5] = "veryHigh";
    })(DifficultyType = Models.DifficultyType || (Models.DifficultyType = {}));
    class PhaseModel {
    }
    Models.PhaseModel = PhaseModel;
    class PlanModel {
    }
    Models.PlanModel = PlanModel;
})(Models = exports.Models || (exports.Models = {}));
//# sourceMappingURL=generalModels.js.map