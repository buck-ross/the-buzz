/**
* This file defines the main menu for the database CLI.
*
* If called directly with `node database-cli.js` or `npm run start`, this file wil automatically
* run the main menu over and over until the user selects 'exit'.
*
* Otherwise, if this file is loaded into another module with `require('database-cli.js')`,
* The main menu will not be run immediately, but will instead be exported from the `require` call.
*/

const inquirer = require('inquirer');
const db = require('./src/db').pool;

// Import all sub-menus:
const generalMenu = require('./src/generalMenu');

// Define the main menu questions:
async function mainMenu() {
	// Prompt the user to figure out what they want to do:
	const answers = await inquirer.prompt([
		{
			name: 'action',
			message: 'What do you want to do?',
			type: 'list', // Display a list of choices to the user
			choices: [
				{
					// Give the user an option to interact with `db.general`:
					name: 'perform general actions',
					short: 'general actions',
					value: 'general'
				},
				new inquirer.Separator(), // Creates a line separating the choices at the top from these choices
				'exit'
			]
		}
	]);

	// Perform different actions depending on the user's response to the "action" prompt:
	switch(answers.action) {
		// If the user chooses to interact with `db.general`, delegate the task to the `generalMenu` module:
		case 'general':
			return await generalMenu();
	}

	// If "exit" was selected, simply exit the program:
	return false;
}

// Only run the program if invoked directly. Otherwise, just export `mainMenu`:
if(require.main === module) {
	// Automatically print any client errors to the console:
	db.on('error', err => {
		console.error('Error in PostgreSQL client: ', err);
	});

	// Run the main menu prompt over and over again, until one of the sub-prompts returns 'false':
	(async function() {
		while(await mainMenu());
		console.log('Bye!');
	})();
}
module.exports = mainMenu;
