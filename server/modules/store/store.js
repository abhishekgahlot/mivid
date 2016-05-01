"use strict";

var assert = require('assert');

module.exports = {
    findOneByAttribute: (collectionName, attributeName, queryValue) => {
      return new Promise((resolve) => {
        let findObj = {};
        findObj[attributeName] = queryValue;
        console.log('In store, queryValue', queryValue);
        GLOBAL.db.collection(collectionName).findOne(findObj, (err, results) => {
          assert.equal(err, null);
          resolve(results);
        });
      });
    },

    findByAttribute: (collection, attributeName, queryValue) => {
       return new Promise((resolve) => {
         let findObj = {};
         findObj[attributeName] = queryValue;
         const cursor = GLOBAL.db.collection(collection).find(findObj);
         let results = [];
         cursor.each((err, doc) => {
           assert.equal(err, null);
           console.log('Doc is ', doc);
           if(doc !== null) {
             results.push(doc);
           } else {
             resolve(results);
           }
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
