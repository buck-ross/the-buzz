# The Buzz

---
## Important

This repository was created to supplement the guidebook titled "The Buzz".
If you want to get the most out of this repository, it is strongly encouraged
that you go checkout that guide, which can be found
[here](https://buck-ross.github.io/survival-guide/the_buzz).

---

Welcome!
This repository contains a simple template for a modern full-stack application.

This program is broken down into 3 parts:

1. [web](./web/README.md): A web-based user interface built in JavaScript,
HTML, & CSS, using the [Vue.JS](https://reactjs.org) library.
2. [android](./android/README.md): An android app, built with the
[Flutter framework](https://flutter.dev), which provides an alternative
user interface, which can be used instead of the web interface.
3. [backend](./backend/README.md): A JavaScript HTTP API server built on
[Node.JS](https://nodejs.org), with the [Express.JS](https://expressjs.com)
library.
4. [database](./database/README.md): A JavaScript library
and command-line program to interface
with the [PostgreSQL](https://www.postgresql.org) database.
This library is crucial to provide consistent database access
to the backend API server.

## Demo

For your convenience, a working demo of this application,
including a functioning web UI and API server, is available
[here](https://the-buzz-demo.herokuapp.com).
The android app is configured to use this demo URL as the default API service.
A working version of the demo android app is also available for download for free,
via the [Google Play Store](https://play.google.com/store/apps/details?id=com.github.buck_ross.the_buzz).

## Dependencies

Before developing this application, make sure you have the following programs
installed on your computer:

- **[Docker](https://docker.com/get-started)**
([Windows](https://docs.docker.com/docker-for-windows/install),
[Mac](https://docs.docker.com/docker-for-mac/install)):
A platform for developing & running software
inside of Linux containers.
- **[Git](https://git-scm.com/downloads)**:
an open source version-control system.
- **[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)**:
Heroku is a free platform for deploying small-scale applications.
- **[Node.JS](https://nodejs.org/en)**:
a JavaScript runtime environment for everything from CLIs to servers.
Note that this is not required to build the application with the Heroku CLI,
but is helpful for local development of the project.

## Building & Publishing

To build the parts of the project individually, you can follow the instructions
in each of the README files linked in the list above.
It is not required to build the individual parts of the application
before building & publishing the application for Heroku with Docker.

To publish to Heroku, you can follow their documentation,
follow these steps:

1. Clone the repository (follow the instructions at the top of the page)
2. Create a [new account on Heroku](https://signup.heroku.com/login)
(fill out the required information, select "Student" as your role,
and "Node.js" as your primary language).
3. Next, login to your heroku account by running `heroku login`
4. Log in to the Heroku Container Registry: `heroku container:login`.
5. Create a new application on Heroku: `heroku create`.
This will create a new application, and will print the name of that application
to the command line.
You should then export this name by running `export APP='your-app-name-here'`.
6. Provision a new PostgreSQL database on Heroku for your application:
`heroku addons:create heroku-postgresql -a $APP`
7. Enter the directory you cloned: `cd the-buzz`.
8. Build the Docker container: `heroku container:push web -a $APP`.
9. Release the container to your application:
`heroku container:release web -a $APP`.
10. Open the compiled application in your browser: `heroku open -a $APP`.

Note that once you've deployed your application once, it is only necessary
to perform steps 7-10 in order to re-deploy your application
after you've changed some of the code.

## License

**Copyright &copy; 2021 Buckley Ross**

This project is licensed under the [ISC](https://opensource.org/licenses/ISC)
licensing agreement for open source software.
For more information, please see the file named "*LICENSE.txt*"
included within this repository.

Please note that although this software is open source,
that does not automatically mean that any derivative work
created by you actually belongs to you.
For example, if you are instructed to develop a derivative application
as part of a university course or under contract with a company,
then **the terms and conditions of that assignment may prevent you
from publishing your work** under the ISC license.
This is not legal advice.
Please consult with your professor or supervisor before publishing your work.
