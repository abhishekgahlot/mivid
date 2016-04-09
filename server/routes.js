"use strict";

const express = require('express');

const app = express();


// modules
const videoModule = require('./modules/video/actions.js');

app.get('/', (req, res) => {
  const pageNumber = req.query.page || 0;
  console.log('Executing fetch for pageNumber', pageNumber);
  videoModule
    .fetchList(pageNumber)
    .then((videoList) => {
      res.send(videoList);
    });
});

app.get('/video/:id', (req, res) => {
  const videoId = req.params.id;
  res.send({videoUrl: videoModule.getTempVideoUrl(videoId)});
});

console.log('Hello World');

app.listen(process.env.port || 8500, () => {
  console.log('Listening on port 8500');
});
