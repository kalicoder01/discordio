const express = require('express');
const { rateLimit } = require('express-rate-limit');
const BotModel = require('../models/Bot');
const UserModel = require('../models/User');
const { addBotMessage } = require('../bot/client');

const router = express.Router();
const { header, body, validationResult } = require('express-validator');


router.route('/')
    .get((req, res) => {
        BotModel.find().lean().exec((err, bots) => {
            console.log(bots);
            res.json(bots);
        });
    })
    .post(
        body('username').isString(),
        body('tag').isInt(),
        body('discordId').isInt().isLength({ min: 18 , max: 18 }),
        body('prefix').isString(),
        // rateLimit({
        //     windowMs: 10 * 60 * 1000, 
        //     max: 1,
        //     standardHeaders: true, 
        //     legacyHeaders: false, 
        //     message: {
        //         code: 42901,
        //         errors: ['Rate limit']
        //     },
        //     skipFailedRequests: true
        // }),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 40001,
                    errors: errors.array()
                });
            }

            const { username, tag, discordId, prefix } = req.body;

            console.log(discordId);

            BotModel.find({
                discordId: Number(discordId)
            }).exec((err, bots) => {
                console.log(bots);
                if (bots.length == 0) {
                    BotModel.create({
                        username: username,
                        tag: tag,
                        discordId: discordId,
                        prefix: prefix,
                        owner: req.user,
                        verified: false
                    });

                    addBotMessage(username);

                    res.json({
                        username: username,
                        tag: tag,
                        discordId: discordId,
                        prefix: prefix,
                        owner: `${req.user.username}#${req.user.discriminator}`,
                        verified: false
                    });

                } else {
                    res.json({
                        code: 40002,
                        errors: ['Bot with this ID already exists']
                    });
                }
            });
        }
    );

module.exports = router;