"use strict";

const aesEncrypt = require('../../../utils.js').aesEncrypt;
const store = require('../store/store.js');

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

  findByUser: (handle) => {
    console.log('Got query for ', handle);
    // TODO change findOne to find to return all uploads
    return store.findByAttribute('videos', 'user', handle);
  },

  getTempVideoUrl: (videoId) => {
    //create the temporary video url using AES CTR encryption, send to client
    const timestamp = Date.now();
    const text = videoId + ":" + timestamp;

    return "/" + aesEncrypt(text);
  },

  create: (metaData) => {
    metaData.creationTime = Date.now();
    console.log('Storing video metatdata to DB', metaData);
    return store.create('videos', metaData);
  }
};
