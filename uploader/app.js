'use strict';

var express = require('express');
var app = express();
var multer  = require('multer');
var path = require('path');
var upload = multer({ dest: './uploads' });
var cors = require('cors');
var fs = require('fs');

var uploader = require('./uploader.js');
var config = require('./config.js');
var util = require('./util.js');
// const dbConnect = require('./dbConnect.js');

// Enable cors
app.use(cors());

app.post('/', upload.single('file'), function (req, res, next) {

  let user = JSON.parse(req.get('user'));

  if (!uploader.checkAuthorisation(user)) { res.status(401).end(); }
  if (!uploader.checkFile(req.get('content-length'))) { res.status(403).end(); }

  let dir = uploader.createDirectory(user);
  let size = util.convertToMB(req.get('content-length'));

  /*
    Move temporary file to user folder.
  */
  uploader.moveFile(req.file.path, req.file.originalname, user).then(function(data){
    if (Object.keys(data).length){
      let meta = uploader.pushmetaData(config.fileMeta, data, user, size);
      uploader.generateScreenshot(meta.access, meta.name).then(function(thumbnail){
        meta.thumbnails.push("/thumbnails/" + thumbnail);
        uploader.postMeta(config.metaurl, meta);
        res.send(200, meta).end();
      });
    }
  });

});

// dbConnect.connectToMongo().then(dbConnect.ensureIndex).then(() => {
  app.listen(8501, function () {
    console.log('Upload app running on %s', config.port);
  });
// });
