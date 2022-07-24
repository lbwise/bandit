const mongoose = require('mongoose')
const colors = require('colors')

const connect = () => {
	mongoose.connect('mongodb://localhost:27017/bandit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(colors.yellow('DATABASE CONNECTED'));
    })
    .catch(err => {
        console.log(colors.red('ERROR: DATABASE CONNECTION'));
        console.log(err);
    });
} 

module.exports = connect