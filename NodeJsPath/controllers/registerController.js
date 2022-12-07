const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, confirm } = req.body;
    //console.log(req.body);
    // if (!username.test(/[^A-Za-z0-9]/) || username.length > 8)



    if (!username || !password || !confirm) return res.redirect('/register');
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) {
        req.flash('message', 'username already exists');
        return res.redirect('/register');
    }

    if (password !== confirm) {
        req.flash('message', 'passwords do not match');
        return res.redirect('/register');
    }

    
   
    try {
        //encrypt the password
        const hasehdpwd = await bcrypt.hash(password, 10);
        //create and store the new user
        const result = await User.create({ 
            // "id": Date.now().toString(), 
            "username": username,
            "password": hasehdpwd
        });
        
        console.log(result);
        res.redirect(303, '/login');
       
    } catch (err) {
        console.log(err);
        return res.sendStatus(404);
    }
}

module.exports = { handleNewUser };