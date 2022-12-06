const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
    res.render('ShoppingCartPage.ejs');
})

module.exports = router;