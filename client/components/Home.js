/* jshint node:true */
"use strict";

const React = require('react');
const VideoThumbnail = require('./VideoThumbnail');

class Home extends React.Component {
	render() {
		return (<div class="row">
			<VideoThumbnail></VideoThumbnail>
			<VideoThumbnail></VideoThumbnail>
			<VideoThumbnail></VideoThumbnail>
			<VideoThumbnail></VideoThumbnail>
			<VideoThumbnail></VideoThumbnail>
			<VideoThumbnail></VideoThumbnail>
		</div>);
	}
}

module.exports = Home;
