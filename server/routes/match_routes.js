const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const isMatch = require('../matching/matchAlgo');
const express = require('express');
const router = express.Router();

// returns bool denoting if two users have liked each other
const checkMakeMatch = (user1, user2) => {
	return user1.likes.includes(user2._id) && !user1.matches.includes(user2._id) && !user2.matches.includes(user1._id)
}

// creates a match of two users on each others profiles
const createMatch = (user, likedUser) => {
	const likedUserIndex = user.likes.indexOf(likedUser._id);
	user.likes.splice(likedUserIndex, 1);
	likedUser.matches.push(user._id);
	user.matches.push(likedUser._id);
}

// returns an array of reccomended matches for a user
const getReccomendations = (thisUser, allUsers) => {
	const matches = []
	for (let otherUser of allUsers) {
		if (isMatch(thisUser, otherUser) && thisUser._id.toString() != otherUser._id.toString()) {
			matches.push(otherUser);
		}
	}
	return matches
}

// router architecture for all match/:id requests
router.route('/:id')

	// GET request finds user and responds with reccomendations
	.get(asyncHandler(async (req, res) => {
		const thisUser = await User.findById(req.params.id);
		const users = await User.find({});
		recommends = getReccomendations(thisUser, users);
		res.json(recommends);
	}))

	// POST request sends like to user, if mutual like creates a match
	.post(asyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		const likedUser = await User.findById(req.body.matchId);
		if (checkMakeMatch(user, likedUser)) {
			createMatch(user, likedUser);
		} else if (!likedUser.likes.includes(user._id)) {
			likedUser.likes.push(req.params.id)
		}
		await likedUser.save();
		await user.save();
		res.redirect(`/match/${likedUser._id}`);
	}));

// GET route for match/:id/likes - sends the users own likes from other users
router.get('/:id/likes', async (req, res) => {
	const user = await User.findById(req.params.id);
	res.json(user.likes);
});


module.exports = router;