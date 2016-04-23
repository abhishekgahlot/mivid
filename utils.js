"use strict";

module.exports = {
  makeUserSafe: (user) => {
    // make User object safe by whitelisting attributes.
    let safeUser = {};
    const safeKeys = ['handle', 'fullName', 'email'];

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
  }
};
