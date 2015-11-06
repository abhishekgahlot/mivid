const React = require('react');
const classnames = require('classnames');

class NavItem extends React.Component {
	constructor() {
		super();
		this.state = {
			active: false
		};
	}

	componentDidMount() {
		if(this.props.active == "true") {
			this.setState({active: true});
		}
	}

	handleClick() {
		if(this.state.active === false) {
			this.setState({
				active: true
			});
		}
	}

	render(){
		let classes = classnames(this.props.className, {active: this.state.active});
		return (<li className={classes} onClick={this.handleClick.bind(this)}>
			<a href={this.props.linkTo}>
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
				<NavItem linkTo="#" active="true"> Top Videos </NavItem>
				<NavItem linkTo="#"> Login </NavItem>
				<NavItem linkTo="#"> Signup </NavItem>
			</NavGroup>);
		} else {
			navGroup = (<NavGroup>
				<NavItem linkTo="#" active="true"> Top Videos </NavItem>
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
