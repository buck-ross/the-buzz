/**
* @file for running the whole backend HTTP API server application.
* Invoking this file with either `node index.js` or `npm run start` will launch the API server.
*/

const express = require('express');
const history = require('connect-history-api-fallback');
const db = require('the-buzz-database');

// Load all sub-routers:
const usersApi = require('./src/users');

// Set application constants:
const app = express();
const port = process.env['PORT'] || 5000;
const staticDir = process.env['STATIC_ASSET_DIR'] || '../web/dist';
const staticMiddleware = express.static(staticDir);

// Serve all of the sub-routers over the appropriate API routes:
app.use('/api/users', usersApi);

// Serve static assets by default, if no corresponding API route exists:
app.use(staticMiddleware);
app.use(history({ disableDotRule: true }));
app.use(staticMiddleware);

// Create the database tables if they don't already exist:
db.general.createTables().then(() => {
	// Launch the app:
	app.listen(port, () => {
		console.log('App is listening on port', port);
	});
});
