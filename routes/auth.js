var express = require('express');
var router = express.Router();

const { UserModel } = require('../db/db.module');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
