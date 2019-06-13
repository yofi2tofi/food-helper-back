const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Dish = new Schema({
  time: Number,
  title: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coverImgUrl: String,
  photos: {
    type: Array
  },
  videoUrl: String,
  complexity: Number,
  recipe: String,
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  ],
  description: String,
  price: Number,
  proteins: Number,
  fats: Number,
  carbohydrates: Number,
  minutes: Number
});

module.exports = Dish;
