using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Repast.Website.Models
{
    public class FoodModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public MainPartType mainPart { get; set; }
        public FoodType type { get; set; }
        public DifficultyType difficulty { get; set; }
        public string description { get; set; }
    }

    public enum MainPartType
    {
        meal = 1,
        chicken = 2,
        sea = 3,
        vegetables = 4
    }

    public enum FoodType
    {
        stew = 1,
        rice = 2,
        bread = 3,
        dish = 4
    }

    public enum DifficultyType
    {
        veryLow = 1,
        low = 2,
        medium = 3,
        high = 4,
        veryHigh = 5
    }

    public class FoodCreateModel
    {
        [Required]
        public string name { get; set; }

        [Required]
        public MainPartType? mainPart { get; set; }

        [Required]
        public FoodType? type { get; set; }

        [Required]
        public DifficultyType? difficulty { get; set; }

        public string description { get; set; }
    }

    public class FoodUpdateModel
    {
        [Required]
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public MainPartType? mainPart { get; set; }

        [Required]
        public FoodType? type { get; set; }

        [Required]
        public DifficultyType? difficulty { get; set; }

        public string description { get; set; }
    }

    public class FoodDescriptionModel
    {
        public int foodId { get; set; }
        public string description { get; set; }
    }
}
