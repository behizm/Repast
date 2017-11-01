import { Models } from '../../models/generalModels';
import { inject, NewInstance } from 'aurelia-framework';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { Router } from "aurelia-router";
import { AdminService } from './service';

@inject(AdminService, NewInstance.of(ValidationController), Router)
export class Edit {

    constructor(private adminService: AdminService, private controller: ValidationController, private router: Router) { }

    activate = (params): void => {
        const id = Number(params.id);
        if (id) {
            this.adminService.getFood(id).then(r => {
                if (r) {
                    this.foodModel = r;
                    this.configValidations();
                    this.controller.validate();
                }
            });
        }
    }

    foodModel: Models.FoodModel;
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
                this.adminService.editFood(this.foodModel).then(r => {
                    if (r.isSuccess) {
                        var url = this.router.generate("foodDetails", { id: this.foodModel.id });
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
