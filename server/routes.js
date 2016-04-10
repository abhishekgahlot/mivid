"use strict";

const express = require('express');

const app = express();
const dbConnect = require('./dbConnect.js');

// app confiugration
const config = require('../config.js');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

/* passport.serializeUser(function(user, done) {
  done(null, user.handle);
});

passport.deserializeUser(function(id, done) {
  User.findByHandle(handle, function(err, user) {
    done(err, user);
  });
}); */

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

dbConnect.connectToMongo().then(dbConnect.ensureIndex).then(function() {
  app.listen(process.env.port || 8500, () => {
    console.log('Listening on port 8500');
  });
});
