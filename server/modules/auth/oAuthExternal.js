"use strict";

const User = require('../user/actions.js');

module.exports = function(accessToken, refreshToken, profile, cb, type) {
  User
    .findByEmail(profile.emails[0].value)
    .then(function(user) {
      if(user) {
        //user exisits, get details and log him in
        console.log('User exists ', user);
        return cb(null, user);
      } else {
        //create new user.
        console.log('New user');
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName || "";
        const middleName = profile.name.middleName || "";
        const lastName = profile.name.familyName || "";
        let fullName = "";
        [firstName, middleName, lastName].forEach((namePart) => {
          if(namePart !== "") {
            fullName += namePart + " ";
          }
        });
        console.log('User profile ', email, fullName);
        User.create("", email, fullName, type)
          .then(() => {
            console.log('User account created');
            return cb(null, {
              handle: "",
              email: email,
              fullName: fullName,
              type: type
            });
          });
      }
    });
};
