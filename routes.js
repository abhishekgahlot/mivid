"use strict";

const express = require('express');

const app = express();
const dbConnect = require('./server/dbConnect.js');

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


// const User = require('./modules/user/actions.js');

/*passport.serializeUser( (user, done) => {
  done(null, user.handle);
});

passport.deserializeUser( (handle, done) => {
  User.findByHandle(handle, (err, user) => {
    done(err, user);
  });
}); */

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

app.get('/video/:id', (req, res) => {
  const videoId = req.params.id;
  res.send({videoUrl: videoModule.getTempVideoUrl(videoId)});
});

app.get('/logout', function(req, res) {
  console.log('Logging out');
  req.logout();
  res.redirect('/test');
});

app.get('*', (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.render('main', {user: JSON.stringify(req.user)});
  } else {
    res.render('main', {user: JSON.stringify({})});
  }
});

dbConnect.connectToMongo().then(dbConnect.ensureIndex).then( () => {
  app.listen(process.env.port || 8500, () => {
    console.log('Listening on port 8500');
  });
});
