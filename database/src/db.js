/**
* @file configures a fake PostgreSQL database connection which is used throughout the library.
* All of the actual work of interacting with the database is done through the pg-mem library.
* For more information, see their online documentation at https://www.npmjs.com/package/pg-mem
*/

// Import the pg-mem library:
const { newDb } = require('pg-mem');

// Ensure that the PostgreSQL URL is not set:
const DATABASE_URL = process.env['DATABASE_URL'];
if(DATABASE_URL) {
	console.error('ERROR: this version of the database relies on pg-mem to create a fake, testing database.');
	console.error('\tIf you want to use a real database, you need to revert to the previous commit!');
	process.exit(1);
}

// Create a connection pool for use in communicating with PostgreSQL:
const db = newDb();
const Pool = db.adapters.createPg().Pool;
const pool = new Pool();

// Allow for the creation of a reset-point:
async function createResetPoint(general) {
	// Initialize the database & create the restore point:
	await general.createTables();
	await general.populateMockData();
	const backup = db.backup();

	// Automatically reset the database every 25 minutes:
	setInterval(() => {
		backup.restore();
	}, 25 * 60000)
}

// Export the fake database connection:
module.exports.pool = pool;
module.exports.mockDb = db;
module.exports.createResetPoint = createResetPoint;
