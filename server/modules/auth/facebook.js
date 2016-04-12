"use strict";

const Strategy = require('passport-facebook').Strategy;
const config = require('../../../config.js');


module.exports = function(app, passport) {
  passport.use(new Strategy({
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: 'http://localhost:8500/login/facebook/return',
      profileFields: ['id', 'emails', 'name']
    }, (accessToken, refreshToken, profile, cb) => {
      //TODO: associate profile with use in DB
      console.log('Got user profile:', profile);
      return cb(null, profile);
    }));

    app.get('/test', (req, res) => {
      res.send('<a href="/login/facebook"> Login with FB </a>');
    });


    app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/test' }), (req, res) => {
        res.redirect('/');
    });
};
