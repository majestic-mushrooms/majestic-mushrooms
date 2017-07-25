'use strict';
const express = require('express');
const router = express.Router();
const FolderController = require('../controllers').Folders;

router.route('/')
  .get(FolderController.getAll);

  router.route('/:id')
  .get(FolderController.filter);
  
module.exports = router;
