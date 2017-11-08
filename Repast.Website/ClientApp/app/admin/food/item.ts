import { Models } from '../../models/generalModels';
import { autoinject } from 'aurelia-dependency-injection';
import { Router } from "aurelia-router";
import { AdminService } from './service';

@autoinject
export class Item {

    constructor(private adminService: AdminService, private router: Router) { }

    activate = (params: any): void => {
        const id = Number(params.id);
        if (id) {
            this.adminService.getFood(params.id).then(r => {
                this.foodItem = r
            });
        }
    }

    foodItem: Models.FoodModel;

    deleteFood = (id: number): void => {
        this.adminService.deleteFood(id).then(r => {
            if (r.isSuccess) {
                var url = this.router.generate("foodsList");
                this.router.navigate(url);
            }
        });        
    }
}
