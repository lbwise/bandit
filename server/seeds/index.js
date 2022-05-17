const mongoose = require('mongoose');
const colors = require('colors');
const User = require('../models/User');
const seedData = require('./seedData');


mongoose.connect('mongodb://localhost:27017/bandit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(colors.yellow('DATABASE CONNECTED'));
    })
    .catch(err => {
        console.log(colors.red('ERROR: DATABASE CONNECTION'));
        console.log(err);
    });

const insertSeedData  = async data => {
	await User.deleteMany({});
	const users = User.insertMany(data)
	.then(out => {
		console.log(out);
		console.log(colors.green('SUCCESFUL INSERTION'));
	})
	.catch(e => {
		console.log(colors.red(`ERROR: [${e}]`));
		console.log(colors.red('INSERTION UNSUCCESFUL'));
	});
}

insertSeedData(seedData.data);