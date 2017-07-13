'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello Cookies!');
  })
  .post((req, res) => {
    console.log('in the correct route, maybe?');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
