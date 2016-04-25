"use strict";

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

module.exports = {
  indexDocument: function(index, data) {
    return new Promise((resolve, reject) => {
      console.log('elasticsearch indexDocument called on ', data);
      client.create({
        index: index,
        type: 1,
        id: data.videoId,
        body: data
      }, (err, resp) => {
        if(!err) {
          console.log('Indexed into elasticsearch successfully', resp);
          resolve(resp);
        } else {
          console.log('Error indexing document into elasticsearch');
          reject(err);
        }
      });
    });
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
