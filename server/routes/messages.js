'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const MessageController = require('../controllers').Messages;

router.route('/')
  .post( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes messages.js POST');
    MessageController.create(req, res);
  });

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes messages.js GET ');
    MessageController.getAll(req, res);
  });

router.route('/:id')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside Routes messages.js GET for /${req.params.id}`);
    MessageController.getOne(req, res);
  });

router.route('/:id/:type/:typeid')
  .put( middleware.auth.verify, (req, res) => {
    console.log(`Inside Routes message.js PUT for /${req.params.id}`);
    MessageController.update(req, res);
  });
router.route('/:id/:thread')
  .get((req, res) => {
    MessageController.getThread(req, res);
  });

module.exports = router;
