/**
* This file is responsible for making sure that the mock-PostgreSQL database is loaded into the testing environment
* before any actual tests are run.
* It also automatically populates the mock-database with mock-data, and creates a restore point
* which allows every test case to be run on the same set of mock-data, with no chance of contamination
* from any other test case.
*/

// Declare all of the spy channels we'll use to communicate with our black-box application:
jest.mock('../src/db');
jest.spyOn(global.console, 'log')
	.mockImplementation(() => {});

// Import all necessary dependencies:
const mockDb = require('../src/db').mockDb;
const general = require('../src/general');

// Define a state variable to store the backup-point:
let backup;

/**
* Before running any of the tests, create & populate the initial table, and save it as a backup
*/
beforeAll(async function() {
	await general.createTables();
	await general.populateMockData();
	backup = mockDb.backup();
});

/**
* Before each individual test, restore the database to it's original mock-data:
*/
beforeEach(() => {
	jest.clearAllMocks();
	backup.restore();
});
