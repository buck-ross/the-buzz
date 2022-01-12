/**
* This file loads all of the database modules from `src/`, and exports them all under a single object,
* each with their own namespace corresponding to the name of the module.
*
* This is typically the file which will be loaded into any application trying to use the database library.
*/

// Import all database handlers:
const general = require('./src/general');
const users = require('./src/users');

// Establish the restore point:
const createResetPoint = require('./src/db').createResetPoint;
createResetPoint(general);

// Export all available database methods & handlers to the rest of the application:
module.exports = {
	general,
	users
};
