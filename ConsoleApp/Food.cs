using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApp
{
    public class Food
    {
        public Food() { }

        public Food(string name, FoodMainPart mainPart, FoodType foodType, Difficulty difficulty)
        {
            Name = name;
            MainPart = mainPart;
            FoodType = foodType;
            Difficulty = difficulty;
        }

        public string Name { get; set; }
        public FoodMainPart MainPart { get; set; }
        public FoodType FoodType { get; set; }
        public Difficulty Difficulty { get; set; }
    }

    public enum FoodMainPart
    {
        Meal = 0,
        Chicken = 1,
        Sea = 2,
        Vegetables = 3
    }

    public enum FoodType
    {
        Stew = 0,
        Rice = 1,
        Bread = 2,
        Dish = 3
    }

    public enum Difficulty
    {
        VeryLow = 1,
        Low = 2,
        Medium = 3,
        High = 4,
        VeryHigh = 5
    }
}
