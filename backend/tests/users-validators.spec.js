/**
* @file defines a set of unit tests for the validation functions provided by the `src/validators/users.js` file.
* These tests serve to ensure that the `/api/users` endpoint is properly protected from invalid requests,
* while still allowing valid requests to be processed.
*/

const validate = require('../src/validators/users');
let res, next;

/**
* Construct a fake `res` and `next` object to pass to the validator before each test
*/
beforeEach(() => {
	res = {
		send: jest.fn(),
		status: jest.fn()
	};
	next = jest.fn();
});

/**
* Test the validator function for GET requests to /users
*/
describe('GET /users', () => {
	/**
	* Ensure that the `getAll` method invokes `next()`:
	*/
	it('should call "next"', () => {
		// Trigger the validator:
		validate.getAll(null, res, next);

		// Check that only the `next` function was called:
		expect(res.send).not.toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});
});

/**
* Test the validator function for GET requests to /users/:email
*/
describe('GET /users/:email', () => {
	/**
	* Ensure that the `getOne` method invokes `next()` when provided with a valid email address
	*/
	it('should allow valid email addresses', () => {
		// Trigger the validator:
		const req = {
			params: { email: 'user.name+ext@site.domain' }
		};
		validate.getOne(req, res, next);

		// Check that only the `next` function was called:
		expect(res.send).not.toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});

	/**
	* Ensure that the `getOne` method rejects invalid addresses
	*/
	it('should require a valid email address', () => {
		// Trigger the validator:
		const req = {
			params: { email: 'user.name+ext.site.domain' }
		};
		validate.getOne(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});
});

/**
* Test the validator function for POST requests to /users
*/
describe('POST /users', () => {
	/**
	* Ensure that the `post` method invokes `next()` when provided with a valid user account
	*/
	it('should allow minimal, valid user', () => {
		// Trigger the validator:
		const req = {
			body: {
				email: 'user.name+ext@site.domain',
				name: 'User'
			}
		};
		validate.post(req, res, next);

		// Check that only the `next` function was called:
		expect(res.send).not.toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});

	/**
	* Ensure that the `post` method rejects when no email address is received
	*/
	it('should require an email address', () => {
		// Trigger the validator:
		const req = {
			body: { name: 'User' }
		};
		validate.post(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});

	/**
	* Ensure that the `post` method rejects when no email address is received
	*/
	it('should require a username', () => {
		// Trigger the validator:
		const req = {
			body: { email: 'user.name+ext@site.domain' }
		};
		validate.post(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});

	/**
	* Ensure that the `post` method rejects invalid email addresses
	*/
	it('should require a valid email address', () => {
		// Trigger the validator:
		const req = {
			body: {
				email: 'user.name+ext#site.domain',
				name: 'User'
			}
		};
		validate.post(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});
});

/**
* Test the validator function for PUT requests to /users/:email
*/
describe('PUT /users/:email', () => {
	/**
	* Ensure that the `put` method invokes `next()` when provided with a valid email address and account details
	*/
	it('should allow minimal, valid user', () => {
		// Trigger the validator:
		const req = {
			body: { name: 'User' },
			params: { email: 'user.name+ext@site.domain' }
		};
		validate.put(req, res, next);

		// Check that only the `next` function was called:
		expect(res.send).not.toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});

	/**
	* Ensure that the `put` method rejects invalid addresses for the original account
	*/
	it('should require a valid original email address', () => {
		// Trigger the validator:
		const req = {
			body: {
				email: 'user.name+ext@site.domain',
				name: 'User'
			},
			params: { email: 'user.name+ext#site.domain' }
		};
		validate.put(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});

	/**
	* Ensure that the `put` method rejects when an invalid new email address is received
	*/
	it('should require a valid new email address', () => {
		// Trigger the validator:
		const req = {
			body: {
				email: 'user.name+ext#site.domain',
				name: 'User'
			},
			params: { email: 'user.name+ext@site.domain' }
		};
		validate.put(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});

	/**
	* Ensure that the `put` method rejects when no username is provided
	*/
	it('should require a username', () => {
		// Trigger the validator:
		const req = {
			body: { email: 'user.name+ext@site.domain' },
			params: { email: 'user.name+ext@site.domain' }
		};
		validate.put(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});
});

/**
* Test the validator function for DELETE requests to /users/:email
*/
describe('DELETE /users/:email', () => {
	/**
	* Ensure that the `delete` method invokes `next()` when provided with a valid email address
	*/
	it('should allow valid email addresses', () => {
		// Trigger the validator:
		const req = {
			params: { email: 'user.name+ext@site.domain' }
		};
		validate.delete(req, res, next);

		// Check that only the `next` function was called:
		expect(res.send).not.toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});

	/**
	* Ensure that the `delete` method rejects invalid email addresses
	*/
	it('should require a valid email address', () => {
		// Trigger the validator:
		const req = {
			params: { email: 'user.name+ext#site.domain' }
		};
		validate.delete(req, res, next);

		// Check that the error was sent, and that `next()` was never called:
		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(next).not.toHaveBeenCalled();
	});
});
