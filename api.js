"use strict";

// define api results that is to be used by angular

const searchModule = require('./server/modules/search/search.js');
const videoModule = require('./server/modules/video/actions.js');

module.exports = function(app) {
  app.get('/api/video/:id', (req, res) => {
    const videoId = req.params.id;
    res.send({videoUrl: videoModule.getTempVideoUrl(videoId)});
  });

  app.get('/api/videos', (req, res) => {
    res.send('Got call to /api/videos');
  });

  app.post('/video-meta', (req, res) => {
    var videoMeta = req.body;
    console.log('Got video meta data', videoMeta);
    // write this to DB
    // index on elasticSearch
    videoModule.create(videoMeta)
    .then(() => {
      console.log('successfully created video in DB, adding to elasticSearch ');
      delete videoMeta._id;
      searchModule.indexDocument('video', videoMeta);
      res.send({state: "success"});
    });
  });


  app.get('/api/search', (req, res) => {
    const query = req.query.query;
    const page = req.query.page;
    const size = req.query.size;
    searchModule.search(query, page, size).then((data) => {
      console.log('Ran the search for', query,  "and got the results", data);
      res.send(data);
    });
  });
};
