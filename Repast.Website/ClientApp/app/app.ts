import { Aurelia, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

export class App {

    router: Router;

    configureRouter = (config: RouterConfiguration, router: Router): void => {
        config.title = 'Aurelia';
        config.map([
            {
                route: ['', 'plan'], moduleId: PLATFORM.moduleName('./client/plan'), title: 'Plan', name: 'home',
            },
            {
                route: 'foods', moduleId: PLATFORM.moduleName('./admin/food/foods'), title: 'Foods', name: 'foodsList'
            },
            {
                route: 'foods/add', moduleId: PLATFORM.moduleName('./admin/food/add'), title: 'Add Food', name: 'addFood'
            },
            {
                route: 'foods/item/:id', moduleId: PLATFORM.moduleName('./admin/food/item'), title: 'Food Details', name: 'foodDetails'
            },
            {
                route: 'foods/edit/:id', moduleId: PLATFORM.moduleName('./admin/food/edit'), title: 'Edit Food', name: 'editFood'
            }
        ]);
        this.router = router;
    }
}
