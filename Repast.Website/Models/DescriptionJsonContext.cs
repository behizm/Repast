using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Repast.Website.Models
{
    public class DescriptionJsonContext
    {
        public DescriptionJsonContext(string contentRootPath)
        {
            this._contentRootPath = contentRootPath;
            this.InitilizeDescriptionFile();
        }

        private IList<FoodDescriptionModel> _data;
        public IList<FoodDescriptionModel> Data
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

        public void OverwriteData(IList<FoodDescriptionModel> descriptions)
        {
            using (var stream = File.Open(this._filePath, FileMode.Open))
            {
                stream.SetLength(0);
            }
            using (var stream = File.Open(this._filePath, FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                var jsonDescriptions = JsonConvert.SerializeObject(descriptions.OrderBy(x => x.foodId));
                var contentBytes = new UTF8Encoding(true).GetBytes(jsonDescriptions);
                stream.Write(contentBytes, 0, contentBytes.Length);
            }
        }

        public void SaveChanges()
        {
            this.OverwriteData(this.Data);
        }


        private string _contentRootPath;

        private string _filePath;

        private void InitilizeDescriptionFile()
        {
            var directoryPath = $"{this._contentRootPath}\\JsonData";
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            var filePath = $"{directoryPath}\\descriptions.json";
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
                    var jsonFoods = JsonConvert.SerializeObject(new List<FoodDescriptionModel>());
                    var contentBytes = new UTF8Encoding(true).GetBytes(jsonFoods);
                    stream.Write(contentBytes, 0, contentBytes.Length);
                }
            }
        }

        private IList<FoodDescriptionModel> GetDataFromFile()
        {
            var contents = string.Empty;
            using (var stream = File.Open(this._filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    contents = streamReader.ReadToEnd();
                }
            }
            return JsonConvert.DeserializeObject<IList<FoodDescriptionModel>>(contents);
        }
    }
}
