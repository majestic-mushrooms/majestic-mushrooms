const session = require('express-session');
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;
const COOKIE_AGE = 60000;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/authenticated';
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const redisClient = redis.createClient({
  port: 6379, 
  host: process.env.REDIS_HOST || 'localhost'
});


module.exports.verify = (req, res, next) => {
  console.log('Inside middleware.auth.verify');
  if (req.session.isAuthenticated()) {
    return next();
  }

  res.render('launch.ejs', (err, html) => {
    res.send(html);
  });
};


module.exports.initializeAuthentication = (req, res, next) => {
  req.session.isAuthenticated = () => {
    return (req.session.nylasToken && req.session.nylasToken !== null) ? true : false;
  };
  return next();
};


module.exports.session = session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

module.exports.CLIENT_ID = CLIENT_ID;
module.exports.REDIRECT_URI = REDIRECT_URI;

