const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/users/register', registerController.handleNewUser);

module.exports = router;