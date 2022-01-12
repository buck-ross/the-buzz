import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Home from '@/views/Home';
import About from '@/views/About';
import PageNotFound from '@/views/PageNotFound';

/**
* Define the main application content
*/
class App extends React.Component {
	render() {
		return (
			<StyledEngineProvider injectFirst>
				<Router>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/about" component={About}/>
						<Route path="*" component={PageNotFound}/>
					</Switch>
				</Router>
			</StyledEngineProvider>
		);
	}
}

// Mount the application when the window loads:
window.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(<App/>, document.getElementById('app'));
});

