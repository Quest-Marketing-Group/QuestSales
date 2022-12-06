/*
https://www.youtube.com/watch?v=jivyItmsu18&list=PL0Zuz27SZ-6P4vnjQ_PJ5iRYsqJkQhtUu
https://www.youtube.com/watch?v=-PdjUx9JZ2E&list=PL0Zuz27SZ-6OJQfjH8g_CAjgMbLoIleKN
*/

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const User = require('./model/User');
const flash = require('express-flash');
const session = require('express-session');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();



app.use(credentials);
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,

}))
app.use(flash());

// built-in middleware for json 
app.set('view-engine', 'ejs');
app.use(express.json());

//middleware for cookies
app.use(cookieParser());



//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.get('/product', (req, res) => {
    res.render('ProductsPage.ejs')
})




app.get('/user', verifyJWT, (req, res) => {
    res.render('index2.ejs');
})
app.get('/user/cart', verifyJWT, (req, res) => {
    res.render('ShoppingCartPage.ejs');
})
app.get('/user/product', verifyJWT, (req, res) => {
    res.render('ProductsPage2.ejs');
})


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
       res.send('404 Not Found');
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});