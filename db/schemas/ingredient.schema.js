const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Ingredient = new Schema({
  title: String,
  measure: String,
  energyValue: {
    calories: Number,
    carbs: Number,
    fats: Number,
    protein: Number
  }
});

module.exports = Ingredient;
