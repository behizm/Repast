using System;
using System.Collections.Generic;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Func<int> readInt = () => Convert.ToInt32(Console.ReadLine());

            var requestSchema = new List<RequestSchema>
            {
                new RequestSchema(FoodMainPart.Meal, FoodType.Stew),
                new RequestSchema(FoodMainPart.Meal, FoodType.Bread, Difficulty.Medium),
                new RequestSchema(FoodMainPart.Chicken, FoodType.Rice),
                new RequestSchema(FoodMainPart.Chicken, FoodType.Bread, Difficulty.Low),
                new RequestSchema(FoodMainPart.Chicken),
                new RequestSchema(foodType: FoodType.Bread),
                new RequestSchema()
            };
            var counter = 1;
            foreach (var item in requestSchema)
            {
                Console.WriteLine($"{counter,1} {item.MainPart,10} {item.FoodType,10} {item.Difficulty,10} {item.ConditionCount,5}");
                counter++;
            }
            Console.WriteLine($".....");

            var result = new Logic().Process(requestSchema);
            counter = 1;
            foreach (var item in result)
            {
                Console.WriteLine($"{counter,1} {item.Name,30}  {item.MainPart,10}  {item.FoodType,10} {item.Difficulty,10}");
                counter++;
            }

            Console.ReadLine();
        }
    }
}
