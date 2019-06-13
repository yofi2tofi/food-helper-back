exports.id = "main";
exports.modules = {

/***/ "./routes/dish.js":
/*!************************!*\
  !*** ./routes/dish.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nconst { DishModel } = __webpack_require__(/*! ../db/db.module */ \"./db/db.module.js\");\n\nrouter.get('/', async (req, res, next) => {\n  try {\n    const params = {\n      tags: req.query.tags,\n      authorId: req.query.authorId,\n      favorite: req.query.favorite\n    };\n\n    const dishes = await DishModel.find(params)\n      .sort({\n        [req.query.sortBy]: req.query.sortType\n      })\n      .skip()\n      .limit()\n      .exec();\n\n    return res.json({\n      data: dishes,\n      meta: {\n        limit: req.query.limit,\n        offset: req.query.offset\n      }\n    });\n  } catch (e) {\n    return res.status(500).json({ message: 'Что-то пошло не так =(' });\n  }\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/dish.js?");

/***/ })

};