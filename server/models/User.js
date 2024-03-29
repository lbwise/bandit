const { Schema, model } = require('mongoose');
const { instruments, genres } = require('../errorHandling/userSchemaOptions');

// mongoose schema for the User model
// includes name, date created, DOB, user location, instruments,
// preffered genres, liked users and matches (mutual likes)
const userSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	dateOfBirth: {
		type: Date,
		default: Date.now(),
	},
	location: {
		longitude: Number,
		latitude: Number,
	},
	instruments: {
		type: [String],
		required: true,
		enum: instruments,
	},
	genres: {
		type: [String],
		required: true,
		enum: genres,
	},
	skillLevel: {
		type: Number,
		min: 1,
		max: 10,
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	matches: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
});



module.exports = model('User', userSchema);