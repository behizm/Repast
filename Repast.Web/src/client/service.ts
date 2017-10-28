import { Models } from '../models/generalModels';
import { bindable, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class PlanService {

    constructor(private httpClient: HttpClient) {
    }

    apiUrl: string = 'http://localhost:31091/api/foods';

    getAllFoods = (): Promise<Models.FoodModel[]> => {
        return this.httpClient.get(this.apiUrl).then(r => {
            const foods: Models.FoodModel[] = JSON.parse(r.response);
            return foods;
        });
    }

    getSourceFoodTest = (): Models.FoodModel[] => {
        return [
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

    getRandom = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
