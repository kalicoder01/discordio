const express = require('express');
const { rateLimit } = require('express-rate-limit');
const BotModel = require('../models/Bot');
const UserModel = require('../models/User');


const router = express.Router();
const { header, body, validationResult } = require('express-validator');


router.route('/')
    .get((req, res) => {
        res.send({
            hello: ''
        });
    })
    .post(
        body('username').isString(),
        body('tag').isInt(),
        body('discordId').isInt().isLength({ min: 18 , max: 18 }),
        body('prefix').isString(),
        // header('Authroziation').custom(value => {

        // }),
        rateLimit({
            windowMs: 10 * 60 * 1000, 
            max: 1,
            standardHeaders: true, 
            legacyHeaders: false, 
            message: 'RATE LIMIT',
            skipFailedRequests: true
        }),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 40001,
                    errors: errors.array()
                });
            }

            const { name, tag, discordId, prefix } = req.body;

            console.log(name);
            console.log(tag);

            // if (name && tag && discordId && prefix) {
            //     BotModel({
            //         name: req.user.name,
        
            //     })
            // } else {
            //     res.status(400).send({
            //         code: 40001,
            //         error: 'No auth token'
            //     });
            // }
            res.send('123');

        }
    );

module.exports = router;