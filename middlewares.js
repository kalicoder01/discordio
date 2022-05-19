const { body, validationResult } = require('express-validator');
const UserModel  = require('./models/User');

function authenticate (req, res, next) {

    if (req.method == 'POST') {
        let token = req.headers.authorization;

        if (typeof(token) != 'undefined') {
            usersQuery = UserModel.find({
                token: token
            });
            usersQuery.exec((err, users) => {

                if (users.length != 0) {
                    req.user = users[0];
                    next();

                } else {
                    res.status(403).json({
                        code: 40302,
                        errors: ['Token is invalid']
                    });
                }
            });
        } else {
            res.status(403).json({
                code: 40301,
                errors: ['No auth token']
            });
        }
    } else {
        next();
    }
    
}

module.exports = authenticate