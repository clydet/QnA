const express = require('express');

const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(userController.getAllUsers());
});

module.exports = router;
