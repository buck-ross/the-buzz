/**
* @file defines a router to process all API queries to the route `/api/users` and all of its sub-routes.
* The `/api/users` endpoint serves to allow the web UI to interact with user profile information stored in the database.
*/

const express = require('express');
const db = require('the-buzz-database');
const validate = require('./validators/users');
const router = express.Router();

// Load router middleware:
router.use(express.json());

// Obtain a list of users from '/api/users':
router.get('/', validate.getAll, async (req, res) => {
	try {
		// Retrieve a list of all users on the platform from the database:
		const users = await db.users.getAllUsers();
		return res.status(200).send(users);
	} catch(err) {
		// Handle any errors that occur as a result of the transaction:
		console.error(err);
		return res.status(500).send(err);
	}
});

// Upload a new user's info via '/api/users':
router.post('/', validate.post, async (req, res) => {
	try {
		// Upload the new user's profile information to the database:
		await db.users.insertUser(req.body.email, req.body.name, req.body.bio || '');
		return res.status(201).send('User ' + req.body.email +  ' created');
	} catch(err) {
		// Handle any errors that occur as a result of the transaction:
		switch(err.code) {
			case '23505':
				// If the user's email conflicts with another account, return a 409 error:
				return res.status(409).send('User ' + req.body.email + ' already exists');
			default:
				// Otherwise, return a 500 error code to indicate a server error:
				console.error(err);
				return res.status(500).send(err);
		}
	}
});

// Obtain a single user's info from '/api/users/:email':
router.get('/:email', validate.getOne, async (req, res) => {
	try {
		// Retrieve the user's information from the database:
		const user = await db.users.getUser(req.params.email);
		if(!user) {
			// If the user wasn't found, return a 404 error:
			return res.status(404).send('User ' + req.params.email + ' not found');
		}
		return res.status(200).send(user);
	} catch(err) {
		// Handle any errors that occur as a result of the transaction:
		console.error(err);
		return res.status(500).send(err);
	}
});

// Update a user's info via '/api/users/:email':
router.put('/:email', validate.put, async (req, res) => {
	try {
		// Upload the user's updated profile information to the database:
		await db.users.updateUser(
			req.params.email,
			req.body.email || req.params.email,
			req.body.name,
			req.body.bio || ''
		);
		return res.sendStatus(204);
	} catch(err) {
		// If the user wasn't found, return a 404 error:
		if(err === 'User not found') {
			return res.status(404).send('User ' + req.params.email +  ' not found');
		}

		// Handle any errors that occur as a result of the transaction:
		console.error(err);
		return res.status(500).send(err);
	}
});

// Delete a single user's info from '/api/users/:email':
router.delete('/:email', validate.delete, async (req, res) => {
	try {
		// Delete the user's account from the database:
		await db.users.deleteUser(req.params.email);
		return res.sendStatus(204);
	} catch(err) {
		// If the user wasn't found, return a 404 error:
		if(err === 'User not found') {
			return res.status(404).send('User ' + req.params.email + ' not found');
		}

		// Handle any errors that occur as a result of the transaction:
		console.error(err);
		return res.status(500).send(err);
	}
});

// Export the constructed router:
module.exports = router;
