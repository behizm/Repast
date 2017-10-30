import { Models } from '../../models/generalModels';
import { inject } from 'aurelia-framework';
import { AdminService } from './service';

@inject(AdminService)
export class Item {

    constructor(private adminService: AdminService) { }

    activate = (params): void => {
        var id = Number(params.id);
        if (id) {
            this.adminService.getFood(params.id).then(r => {
                this.foodItem = r
            });
        }
    }

    foodItem: Models.FoodModel;

}
