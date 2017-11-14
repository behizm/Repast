import { Models } from '../../models/generalModels';
import { autoinject } from 'aurelia-dependency-injection';
import { Router } from "aurelia-router";
import { AdminService } from './service';
import * as $ from 'jquery';

@autoinject
export class Item {

    constructor(private adminService: AdminService, private router: Router) { }

    activate(params: any) {
        this.isLoading = true;
        this.itemId = Number(params.id);
        if (this.itemId) {
            return this.adminService.getFood(this.itemId).then(r => {
                this.isLoading = false;
                if (r) {
                    this.foodItem = r;
                }
                else {
                    this.foodItem = null;
                }
            });
        }
        this.foodItem = null;
        this.isLoading = false;
    }

    attached() {
        $('.ui.modal').remove();
        if (this.foodItem) {
            this.modalId = `fim_${this.foodItem.id}${new Date().getTime()}`;
        }
    }

    isLoading: boolean;
    itemId: number;
    foodItem: Models.FoodModel | null;
    modalId: string;

    onDeleteClicked = (): void => {
        $(`#${this.modalId}`).modal("show");
    }

    deleteFood = (): void => {
        $(`#${this.modalId}`).modal("hide");
        setTimeout(() => {
            $(`#${this.modalId}`).remove();
            this.isLoading = true;
            this.adminService.deleteFood(this.itemId).then(r => {
                if (r.isSuccess) {
                    var url = this.router.generate("foodsList");
                    this.router.navigate(url);
                }
            });
        }, 400);
    }
}
