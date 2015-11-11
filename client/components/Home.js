/* jshint node:true */
"use strict";

const React = require('react');
const VideoThumbnail = require('./VideoThumbnail');

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			videoStats: [
				{title: "Best Bunny Video ever!", viewCount: 2000, points: 100, src: "http://cdn.shopify.com/s/files/1/0224/1915/files/bunny.jpg?22110"},
				{title: "Hello!", viewCount: 1000, points: 90, src: "http://cdn.shopify.com/s/files/1/0224/1915/files/bunny.jpg?22110"}]
		};
	}

	render() {
		const videoStats = this.state.videoStats.map(function(video, i) {
			return <VideoThumbnail
				title={video.title}
				viewCount={video.viewCount}
				points={video.points}
				src={video.src}
				key={i}>
			</VideoThumbnail>;
		});

		return <div className="row">{videoStats}</div>;
	}
}

module.exports = Home;
