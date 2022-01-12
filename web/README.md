# The Buzz (Web)

This part of the repository contains the code for the web interface
of *The Buzz*, which is built with the [React framework](https://reactjs.org).

## Running the Web UI

To run the Web UI, follow these steps:

1. Open a new terminal in the directory containing this README file.
(press *Ctrl+\`* in VSCode).
2. Install the dependencies by running `npm install`.
3. **(optional)** Build the application with `npm run build`.
Otherwise, `npm run start` will build it for you.
4. **(optional)** Look up your Heroku application's web URL by running
`heroku apps:info` (look for the line labeled "Web URL").
5. **(optional)** Define a proxy route to your application:
`export REACT_PROXY_TARGET='https://your-app-name-here.herokuapp.com'`
(be sure to replace "your-app-name-here" with the name of the app
you got from step #4).
6. Run the application with `npm run start`.
If you make any changes to the code while running the application,
it will automatically be rebuilt & rerun for you.

Once you've installed the dependencies
& confirmed that the application runs correctly,
you can then run the included end-to-end tests with `npm test`,
or `npm run ci:test`.

You should also be sure to check that your code is in line
with the style guidelines for the project by running `npm run lint`.

## Pages in the Interface

| **Name** | **Description** | **Available API Requests** |
|---|---|---|
| About | A simple page with some cursory information about the project. | *N/A* |
| Home | A welcome page displaying the site's logo and a short message. | *N/A* |
| PageNotFound | The default 404 error page displayed when the user navigates to an unknown route. | *N/A* |
| UserProfile | The page that is displayed whenever a user's name or email is clicked. | `GET /api/users/:email`,`PUT /api/users/:email`,`DELETE /api/users/:email` |
| UsersList | The page containing a list of all of the users registered in the system. | `GET /api/users`,`POST /api/users` |

## Overview of the Source Files

The following is an overview of the important source files contained
within this directory:

- `assets/`: A directory containing the basic files to be included
in the web application.
You shouldn't have much need to modify any of these files directly.
- `public/index.html`: This file is the main entrypoint for the application.
It will be automatically modified by webpack, before being copied into `/dist`.
- `src/components/Navbar.jsx`: A React component describing
the navigation bar which appears at the top of the page.
- `src/components/UserEdit.jsx`: A React component describing
a form to create or edit a user's account information.
- `src/components/Loader.jsx`: A React component describing
the loading spinner which appears when the page is making an API
request.
- `src/views/About.jsx`: A React component which defines
the "About" page of the application.
- `src/views/Home.jsx`: A React component which defines
the "Home" page of the application.
- `src/views/PageNotFound.jsx`: A React component which defines
the default 404 error view which is displayed when the user navigates
to an unknown page.
- `src/views/UserProfile.jsx`: A React component which defines
the profile page displayed whenever a user's name is clicked.
- `src/views/UsersList.jsx`: A React component which defines
the "Users" page of the application.
- `src/styles/about.module.css`: A stylesheet defining how the `About`
component defined in `src/views/About.jsx` should be displayed.
- `src/styles/errorpage.module.css`: A stylesheet defining how the `PageNotFound`
component defined in `src/views/PageNotFound.jsx` should be displayed.
- `src/styles/home.module.css`: A stylesheet defining how the `Home`
component defined in `src/views/Home.jsx` should be displayed.
- `src/styles/loader.module.css`: A stylesheet defining how the `Loader`
component defined in `src/components/Loader.jsx` should be displayed.
- `src/styles/navbar.module.css`: A stylesheet defining how the `NavBar`
component defined in `src/componentsNavbar.jsx` should be displayed.
- `src/styles/userEdit.module.css`: A stylesheet defining how the `UserEdit`
component defined in `src/componentsUserEdit.jsx` should be displayed.
- `src/styles/userProfile.module.css`: A stylesheet defining how the `UserProfile`
component defined in `src/views/UserProfile.jsx` should be displayed.
- `src/styles/usersList.module.css`: A stylesheet defining how the `UsersList`
component defined in `src/views/UsersList.jsx` should be displayed.
- `src/index.jsx`: A simple React component defining the main structure
of the application page, along with the script which mounts it to the
document.
- `tests/e2e/specs/userProfile.spec.js`: An end-to-end testing
specification defining tests for the `UserProfile.jsx` page.
- `tests/e2e/specs/usersList.spec.js`: An end-to-end testing
specification defining tests for the `UsersList.jsx` page.
- `cypress.json`: A configuration file for the
[Cypress](https://www.cypress.io) end-to-end testing tool.
- `package.json`: A manifest file containing important information
pertaining to the content of the package, including the package
name, version, and a list of dependencies.
- `webpack.config.js`: The main webpack configuration file, which
controls how the application is built.
See the
[Webpack Configuration Reference](https://webpack.js.org/configuration)
for more detail about configuring Webpack.
