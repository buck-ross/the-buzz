/**
* This file defines a set of end-to-end test cases covering the behavioral logic of the UserProfile page.
* These tests are built using the Cypress test runner, which is documented here:
* https://docs.cypress.io/api/introduction/api.html
*/

/**
* Define a set of tests pertaining to the '/users/:email' page
*/
describe('User Profile page', () => {
	/**
	* Every test is going to need to access the /api/users/:email endpoint when the page loads.
	* We'll use the `beforeEach` function to register an interceptor for these calls
	*/
	beforeEach(() => {
		// Intercept GET requests to '/api/users/:email', and return some mock data:
		cy.intercept('GET', /\/api\/users\//, {
			status: 200,
			body: {
				bio: 'I am a sample user!',
				email: 'alice@example.com',
				name: 'Alice'
			}
		});
	});

	/**
	* Ensure that the page displays a list of users retrieved from the API server
	*/
	it('should display the user\'s info', () => {
		// Visit the '/users/:email' page:
		cy.visit('/users/alice%40example.com');

		// Check that the contents of the page match the expected output:
		cy.contains('h2', 'Alice');
		cy.contains('h3', 'Email: alice@example.com');
		cy.contains('p', 'I am a sample user!');
	});

	/**
	* Ensure that submitting the "edit" form causes the user's data to be PUT to the API
	*/
	it('should upload the appropriate user data when the "submit" button is clicked in the "edit" form', () => {
		// Intercept the PUT request to '/api/users':
		cy.intercept('PUT', /\/api\/users\//, {
			status: 200
		}).as('updateRequest');

		// Visit the '/users/:email' page & click the "edit" button:
		cy.visit('/users/alice%40example.com');
		cy.get('#editButton').click();

		// Define a sample user:
		const user = {
			bio: 'I am a sample user; this is some sample text!',
			email: 'jim@example.com',
			name: 'Jimmy'
		};

		// Fill out & submit the form:
		cy.get('#newName').clear().type(user.name);
		cy.get('#newEmail').clear().type(user.email);
		cy.get('#newBio').clear().type(user.bio);
		cy.get('button:nth-child(1)').click();

		// Check that the uploaded data matches the expected content:
		cy.wait('@updateRequest').then(interception => {
			const url = new URL(interception.request.url);
			expect(url.pathname).to.equal('/api/users/alice%40example.com');

			expect(interception.request.body.name).to.equal(user.name);
			expect(interception.request.body.email).to.equal(user.email);
			expect(interception.request.body.bio).to.equal(user.bio);
		});
	});

	/**
	* Ensure that clicking the "delete" button in the "edit" form sends a DELETE request to the API
	*/
	it('should delete the user when the "delete" button is clicked in the "edit" form', () => {
		// Intercept the DELETE request to '/api/users':
		cy.intercept('DELETE', /\/api\/users\//, {
			status: 200
		}).as('deleteRequest');

		// Visit the '/users/:email' page & click the "edit" button:
		cy.visit('/');
		cy.visit('/users/alice%40example.com');
		cy.get('#deleteButton').click();

		// Check that the request was sent:
		cy.wait('@deleteRequest').then(interception => {
			const url = new URL(interception.request.url);
			expect(url.pathname).to.equal('/api/users/alice%40example.com');
		});
	});
});
