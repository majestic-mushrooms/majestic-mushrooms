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
    MessageController.getOne(req, res);
  });


router.route('/:id/:thread')
.get((req, res) => {
  MessageController.getThread(req, res);
});


module.exports = router;
