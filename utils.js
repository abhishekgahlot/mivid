"use strict";
const crypto = require('crypto');
const config = require('./config.js');
const assert = require('assert');

module.exports = {
  makeUserSafe: (user) => {
    // make User object safe by whitelisting attributes.
    let safeUser = {};
    const safeKeys = ['handle', 'fullName', 'email', 'authToken'];

    safeKeys.forEach((key) => {
      safeUser[key] = user[key];
    });
    return safeUser;
  },
  validateHandle: (handle) => {
    // TODO: write this logic
    if (handle.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  aesEncrypt: (string) => {
    assert.equal(typeof string, "string");

    const password = config.aesPassword;
    const algorithm = 'aes-256-ctr';

    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(string, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
  }
};
