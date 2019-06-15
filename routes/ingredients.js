const express = require('express');
const router = express.Router();

const ingredientValidator = require('../middlewares/ingredient.validator');
const roleAccess = require('../middlewares/roleAccess');

const { IngredientModel } = require('../db/db.module');

router.get('/', async (req, res, next) => {
  const limit = +req.query.limit ? +req.query.limit : 10;
  const offset = +req.query.offset ? +req.query.offset : 0;

  try {
    const { title, categoryId, sortBy, sortType } = req.query;

    const params = {};

    if (categoryId) {
      const categoryIds = categoryId.split(',');
      params.category = { $in: categoryIds };
    }

    if (title) {
      params['$text'] = { $search: title };
    }

    const ingredients = await IngredientModel.find(params, '-__v')
      .sort({
        [sortBy]: sortType
      })
      .skip(offset)
      .limit(limit)
      .exec();

    return res.json({
      data: ingredients,
      meta: {
        limit,
        offset
      }
    });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await IngredientModel.findById(id, '-__v').exec();

    return res.json({
      data: ingredient,
      meta: null
    });
  } catch {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

router.post(
  '/',
  roleAccess('admin'),
  ingredientValidator,
  async (req, res, next) => {
    try {
      const ingredient = await new IngredientModel(req.body).save();

      return res.json({
        data: ingredient,
        meta: null
      });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так =(' });
    }
  }
);

router.put(
  '/:id',
  roleAccess('admin'),
  ingredientValidator,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      await IngredientModel.findByIdAndUpdate(id, req.body).exec();
      ingredient = await IngredientModel.findById(id, '-__v').exec();

      return res.json({
        data: ingredient,
        meta: null
      });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так =(' });
    }
  }
);

router.delete('/:id', roleAccess('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    await IngredientModel.deleteOne({ _id: id }).exec();

    return res.status(500).json({ message: 'Ингредиент, удален.' });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

module.exports = router;
