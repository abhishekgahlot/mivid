"use strict";

const store = require('../store/store.js');
const aesEncrypt = require('../../../utils.js').aesEncrypt;

module.exports = {
    findByEmail: (email) => {
      return store.findByAttribute('users','email', email);
    },

    findByHandle: (handle) => {
      return store.findByAttribute('users', 'handle', handle);
    },

    create: (handle, email, fullname, type) => {
      // type => "facebook", "google", "local" etc
      // also store creation time and signup mechanism
      const authToken = aesEncrypt(JSON.stringify({email: email, timestamp: Date.now()}));
      const userData = {
        handle: handle,
        email: email,
        fullName: fullname,
        type: type,
        authToken: ""
      };
      return store.create('users', userData);
    },

    update: (query, attributes) => {
      return store.update('users', query, attributes);
    }
};
