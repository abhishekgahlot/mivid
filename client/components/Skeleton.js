// This is the skeleton component for the app
"use strict";
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('./Navigation.js');

var Skeleton = React.createClass({
	render: function() {
		return(<div>
			<div class="row">
				<Navigation></Navigation>
			</div>
			<div class="row">
				<RouteHandler></RouteHandler>
			</div>
		</div>);
	}
});

module.exports = Skeleton;
