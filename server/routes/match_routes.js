const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const isMatch = require('../matching/matchAlgo');
const express = require('express');
const router = express.Router();


const checkMakeMatch = (user1, user2) => {
	return user1.likes.includes(user2._id) && !user1.matches.includes(user2._id) && !user2.matches.includes(user1._id)
}

const createMatch = (user, likedUser) => {
	const likedUserIndex = user.likes.indexOf(likedUser._id);
	user.likes.splice(likedUserIndex, 1);
	likedUser.matches.push(user._id);
	user.matches.push(likedUser._id);
}

const getReccomendations = (thisUser, allUsers) => {
	const matches = []
	for (let otherUser of allUsers) {
		if (isMatch(thisUser, otherUser) && thisUser._id.toString() != otherUser._id.toString()) {
			matches.push(otherUser);
		}
	}
	return matches
}

const getLikes = user => {
	const likes = []
	for (let like of user.likes) {
		likes.push(like);
	}
	return likes;
}

router.route('/:id')

	.get(asyncHandler(async (req, res) => {
		const thisUser = await User.findById(req.params.id);
		const users = await User.find({});
		recommends = getReccomendations(thisUser, users);
		res.json(recommends);
	}))

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


router.get('/:id/likes', async (req, res) => {
	const user = await User.findById(req.params.id);
	likes = getLikes(user);
	res.json(likes);
});


module.exports = router;