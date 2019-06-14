exports.id = "main";
exports.modules = {

/***/ "./middlewares/userBodyValidator.js":
/*!******************************************!*\
  !*** ./middlewares/userBodyValidator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const classValidator = __webpack_require__(/*! class-validator */ \"class-validator\");\n\nmodule.exports = (req, res, next) => {\n  classValidator\n    .validate('userLocalSchema', req.body, {\n      whitelist: true,\n      forbidNonWhitelisted: true\n    })\n    .then(errors => {\n      if (errors.length) {\n        const errorsMessages = errors.map(error => {\n          const key = error.property;\n          const messageRaw = error.constraints;\n\n          let message;\n          for (const key in messageRaw) {\n            message = messageRaw[key];\n          }\n\n          return { [key]: message };\n        });\n\n        return res.status(404).json(errorsMessages);\n      }\n\n      next();\n    });\n};\n\n\n//# sourceURL=webpack:///./middlewares/userBodyValidator.js?");

/***/ })

};