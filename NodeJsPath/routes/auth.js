const { application } = require('express');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('LoginPage.ejs', { message: req.flash('message')});
})
router.post('/', authController.handleLogin);



module.exports = router;