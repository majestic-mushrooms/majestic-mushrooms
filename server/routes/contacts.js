'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const Contacts = require('../controllers').Contacts;

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside contacts.js for route /`);
    Contacts.getAll(req, res);
  })

  router.route('/:id')
  .get( middleware.auth.verify, (req, res) => {
    console.log(`Inside contacts.js for route /:id`);
    Contacts.getAll(req, res);
  })

module.exports = router;
