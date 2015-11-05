const React = require('react');


class Navigation extends React.Component{
	getIntialState() {
		return {
			isLoggedIn: false,
			user: {}
		};
	}

	componentDidMount() {
		//load User and set State.
	}

	render() {
		return (<div>
			<p>Navigation!</p>
		</div>);
	}
}

module.exports = Navigation;
