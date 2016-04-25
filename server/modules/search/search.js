"use strict";

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

module.exports = {
  indexDocument: function(data) {
  },
  search: function(query) {
    return new Promise((resolve) => {
      client.search({
        q: query
      }).then(function (body) {
        var hits = body.hits.hits;
        resolve(hits);
      }, function (error) {
        console.trace(error.message);
      });
    });
  }
};
