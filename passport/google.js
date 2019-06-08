const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

passport.use(
  new GoogleTokenStrategy(
    {
      clientID:
        '354513618601-ficclon4bei6lniem81rmno751fn8k90.apps.googleusercontent.com',
      clientSecret: 'dOfP5aZKK4J69IlSFh75vq6r'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
