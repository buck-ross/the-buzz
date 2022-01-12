import React from 'react';
import Navbar from '@/components/Navbar';
import styles from '@/styles/about.module.css';

/**
* This class defines how the application's '/about' page will be displayed.
* It includes the navbar (imported from @/components/Navbar), and some cursory information about the application.
*/
export default class About extends React.Component {
	/**
	* The "render" function is a special React function which returns a JSX component which will be
	* shown on the page in place of the current class.
	*/
	render() {
		return (
			<div className={styles.about}>
				{/* Display the navbar at the top of the page: */}
				<Navbar/>

				{/* Display a short message explaining the purpose of the project */}
				<h1>Welcome to <span className={styles.title}>The Buzz</span>!</h1>
				<p>
					<span className={styles.title}>The Buzz</span> is a simple template
					for a modern full-stack application with all the bells and whistles included.
					This project includes an administrative library/CLI,
					a backend HTTP API server, and a web UI powered by React.
				</p>
				<p>
					With a little development effort,
					you can turn <span className={styles.title}>The Buzz</span> into
					anything you want it to be.
				</p>
				<p>
					For more information,
					checkout our <a href="https://buck-ross.github.io/survival-guide/the_buzz">Official Development Guide</a>,
					or visit our <a href="https://bitbucket.org/buck-ross/the-buzz">BitBucket Page</a>.
				</p>
			</div>
		);
	}
}

