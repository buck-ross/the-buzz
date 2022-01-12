/**
* This file defines a set of end-to-end test cases covering the behavioral logic of the UsersList page.
* These tests are built using the Cypress test runner, which is documented here:
* https://docs.cypress.io/api/introduction/api.html
*/

/**
* Define a set of tests pertaining to the '/users' page
*/
describe('Users List page', () => {
	/**
	* Every test is going to need to access the /api/users endpoint when the page loads.
	* We'll use the `beforeEach` function to register an interceptor for these calls
	*/
	beforeEach(() => {
		// Intercept GET requests to '/api/users', and return some mock data:
		cy.intercept('GET', '/api/users', {
			status: 200,
			body: [
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]
		});
	});

	/**
	* Ensure that the page displays a list of users retrieved from the API server
	*/
	it('should display a list of all users', () => {
		// Visit the '/users' page:
		cy.visit('/users');

		// Check that the contents of the page match the expected output:
		cy.contains('button', 'Add User');
		cy.get('#usersList').children().should('have.length', 2);
		cy.contains('#usersList :nth-child(1)', 'Alice <alice@example.com>');
		cy.contains('#usersList :nth-child(2)', 'Bob <bob@example.com>');
	});

	/**
	* Ensure that clicking on Alice's card opens her profile page
	*/
	it("should open a user's profile page when their card is clicked", () => {
		// Intercept GET requests to '/api/users/:email' to prevent network errors:
		cy.intercept('GET', /\/api\/users\//, {
			status: 200
		});

		// Visit the '/users' page:
		cy.visit('/users');

		// Click on Alice's card:
		cy.get('[data-email="alice@example.com"]').click();

		// Check that the contents of the page match the expected output:
		cy.location('pathname').should(path => {
			expect(path).to.equal('/users/alice%40example.com');
		});
	});

	/**
	* Ensure that submitting the "add user" form causes an appropriate POST request to be sent
	*/
	it('should POST the new user object when the "add user" form is submitted', () => {
		// Intercept the POST request to '/api/users':
		cy.intercept('POST', '/api/users', {
			status: 200
		}).as('uploadRequest');

		// Visit the '/users' page & open the "new user" form:
		cy.visit('/users');
		cy.get('button').click();

		// Define a sample user:
		const user = {
			bio: 'I am a sample user; this is some sample text!',
			email: 'jim@example.com',
			name: 'Jimmy'
		};

		// Fill out & submit the form:
		cy.get('#newName').type(user.name);
		cy.get('#newEmail').type(user.email);
		cy.get('#newBio').type(user.bio);
		cy.get('#submitButton').click();

		// Check that the uploaded data matches the expected content:
		cy.wait('@uploadRequest').then(interception => {
			expect(interception.request.body.name).to.equal(user.name);
			expect(interception.request.body.email).to.equal(user.email);
			expect(interception.request.body.bio).to.equal(user.bio);
		});
	});
});
