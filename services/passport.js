const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	let retrievedUser;
	try {
		retrievedUser = await User.findById(id);
	} catch(error) {
		throw(error);
	}
	
	done(null, retrievedUser);
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, async (accessToken, refreshToken, profile, done) => {
		let existingUser;
		try {
			existingUser = await User.findOne({googleId: profile.id});
		} catch(error) {
			throw(error);
		}
		
		if(existingUser) {
			done(null, existingUser);
		} else {
			let newUser;
			try {
				newUser = await new User({googleId: profile.id}).save();
			} catch(error) {
				throw(error);
			}
			
			done(null, newUser);
		}
	})
);