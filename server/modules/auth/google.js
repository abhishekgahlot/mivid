"use strict";
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../../config.js');
const makeUserSafe = require('../../../utils.js').makeUserSafe;

module.exports = function(app, passport) {
  passport.use(new GoogleStrategy({
    clientID: config.auth.google.id,
    clientSecret: config.auth.google.secret,
    callbackURL: 'http://localhost:8500/login/google/return',
    profileFields: ['id', 'emails', 'name']
  }, (accessToken, refreshToken, profile, cb) => {
    require('./oAuthExternal.js')(accessToken, refreshToken, profile, cb, 'google');
  }));

  app.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

  app.get('/login/google/return', passport.authenticate('google', {failureRedirect: '/login' }), (req, res) => {
    const resObj = {user: JSON.stringify(makeUserSafe(req.user))};
    res.render('main', resObj);
  });
};
