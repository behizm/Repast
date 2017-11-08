using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;

namespace Repast.Website.Models
{
    public class FoodModel
    {
        public int id { get; set; }
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
    }

    public class FoodJsonContext
    {

        public FoodJsonContext(string contentRootPath)
        {
            this._contentRootPath = contentRootPath;
            this.InitilizeFoodFile();
        }


        private IList<FoodModel> _data;
        public IList<FoodModel> Data
        {
            get
            {
                if (_data == null)
                {
                    _data = this.GetDataFromFile();
                }
                return _data;
            }
        }

        public void Refresh()
        {
            this._data = this.GetDataFromFile();
        }

        public void OverwriteData(IList<FoodModel> foods)
        {
            using (var stream = File.Open(this._filePath, FileMode.Open))
            {
                stream.SetLength(0);
            }
            using (var stream = File.Open(this._filePath, FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                var jsonFoods = JsonConvert.SerializeObject(foods.OrderBy(x => x.id));
                var contentBytes = new UTF8Encoding(true).GetBytes(jsonFoods);
                stream.Write(contentBytes, 0, contentBytes.Length);
            }
        }

        public void SaveChanges()
        {
            this.OverwriteData(this.Data);
        }


        private string _contentRootPath;

        private string _filePath;

        private IList<FoodModel> GetDefaultFoods()
        {
            return new List<FoodModel>
      {
           new FoodModel { id= 1, name= "Zereshk Polo", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 2, name= "Reshte Polo ba Morgh", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 3, name= "Havij Polo", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 4, name= "Sabzi Polo ba Morgh", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 5, name= "Polo Yoonani", mainPart= MainPartType.chicken, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 6, name= "Khorak ba Morgh", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 7, name= "Chicken Straganov", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 8, name= "Corden Blue", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.low },
           new FoodModel { id= 9, name= "Sandwich Morgh Doodi", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 10, name= "Morghe Feri ba Sabzijat", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 11, name= "Morghe Sokhari", mainPart= MainPartType.chicken, type= FoodType.bread, difficulty= DifficultyType.low },
           new FoodModel { id= 12, name= "Ghormeh Sabzi", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= 13, name= "Gheymeh", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= 14, name= "Fesenjoon", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= 15, name= "Gheymeh Bademjan", mainPart= MainPartType.meal, type= FoodType.stew, difficulty= DifficultyType.high },
           new FoodModel { id= 16, name= "Baghali Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.high },
           new FoodModel { id= 17, name= "Loobia Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 18, name= "Kalam Polo", mainPart= MainPartType.meal, type= FoodType.rice, difficulty= DifficultyType.medium },
           new FoodModel { id= 19, name= "Kotlet", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 20, name= "Khorak ba Gosht", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 21, name= "Beef Straganov", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 22, name= "Haleem Bademjan", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.high },
           new FoodModel { id= 23, name= "Lazania", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 24, name= "Spagetti ba Ghosht", mainPart= MainPartType.meal, type= FoodType.bread, difficulty= DifficultyType.medium },
           new FoodModel { id= 25, name= "Mirza Ghasemi", mainPart= MainPartType.vegetables, type= FoodType.bread, difficulty= DifficultyType.medium },
      };
        }

        private void InitilizeFoodFile()
        {
            var directoryPath = $"{this._contentRootPath}\\JsonData";
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            var filePath = $"{directoryPath}\\foods.json";
            this._filePath = filePath;
            var fileContent = string.Empty;
            using (var stream = File.Open(filePath, FileMode.OpenOrCreate, FileAccess.Read, FileShare.Read))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    fileContent = streamReader.ReadToEnd();
                }
            }
            if (string.IsNullOrEmpty(fileContent))
            {
                using (var stream = File.Open(filePath, FileMode.Append, FileAccess.Write, FileShare.Write))
                {
                    var jsonFoods = JsonConvert.SerializeObject(this.GetDefaultFoods());
                    var contentBytes = new UTF8Encoding(true).GetBytes(jsonFoods);
                    stream.Write(contentBytes, 0, contentBytes.Length);
                }
            }
        }

        private IList<FoodModel> GetDataFromFile()
        {
            var contents = string.Empty;
            using (var stream = File.Open(this._filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    contents = streamReader.ReadToEnd();
                }
            }
            return JsonConvert.DeserializeObject<IList<FoodModel>>(contents);
        }
    }
}
