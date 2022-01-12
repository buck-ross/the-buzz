/**
* @file '.eslintrc.*' files are used to define the style guidelines which will be evaluated against the codebase
* whenever `eslint` is triggered by running `npm run lint`.
* This config file contains rules specific to the Jest testing environment.
*
* For more information on how to configure the options in this file, see the eslint documentation at
* https://eslint.org/docs/user-guide/configuring
*/

module.exports = {
	plugins: [
		'jest'
	],
	env: {
		'jest/globals': true
	},
	rules: {
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error"
	}
};
