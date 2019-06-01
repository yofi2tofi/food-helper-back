exports.id = "main";
exports.modules = {

/***/ "./passport/jwt.js":
/*!*************************!*\
  !*** ./passport/jwt.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\nconst JWTStrategy = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").Strategy;\nconst ExtractJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\").ExtractJwt;\n\nvar opts = {\n  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),\n  secretOrKey: 'secret'\n};\n\npassport.use(\n  new JWTStrategy(opts, (jwtPayload, done) => {\n    \n    console.log('jwtPayload');\n\n    // done(null, { payload: 'jwtPayload.sub' });\n  })\n);\n\n\n//# sourceURL=webpack:///./passport/jwt.js?");

/***/ })

};