const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const userSchema = require('../errorHandling/validationSchemas');
const AppError = require('../errorHandling/AppError');
const express = require('express');
const router = express.Router();

// router architecture for /profile/:id requests
router.route('/:id')

	// GET request responds with a users infomation including likes and matches
	.get(asyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id)
		.populate('likes')
		.populate('matches');
		console.log(user);
		res.json(user);	
	}))

	// PUT request updates a users profile and thier infomation
	.put(asyncHandler(async (req, res) => {
		updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
		res.redirect(`/profile/${updatedUser._id}`);
	}))

	// DELETE requests removes a user from the database
	// ** DB middleware to update other users with deleted user info needs to be added **
	.delete(asyncHandler(async (req, res) => {
		await User.findByIdAndDelete(req.params.id);
		res.redirect('/profile');
	}));


// router architecture for /profile requests
router.route('/')

	// GET request responds with a non-verbose array of all users
	.get(asyncHandler(async (req, res) => {
		const users = await User.find({});
		res.json(users);
	}))

	// POST request creates a new user after validating the schema and adds to the DB
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