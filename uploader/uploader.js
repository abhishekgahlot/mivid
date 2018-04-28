'use strict';

var fs = require('fs');
var path = require('path');
var config = require('./config.js');
var util = require('./util.js');
var request = require('request');
var imagick = require('imagemagick');
var ffmpeg = require('fluent-ffmpeg');
var ffmpegcommand = ffmpeg();

var uploader = {

    /*
      Generate random guid with complexity 2^122
    */
    uuid: function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                  var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                  return v.toString(16);
                });
    },

    /*
      Check if username is there or token is encryptable.
    */
    checkAuthorisation: function(user){
        if(!user.handle || util.AESDecrypt(user.authToken).handle !== user.handle){
            return false;
        }else{
            return true;
        }
    },

    /*
      Check file size using header length.
    */
    checkFile: function(headers){
        if(util.convertToMB(headers) < config.sizelimit){
            return true;
        }else {
            return false;
        }
    },

    /*
      Create directory with username inside uploads folder.
    */
    createDirectory: function(user){
        if (!user.handle) return false;
        var dir = config.dir + user.handle;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        return dir;
    },

    /*
      Stream upload to file writable stream and for now doesn't accept multiparts.
    */
    moveFile: function(oldPath, filename, user){
        return new Promise(function(resolve){
          let uuid = uploader.uuid();
          let newPath = 'uploads/' + user.handle + '/' + uuid + path.extname(filename);
          console.log("filename", uuid);
          fs.rename(oldPath, newPath, function(){
            resolve({filename: filename, path: newPath, uuid: uuid});
          });
        });
    },

    /*
      Handle the filemeta data modifies parameter and yield to main app.
    */
    pushmetaData: function(fileMeta, data, user, size){
        let meta = JSON.parse(JSON.stringify(fileMeta));
        meta.name = data.uuid;
        meta.size = size;
        meta.handle = user.handle;
        meta.title = data.filename;
        meta.access = data.path;
        meta.email = user.email;
        return meta;
    },

    /*
      Post data to video-meta internal api.
    */
    postMeta: function (url, meta){
      console.log(meta)
        return request.post(url, {form:meta});
    },

    /*
     This generated thumbnail of various sizes reading from stream.
    */
    generateScreenshot: function (filepath, filename){
      let randomSecond = Math.random().toFixed(2)*99 + "%";
      console.log(randomSecond, filepath, filename);
      return new Promise(function(resolve, reject){
          ffmpeg(filepath).screenshots({
          	timestamps: [randomSecond],
          	filename: filename + '.jpg',
          	folder: 'thumbnails',
          }).on('error', function(err) {
            reject(err);
            console.log(err);
          })
          .on('end', function() {
            resolve(filename + '.jpg');
            console.log("generated");
          });
      });
    },

    /*
      Generate thumbnail from imagick.
    */
    generateThumbnails: function(filepath){

    }
};

module.exports = uploader;
