const mongoose = require('mongoose');
const logger = require('morgan')
const colors = require('colors')
const bodyParser = require('body-parser');
const session = require('express-session');
const profile_routes = require('./routes/profile_routes');
const match_routes = require('./routes/match_routes');
const entry_routes = require('./routes/entry_routes');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost:27017/bandit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(colors.yellow('DATABASE CONNECTED'));
    })
    .catch(err => {
        console.log(colors.red('ERROR: DATABASE CONNECTION'));
        console.log(err);
    });


const sessionOptions = {resave: true, saveUninitialized: true, secret: 'banditSessionSecret'}
app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/profile', profile_routes);
app.use('/match', match_routes);
// app.use('/', entry_routes)


app.get('/', (req, res) => {
	res.send('Tinder for Musicians');
});


app.get('*', (req, res) => {
    res.status(404).send(`404 - ${req.path} ROUTE NOT FOUND`);
});


app.use((err, req, res, next) => { 
    const { status, message } = err;
    res.send(message);
});


app.listen(3000, () => {
	console.log(colors.blue('LISTENING ON PORT 3000'));
});