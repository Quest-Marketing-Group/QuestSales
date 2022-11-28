const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, confirm } = req.body;

    // if (!username.test(/[^A-Za-z0-9]/) || username.length > 8)

    if (password != confirm) return res.redirect('/users/register')

    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === username);
    if (duplicate) return res.redirect('/users/register'); //Conflict
    try {
        //encrypt the password
        const hasehdpwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = { "id": Date.now().toString(), "username": username, "password": hasehdpwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        
        // res.status(201);
        
        res.redirect('/users/login');
    } catch (err) {
        return res.sendStatus(404);
    }
}

module.exports = { handleNewUser };