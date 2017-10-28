using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Repast.Web.Models;
using Microsoft.AspNetCore.Cors;

namespace Repast.Web.Controllers
{
  [Produces("application/json")]
  [Route("api/Foods")]
  public class FoodsController : Controller
  {

    [HttpGet]
    [EnableCors("AllowSpecificOrigin")]
    public IEnumerable<FoodModel> GetAll()
    {
      var foods = new List<FoodModel>
      {
           new FoodModel { id= "01", name= "Zereshk Polo", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "02", name= "Reshte Polo ba Morgh", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "03", name= "Havij Polo", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "04", name= "Sabzi Polo ba Morgh", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "05", name= "Polo Yoonani", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "06", name= "Khorak ba Morgh", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "07", name= "Chicken Straganov", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "08", name= "Corden Blue", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.low },
           new FoodModel { id= "09", name= "Sandwich Morgh Doodi", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "10", name= "Morghe Feri ba Sabzijat", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "11", name= "Morghe Sokhari", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.low },
           new FoodModel { id= "12", name= "Ghormeh Sabzi", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= "13", name= "Gheymeh", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= "14", name= "Fesenjoon", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= "15", name= "Gheymeh Bademjan", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= "16", name= "Baghali Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.high },
           new FoodModel { id= "17", name= "Loobia Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "18", name= "Kalam Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= "19", name= "Kotlet", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "20", name= "Khorak ba Gosht", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "21", name= "Beef Straganov", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "22", name= "Haleem Bademjan", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.high },
           new FoodModel { id= "23", name= "Lazania", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "24", name= "Spagetti ba Ghosht", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= "25", name= "Mirza Ghasemi", mainPart= MainPartType.vegetables, type= FoodType.bread, difficulty= DifficultyType.medium },
      };
      return foods;
    }
  }
}
