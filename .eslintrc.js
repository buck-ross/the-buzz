/**
* @file '.eslintrc.*' files are used to define the style guidelines which will be evaluated against the codebase
* whenever `eslint` is triggered by running `npm run lint`.
* This is the root config file, which defines the general style guidelines for the whole project.
*
* For more information on how to configure the options in this file, see the eslint documentation at
* https://eslint.org/docs/user-guide/configuring
*/

module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended'
	],
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true
		},
		ecmaVersion: 2017
	},
	rules: {
		indent: [
			'warn',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'no-alert': 'error',
		'no-tabs': [
			'warn',
			{
				allowIndentationTabs: true
			}
		],
		'no-trailing-spaces': 'warn',
		semi: [
			'warn',
			'always'
		],
		'space-before-function-paren': [
			'warn',
			{
				anonymous: 'never',
				named: 'never'
			}
		]
	}
};
