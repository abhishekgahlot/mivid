const React = require('react');
const classnames = require('classnames');

class NavItem extends React.Component {
	render(){
		let classes = classnames(this.props.className, {active: this.props.isActive});

		return (<li className={classes} onClick={this.props.onUserClick}>
			<a href={this.props.linkTo}>
				{this.props.children}
			</a>
		</li>);
	}
}

class NavGroup extends React.Component {
	constructor() {
		super();
		this.state = {
			activeIndex: 0
		};
	}

	handleClick(key) {
		this.setState({
			activeIndex: key
		});
	}

	render() {
		let key = -1, navItems;
		navItems = this.props.tabData.map(function(tab) {
			key++;
			return (

				<NavItem
					linkTo={tab.linkTo}
					isActive={this.state.activeIndex == key}
					onUserClick={this.handleClick.bind(this, key)}
					key={key}>
					{tab.text}
				</NavItem>
				
			);
		}.bind(this));

		return (<ul className="nav navbar-nav pull-right">
			{navItems}
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

	render() {
		let navGroup, tabData;
		if(!this.state.isLoggedIn) {
			tabData = [
				{text: 'Top Vidoes', linkTo: '#'},
				{text: 'Login', linkTo: '#'},
				{text: 'Signup', linkTo: '#'}
			];
		} else {
			tabData = [
				{text: 'Top Vidoes', linkTo: '#'},
				{text: 'My Account', linkTo: '#'},
				{text: 'Sign out', linkTo: '#'}
			];
		}

		navGroup = <NavGroup tabData={tabData}></NavGroup>;

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
