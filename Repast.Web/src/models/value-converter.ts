export class MainPartTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "Meal";
            case 2:
                return "Chicken";
            case 3:
                return "Sea";
            case 4:
                return "Vegetables";
            default:
                return "";
        }
    }
}

export class FoodTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "Stew";
            case 2:
                return "Rice";
            case 3:
                return "Bread";
            case 4:
                return "Dish";
            default:
                return "";
        }
    }
}

export class DifficultyTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "Very Low";
            case 2:
                return "Low";
            case 3:
                return "Medium";
            case 4:
                return "High";
            case 5:
                return "Very High";
            default:
                return "";
        }
    }
}
