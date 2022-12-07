const jwt = require('jsonwebtoken');

const verfiyJWT = (req, res, next) => {

    if (!req.session.token) return res.redirect('/login');
    const token = req.session.token;
    console.log('verify');
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            
            if (err) {
                console.log(err);
                return res.redirect('/refresh');
            }
               
            req.username = decoded.username;
            next();
        }
    );
}

module.exports = verfiyJWT;


// const jwt = require('jsonwebtoken');

// const verfiyJWT = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) return res.sendStatus(401);
//     //console.log(token); // Bearer token
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
            
//             if (err) { console.log(err); return res.sendStatus(403)}; // invalid token
//             // if (err) return res.sendStatus(403); // invalid token
//             req.username = decoded.username;
            
//             next();
//         }
//     );
// }

// module.exports = verfiyJWT;