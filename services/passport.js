const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	let retrievedUser = await User.findById(id);
	done(null, retrievedUser);
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, async (accessToken, refreshToken, profile, done) => {
		let existingUser = await User.findOne({googleId: profile.id});
		if(existingUser) {
			done(null, existingUser);
		} else {
			let newUser = await new User({googleId: profile.id}).save();			
			done(null, newUser);
		}
	})
);