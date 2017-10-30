import { Models } from '../../models/generalModels';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class AdminService {

    constructor(private httpClient: HttpClient) { }

    foodsApiUrl: string = 'http://localhost:31091/api/foods';

    getAllFoods = (): Promise<Models.FoodModel[]> => {
        return this.httpClient.get(this.foodsApiUrl).then(r => {
            const foods: Models.FoodModel[] = JSON.parse(r.response);
            return foods;
        });
    }

    getFood = (id: number): Promise<Models.FoodModel> => {
        return this.httpClient
            .get(`${this.foodsApiUrl}/${id}`)
            .then(r => { return JSON.parse(r.response); })
            .catch(e => { return null; });
    }

    addFood = (food: Models.FoodModel): Promise<Models.FoodModel> => {
        return this.httpClient
            .createRequest(this.foodsApiUrl)
            .asPost()
            .withHeader('Content-Type', 'application/json; charset=utf-8')
            .withContent(food)
            .send()
            .then(r => {
                return JSON.parse(r.response);
            })
            .catch(e => {
                return null;
            });
    }
}
