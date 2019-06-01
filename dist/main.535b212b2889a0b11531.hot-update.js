exports.id = "main";
exports.modules = {

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nconst logger = __webpack_require__(/*! morgan */ \"morgan\");\nconst compression = __webpack_require__(/*! compression */ \"compression\");\nconst swaggerUi = __webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\");\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst swaggerDocument = __webpack_require__(/*! ./swagger.json */ \"./swagger.json\");\n\nconst indexRouter = __webpack_require__(/*! ./routes/index */ \"./routes/index.js\");\nconst usersRouter = __webpack_require__(/*! ./routes/users */ \"./routes/users.js\");\nconst authRouter = __webpack_require__(/*! ./routes/auth */ \"./routes/auth.js\");\n\nconst authenticate = __webpack_require__(/*! ./middlewares/authenticate */ \"./middlewares/authenticate.js\");\n\nconst app = express();\n\n__webpack_require__(/*! ./passport/local */ \"./passport/local.js\");\n\n__webpack_require__(/*! ./validationSchemas/validation.module */ \"./validationSchemas/validation.module.js\");\n\napp.use(logger('dev'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(express.static(path.join(__dirname, 'public')));\napp.use(compression());\napp.use(passport.initialize());\n\napp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));\n\napp.use('/api/v1/auth', authRouter);\napp.use('/api/v1/users', authenticate(), usersRouter);\napp.use('*', indexRouter);\n\nmodule.exports = app;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./passport/jwt.js":
false

};