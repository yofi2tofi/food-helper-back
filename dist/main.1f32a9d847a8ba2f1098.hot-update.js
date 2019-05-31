exports.id = "main";
exports.modules = {

/***/ "./db/db.module.js":
/*!*************************!*\
  !*** ./db/db.module.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst User = __webpack_require__(/*! ./schemas/user.schema */ \"./db/schemas/user.schema.js\");\n\nconst dbConfigUrl =\n   true\n    ? 'mongodb://yofi2tofi:ABF71824178907@ds263876.mlab.com:63876/food-helper-test'\n    : undefined;\n\nmongoose.connect(dbConfigUrl);\nvar db = mongoose.connection;\n\ndb.on('error', function(err) {\n  console.log('connection error:', err.message);\n});\n\ndb.once('open', function callback() {\n  console.log('Connected to DB!');\n});\n\nconst UserModel = mongoose.model('User', User);\n\nmodule.exports = {\n  UserModel: UserModel\n};\n\n\n//# sourceURL=webpack:///./db/db.module.js?");

/***/ })

};