"use strict";
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../../config.js');
const User = require('../user/actions.js');

module.exports = function(app, passport) {
  passport.use(new GoogleStrategy({
    clientID: config.auth.google.id,
    clientSecret: config.auth.google.secret,
    callbackURL: 'http://localhost:8500/login/google/return',
    profileFields: ['id', 'emails', 'name']
  }, (accessToken, refreshToken, profile, cb) => {
    console.log('Google login successful', profile);
    User
      .findByEmail({email: profile.emails[0].value})
      .then(function(user) {
        if(user) {
          //user exisits, get details and log him in
        } else {
          //create new user.
        }
      });
    return cb(null, profile);
  }));

  app.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

  app.get('/login/google/return', passport.authenticate('google', {failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });

};
