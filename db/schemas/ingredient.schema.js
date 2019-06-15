const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Ingredient = new Schema({
  title: String,
  measure: {
    type: String,
    default: '100 гр'
  },
  coverImgUrl: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  calories: Number,
  nutrients: {
    carbohydrates: Number,
    fats: Number,
    protein: Number,
    water: Number
  },
  vitamins: {},
  aminoAcids: {},
  mineralComposition: {}
});

module.exports = Ingredient;
