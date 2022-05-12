const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const { mongoURI } = require('./config/database');
const { authUrl } = require('./config/oauth');
const authenticate = require('./middlewares');
const api = require('./routes/api');
const discordOauth = require('./routes/discordoauth');

const app = express();
const store = new session.MemoryStore();

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

// Middlewares

app.use(express.json());
app.use(authenticate)


// Routes

app.use('/api', api);

app.use(
    session({
        secret: '!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNd',
        saveUninitialized: true,
        store: store,
        resave: true
    })
);

app.use('/discord/oauth/', discordOauth);

// Static & Templates

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/', (req, res) => {
    let session = req.session;

    res.render('index', {
        authUrl: authUrl,
        authenticated: session.authenticated,
        token: session.token
    });
})

app.listen(8000);