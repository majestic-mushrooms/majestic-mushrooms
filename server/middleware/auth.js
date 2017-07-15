const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  console.log('Inside middlware.auth.verify, hardcoded to return true for now');
  // if (req.isAuthenticated()) {
  //   return next();
  // }
  // res.redirect('/login');
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

module.exports.authenticate = () => {
  //TODO: Insert code here to perform the authenticcation
};