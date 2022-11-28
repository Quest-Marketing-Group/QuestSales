if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const initializePassport = require('./controllers/authController')
const flash = require('express-flash');
const session = require('express-session');
initializePassport(passport);
const PORT = process.env.PORT || 3500;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view-engine', 'ejs');
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())


app.get('/', checkAuthenticated, (req, res) => {
    res.render('HomePage.ejs')
})

app.get('/users/register', checkNotAuthenticated, (req, res) => {
    res.render('MakeAccount.ejs');
})
app.post('/users/register', checkNotAuthenticated, require('./routes/register'));

app.get('/users/login', checkNotAuthenticated, (req, res) => {
    res.render('LogInPage.ejs');
})
app.post('/users/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    res.redirect('/users/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
//   }
// const express = require('express');
// const app = express();
// const path = require('path');
// const passport = require('passport');
// const initializePassport = require('./controllers/authController')
// const flash = require('express-flash');
// const session = require('express-session');
// initializePassport(passport);
// const PORT = process.env.PORT || 3500;


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.set('view-engine', 'ejs');
// app.use('/', express.static(path.join(__dirname, '/public')));

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(flash());
// app.use(passport.initialize())
// app.use(passport.session())


// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('HomePage.ejs')
// })

// app.get('/users/register', checkNotAuthenticated, (req, res) => {
//     res.render('MakeAccount.ejs');
// })
// app.post('/users/register', checkNotAuthenticated, require('./routes/register'));

// app.get('/users/login', checkNotAuthenticated, (req, res) => {
//     res.render('LogInPage.ejs');
// })
// app.post('/users/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login',
//     failureFlash: true
// }));


// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
    
//     res.redirect('/users/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
// }

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


