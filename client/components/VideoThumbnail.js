const React = require('react');

class VideoThumbnail extends React.Component {
	render() {
		return (
			<div className="col-xs-6 col-md-3">
				<div href="#" className="thumbnail">
					<a href="#">
						<img
							src={this.props.src}
							alt="..." />
					</a>
					<div className="caption">
						<a href="#"> <p> {this.props.title} </p> </a>
						<p>
							<span> Views: {this.props.viewCount} </span>
							<span className="pull-right"> Points: {this.props.points} </span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = VideoThumbnail;
