"use strict";

var assert = require('assert');

module.exports = {
    findByAttribute: (collectionName, attributeName, queryValue) => {
      return new Promise((resolve) => {
        let findObj = {};
        findObj[attributeName] = queryValue;
        GLOBAL.db.collection(collectionName).findOne(findObj, (err, results) => {
          assert.equal(err, null);
          resolve(results);
        });
      });
    },

    create: (collectionName, data) => {
      return new Promise(function(resolve) {
        GLOBAL.db.collection(collectionName).insertOne(data, (err, results) => {
          assert.equal(err, null);
          resolve(results);
        });
      });
    },

    update: (collectionName, query, attributes) => {
      return new Promise((resolve) => {
        const obj = {
          //$currentDate: { "lastModified": true }
        };
        obj.$set = attributes;
        GLOBAL.db.collection(collectionName).findAndModify(query, [], obj, {new: true}, (err, doc) => {
          assert.equal(err, null);
          console.log('Update called on store, updated object', doc.value);
          resolve(doc.value);
        });
      });
    }
};
