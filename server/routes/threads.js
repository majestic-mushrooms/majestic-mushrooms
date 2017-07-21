'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const Thread = require('../controllers').Thread;

router.route('/:id')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside Routes messages.js GET for /${req.params.id}`);
    Thread.getAll(req, res);
  })

module.exports = router;
