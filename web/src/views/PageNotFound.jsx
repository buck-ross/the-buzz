import React from 'react';
import { Link } from 'react-router-dom';
import styles from '@/styles/errorpage.module.css';

export default class PageNotFound extends React.Component {
	render() {
		return (
			<div className={styles.errorPage}>
				<h1><b>ERROR 404</b>: Page Not Found</h1>
				{/* `this.props.history.location.pathname` gives the path to the current page */}
				<p>Sorry! the page &quot;{this.props.history.location.pathname}&quot; does not exist.</p>
				<Link to='/'>Click here to go back to the home page</Link>
			</div>
		);
	}
}
