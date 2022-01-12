import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '@/styles/userEdit.module.css';

export default class UserEdit extends React.Component {
	/**
	* The constructor runs once every time a new instance of the component is created.
	* It can be used to set the initial state of the application.
	*/
	constructor(props) {
		super(props); // Inform the parent class of the properties

		// Extract the user information from the component properties:
		const user = Object.assign({ email: '', name: '', bio: '' }, props.user);

		// Set the initial state of the profile page:
		this.state = {
			newEmail: user.email,
			newName: user.name,
			newBio: user.bio,
		};
	}

	/**
	* When any of the fields in the form changes, this function is invoked to update the component state.
	* It assigns the input value to the state variable with a key equal to the 'id' field of the target input element.
	* In short, changing the value of the text field with an id of "newEmail" will update the "newEmail" state field.
	* @param {MouseEvent} evt the event data with information about the updated input field
	*/
	handleChange(evt) {
		let state = {};
		state[evt.target.id] = evt.target.value;
		this.setState(state);
	}

	/**
	* When the user clicks on the "Submit" button, run the submission callback
	* and provide the new user's data.
	*/
	handleSubmit() {
		this.props.submit({
			email: this.state.newEmail,
			name: this.state.newName,
			bio: this.state.newBio
		});
	}

	render() {
		return <Box component='form' noValidate>
			{/* Ask for the user's new name: */}
			<TextField
				id='newName'
				className={styles.nameField}
				required
				label='Username'
				value={this.state.newName}
				onChange={this.handleChange.bind(this)}
			/>

			{/* Ask for the user's new email: */}
			<TextField
				id='newEmail'
				className={styles.emailField}
				required
				label='Email'
				value={this.state.newEmail}
				onChange={this.handleChange.bind(this)}
			/>
			<br/>

			{/* Ask for the user's new bio: */}
			<TextField
				id='newBio'
				className={styles.bioField}
				required
				multiline
				minRows={4}
				label='Bio'
				value={this.state.newBio}
				onChange={this.handleChange.bind(this)}
			/>

			{/* Show the "submit" and "cancel" buttons: */}
			<Box>
				<Button
					id='submitButton'
					className={styles.submitButton}
					variant='contained'
					onClick={this.handleSubmit.bind(this)}
				>
					Submit
				</Button>
				<Button
					className={styles.cancelButton}
					variant='contained'
					onClick={this.props.cancel}
				>
					Cancel
				</Button>
			</Box>
		</Box>;
	}
}
