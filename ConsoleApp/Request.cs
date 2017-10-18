using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApp
{
    public class RequestSchema
    {
        public RequestSchema(FoodMainPart? foodMainPart = null, FoodType? foodType = null, Difficulty? difficulty = null)
        {
            ConditionCount = 0;
            MainPart = foodMainPart;
            FoodType = foodType;
            Difficulty = difficulty;
        }

        public int ConditionCount { get; private set; }

        private FoodMainPart? _mainPart;
        public FoodMainPart? MainPart
        {
            get { return _mainPart; }
            set
            {
                if (value == _mainPart) return;
                _mainPart = value;
                if (value.HasValue)
                {
                    ConditionCount++;
                }
                else
                {
                    ConditionCount--;
                }
            }
        }

        private FoodType? _foodType;
        public FoodType? FoodType
        {
            get { return _foodType; }
            set
            {
                if (value == _foodType) return;
                _foodType = value;
                if (value.HasValue)
                {
                    ConditionCount++;
                }
                else
                {
                    ConditionCount--;
                }
            }
        }

        private Difficulty? _difficulty;
        public Difficulty? Difficulty
        {
            get { return _difficulty; }
            set
            {
                if (value == _difficulty) return;
                _difficulty = value;
                if (value.HasValue)
                {
                    ConditionCount++;
                }
                else
                {
                    ConditionCount--;
                }
            }
        }
    }
}
