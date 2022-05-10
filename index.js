var express = require('express');

var app = express();

var api = require("./routes/api");

app.use('/api', api);

app.get('/', (req, res) => {

});

app.listen(8000);