const express = require('express');
const router = express.Router();

const { DishModel } = require('../db/db.module');

router.get('/', async (req, res, next) => {
  try {
    const params = {
      tags: req.query.tags,
      authorId: req.query.authorId,
      favorite: req.query.favorite
    };

    const dishes = await DishModel.find(params)
      .sort({
        [req.query.sortBy]: req.query.sortType
      })
      .skip()
      .limit()
      .exec();

    return res.json({
      data: dishes,
      meta: {
        limit: req.query.limit,
        offset: req.query.offset
      }
    });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так =(' });
  }
});

module.exports = router;
