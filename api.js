"use strict";

// define api results that is to be used by angular

const searchModule = require('./server/modules/search/search.js');
const videoModule = require('./server/modules/video/actions.js');
const userModule = require('./server/modules/user/actions.js');

module.exports = function(app) {
  app.get('/api/user/:handle', (req, res) => {
    //return a user's information, for rendering profile pages
    let user;
    userModule.findByHandle(req.params.handle)
    .then((u) => {
       user = u;
       if(!user) {
         return res.send({user: null});
       }
       return videoModule.findByUser(user.handle);
    })
   .then((videos) => {
     console.log('Got query results', videos);
     user.uploads = videos;
     res.send({user: user});
   });
  });

  app.get('/api/video/:id', (req, res) => {
    const videoId = req.params.id;
    res.send({videoUrl: videoModule.getTempVideoUrl(videoId)});
  });

  app.get('/api/video/:id/upvote', (req, res) => {
    console.log('Got api call to upvote');
    videoModule.vote(req.params.id, 1)
    .then((result) => {
      console.log('Got promise resolved in api with', result);
      res.send('success ' + JSON.stringify(result));
    });
  });

  app.get('/api/video/:id/downvote', (req, res) => {
    videoModule.vote(req.params.id, -1)
    .then((result) => {
      console.log('Promise resolved for downvote with', result);
      res.send('success' + JSON.stringify(result));
    });
  });

  app.get('/api/videos/newest', (req, res) => {
    let pageNumber = req.query.page;
    if (!pageNumber) {
      pageNumber = 1;
    }
    console.log('Geting newest videos, pageNumber is', pageNumber);
    videoModule.fetchNewest(pageNumber)
    .then((videos) => {
      res.send(videos);
    });
  });

  app.get('/api/videos/', (req, res) => {
    res.send('Sending top videos');
  });

  app.post('/video-meta', (req, res) => {
    const videoMeta = req.body;
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

  app.post('/api/video/edit', (req, res) => {
    const videos = JSON.parse(req.body);
    let cnt = 0;
    videos.forEach((videoMeta) => {
      videoModule.update({guid: videoMeta.guid}, videos[cnt])
      .then(() => {
        cnt++;
      });
    });
    res.send({count: cnt});
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
