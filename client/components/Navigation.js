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
		return (<nav className="navbar navbar-default">
			<div className="container-fluid">
				{/* Logo */}
				<div className="navbar-header">
					<a href="#" className="navbar-brand">MIVID Logo</a>
				</div>

				{/* Menu items */}
				<div>
					<ul className="nav navbar-nav">
						<li className="active"> <a href="#"> Feed </a> </li>
						<li> <a href="#"> Login </a> </li>
						<li> <a href="#"> Signup </a> </li>
					</ul>
				</div>
			</div>
		</nav>);
	}
}

module.exports = Navigation;
