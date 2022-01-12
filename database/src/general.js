/**
* @file defines general database procedures, most of which simply delegate tasks to the
* other database library modules.
* These tasks include creating all of the tables, dropping all of the tables,
* and inserting a bunch of fake data into the database for testing purposes.
*/

// Define all of the functions necessary for performing general admin tasks:
module.exports = {

	/**
	* Define a function to create all of the tables in the database
	* @returns {Promise} resolves after all of the tables are created
	*/
	createTables: async function() {
		// TODO
	},

	/**
	* Define a function to drop all of the tables in the database
	* @returns {Promise} resolves after all of the tables are dropped
	*/
	dropTables: async function() {
		// TODO
	},

	/**
	* Define a function to populate the database with some mock-data for testing purposes
	* @returns {Promise} resolves after all of the mock-data is inserted
	*/
	populateMockData: async function() {
		// TODO
	}
};
