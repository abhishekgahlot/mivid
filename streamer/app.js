"use strict";

const express = require('express');

const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('test'));
app.use("/uploads", express.static('../uploader/uploads'));

app.get('/', (req, res) => {
  res.send('Hello from Streamer');
});

app.get('/stream', (req, res) => {
  const pathToVideo = path.resolve(__dirname, 'videos', 'video.mkv');
  console.log('GOt req to stream', pathToVideo);
  fs.stat(pathToVideo, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          console.log('File not found!');
          return res.sendStatus(404);
        }
        res.end(err);
      }
      const range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      const positions = range.replace(/bytes=/, "").split("-");
      const start = parseInt(positions[0], 10);
      const total = stats.size;
      const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mkv"
      });

      const stream = fs.createReadStream(pathToVideo, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
});

app.get('/streamer/:username/:vid', (req, res) => {
  const pathToVideo = path.resolve(__dirname, '../uploader/uploads/'+req.params.username+'/', req.params.vid);
  console.log('GOt req to stream', pathToVideo);
  fs.stat(pathToVideo, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          console.log('File not found!');
          return res.sendStatus(404);
        }
        res.end(err);
      }
      const range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      const positions = range.replace(/bytes=/, "").split("-");
      const start = parseInt(positions[0], 10);
      const total = stats.size;
      const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      const stream = fs.createReadStream(pathToVideo, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
});

app.listen(process.env.port || 8599, () => {
  console.log('Listening on port 8599');
});
