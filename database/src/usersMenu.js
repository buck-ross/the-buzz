/**
* This file creates an Inquirer menu which allows the CLI to perform actions involving user accounts
* through the library functions provided through `src/users.js`.
* For more information on Inquirer, see their documentation here: https://www.npmjs.com/package/inquirer#documentation
*/

const inquirer = require('inquirer');
const db = require('..');

// Setup the menu for the users table:
module.exports = async function() {
	// Prompt the user to figure out what they want to do:
	const answers = await inquirer.prompt([
		{
			name: 'action',
			message: 'Which would you like to do?',
			type: 'list', // Display a list of choices to the user
			choices: [
				{
					// Give the user an option to invoke `db.users.getAllUsers()`:
					name: 'list all users',
					short: 'list users',
					value: 'list'
				},
				{
					// Give the user an option to invoke `db.users.getUser()`:
					name: 'select one user',
					short: 'select one',
					value: 'select'
				},
				{
					// Give the user an option to invoke `db.users.insertUser()`:
					name: 'insert a new user',
					short: 'insert one',
					value: 'insert'
				},
				{
					// Give the user an option to invoke `db.users.updateUser()`:
					name: 'update a user\'s info',
					short: 'update one',
					value: 'update'
				},
				{
					// Give the user an option to invoke `db.users.deleteUser()`:
					name: 'delete a user',
					short: 'delete one',
					value: 'delete'
				},
				new inquirer.Separator(), // Creates a line separating the choices at the top from these choices
				'back',
				'exit'
			]
		},
		{
			name: 'email',
			message: 'Enter the user\'s email address:',
			type: 'input', // Asks the user to type a string as input
			when: answers => answers.action === 'select' ||
				answers.action === 'insert' ||
				answers.action === 'update' ||
				answers.action === 'delete' // Only ask when the action is "select", "insert", "update", or "delete"
		},
		{
			name: 'newEmail',
			message: 'Enter the user\'s new email address:',
			type: 'input', // Asks the user to type a string as input
			default: answers => answers.email,
			when: answers => answers.action === 'update' // Only ask when the action is "update"
		},
		{
			name: 'name',
			message: 'Enter the user\'s name:',
			type: 'input', // Asks the user to type a string as input
			when: answers => answers.action === 'insert' ||
				answers.action === 'update' // Only ask when the action is "insert" or "update"
		},
		{
			name: 'bio',
			message: 'Enter the user\'s bio:',
			type: 'input', // Asks the user to type a string as input
			when: answers => answers.action === 'insert' ||
				answers.action === 'update' // Only ask when the action is "insert" or "update"
		}
	]);

	// Perform different actions depending on the user's response to the "action" prompt:
	switch(answers.action) {
		// Handle the case where the user decides to list all user accounts on the platform:
		case 'list':
			try {
				// Retrieve a list of users from the database:
				let users = await db.users.getAllUsers();
				if(users.length == 0) {
					// If no users are found, print a message to the CLI:
					console.log('No users found');
				} else {
					// Otherwise, print each user's info to the console:
					for(let user of users) {
						console.log(user.name, '<' + user.email + '>');
					}
				}
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error enumerating users: ', err);
			}
			break;

		// Handle the case where the user decides to read a specific user's profile info:
		case 'select':
			try {
				// Retrieve the user's profile data from the database:
				let user = await db.users.getUser(answers.email);
				if(user) {
					// Print the user's info to the console:
					console.log(user.name, '<' + user.email + '>');
					console.log(user.bio);
				} else {
					// If no such user is found, print a message to the CLI:
					console.log('No such user in database.');
				}
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error selecting user: ', err);
			}
			break;

		// Handle the case where the user decides to create a new user account:
		case 'insert':
			try {
				// Upload the new user's info to the database:
				await db.users.insertUser(answers.email, answers.name, answers.bio);
				console.log('User inserted successfully.');
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error inserting user: ', err);
			}
			break;

		// Handle the case where the user decides to update a user's profile info:
		case 'update':
			try {
				// Upload the user's new profile info to the database:
				await db.users.updateUser(answers.email, answers.newEmail, answers.name, answers.bio);
				console.log('User updated successfully.');
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error updating user: ', err);
			}
			break;

		// Handle the case where the user decides to delete a user account from the platform:
		case 'delete':
			try {
				// Delete the user's profile from the database:
				await db.users.deleteUser(answers.email);
				console.log('User deleted successfully.');
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error deleting user: ', err);
			}
			break;

		case 'exit':
			// Return "false" to indicate that the main menu should not appear again and the program should halt:
			throw false;
	}
	console.log();

	// Return true to indicate that the main menu should appear again:
	return true;
};
