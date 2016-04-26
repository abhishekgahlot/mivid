"use strict";

const express = require('express');
const assert = require('assert');

const app = express();
const dbConnect = require('./dbConnect.js');
const aesEncrypt = require('./utils.js').aesEncrypt;


const makeUserSafe = require('./utils.js').makeUserSafe;
const validateHandle = require('./utils.js').validateHandle;

// app confiugration
const config = require('./config.js');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const exphbs = require('express-handlebars');

client.on('error', (err) => {
  console.log('Error', err);
});

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
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs',layoutsDir: __dirname + '/views/'}));
app.set('view engine', '.hbs');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

require('./server/modules/auth/facebook.js')(app, passport);
require('./server/modules/auth/google.js')(app, passport);

// modules
const videoModule = require('./server/modules/video/actions.js');
const userModule = require('./server/modules/user/actions.js');
const searchModule = require('./server/modules/search/search.js');

app.get('/video/:id', (req, res) => {
  const videoId = req.params.id;
  res.send({videoUrl: videoModule.getTempVideoUrl(videoId)});
});

app.get('/logout', function(req, res) {
  console.log('Logging out');
  req.logout();
  res.redirect('/test');
});

app.get('/createHandle', (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }
  console.log('Got Handle request', req.query.handle, "Current user handle", typeof req.user.handle);
  const handle = req.query.handle;
  if(!req.user.handle && validateHandle(handle)) {
    console.log('Handle successfully validated, generating auth token for the user');
    const authToken = aesEncrypt(JSON.stringify({email: req.user.email, handle: handle, timestamp: Date.now()}));
    userModule.update({email: req.user.email}, {handle: handle, authToken: authToken})
    .then((results) => {
      console.log('Updated user handle successfully', results);
      req.login(results, (err) => {
        assert.equal(err,null);
        res.redirect('/');
      });
    });
  } else if (!validateHandle(handle)) {
    res.redirect('/handle');
  }
  else {
    console.log('User has handle, redirecting to home page');
    res.redirect('/');
  }
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

app.get('/search', (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  const size = req.query.size;
  searchModule.search(query, page, size).then((data) => {
    console.log('Ran the search for', query,  "and got the results", data);
    res.send(data);
  });
});

app.get('*', (req, res) => {
  if (req.user) {
    res.render('main', {user: JSON.stringify(makeUserSafe(req.user))});
  } else {
    res.render('main', {user: JSON.stringify({})});
  }
});

dbConnect.connectToMongo().then(dbConnect.ensureIndex).then(() => {
  app.listen(process.env.port || 8500, () => {
    console.log('Listening on port 8500');
  });
});
