// Importing in dependencies and packages
const logger = require('morgan')
const colors = require('colors')
const bodyParser = require('body-parser');
const session = require('express-session');
const profile_routes = require('./routes/profile_routes');
const match_routes = require('./routes/match_routes');
const entry_routes = require('./routes/entry_routes');
const connectDB = require('./config/connectDB');
const express = require('express');
const app = express();

// Configures database
connectDB();

// Session settings
const sessionOptions = {resave: true, saveUninitialized: true, secret: 'banditSessionSecret'}
app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/profile', profile_routes);
app.use('/match', match_routes);

// Home route
app.get('/', (req, res) => {
	res.send('Tinder for Musicians');
});

// Matches all missing routes and replys with a 404 error
app.get('*', (req, res) => {
    res.status(404).send(`404 - ${req.path} ROUTE NOT FOUND`);
});

// Error handler
app.use((err, req, res, next) => { 
    const { status, message } = err;
    res.send(message);
});

// Connects the server to port 3000
app.listen(3000, () => {
	console.log(colors.blue('LISTENING ON PORT 3000'));
});