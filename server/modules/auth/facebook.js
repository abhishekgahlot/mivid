"use strict";

const Strategy = require('passport-facebook').Strategy;
const config = require('../../../config.js');
const makeUserSafe = require('../../../utils.js').makeUserSafe;

module.exports = function(app, passport) {
  passport.use(new Strategy({
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: 'http://localhost:8500/login/facebook/return',
      profileFields: ['id', 'emails', 'name']
    }, (accessToken, refreshToken, profile, cb) => {
      require('./oAuthExternal.js')(accessToken, refreshToken, profile, cb, 'facebook');
    }));

    app.get('/test', (req, res) => {
      res.send('<a href="/login/facebook"> Login with FB </a>  || <a href="/login/google"> Login with Google </a> ');
    });


    app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/test' }), (req, res) => {
        const resObj = {user: JSON.stringify(makeUserSafe(req.user))};
        res.render('main', resObj);
    });
};
