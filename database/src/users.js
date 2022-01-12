/**
* @file provides the library functions necessary to interact with user accounts stored in the database.
* Functions are provided to list user accounts, get account information, update a user's account, or delete an account.
*/

const db = require('./db').pool;

// Export all available database methods to the rest of the application:
module.exports = {

	/**
	* Create the "users" table, if it doesn't already exist
	* @returns {Promise} resolves after the table is created
	*/
	createTable: async function() {
		// Create the users table:
		await db.query(`
			CREATE TABLE IF NOT EXISTS users (
				bio VARCHAR(1024),
				email VARCHAR(64),
				name VARCHAR(64),
				PRIMARY KEY (email)
			)
		`);
	},

	/**
	* Drop the "users" table
	* @returns {Promise} resolves after the tables is dropped
	*/
	dropTable: async function() {
		await db.query(`
			DROP TABLE users
		`);
	},

	/**
	* Obtain a list of all users in the database
	* @returns {Promise<Array<object>>} A simple list of users, containing only `name` and `email` fields
	*/
	getAllUsers: async function() {
		const res = await db.query(`
			SELECT email, name FROM users ORDER BY email ASC
		`);
		return res.rows;
	},

	/**
	* Obtain all information about one user in particular, given their email address
	* @param {string} email The user's email address
	* @returns {Promise<object>} A complete user profile object, containing all of their information
	*/
	getUser: async function(email) {
		const res = await db.query(`
			SELECT * FROM users WHERE email = $1
		`, [ email ]);
		return res.rows[0];
	},

	/**
	* Insert a new user into the database with the provided information
	* @param {string} email The unique email address of the new user
	* @param {string} name The user's username
	* @param {string} bio The user's personalized bio which shows up on their profile page
	* @returns {Promise} Resolves if the insertion was successful
	*/
	insertUser: async function(email, name, bio) {
		const res = await db.query(`
			INSERT INTO users(email, name, bio) VALUES ($1, $2, $3)
		`, [ email, name, bio ]);

		// If the object is not inserted properly, return an error:
		if(res.rowCount !== 1) {
			return Promise.reject(`User insertion produced ${res.rowCount} rows`);
		}
	},

	/**
	* Update a user's info, given their email address, with the provided information
	* @param {string} email The unique email address of the existing user account
	* @param {string} newEmail A new unique email address for the user's account
	* @param {string} name A new username for the user's account
	* @param {string} bio A new bio for the user's account
	* @returns {Promise} Resolves if the update was successful
	*/
	updateUser: async function(email, newEmail, name, bio) {
		const res = await db.query(`
			UPDATE users SET email=$1, name=$2, bio=$3 WHERE email=$4
		`, [ newEmail, name, bio, email ]);

		// If the object is not updated properly, return an error:
		if(res.rowCount === 0) {
			return Promise.reject('User not found');
		}
	},

	/**
	* Delete a user's account, given their email address
	* @param {string} email The unique email address of the existing user account
	* @returns {Promise} Resolves if the deletion was successful
	*/
	deleteUser: async function(email) {
		const res = await db.query(`
			DELETE FROM users WHERE email=$1
		`, [ email ]);

		// If the object is not deleted properly, return an error:
		if(res.rowCount === 0) {
			return Promise.reject('User not found');
		}
	}
};
