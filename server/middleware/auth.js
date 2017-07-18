const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;


module.exports.verify = (req, res, next) => {
  console.log('Inside middlware.auth.verify, hardcoded to return true for now');
  // if (req.isAuthenticated()) {
  //   console.log('authenticated');
  //   return next();
  // }
  console.log('CLIENT_ID', CLIENT_ID);
  res.redirect(`https://api.nylas.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=email&login_hint=email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticated`);
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