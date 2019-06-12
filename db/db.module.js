const mongoose = require('mongoose');

const User = require('./schemas/user.schema');
const Dish = require('./schemas/dish.schema');
const Ingredient = require('./schemas/ingredient.schema');

const dbConfigUrl =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://yofi2tofi:ABF71824178907@ds263876.mlab.com:63876/food-helper-test'
    : '';

mongoose.connect(dbConfigUrl);
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('connection error:', err.message);
});

db.once('open', function callback() {
  console.log('Connected to DB!');
});

const UserModel = mongoose.model('User', User);
const DishModel = mongoose.model('Dish', Dish);
const IngredientModel = mongoose.model('Ingredient', Ingredient);

module.exports = {
  UserModel: UserModel,
  DishModel: DishModel,
  IngredientModel: IngredientModel
};
