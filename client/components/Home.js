/* jshint node:true */
"use strict";

const React = require('react');
const VideoThumbnail = require('./VideoThumbnail');

class Home extends React.Component {
	render() {
		return <VideoThumbnail/>;
	}
}

module.exports = Home;
