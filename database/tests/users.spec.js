/**
* This file defines a set of black-box test cases in order to test the functionality of the library interface
* for interacting with user account information stored in the database.
* These tests cover the code written in both `src/users.js` and `src/usersMenu.js`.
*/

// Import all necessary dependencies:
const mockInquirer = require('mock-inquirer');
const mainMenu = require('../database-cli');

/**
* Define a set of tests pertaining to the 'users' interface
*/
describe('Users Interface', () => {
	/**
	* Test to ensure that selecting "users -> list" causes a list of all users in the system to be printed out
	*/
	it('should be able to list all users', async function() {
		// Define the menu options to use in the inquirer call:
		let reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'list'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'Alice', '<alice@example.com>' ],
			[ 'Bob', '<bob@example.com>' ],
			[ 'Jane', '<jane@example.com>' ],
			[ 'John', '<john@example.com>' ],
			[]
		]);
	});

	/**
	* Test to ensure that selecting "users -> select" retrieves one user's info by their email address
	*/
	it('should be able to select a user by their email address', async function() {
		// Define the menu options to use in the inquirer call:
		let reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'select',
			email: 'jane@example.com'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'Jane', '<jane@example.com>' ],
			[ 'Howdy! My name is Jane.' ],
			[]
		]);
	});

	/**
	* Test to ensure that selecting "users -> insert" inserts a new user into the database
	*/
	it('should be able to insert users', async function() {
		// Define the menu options to use in the inquirer call:
		let reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'insert',
			email: 'carly@example.com',
			name: 'Carly',
			bio: 'I am a sample user!'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User inserted successfully.' ],
			[]
		]);

		// Define the menu options to use in the inquirer call:
		reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'select',
			email: 'carly@example.com'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User inserted successfully.' ],
			[],
			[ 'Carly', '<carly@example.com>' ],
			[ 'I am a sample user!' ],
			[]
		]);
	});

	/**
	* Test to ensure that selecting "users -> update" updates one user's info by their email address
	*/
	it('should be able to update one user by their email address', async function() {
		// Define the menu options to use in the inquirer call:
		let reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'update',
			email: 'john@example.com',
			newEmail: 'james@example.com',
			name: 'James',
			bio: 'I am a sample user!'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User updated successfully.' ],
			[]
		]);

		// Define the menu options to use in the inquirer call:
		reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'select',
			email: 'james@example.com'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User updated successfully.' ],
			[],
			[ 'James', '<james@example.com>' ],
			[ 'I am a sample user!' ],
			[]
		]);
	});

	/**
	* Test to ensure that selecting "users -> delete" deletes one user by their email address
	*/
	it('should be able to delete one user by their email address', async function() {
		// Define the menu options to use in the inquirer call:
		let reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'delete',
			email: 'bob@example.com'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User deleted successfully.' ],
			[]
		]);

		// Define the menu options to use in the inquirer call:
		reset = mockInquirer([{
			action: 'users'
		}, {
			action: 'list'
		}]);

		// Invoke the main menu prompt:
		await mainMenu();
		reset();

		// Check that the results printed to the console match the expected output of the command:
		expect(console.log.mock.calls).toEqual([
			[ 'User deleted successfully.' ],
			[],
			[ 'Alice', '<alice@example.com>' ],
			[ 'Jane', '<jane@example.com>' ],
			[ 'John', '<john@example.com>' ],
			[]
		]);
	});
});
