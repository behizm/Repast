using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Repast.Web.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace Repast.Web.Controllers
{
  [Produces("application/json")]
  [Route("api/Foods")]
  [EnableCors("AllowSpecificOrigin")]
  public class FoodsController : Controller
  {
    private FoodJsonContext foodContext;

    public FoodsController(IHostingEnvironment environment)
    {
      foodContext = new FoodJsonContext(environment.ContentRootPath);
    }


    [HttpGet]
    public IEnumerable<FoodModel> GetAll()
    {
      return foodContext.Data;
    }

    [HttpGet("{id}", Name = "GetFood")]
    public IActionResult GetFood(int id)
    {
      var food = foodContext.Data.FirstOrDefault(x => x.id == id);
      if (food == null)
      {
        return NotFound();
      }
      return new OkObjectResult(food);
    }

    [HttpPost]
    public IActionResult Create([FromBody] FoodCreateModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var exictedFood = foodContext.Data.FirstOrDefault(x => x.name == model.name);
      if (exictedFood != null)
      {
        return BadRequest("duplicate food name");
      }
      var newFood = new FoodModel
      {
        id = this.foodContext.Data.Max(x => x.id) + 1,
        difficulty = model.difficultyType.Value,
        mainPart = model.mainPart.Value,
        name = model.name,
        type = model.foodType.Value
      };
      this.foodContext.Data.Add(newFood);
      this.foodContext.SaveChanges();
      return new OkObjectResult(newFood);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] FoodUpdateModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      if (model.id != id)
      {
        return BadRequest("Invalid id");
      }
      var food = foodContext.Data.FirstOrDefault(x => x.id == model.id);
      if (food == null)
      {
        return NotFound();
      }
      var duplicatedFood = foodContext.Data.FirstOrDefault(x => x.name == model.name && x.id != model.id);
      if (duplicatedFood != null)
      {
        return BadRequest("Duplicate in food name");
      }
      food.name = model.name;
      food.mainPart = model.mainPart.Value;
      food.type = model.foodType.Value;
      food.difficulty = model.difficultyType.Value;
      this.foodContext.SaveChanges();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var food = foodContext.Data.FirstOrDefault(x => x.id == id);
      if (food == null)
      {
        return NotFound();
      }
      this.foodContext.Data.Remove(food);
      this.foodContext.SaveChanges();
      return NoContent();
    }

  }
}
