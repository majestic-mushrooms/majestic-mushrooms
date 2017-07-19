'use strict';
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers').Messages;

router.route('/')
  .get(MessageController.getAll)
  // .post(MessageController.create)
;

router.route('/:id')
  .get((req, res) => {
    MessageController.getOne(req, res);
  })
//   .get(MessageController.getOne)  
//   .put(MessageController.update)
//   // .delete(MessageController.deleteOne)
;

router.route('/:id/:thread')
.get((req, res) => {
  MessageController.getThread(req, res);
})

module.exports = router;