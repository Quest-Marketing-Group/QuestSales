const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    console.log('cookie');
    console.log(cookies);
    if (!cookies?.jwt) return res.send('hi'); //No content
    const refreshToken = cookies.jwt;
    console.log(cookies.jwt);
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.redirect('/');
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    req.session.token = '';
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.redirect(303, '/');
}

module.exports = { handleLogout }