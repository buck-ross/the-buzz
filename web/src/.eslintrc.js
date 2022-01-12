/**
* @file '.eslintrc.*' files are used to define the style guidelines which will be evaluated against the codebase
* whenever `eslint` is triggered by running `npm run lint`.
* This config file contains styling information specific to parsing *.vue files.
*
* For more information on how to configure the options in this file, see the eslint documentation at
* https://eslint.org/docs/user-guide/configuring
*/
/* eslint-env node */

module.exports = {
	env: {
		browser: true,
		node: false
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	rules: {
		// List linting rules for React (https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules):
		'react/jsx-no-script-url': 'warn',
		'react/no-danger': 'warn',
		'react/no-direct-mutation-state': 'error',
		'react/no-typos': 'warn',
		'react/no-unsafe': 'warn',
		'react/prefer-es6-class': 'warn',
		'react/prop-types': 'off',
		'react/self-closing-comp': 'warn',
		'react/sort-comp': 'warn',
		'react/void-dom-elements-no-children': 'error'
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
