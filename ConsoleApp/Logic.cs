using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ConsoleApp
{
    public class Logic
    {

        public List<Food> Process(List<RequestSchema> schema)
        {
            var schemaDic = 
                schema
                    .Select((x, i) => new { Index = i, Value = x })
                    .ToDictionary(x => x.Index, o => o.Value)
                    .OrderByDescending(x => x.Value.ConditionCount);

            var selectedFoods = new Dictionary<int, Food>();
            foreach (var dicItem in schemaDic)
            {
                var item = dicItem.Value;
                Func<Food, bool> expression1 = x =>
                    (!item.MainPart.HasValue || x.MainPart == item.MainPart) &&
                    (!item.FoodType.HasValue || x.FoodType == item.FoodType) &&
                    (!item.Difficulty.HasValue || x.Difficulty <= item.Difficulty) &&
                    selectedFoods.Values.All(f => f.Name != x.Name);

                Func<Food, bool> expression2 = x =>
                    (!item.MainPart.HasValue || x.MainPart == item.MainPart) &&
                    (!item.FoodType.HasValue || x.FoodType == item.FoodType) &&
                    (!item.Difficulty.HasValue || x.Difficulty <= item.Difficulty);

                var resultCount = SampleFoods.Count(expression1);
                if (resultCount == 0)
                {
                    var food = SampleFoods.FirstOrDefault(expression2);
                    selectedFoods.Add(dicItem.Key, food);
                    continue;
                }

                var random = new Random();
                var randomNumber = random.Next(0, resultCount);
                var randomFood = SampleFoods.Where(expression1).Skip(randomNumber).FirstOrDefault();
                selectedFoods.Add(dicItem.Key, randomFood);
            }
            return selectedFoods.OrderBy(x => x.Key).Select(x => x.Value).ToList();
        }





        private List<Food> SampleFoods = new List<Food>
        {
            new Food("Zereshk Polo", FoodMainPart.Chicken, FoodType.Rice, Difficulty.Medium),
            new Food("Reshte Polo ba Morgh", FoodMainPart.Chicken, FoodType.Rice, Difficulty.Medium),
            new Food("Havij Polo", FoodMainPart.Chicken, FoodType.Rice, Difficulty.Medium),
            new Food("Sabzi Polo ba Morgh", FoodMainPart.Chicken, FoodType.Rice, Difficulty.Medium),
            new Food("Polo Yoonani", FoodMainPart.Chicken, FoodType.Rice, Difficulty.Medium),
            new Food("Khorak ba Morgh", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Medium),
            new Food("Chicken Straganov", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Medium),
            new Food("Corden Blue", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Low),
            new Food("Sandwich Morgh Doodi", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Medium),
            new Food("Morghe Feri ba Sabzijat", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Medium),
            new Food("Morghe Sokhari", FoodMainPart.Chicken, FoodType.Bread, Difficulty.Low),
            new Food("Ghormeh Sabzi", FoodMainPart.Meal, FoodType.Stew, Difficulty.High),
            new Food("Gheymeh", FoodMainPart.Meal, FoodType.Stew, Difficulty.High),
            new Food("Fesenjoon", FoodMainPart.Meal, FoodType.Stew, Difficulty.High),
            new Food("Gheymeh Bademjan", FoodMainPart.Meal, FoodType.Stew, Difficulty.High),
            new Food("Baghali Polo", FoodMainPart.Meal, FoodType.Rice, Difficulty.High),
            new Food("Loobia Polo", FoodMainPart.Meal, FoodType.Rice, Difficulty.Medium),
            new Food("Kalam Polo", FoodMainPart.Meal, FoodType.Rice, Difficulty.Medium),
            new Food("Kotlet", FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
            new Food("Khorak ba Gosht", FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
            new Food("Beef Straganov", FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
            new Food("Haleem Bademjan", FoodMainPart.Meal, FoodType.Bread, Difficulty.High),
            new Food("Lazania", FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
            new Food("Spagetti ba Ghosht", FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
            new Food("Mirza Ghasemi", FoodMainPart.Vegetables, FoodType.Bread, Difficulty.Medium),
        };
    }
}
