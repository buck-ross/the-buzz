const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// Lookup important constant values:
const appDirectory = fs.realpathSync(__dirname);
const host = process.env.HOST || 'localhost';
const mode = process.env.NODE_ENV || 'development';

// Configure the API reverse proxy target:
let proxyTarget = process.env['REACT_PROXY_TARGET'];
if(!proxyTarget) {
	// If the target is not specified, fall back to the production API on Heroku:
	proxyTarget = 'https://the-buzz-demo.herokuapp.com';
}

// Define a reverse-proxy route to allow the web UI to access API routes when running the dev server:
const proxyConfig = (proxyTarget === 'DISABLE') ? {} : {
	'/api': {
		changeOrigin: true,
		target: proxyTarget,
		secure: false
	}
};

// Export the settings for the webpack build system:
module.exports = {
	entry: [ 'babel-polyfill', path.resolve(appDirectory, 'src') ],
	devServer: {
		compress: true,
		historyApiFallback: {
			disableDotRule: true
		},
		host: host,
		hot: true,
		port: 3000,
		proxy: proxyConfig
	},
	mode: mode,
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [ 'style-loader', { loader: 'css-loader', options: { modules: true } } ],
			},
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.png$/i,
				type: 'asset/resource'
			}
		]
	},
	output: {
		filename: 'js/bundle.js',
		publicPath: '/'
	},
	plugins: [
		// Re-generate index.html with injected script tag.
		// The injected script tag contains a src value of the
		// filename output defined above.
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(appDirectory, 'public/index.html'),
			title: 'The Buzz'
		}),

		// Copy all files from /static into the dist directory.
		// This includes things like the privacy policy, the favicon,
		// and the robots.txt file for SEO.
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'static' }
			]
		})
	],
	resolve: {
		alias: { '@': path.resolve(appDirectory, 'src') },
		extensions: [ '.js', '.jsx' ]
	}
};
