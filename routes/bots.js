var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send({
            hello: ''
        });
    })
    // .post((req, res) => {
    //     res.send('Create bot')
    // });

module.exports = router;