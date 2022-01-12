# The Buzz (Admin)

This part of the repository contains the code for a library
which provides access to the PostgreSQL database used by *The Buzz*,
as well as a command-line interface for administrating the database
& testing the library's functionality.

## Running the CLI

To run the command-line interface (CLI), follow these steps:

1. Open a new terminal in the directory containing this README file
(press *Ctrl+\`* in VSCode).
2. Install the dependencies by running `npm install`.
3. Run the application with `npm run start`.

Once you've installed the dependencies
& confirmed that the application runs correctly,
you can then run the included black-box tests with `npm test`.

You should also be sure to check that your code is in line
with the style guidelines for the project by running `npm run lint`.

## Structure of the Database

Our database contains the following tables,
with their structures defined in the table below.

### The `users` Table

| **Column Name** | **Data Type** | **Special Attributes** | **Description** |
|---|---|---|---|
| bio | VARCHAR(1024) | | The personalized description displayed on the user's profile |
| email | VARCHAR(64) | Primary Key | The email address used to identify the user's account |
| name | VARCHAR(64) | | The user's real name or online alias |

## Overview of the Source Files

The following is an overview of the important source files contained
within this directory:

- `src/__mocks__/db.js`: Defines a fake interface
which is used instead of the database during black-box testing.
- `src/db.js`: Provides an interface to the PostgreSQL
database using [*node-postgres*](https://node-postgres.com).
- `src/general.js`: Provides the library functions for performing
common actions with the database like creating all of the tables,
dropping all of the tables, and inserting mock-data into the tables
for testing purposes.
- `src/generalMenu.js`: Defines the command-line interface
for interacting with the functions defined in `src/general.js`.
- `src/users.js`: Provides the library functions for interacting
with the "users" table in the database.
This file defines how to create, read, update, and delete
all information about users on the platform.
- `src/usersMenu.js`: Defines the command-line interface
for interacting with the functions defined in `src/users.js`.
- `tests/setup.js`: Defines some initialization functions
which configure the mock database for black-box testing.
- `tests/users.spec.js`: Provides black-box test cases
for `src/users.js` and `src/usersMenu.js`.
- `admin.js`: The main file which launches the command-line
interface when run with `npm run start` or `node admin.js`.
- `index.js`: The main file which provides the library interface.
This file loads all of the library files, including `src/users.js`
and `src/general.js`.
- `package.json`: A manifest file containing important information
pertaining to the content of the package, including the package
name, version, and a list of dependencies.
