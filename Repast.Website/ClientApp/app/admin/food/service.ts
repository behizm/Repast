import { Models } from '../../models/generalModels';
import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@autoinject
export class AdminService {

    constructor(private httpClient: HttpClient) { }

    foodsApiUrl: string = '/api/foods';

    getAllFoods = (): Promise<Models.FoodModel[]> => {
        return this.httpClient.fetch(this.foodsApiUrl).then(r => r.json());
    }

    getFood = (id: number): Promise<Models.FoodModel> => {
        return this.httpClient.fetch(`${this.foodsApiUrl}/${id}`).then(r => r.json()).catch(e => { return null; });
    }

    addFood = (food: Models.FoodModel): Promise<Models.HttpResultModel> => {
        return this.httpClient
            .fetch(this.foodsApiUrl, {
                method: 'post',
                body: json(food)
            })
            .then(r => {
                if (r.ok) {
                    return new Models.HttpResultModel(true);
                }
                return r.json().then(x => {
                    const result = new Models.HttpResultModel(false);
                    result.message = x.message;
                    return result;
                });
            })
            .catch(e => {
                return new Models.HttpResultModel(false);
            });
    }

    deleteFood = (id: number): Promise<Models.HttpResultModel> => {
        return this.httpClient
            .fetch(`${this.foodsApiUrl}/${id}`, {
                method: 'delete'
            })
            .then(r => {
                if (r.ok) {
                    return new Models.HttpResultModel(true);
                }
                return new Models.HttpResultModel(false);
            })
            .catch(e => {
                return new Models.HttpResultModel(false);
            });
    }

    editFood = (food: Models.FoodModel): Promise<Models.HttpResultModel> => {
        return this.httpClient
            .fetch(`${this.foodsApiUrl}/${food.id}`, {
                method: 'put',
                body: json(food)
            })
            .then(r => {
                if (r.ok) {
                    return new Models.HttpResultModel(true);
                }                
                return r.json().then(x => {
                    const result = new Models.HttpResultModel(false);
                    result.message = x;
                    return result;
                });
            })
            .catch(e => {
                return new Models.HttpResultModel(false);
            });
    }

}
