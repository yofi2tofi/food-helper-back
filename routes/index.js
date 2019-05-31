var express = require('express');
var router = express.Router();

/* GET 404 status. */
router.get('/', function(req, res, next) {
  res.status(404).json({ message: 'Что-то пошло не так =(' });
});

module.exports = router;
