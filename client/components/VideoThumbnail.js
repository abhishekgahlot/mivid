const React = require('react');

class VideoThumbnail extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-xs-6 col-md-3">
					<div href="#" className="thumbnail">
						<a href="#">
							<img
								src="http://cdn.shopify.com/s/files/1/0224/1915/files/bunny.jpg?22110"
								alt="..." />
						</a>
						<div className="caption">
							<a href="#"> <p>Best Bunny video ever!</p> </a>
							<p>
								<span> Views (1257) </span>
								<span className="pull-right"> Points (257) </span>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = VideoThumbnail;
