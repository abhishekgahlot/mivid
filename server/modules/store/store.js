"use strict";

var assert = require('assert');

module.exports = {
    findByAttribute: (collectionName, attributeName, queryValue) => {
      return new Promise((resolve) => {
        let findObj = {};
        findObj[attributeName] = queryValue;
        GLOBAL.db.collection(collectionName).findOne(findObj, (err, result) => {
          assert.equal(err, null);
          resolve(result);
        });
      });
    },

    create: (collectionName, data) => {
      return new Promise(function(resolve) {
        GLOBAL.db.collection(collectionName).insertOne(data, (err, result) => {
          assert.equal(err, null);
          resolve(result);
        });
      });
    }
};
