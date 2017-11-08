import { Models } from '../../models/generalModels';
import { inject } from 'aurelia-framework';
import { AdminService } from './service';

@inject(AdminService)
export class Foods {
    constructor(private adminService: AdminService) { }

    foodsList: Models.FoodModel[];

    activate = (): void => {
        this.adminService.getAllFoods().then(r => this.foodsList = r);
    }
}
