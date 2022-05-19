var express = require('express');

var bots = require('./bots')
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        version: '1.0',
    });
});

router.use('/bots', bots);

module.exports = router;
