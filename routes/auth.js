var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const { UserModel } = require('../db/db.module');

const bodyValidator = require('../middlewares/userBodyValidator');

/* GET auth. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/signup', bodyValidator, (req, res, next) => {
  passport.authenticate('local-signup', async (err, user, info) => {
    if (err === 'Already exist') {
      return res.status(500).json({ message: 'Пользователь уже существует' });
    }
    if (err) {
      return res.status(500).json({ message: 'Что-то пошло не так =(' });
    }
    if (user) {
      const accessToken = jwt.sign({ _id: user._id }, 'secret', {
        expiresIn: '1m'
      });
      const refreshToken = jwt.sign({ _id: user._id }, 'secret', {
        expiresIn: '1h'
      });

      const updateUser = await UserModel.findByIdAndUpdate(user._id, {
        $set: { refreshToken }
      }).exec();

      return res.json({ accessToken, refreshToken });
    }
  })(req, res, next);
});

module.exports = router;
