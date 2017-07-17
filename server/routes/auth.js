const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    console.log('Inside router.route /');
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: 'You should login' });
  })
  .post(middleware.passport.authenticate);

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: 'You should signup' });
  })
  .post(middleware.passport.authenticate);

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });



module.exports = router;
