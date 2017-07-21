'use strict';
const express = require('express');
const router = express.Router();
const FolderController = require('../controllers').Folders;

router.route('/')
  .get(FolderController.getAll);
  // .post(ProfileController.create)
router.route('/:id')
  .get(FolderController.filter);
  
module.exports = router;
