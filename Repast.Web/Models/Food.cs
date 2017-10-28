namespace Repast.Web.Models
{
  public class FoodModel
  {
    public string id { get; set; }
    public string name { get; set; }
    public MainPartType mainPart { get; set; }
    public FoodType type { get; set; }
    public DifficultyType difficulty { get; set; }
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
}
