"use strict";

var assert = require('assert');

module.exports = {
    find: (collectionName, pageNumber = 1, sort = {}, limit = 30) => {
      // uses sort functionality to sort by either Time (for newest videos) or by score (for generating trending vidoes)
      return new Promise((resolve) => {
        const skip = (pageNumber > 0) ? ((pageNumber - 1) * limit) : 0;
        console.log("In store.find: skip, limit, sort are:", skip, limit, sort);
        const cursor = GLOBAL.db.collection(collectionName).find().skip(skip).limit(limit).sort(sort);
        let results = [];
        cursor.each((err, doc) => {
          assert.equal(err, null);
          if(doc !== null) {
            results.push(doc);
          } else {
            resolve(results);
          }
        });
      });
    },

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

    findByAttribute: (collection, attributeName, queryValue, pageNumber = 1, sort = {}, limit = 30) => {
       return new Promise((resolve) => {
         let findObj = {};
         findObj[attributeName] = queryValue;
         const skip = (pageNumber > 0) ? ((pageNumber - 1) * limit) : 0;
         const cursor = GLOBAL.db.collection(collection).find(findObj).skip(skip).limit(limit).sort(sort);
         let results = [];
         cursor.each((err, doc) => {
           assert.equal(err, null);
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
