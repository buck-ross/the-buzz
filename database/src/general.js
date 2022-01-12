/**
* @file defines general database procedures, most of which simply delegate tasks to the
* other database library modules.
* These tasks include creating all of the tables, dropping all of the tables,
* and inserting a bunch of fake data into the database for testing purposes.
*/

const usersTable = require('./users');

// Define all of the functions necessary for performing general admin tasks:
module.exports = {

	/**
	* Define a function to create all of the tables in the database
	* @returns {Promise} resolves after all of the tables are created
	*/
	createTables: async function() {
		await usersTable.createTable();
	},

	/**
	* Define a function to drop all of the tables in the database
	* @returns {Promise} resolves after all of the tables are dropped
	*/
	dropTables: async function() {
		await usersTable.dropTable();
	},

	/**
	* Define a function to populate the database with some mock-data for testing purposes
	* @returns {Promise} resolves after all of the mock-data is inserted
	*/
	populateMockData: async function() {
		await usersTable.insertUser('alice@example.com', 'Alice', 'Hi! My name is Alice.');
		await usersTable.insertUser('bob@example.com', 'Bob', 'Hello! My name is Bob.');
		await usersTable.insertUser('jane@example.com', 'Jane', 'Howdy! My name is Jane.');
		await usersTable.insertUser('john@example.com', 'John', 'Hey there! My name is John.');
	}
};
