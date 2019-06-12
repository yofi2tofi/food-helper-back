const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Dish = new Schema({
  time: Number,
  title: String,
  imageUrl: String,
  difficulty: Number,
  recipe: String,
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  ]
});

module.exports = Dish;
