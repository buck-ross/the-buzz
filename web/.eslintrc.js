/**
* @file '.eslintrc.*' files are used to define the style guidelines which will be evaluated against the codebase
* whenever `eslint` is triggered by running `npm run lint`.
* This config file contains styling information specific to parsing *.vue files.
*
* For more information on how to configure the options in this file, see the eslint documentation at
* https://eslint.org/docs/user-guide/configuring
*/

module.exports = {
	ignorePatterns: [ '/dist' ],
	rules: {
		'no-console': 'warn'
	}
};
