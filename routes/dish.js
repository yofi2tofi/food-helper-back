const express = require('express');
const router = express.Router();

const { DishModel } = require('../db/db.module');

const dishValidator = require('../middlewares/dish.validator');

router.get('/', async (req, res, next) => {
  const limit = +req.query.limit ? +req.query.limit : 10;
  const offset = +req.query.offset ? +req.query.offset : 0;

  try {
    const { tags, authorId, favorite, sortBy, sortType } = req.query;

    const params = {};

    if (tags) {
      tags = tags.split(',');
      params.tags = { $in: tags };
    }

    if (authorId) {
      params.authorId = authorId;
    }

    if (favorite) {
      params.favorite = favorite;
    }

    const dishes = await DishModel.find(params, '-__v')
      .sort({
        [sortBy]: sortType
      })
      .skip(offset)
      .limit(limit)
      .exec();

    return res.json({
      data: dishes,
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
    const dish = await DishModel.findById(id, '-__v')
      .populate({ path: 'authorId', select: '_id' })
      .exec();

    return res.json({
      data: dish,
      meta: null
    });
  } catch {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

router.post('/', dishValidator, async (req, res, next) => {
  try {
    const dish = await new DishModel(req.body).save();

    return res.json({
      data: dish,
      meta: null
    });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

router.put('/:id', dishValidator, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { authorId } = req.body;

    let dish = await DishModel.findById(id)
      .populate({ path: 'authorId', select: '_id' })
      .exec();

    if (dish.authorId._id.toString() !== authorId) {
      return res
        .status(400)
        .json({ message: 'Нельзя менять рецепты других авторов!' });
    }

    await DishModel.findByIdAndUpdate(id, req.body).exec();
    dish = await DishModel.findById(id, '-__v')
      .populate({
        path: 'authorId',
        select: '_id'
      })
      .exec();

    return res.json({
      data: dish,
      meta: null
    });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;

    const dish = await DishModel.findById(id)
      .populate({ path: 'authorId', select: '_id' })
      .exec();

    if (dish.authorId._id.toString() !== userId.toString()) {
      return res
        .status(400)
        .json({ message: 'Нельзя удалять рецепты других авторов!' });
    }

    await DishModel.deleteOne({ _id: id }).exec();
    return res.status(500).json({ message: 'Блюдо, удалено.' });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

module.exports = router;
