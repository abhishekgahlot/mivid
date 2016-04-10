"use strict";

const express = require('express');

const app = express();

// app confiugration
const config = require('../config.js');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require('body-parser');

const redisOptions = {
  host: config.redis.host,
  port: config.redis.port,
  client: client
};

app.use(session({
  store: new RedisStore(redisOptions),
  secret: config.redis.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
