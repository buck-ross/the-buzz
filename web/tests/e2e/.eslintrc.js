/**
* @file '.eslintrc.*' files are used to define the style guidelines which will be evaluated against the codebase
* whenever `eslint` is triggered by running `npm run lint`.
* This config file contains rules specific to the Cypress end-to-end testing environment.
*
* For more information on how to configure the options in this file, see the eslint documentation at
* https://eslint.org/docs/user-guide/configuring
*/

module.exports = {
	plugins: [
		'cypress'
	],
	env: {
		mocha: true,
		'cypress/globals': true
	},
	rules: {
		strict: 'off'
	}
};
