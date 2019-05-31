var express = require('express');
var router = express.Router();

/* GET 404 status. */
router.get('/user', function(req, res, next) {
  res.json({ message: 'user' });
});

module.exports = router;
