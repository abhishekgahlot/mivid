var React = require('react');

class Gallery extends React.Component {
	render() {
		console.log("Id of this page is:", this.props.params.id);
		return <div> Hello, from gallery! </div>;
	}
}

module.exports = Gallery;
