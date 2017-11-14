import { Models } from '../../models/generalModels';
import { autoinject } from 'aurelia-framework';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { Router, activationStrategy, RoutableComponentDetermineActivationStrategy } from "aurelia-router";
import { AdminService } from './service';
import * as $ from 'jquery';

@autoinject
export class Edit implements RoutableComponentDetermineActivationStrategy {

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    constructor(private adminService: AdminService, private controller: ValidationController, private router: Router) { }

    activate(params: any) {
        this.isLoading = true;
        this.itemId = Number(params.id);
        if (this.itemId) {
            return this.adminService.getFood(this.itemId).then(r => {
                this.isLoading = false;
                if (r) {
                    this.foodModel = r;
                    this.configValidations();
                }
                else {
                    this.foodModel = null;
                }
            });
        }
        this.isLoading = false;
        this.foodModel = null;
    }

    attached() {
        $('.ui.dropdown').dropdown();
    }

    isLoading: boolean;
    itemId: number;
    foodModel: Models.FoodModel | null;
    editFoodResult: Models.ResultModel;

    configValidations = (): void => {
        this.controller.validateTrigger = validateTrigger.changeOrBlur;
        ValidationRules
            .ensure((x: Models.FoodModel) => x.name).displayName('Food Name').required()
            .ensure((x: Models.FoodModel) => x.mainPart).displayName('Main Part').required()
            .ensure((x: Models.FoodModel) => x.type).displayName('Food Type').required()
            .ensure((x: Models.FoodModel) => x.difficulty).displayName('Difficulty').required()
            .on(this.foodModel);
    }

    submit = (): void => {
        this.editFoodResult = new Models.ResultModel();
        this.controller.validate({ object: this.foodModel }).then(x => {
            if (x.valid) {
                this.adminService.editFood(this.foodModel as Models.FoodModel).then(r => {
                    if (r.isSuccess) {
                        var url = this.router.generate("foodDetails", { id: this.itemId });
                        this.router.navigate(url);
                        return;
                    }
                    this.editFoodResult = {
                        isSuccess: false,
                        message: r.message
                    };
                });
            }
        });
    }

}
