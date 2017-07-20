const session = require('express-session');
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;
const COOKIE_AGE = 60000;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http%3A%2F%2Flocalhost%3A3000%2Fauthenticated';
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();


module.exports.verify = (req, res, next) => {
  console.log('Inside middleware.auth.verify');
  if (req.session.isAuthenticated()) {
    return next();
  }
  res.redirect(`https://api.nylas.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=email&login_hint=email&redirect_uri=${REDIRECT_URI}`);
};


module.exports.initializeAuthentication = (req, res, next) => {
  req.session.isAuthenticated = () => {
    return (req.session.nylasToken && req.session.nylasToken !== null) ? true : false;
  };
  return next();
};


module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

// module.exports.session = session({
//   secret: 'more laughter, more love, more life',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: COOKIE_AGE },
// });

module.exports.CLIENT_ID = CLIENT_ID;
module.exports.REDIRECT_URI = REDIRECT_URI;

