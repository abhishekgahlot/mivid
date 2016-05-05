"use strict";
/* jshint expr:true */
const aesEncrypt = require('../../../utils.js').aesEncrypt;
const store = require('../store/store.js');
const config = require('../../../config.js');

let self;

module.exports = self = {

  fetchNewest: (pageNumber) => {
    return store.find('videos', pageNumber, {creationTime: -1});
  },

  fetchTop: (pageNumber) => {
    return store.find('videos', pageNumber, {score: -1});
  },

  findById: (videoId) => {
    console.log('Got query for finding video by id', videoId);
    return store.findOneByAttribute('videos', 'videoId', videoId);
  },

  vote: (videoId, vote) => {
    console.log('videoModule.vote called');
    //authorise vote: see if user has already voted, don't allow creator to vote
    //compute score and increment upvote/downvote count
    const gravity = config.ranking.gravity;
    return new Promise((resolve) => {
      self.findById(videoId)
      .then((videoMeta) => {
        (vote === 1) ? videoMeta.upvotes++ : videoMeta.downvotes++;
        console.log('Found video meta for upvoted video', videoMeta);
        console.log('Gravity is', gravity);
        resolve(videoMeta);
      });
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
    if (!metaData.score) {
      metaData.score = 0;
      metaData.upvotes = 0;
      metaData.downvotes = 0;
    }
    metaData.creationTime = Date.now();
    console.log('Storing video metatdata to DB', metaData);
    return store.create('videos', metaData);
  },

  update: (query, attributes) => {
    return store.update('videos', query, attributes);
  }
};
