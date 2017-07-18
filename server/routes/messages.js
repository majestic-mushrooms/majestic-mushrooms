'use strict';
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers').Messages;
const middleware = require('../middleware');

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes messages.js /api/messages');
    MessageController.getOne(req, res);
  });



router.route('/:id/:thread')
.get((req, res) => {
  MessageController.getThread(req, res);
});

module.exports = router;
