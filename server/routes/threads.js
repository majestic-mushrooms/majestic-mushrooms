'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const Threads = require('../controllers').Threads;

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside threads.js for route /`);
    Threads.getAll(req, res);
  })

  router.route('/:id')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside threads.js for route /:id`);
    Threads.getAll(req, res);
  })

module.exports = router;
