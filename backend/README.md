# The Buzz (Backend)

This part of the repository contains the code for an HTTP API server
which serves to handle requests from the Web UI,
and pass any necessary requests on to the database
through the admin library defined elsewhere in this repository.

## Running the API Server

To run the API server, follow these steps:

1. Open a new terminal in the directory containing this README file
(press *Ctrl+\`* in VSCode).
2. Install the dependencies by running `npm install`.
3. Run the application with `npm run start`.

Once you've installed the dependencies
& confirmed that the application runs correctly,
you can then run the included unit tests with `npm test`.

You should also be sure to check that your code is in line
with the style guidelines for the project by running `npm run lint`.

## Available HTTP API Routes

The following table documents all of the routes provided
by the API server in detail:

| **Route** | **[Method](https://www.restapitutorial.com/lessons/httpmethods.html)** | **Possible [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)** | **Description** | **Sample Request** | **Sample Response** |
|---|---|:---:|---|---|---|
| `/api/users` | GET | 200, 500 | Obtains a list of all users in the system from the database | *N/A* | `[ { "email": "alice@example.com","name": "Alice" }, { "email": "bob@example.com", "name": "Bob" } ]` |
| `/api/users` | POST | 201, 400, 409, 500 | Creates a new user account | `{ "name": "Alice", "email": "alice@example.com", "bio": "I am a sample user!" }` | User alice@example.com created |
| `/api/users/:email` | GET | 200, 400, 404, 500 | Gets a user's information given their email address | *N/A* | `{ "name": "Alice", "email": "alice@example.com", "bio": "I am a sample user!" }` |
| `/api/users/:email` | PUT | 204, 400, 404, 500 | Updates a user's information given their email address | `{ "name": "Alice", "email": "alice@example.com", "bio": "I am a sample user!" }` | *N/A* |
| `/api/users/:email` | DELETE | 204, 400, 404, 500 | Deletes a user's profile given their email address | *N/A* | *N/A* |

## Overview of the Source Files

The following is an overview of the important source files contained
within this directory:

- `src/validators/users.js`: Provides a set of validation functions
used in `src/users.js` in order to check whether or not requests
sent to the server are acceptable, or if they contain any errors.
- `src/users.js`: Defines all of the API routes used to interface
with user objects in the database.
This file contains routes to create, read, update, and delete
user accounts through the admin library.
- `tests/users-validators.spec.js`: Provides unit test cases
to ensure that functions provided by `src/validators/users.js`
correctly identify both valid and erroneous requests. 
- `index.js`: The main file which launches the API server
when run with `npm run start` or `node index.js`.
- `package.json`: A manifest file containing important information
pertaining to the content of the package, including the package
name, version, and a list of dependencies.
