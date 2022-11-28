const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const usersDB = {
    users: require('./model/users.json'),
    setUsers: function (data) { this.users = data}
}

function intialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const foundUser = usersDB.users.find(person => person.username === username);
        console.log(foundUser);
        if (foundUser == null) {
            return done(null, false, { message: 'Username does not exist'});
        }

        try {
            if (await bcrypt.compare(password, foundUser.password)) {
                return done(null, foundUser)
            }
            else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }
    


passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
passport.serializeUser((foundUser, done) => done(null, foundUser.id));
passport.deserializeUser((id, done) => {
    return done(null, id);
    }) 
}

       

    
module.exports = intialize;
