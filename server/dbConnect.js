"use strict";
var url = 'mongodb://localhost:27017/mivid';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = {
  connectToMongo: function() {
    return new Promise(function(resolve) {
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        console.log('Connected to MongoDB');
        GLOBAL.db = db;
        resolve(db);
      });
    });
  },
  ensureIndex: function() {
    return new Promise(function(resolve) {
      GLOBAL.db.collection('users').createIndex({'handle': 1}, null, function(err, results) {
        assert.equal(null, err);
        console.log('Set indexes on Mongo');
        resolve(results);
      });
    });
  }
};
