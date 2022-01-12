/**
* @file creates an Inquirer menu which allows the CLI to perform general actions on the database
* through the library functions provided through `src/general.js`.
* For more information on Inquirer, see their documentation here: https://www.npmjs.com/package/inquirer#documentation
*/

const inquirer = require('inquirer');
const db = require('..');

// Setup the "general actions" menu:
module.exports = async function() {
	// Prompt the user to figure out what they want to do:
	const answers = await inquirer.prompt([
		{
			name: 'action',
			message: 'Which general action would you like to perform?',
			type: 'list', // Display a list of choices to the user
			choices: [
				{
					// Give user an option to invoke `db.general.createTables()`:
					name: 'create all tables (if they don\'t already exist)',
					short: 'create tables',
					value: 'create'
				},
				{
					// Give user an option to invoke `db.general.dropTables()`:
					name: 'drop all tables',
					short: 'drop tables',
					value: 'drop'
				},
				{
					// Give user an option to invoke `db.general.populateMockData()`:
					name: 'populate the database with mock-data for testing',
					short: 'populate mock data',
					value: 'mock'
				},
				new inquirer.Separator(), // Creates a line separating the choices at the top from these choices
				'back',
				'exit'
			]
		},
		{
			name: 'confirmDrop',
			message: 'Are you sure you want to drop all tables?',
			type: 'confirm', // Ask a yes/no question
			when: answers => answers.action === 'drop' // only ask when the selected action was "drop"
		},
		{
			name: 'confirmMock',
			message: 'Are you sure you want to create a bunch of mock data?',
			type: 'confirm', // Ask a yes/no question
			when: answers => answers.action === 'mock' // only ask when the selected action was "mock"
		}
	]);

	// Perform different actions depending on the user's response to the "action" prompt:
	switch(answers.action) {
		// Handle the case where the user decides to create the tables:
		case 'create':
			try {
				// Create all of the tables in the database:
				await db.general.createTables();
				console.log('Tables created!');
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error creating tables: ', err);
			}
			break;

		// Handle the case where the user decides to drop the tables:
		case 'drop':
			// Make sure the user actually meant to drop the tables:
			if(!answers.confirmDrop) {
				break;
			}
			try {
				// Drop all of the tables from the database:
				await db.general.dropTables();
				console.log('Tables dropped!');
			} catch (err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error dropping tables: ', err);
			}
			break;

		// Handle the case where the user decides to fill the tables with mock-data:
		case 'mock':
			// Make sure the user actually meant to populate the mock-data:
			if(!answers.confirmMock) {
				break;
			}
			try {
				// Add a bunch of mock-data into the database:
				await db.general.populateMockData();
				console.log('Mock data created!');
			} catch(err) {
				// If a database error is encountered, print it out to the console:
				console.error('Error creating mock data: ', err);
			}
			break;

		case 'exit':
			// Return "false" to indicate that the main menu should not appear again and the program should halt:
			return false;
	}

	// Return true to indicate that the main menu should appear again:
	return true;
};
