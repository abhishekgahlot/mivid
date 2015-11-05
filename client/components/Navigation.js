const React = require('react');

class NavItem extends React.Component {
	render(){
		return (<li className={this.props.className}>
			<a href="{this.props.linkTo}">
				{this.props.children}
			</a>
		</li>);
	}
}

class NavGroup extends React.Component {
	render(){
		return (<ul className="nav navbar-nav pull-right">
			{this.props.children}
		</ul>);
	}
}

class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: false,
			user: {}
		};
	}

	componentDidMount() {
		//load User and set State.
	}

	render() {
		let navGroup;
		if(!this.state.isLoggedIn) {
			navGroup = (<NavGroup>
				<NavItem linkTo="#" className="active"> My Feed </NavItem>
				<NavItem linkTo="#"> Login </NavItem>
				<NavItem linkTo="#"> Signup </NavItem>
			</NavGroup>);
		} else {
			navGroup = (<NavGroup>
				<NavItem linkTo="#" className="active"> Feed </NavItem>
				<NavItem linkTo="#"> My Account </NavItem>
			</NavGroup>);
		}

		return (<nav className="navbar navbar-default">
			<div className="container-fluid">

				<div className="navbar-header">
					<a href="#" className="navbar-brand"> MIVID </a>
				</div>

				{navGroup}

			</div>
		</nav>);
	}
}

module.exports = Navigation;
