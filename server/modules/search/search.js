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
  search: function(query, page, size) {
    // start -> starting index, size -> count of results returned.
    size = size || 30; //default number of results
    if (size > 50) { // don't DDoS by requesting more than 50 results at a time
      size = 30;
    }
    if (!page) {
      page = 0;
    } else {
      page = page - 1;
    }
    console.log('Page #', page, "size", size);
    return new Promise((resolve) => {
      client.search({
        q: query,
        from: page,
        size: size
      }).then(function (body) {
        var hits = body.hits.hits;
        resolve(hits);
      }, function (error) {
        console.trace(error.message);
      });
    });
  }
};
