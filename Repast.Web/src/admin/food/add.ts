import { Models } from '../../models/generalModels';
import { inject } from 'aurelia-framework';
import { AdminService } from './service';

@inject(AdminService)
export class Add {

    constructor(private adminService: AdminService) { }

    activate = (): void => { }

    foodModel: Models.FoodModel;

    submit = (): void => {
        this.adminService.addFood(this.foodModel).then(r => {

        });
    }

}
