"use strict";

var assert = require('assert');

module.exports = {
    findByHandle: (handle) => {
      GLOBAL.db.collection('users').findOne({handle: handle}, (err, result) => {
        assert.equal(err, null);
        return new Promise((resolve) => {
          resolve(result);
        });
      });
    },

    create: (handle, email, fullname, type) => {
      // type => "facebook", "google", "oauth" etc
      // also store creation time and signup mechanism
      GLOBAL.db.collection('users').insertOne({
        handle: handle,
        email: email,
        fullname: fullname,
        type: type
      }, (err, result) => {
        assert.equal(err, null);
        return new Promise(function(resolve) {
          resolve(result);
        });
      });
    }
};
