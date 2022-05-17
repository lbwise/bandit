const Joi = require('joi');
const { genres, instruments } = require('./userSchemaOptions');

const userSchema = Joi.object({
	name: Joi.string()
		.alphanum()
		.required(),
	skillLevel: Joi.number()
		.min(1)
		.max(10)
		.required(),
	dateOfBirth: Joi.date().required(),
	location: Joi.object({
		longitude: Joi.number().required(),
		latitude: Joi.number().required(),
	}),
	genres: Joi.array().items(Joi.string().valid({...genres})),
	instrumnets: Joi.array().items(Joi.string().valid({...instruments})),
});

module.exports = userSchema;