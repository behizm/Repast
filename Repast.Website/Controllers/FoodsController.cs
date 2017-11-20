using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Repast.Website.Models;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace Repast.Website.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class FoodsController : Controller
    {
        private FoodJsonContext foodContext;
        private DescriptionJsonContext descriptionContext;

        public FoodsController(IHostingEnvironment environment)
        {
            foodContext = new FoodJsonContext(environment.ContentRootPath);
            descriptionContext = new DescriptionJsonContext(environment.ContentRootPath);
        }


        [HttpGet]
        public IEnumerable<FoodModel> GetAll()
        {
            return foodContext.Data;
        }

        [HttpGet("{id}", Name = "GetFood")]
        public IActionResult GetFood(int id)
        {
            var food = this.foodContext.Data.FirstOrDefault(x => x.id == id);
            if (food == null)
            {
                return NotFound();
            }
            var descriptionItem = this.descriptionContext.Data.FirstOrDefault(x => x.foodId == id);
            if (descriptionItem != null)
            {
                food.description = descriptionItem.description;
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
            model.name = model.name.Trim();
            var exictedFood = foodContext.Data.FirstOrDefault(x => x.name.Equals(model.name, System.StringComparison.OrdinalIgnoreCase));
            if (exictedFood != null)
            {
                return BadRequest(new { message = "duplicated food name." });
            }
            var newFood = new FoodModel
            {
                id = this.foodContext.Data.Any() ? this.foodContext.Data.Max(x => x.id) + 1 : 1,
                difficulty = model.difficulty.Value,
                mainPart = model.mainPart.Value,
                name = model.name,
                type = model.type.Value
            };
            this.foodContext.Data.Add(newFood);
            this.foodContext.SaveChanges();
            if (!string.IsNullOrEmpty(model.description))
            {
                var newDescription = new FoodDescriptionModel
                {
                    foodId = newFood.id,
                    description = model.description
                };
                this.descriptionContext.Data.Add(newDescription);
                this.descriptionContext.SaveChanges();
            }
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
            model.name = model.name.Trim();
            var duplicatedFood = foodContext.Data.FirstOrDefault(x =>
                x.name.Equals(model.name, System.StringComparison.OrdinalIgnoreCase) && x.id != model.id);
            if (duplicatedFood != null)
            {
                return BadRequest("Duplicate in food name");
            }
            food.name = model.name;
            food.mainPart = model.mainPart.Value;
            food.type = model.type.Value;
            food.difficulty = model.difficulty.Value;
            this.foodContext.SaveChanges();

            var descriptionItem = this.descriptionContext.Data.FirstOrDefault(x => x.foodId == model.id);
            if (descriptionItem == null && string.IsNullOrEmpty(model.description))
            {
                return Ok();
            }

            if (descriptionItem == null /*&& !string.IsNullOrEmpty(model.description)*/)
            {
                var newDescription = new FoodDescriptionModel
                {
                    foodId = model.id,
                    description = model.description
                };
                this.descriptionContext.Data.Add(newDescription);
            }
            else if (descriptionItem != null && string.IsNullOrEmpty(model.description))
            {
                this.descriptionContext.Data.Remove(descriptionItem);
            }
            else /*if (descriptionItem != null && !string.IsNullOrEmpty(model.description))*/
            {
                descriptionItem.description = model.description;
            }
            this.descriptionContext.SaveChanges();

            return Ok();
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
            var descriptionItem = this.descriptionContext.Data.FirstOrDefault(x => x.foodId == id);
            if (descriptionItem != null)
            {
                this.descriptionContext.Data.Remove(descriptionItem);
                this.descriptionContext.SaveChanges();
            }
            return Ok();
        }

    }
}
