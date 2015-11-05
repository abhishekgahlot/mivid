/* jshint node:true */
"use strict";

const React = require('react');
const RouteHandler = require('react-router').RouteHandler;
const Navigation = require('./Navigation.js');

class Skeleton extends React.Component {
	render() {
		return(<div>
			<Navigation></Navigation>
			<RouteHandler></RouteHandler>
		</div>);
	}
}

module.exports = Skeleton;
