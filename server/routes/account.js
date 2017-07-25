'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const AccountController = require('../controllers').Account;



router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes account.js GET for /');
    AccountController.getOne(req, res);
  });



module.exports = router;
