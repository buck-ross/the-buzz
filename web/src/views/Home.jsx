import React from 'react';
import Navbar from '@/components/Navbar';
import logo from '@/assets/logo.png';
import styles from '@/styles/home.module.css';

/**
* This class defines how the application's homepage will be displayed.
* It includes the navbar (imported from @/components/Navbar), the application's logo, and some basic welcome text.
*/
export default class Home extends React.Component {
	/**
	* The "render" function is a special React function which returns a JSX component which will be
	* shown on the page in place of the current class.
	*/
	render() {
		return (
			<div>
				{/* Display the navbar at the top of the page: */}
				<Navbar/>

				{/* Display the application's logo & welcome text: */}
				<img alt='The Buzz logo' className={styles.logo} src={logo}/>
				<h1>Welcome to <span className={styles.title}>The Buzz</span>!</h1>
			</div>
		);
	}
}

