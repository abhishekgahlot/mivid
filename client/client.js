// entry point for client

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const Route = ReactRouter.Route;

const routes = (<Route handler={require('./components/Skeleton.js')}>
	<Route name="home" path="/" handler={require('./components/Home.js')}> </Route>
</Route>);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Root) {
	ReactDOM.render(<Root/>, document.getElementById('app'));
});
