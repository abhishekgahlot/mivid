"use strict";

const aesEncrypt = require('../../../utils.js').aesEncrypt;
const store = require('../store/store.js');

module.exports = {

  fetchNewest: (pageNumber) => {
    return store.find('videos', pageNumber, {creationTime: -1});
  },

  fetchTop: (pageNumber) => {
    return store.find('videos', pageNumber, {score: -1});
  },

  findByGuid: (guid) => {
    console.log('Got query for finding video by guid', guid);
    return store.findOneByAttribute('videos', 'guid', guid);
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
  },

  update: (query, attributes) => {
    return store.update('videos', query, attributes);
  }
};
