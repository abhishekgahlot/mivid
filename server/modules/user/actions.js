"use strict";

var assert = require('assert');

module.exports = {
    findByEmail: (email) => {
      return new Promise((resolve) => {
        GLOBAL.db.collection('users').findOne({email: email}, (err, result) => {
          assert.equal(err, null);
          console.log('Result of findByEmail', email, result);
          resolve(result);
        });
      });
    },

    findByHandle: (handle) => {
      return new Promise((resolve) => {
        GLOBAL.db.collection('users').findOne({handle: handle}, (err, result) => {
          assert.equal(err, null);
          resolve(result);
        });
      });
    },

    create: (handle, email, fullname, type) => {
      // type => "facebook", "google", "local" etc
      // also store creation time and signup mechanism
      return new Promise(function(resolve) {
        GLOBAL.db.collection('users').insertOne({
          handle: handle,
          email: email,
          fullName: fullname,
          type: type
        }, (err, result) => {
          assert.equal(err, null);
          resolve(result);
        });
      });

    }
};
