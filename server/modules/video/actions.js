"use strict";

const config = require('../../../config.js');
var crypto = require('crypto');

module.exports = {

  fetchList: (pageNumber) => {
    console.log('Requested for trending vidoes, page', pageNumber);
    return new Promise((resolve) => {
      resolve([{
        id: 'video id',
        thumbnail: 'video thumbnail',
        title: 'video title'
      }]);
    });
  },

  getTempVideoUrl: (videoId) => {
    //create the temporary video url using AES CTR encryption, send to client
    const timestamp = Date.now();
    const text = videoId + ":" + timestamp;

    const password = config.aesPassword;
    const algorithm = 'aes-256-ctr';

    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return "/" + crypted;
  },

  upLoad: () => {

  }
};
