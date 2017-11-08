import { Models } from '../../models/generalModels';
import { inject, NewInstance } from 'aurelia-framework';
import { AdminService } from './service';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';

@inject(AdminService, NewInstance.of(ValidationController))
export class Add {

    constructor(private adminService: AdminService, private controller: ValidationController) { }

    activate = (): void => {
        this.configValidations();
        this.controller.validate();
    }

    created() { }

    bind() { }

    attached() { }

    foodModel: Models.FoodModel = new Models.FoodModel();
    addFoodResult: Models.ResultModel;

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
                });
            }
        });
    }

}
