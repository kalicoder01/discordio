const express = require('express');
const {clientId, clientSecret} = require('../config/oauth')
const { URLSearchParams } = require('url');
const UserModel = require('../models/User');
const sha256 = require('crypto-js/sha256');

const router = express.Router();

router.get('/', (req, res) => {

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', req.query.code);
    params.append('redirect_uri', 'http://127.0.0.1:8000/discord/oauth');


    fetch('https://discord.com/api/v9/oauth2/token', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(
        response => response.json()
    )
    .then(
        data => {            
            const headers = {
                Authorization: `Bearer ${data.access_token}`
            }
            
            fetch('https://discord.com/api/v9/users/@me', {
                method: 'GET',
                headers: headers
            })
            .then(
                response => response.json()
            )
            .then(
                data => {
                    userQuery = UserModel.find({
                        discordId: Number(data.id)
                    });

                    userQuery.exec((err, user) => {
                        if (user.length == 0) {
                            let token = sha256(user.id);
                            req.session.token = token;
                            req.session.authenticated = true;

                            console.log(req.session);
                            
                            UserModel.create({
                                username: data.username,
                                discriminator: Number(data.discriminator),
                                discordId: Number(data.id),
                                token: token
                            });

                            req.session.save();

                        } else {
                            let token = user[0].token
                            req.session.token = token;
                            req.session.authenticated = true;

                            console.log(req.session);

                            req.session.save();
                        }
                    })
                }
            );
        }
    );

    res.redirect('/')
});

module.exports = router;
