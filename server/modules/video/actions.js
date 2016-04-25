"use strict";

const aesEncrypt = require('../../../utils.js').aesEncrypt;

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

    return "/" + aesEncrypt(text);
  },

  upLoad: () => {

  }
};
