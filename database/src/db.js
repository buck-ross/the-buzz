/**
* @file configures the PostgreSQL database connection which is used throughout the library.
* All of the actual work of interacting with the database is done through the node-postgres library.
* For more information, see their online documentation at https://node-postgres.com
*/

// Import the node-postgres library:
const { Pool } = require('pg');

// Read the PostgreSQL URL from an environment variable:
const DATABASE_URL = process.env['DATABASE_URL'];

// Create a connection pool for use in communicating with PostgreSQL:
const pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

// Export the database connection:
module.exports.pool = pool;
