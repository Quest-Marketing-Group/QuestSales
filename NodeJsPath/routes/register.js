const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/', (req, res) => {
   
    res.render('MakeAccount.ejs', { message: req.flash('message') });
});
router.post('/', registerController.handleNewUser);

module.exports = router;