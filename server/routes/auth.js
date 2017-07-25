const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;
const CLIENT_SECRET = process.env.NYLAS_CLIENT_SECRET || require('../../config/nylasToken.js').CLIENT_SECRET;
const axios = require('axios');
const querystring = require('querystring');



router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs', {token: req.session.nylasToken});
  });

router.route('/authenticated')
  .get((req, res) => {
    axios.post('https://api.nylas.com/oauth/token', 
      querystring.stringify(
        { client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: res.req.query.code 
        }))
    .then( (response) => {
      let token = response.data.access_token;
      
      req.session.nylasToken = token;
      res.locals.token = token;
      res.redirect('http://localhost:3000');
    }) 
    .catch( err => { console.log('ERROR ', err); });
  });


// router.route('/login')
//   .get((req, res) => {
//     res.render('login.ejs', { message: 'You should login' });
//   })
//   .post(middleware.passport.authenticate);

// router.route('/signup')
//   .get((req, res) => {
//     res.render('signup.ejs', { message: 'You should signup' });
//   })
//   .post(middleware.passport.authenticate); 

// router.route('/profile')
//   .get(middleware.auth.verify, (req, res) => {
//     res.render('profile.ejs', {
//       user: req.user // get the user out of session and pass to template
//     });
//   });


  
router.route('/logout')
  .get( (req, res) => {
    console.log('Inside LOGOUT');
    req.session.destroy( (err) => {
      if (err){
        console.log('Error destroying request session', err);
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    });
  });


module.exports = router;