/**
* @file defines a set of validation functions which ensure that
* all queries to the users API are logically consistent, and don't contain any syntax errors.
*/

// Define a regular expression to validate email addresses (credit to https://stackoverflow.com/a/9204568):
const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+$/;

// Export a set of validator middleware functions for use in verifying the validity of all incoming requests:
module.exports = {
	/**
	* Validate GET requests to /users
	* @param {object} req The Express request object received by the endpoint
	* @param {object} res The constructed response object so far
	* @param {function} next A function to invoke the next request handler for the route
	* @returns {undefined}
	*/
	getAll: function(req, res, next) {
		// NOTE: There aren't really any ways to invalidate this request, so we'll just call `next()` immediately:
		return next();
	},

	/**
	* Validate GET requests to /users/:email
	* @param {object} req The Express request object received by the endpoint
	* @param {object} res The constructed response object so far
	* @param {function} next A function to invoke the next request handler for the route
	* @returns {undefined}
	*/
	getOne: function(req, res, next) {
		// Validate the queried email address:
		if(!EMAIL_REGEXP.test(req.params.email)) {
			res.status(400);
			return res.send('Email "' + req.params.email + '" is not valid');
		}

		// Validate the request:
		return next();
	},

	/**
	* Validate POST requests to /users
	* @param {object} req The Express request object received by the endpoint
	* @param {object} res The constructed response object so far
	* @param {function} next A function to invoke the next request handler for the route
	* @returns {undefined}
	*/
	post: function(req, res, next) {
		// Always require a name & and email address in the upload:
		if(!req.body.email) {
			res.status(400);
			return res.send('You must specify an email address');
		}
		if(!req.body.name) {
			res.status(400);
			return res.send('You must specify a username');
		}

		// Validate the provided email address:
		if(!EMAIL_REGEXP.test(req.body.email)) {
			res.status(400);
			return res.send('Email "' + req.body.email + '" is not valid');
		}

		// Validate the request:
		return next();
	},

	/**
	* Validate PUT requests to /users/:email
	* @param {object} req The Express request object received by the endpoint
	* @param {object} res The constructed response object so far
	* @param {function} next A function to invoke the next request handler for the route
	* @returns {undefined}
	*/
	put: function(req, res, next) {
		// Always require a name & and email address in the upload:
		if(!req.body.name) {
			res.status(400);
			return res.send('You must specify a username');
		}

		// Validate the original email address:
		if(!EMAIL_REGEXP.test(req.params.email)) {
			res.status(400);
			return res.send('Original email "' + req.params.email + '" is not valid');
		}

		// Validate the new email address:
		if(req.body.email && !EMAIL_REGEXP.test(req.body.email)) {
			res.status(400);
			return res.send('New email "' + req.body.email + '" is not valid');
		}

		// Validate the request:
		return next();
	},

	/**
	* Validate DELETE requests to /users/:email
	* @param {object} req The Express request object received by the endpoint
	* @param {object} res The constructed response object so far
	* @param {function} next A function to invoke the next request handler for the route
	* @returns {undefined}
	*/
	delete: function(req, res, next) {
		// Validate the queried email address:
		if(!EMAIL_REGEXP.test(req.params.email)) {
			res.status(400);
			return res.send('Email "' + req.params.email + '" is not valid');
		}

		// Validate the request:
		return next();
	}
};
