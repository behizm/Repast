export class MainPartTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "گوشت قرمز";
            case 2:
                return "گوشت سفید";
            case 3:
                return "دریایی";
            case 4:
                return "سبزیجات";
            default:
                return "";
        }
    }
}

export class FoodTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "خورشتی";
            case 2:
                return "پلویی";
            case 3:
                return "نانی";
            case 4:
                return "بشقاب";
            default:
                return "";
        }
    }
}

export class DifficultyTypeToTextValueConverter {
    toView = (value: number): string => {
        switch (value) {
            case 1:
                return "خیلی ساده";
            case 2:
                return "ساده";
            case 3:
                return "معمولی";
            case 4:
                return "سخت";
            case 5:
                return "خیلی سخت";
            default:
                return "";
        }
    }
}
