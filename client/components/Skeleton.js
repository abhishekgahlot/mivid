/* jshint node:true */
"use strict";

const React = require('react');
const RouteHandler = require('react-router').RouteHandler;
const Navigation = require('./Navigation.js');

class Container extends React.Component {
	render() {
		return (<div className="container">
			<RouteHandler></RouteHandler>
		</div>);
	}
}

class Skeleton extends React.Component {
	render() {
		return(<div>
			<Navigation></Navigation>
			<Container></Container>
		</div>);
	}
}

module.exports = Skeleton;
