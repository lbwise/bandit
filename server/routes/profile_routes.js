const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const userSchema = require('../errorHandling/validationSchemas');
const AppError = require('../errorHandling/AppError');
const express = require('express');
const router = express.Router();


router.route('/:id')

	.get(asyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id)
		.populate('likes')
		.populate('matches');
		console.log(user);
		res.json(user);	
	}))

	.put(asyncHandler(async (req, res) => {
		updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
		res.redirect(`/profile/${updatedUser._id}`);
	}))

	.delete(asyncHandler(async (req, res) => {
		await User.findByIdAndDelete(req.params.id);
		res.redirect('/profile');
	}));



router.route('/')

	.get(asyncHandler(async (req, res) => {
		const users = await User.find({});
		res.json(users);
	}))

	.post(asyncHandler(async (req, res) => {
		userSchema.validate(req.body)
		alreadyUser = await User.find({ name: req.body.name });
		console.log(alreadyUser.length);
		if (alreadyUser.length != 0) {
			throw new AppError(401, 'User already exists');
		}
		user = new User(req.body);
		await user.save();
		res.redirect(`/profile/${user._id}`);
	}));


module.exports = router;