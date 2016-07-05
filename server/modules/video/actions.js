"use strict";
/* jshint expr:true */
const aesEncrypt = require('../../../utils.js').aesEncrypt;
const store = require('../store/store.js');
const mongo = require('mongodb');

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
    // authorise vote: see if user has already voted, don't allow creator to vote
    // compute score and increment upvote/downvote count
    // the score is computed using reddit's ranking alogritm

    console.log('videoModule.vote called');
    return new Promise((resolve) => {
      self.findById(videoId)
      .then((videoMeta) => {
        console.log('Video Meta is ', videoMeta);

        if (!videoMeta.upvotes) {
          videoMeta.upvotes = 0;
        }
        if (!videoMeta.downvotes) {
          videoMeta.downvotes = 0;
        }

        (vote === 1) ? videoMeta.upvotes++ : videoMeta.downvotes++;
        const ts = videoMeta.creationTime - new Date('12/08/2005 07:46:00').valueOf();
        const votes = videoMeta.upvotes - videoMeta.downvotes;
        let y, z;
        if (votes > 0) {
          y = 1;
        } else if (votes < 0) {
          y = -1;
        } else {
          y = 0;
        }
        if (Math.abs(votes) >= 1) {
          z = Math.abs(votes);
        } else {
          z = 1;
        }
        const score = Math.log10(z) + ((y * ts) / 45000);
        console.log('Score is ', score);
        // TODO: update videoMeta with new score, upvote/downvote count and write to DB
        videoMeta.score = score;
        const o_id = new mongo.ObjectID(videoMeta._id);
        self.update({'_id': o_id}, videoMeta)
        .then(() => {
          resolve(videoMeta);
        });
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
