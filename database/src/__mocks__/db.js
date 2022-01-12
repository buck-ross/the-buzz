/**
* This file configures a mock-database for the application, which is used in place of the real database during black-box testing.
* This is done in order to provide better testing consistency, as well as to prevent contamination of the application's database.
*/

// Use the "pg-mem" package (https://www.npmjs.com/package/pg-mem) to fake a PostgreSQL database:
const { newDb } = require('pg-mem');

// Create the new mock of the database `Pool` object:
const db = newDb();
const Pool = db.adapters.createPg().Pool;
const pool = new Pool();

// Export the fake database connection:
module.exports.pool = pool;
module.exports.mockDb = db;
