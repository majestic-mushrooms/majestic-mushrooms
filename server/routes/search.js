'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const SearchController = require('../controllers').Search;

router.route('/')
  .post( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes search POST');
    SearchController.getAll(req, res);
  });

router.route('/')
  .get( middleware.auth.verify, (req, res) => {
    console.log('Inside Routes search GET');
    SearchController.getNylasResults(req, res);
  });

module.exports = router;
