import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import styles from '@/styles/navbar.module.css';

/**
* This class defines the little navigation section that appears at the top of (almost) every page on the site.
* We define it here, in the '@/components/' folder, so that it can be re-used by each class, instead of needing to
* implement the same navigation logic over and over in each '@/view/' file.
*/
export default class Navbar extends React.Component {
	/**
	* The "render" function is a special React function which returns a JSX component which will be
	* shown on the page in place of the current class.
	*/
	render() {
		// Return a stylized `div`, containing `NavLink` elements for each page the user might navigate to:
		// NOTE: see the related API documentation here: https://v5.reactrouter.com/web/api/NavLink
		return (
			<AppBar position='static' className={styles.appbar}>
				<Container maxWidth='xl'>
					<Toolbar disableGestures>
						<Typography className={styles.title} variant='h6' noWrap component='div'>
							The Buzz
						</Typography>
						<Box class={styles.nav}>
							<Button component={NavLink} activeClassName={styles.selected} exact to='/'>
								Home
							</Button>
							<Button component={NavLink} activeClassName={styles.selected} exact to='/users'>
								Users
							</Button>
							<Button component={NavLink} activeClassName={styles.selected} exact to='/about'>
								About
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		);
	}
}
