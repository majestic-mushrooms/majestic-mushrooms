const express = require('express');
const middleware = require('../middleware');
const axios = require('axios');
const querystring = require('querystring');

const models = require('../../db/models');
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;
const CLIENT_SECRET = process.env.NYLAS_CLIENT_SECRET || require('../../config/nylasToken.js').CLIENT_SECRET;
const MAIN_PAGE = process.env.MAIN_PAGE || 'http://localhost:3000/';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/authenticated';

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    console.log('returned to auth index render')
    res.render('index.ejs', {token: req.session.nylasToken});
  });

router.route('/login')
  .get((req, res) => {
    res.redirect(`https://api.nylas.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=email&redirect_uri=${REDIRECT_URI}`);
  });

router.route('/authenticated')
  .get((req, res) => {
    axios.post('https://api.nylas.com/oauth/token', 
      querystring.stringify(
        { client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: res.req.query.code 
        })
    )
    .then(response => {
      let token = response.data.access_token;
      
      req.session.nylasToken = token;
      res.locals.token = token;
      return axios.get('https://api.nylas.com/account', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
    })
    .catch(err => { 
      console.log('Error retrieving token: ', err); 
    })
    //retrieve account info, save if new
    .then(response => {
      let account = response.data;
      let accountId = account.account_id;

      return models.Account.where({ account_id: accountId }).fetch()
        .then(existing => {
          if (existing === null) {
            console.log('CREATING new account', accountId, 'for', account.name + '!');
            return models.Account.forge({
              account_id: accountId,
              name: account.name,
              email: account.email_address,
              provider: account.provider,
              org_unit: account.organization_unit,
              sync_state: account.sync_state
            }).save(null, { method: 'insert' });
          }

          console.log('Account', accountId, 'for', account.name, 'already exists!');
          return existing;
        });
    })
    .catch(err => { 
      console.log('ERROR: Error saving new / retrieving current account info.'); 
    })
    .then(account => {
      req.session.accountId = account.get('account_id');
      req.session.accountEmail = account.get('email');

      res.redirect(MAIN_PAGE);
    });
  });

  
router.route('/logout')
  .get( (req, res) => {
    console.log('Inside LOGOUT');
    req.session.destroy( (err) => {
      if (err) {
        console.log('Error destroying request session', err);
        res.status(500).send(err);
      } else {
        res.redirect('/');
      }
    });
  });


module.exports = router;