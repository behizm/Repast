import { RouterConfiguration, Router } from 'aurelia-router';

export class App {

    router: Router;

    configureRouter = (config: RouterConfiguration, router: Router): void => {
        this.router = router;
        config.map([
            { route: ['', 'plan'], moduleId: 'client/plan', title: 'Plan' },
            { route: 'foods', moduleId: 'admin/food/foods', title: 'Foods', name: 'foodsList' },
            { route: 'foods/add', moduleId: 'admin/food/add', title: 'Add Food', name: 'addFood' },
            { route: 'foods/item/:id', moduleId: 'admin/food/item', title: 'Food Details', name: 'foodDetails' },
            { route: 'foods/edit/:id', moduleId: 'admin/food/edit', title: 'Edit Food', name: 'editFood' }
        ]);
    }
}
