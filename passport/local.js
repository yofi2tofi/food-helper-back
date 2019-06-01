const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { UserModel } = require('../db/db.module');
const { generateSalt, generateHashedPassword } = require('../util/encryption');

passport.use(
  'local-signup',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      if (await UserModel.findOne({ 'local.username': username })) {
        return done('Already exist', false);
      }

      try {
        const salt = generateSalt();
        const user = new UserModel({
          method: 'local',
          role: 'user',
          local: {
            username,
            salt,
            hashedPassword: generateHashedPassword(salt, password)
          }
        });

        await user.save();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
