import React from 'react';
import PropTypes from 'prop-types';
import HashLoader from 'react-spinners/HashLoader';
import styles from '@/styles/loader.module.css';

/**
* When your page is performing some task in the background which may take some time (like making an HTTP request),
* it is important to show the user that the page is active, and is not frozen.
* This component uses the react-spinners package (https://www.npmjs.com/package/react-spinners) in order to
* create a little animated loading icon which can be displayed on the page when performing such activities.
*/
export default class Loader extends React.Component {
	/**
	* Initialize the component's state ('loading' = whether or not to display the icon)
	*/
	constructor(props) {
		super(props);
	}

	/**
	* The "render" function is a special React function which returns a JSX component which will be
	* shown on the page in place of the current class.
	*/
	render() {
		return (
			<div className={styles.loader}>
				<HashLoader loading={this.props.loading} color='#F8E71C'/>
			</div>
		);
	}
}

/**
* Since the `Loader` class operates on a set of properties, it is good practice to define what those properties are
* so that React can validate them as they are passed into the component
*/
Loader.propTypes = {
	loading: PropTypes.bool
};
