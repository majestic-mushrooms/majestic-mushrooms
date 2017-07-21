'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const MessageController = require('../controllers').Messages;

router.route('/')
  .post( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes messages.js POST for /');
    MessageController.create(req, res);
  });

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes messages.js GET for /');
    MessageController.getAll(req, res);
  });

router.route('/read/:id')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside Routes messages.js GET for /read/:id `);
    MessageController.getOne(req, res);
  });

router.route('/:id/:type/:typeid')
  .put( middleware.auth.verify, (req, res) => {
    console.log(`Inside Routes message.js PUT for /:id/:type/:typeid`);
    MessageController.update(req, res);
  });

module.exports = router;
