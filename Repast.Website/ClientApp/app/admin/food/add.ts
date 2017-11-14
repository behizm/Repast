import { Models } from '../../models/generalModels';
import { autoinject } from 'aurelia-framework';
import { AdminService } from './service';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import * as $ from 'jquery';

@autoinject
export class Add {

    constructor(private adminService: AdminService, private controller: ValidationController) { }

    activate = (): void => {
        this.configValidations();
    }

    created() { }

    bind() { }

    attached() {
        $('.ui.dropdown').dropdown();
    }

    foodModel: Models.FoodModel = new Models.FoodModel();
    addFoodResult: Models.ResultModel;

    configValidations = (): void => {
        this.controller.validateTrigger = validateTrigger.changeOrBlur;
        ValidationRules
            .ensure((x: Models.FoodModel) => x.name).displayName('Food Name').required()
            .ensure((x: Models.FoodModel) => x.mainPart).displayName('Main Part').required()
            .ensure((x: Models.FoodModel) => x.type).displayName('Food Type').required()
            .ensure((x: Models.FoodModel) => x.difficulty).displayName('Difficulty').required()
            .ensure((x: Models.FoodModel) => x.description).maxLength(512)
            .on(this.foodModel);
    }

    submit = (): void => {
        this.addFoodResult = new Models.ResultModel();
        this.controller.validate({ object: this.foodModel }).then(x => {
            if (x.valid) {
                this.adminService.addFood(this.foodModel).then(r => {
                    if (!r.isSuccess) {
                        this.addFoodResult = {
                            isSuccess: false,
                            message: r.message
                        };
                        return;
                    }
                    this.addFoodResult = {
                        isSuccess: true
                    };
                    this.foodModel.name = "";
                    this.foodModel.mainPart = undefined;
                    this.foodModel.difficulty = undefined;
                    this.foodModel.type = undefined;
                    this.foodModel.description = "";
                    $('.ui.dropdown').dropdown("clear");
                });
            }
        });
    }

}
