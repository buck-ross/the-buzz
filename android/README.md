# The Buzz (Android)

This part of the repository contains the code for the android application
which serves as an alternative to the web interface for *The Buzz*.
This app is built with the [Flutter framework](https://flutter.dev).

## Running the App

To run the app, follow these steps:

1. Open a new terminal in the directory containing this README file
(press *Ctrl+\`* in VSCode).
2. Make sure you have an android device connected to your computer.
This can either be physical android phone connected via USB cable,
or just an android emulator launched through Android Studio.
3. Make sure that flutter is configured properly,
and that the device is reachable, by running `flutter doctor`.
4. Pull all of the dependencies by running `flutter pub get`.
5. Build & launch the app for debugging by running `flutter run`.
6. **(optional)** with the `flutter run` command still running,
copy the link in the command output,
and paste it into your web browser's address bar.
This will give you access to a graphical debugging interface,
which is useful for visualizing your app's structure.
7. When you're done debugging,
stop the `flutter run` process by typing `q` into your terminal.
8. **(optional)** build & install a production release of your app by running
`flutter build apk`, followed by `flutter install`.

You can also run all of the widget tests for the application
with `flutter test`, or for more verbose output, try `flutter test -r expanded`.

For help getting started with Flutter, view the
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Page widgets in the Interface

| **Name** | **Description** | **Consumed Services** |
|---|---|---|
| `About` | A simple page with some cursory information about the project. | *N/A* |
| `Home` | A welcome page displaying the site's logo and a short message. | *N/A* |
| `UserProfile` | The page that is displayed whenever a user's name or email is clicked. | `UserService.get`, `UserService.delete` |
| `UsersList` | The page containing a list of all of the users registered in the system. | `UserService.getAll` |
| `UserEdit` | The page which allows a user's information to be created or updated. | `UserService.post`, `UserService.put` |

## API Data Services

| **Name** | **Description** | **Methods** |
|---|---|---|
| `UserService` | Provides an interface to exchange `User` entities with the `/api/users` | `Future<List<User>> getAll()`, `Future<User> get(String email)`, `Future<void> post(User user)`, `Future<void> put(String email, User user)`, `Future<void> delete(String email)` |

## Overview of the Source Files

The following is an overview of the important source files contained
within this directory:

- `android/`: This directory contains all of the configuration
for the android build environment.
For the most part, you shouldn't need to tamper with this directory too much,
unless you need to add more android permissions or capabilities to your app.
- `assets/logo.png`: This is the logo that will be displayed
as the application's icon when it's installed on your device.
- `lib/main.dart`: This file defines the general framework of the application,
including it's theme data.
- `lib/components/navdrawer.dart`: This file defines the content
and functionality of the navigation drawer which can be opened
by clicking the sandwich icon in the upper left corner of most pages.
- `lib/components/userEdit.dart`: This file defines the UserEdit widget
which is launched by UsersList and UserProfile in order to create
or update each user's data.
- `lib/services/base_url.dart`: This file contains the configuration
for the base URL of the application.
By default, this is just the URL of the demo server
(https://the-buzz-demo.herokuapp.com), but this can be re-configured
to point the app to a different backend API server.
- `lib/services/users.dart`: This file defines the data model (`User`),
and API interface (`UserService`) for exchanging application information
with the `/api/users` API endpoint.
- `lib/views/about.dart`: This file defines a widget containing the content
of the About page of the application.
- `lib/views/home.dart`: This file defines a widget containing the content
of the Home page of the application.
- `lib/views/usersList.dart`: This file defines a widget containing the content
of the Users Directory page of the application.
- `lib/views/userProfile.dart`: This file defines a widget containing the
content of the User Profile page of the application.
- `test/mocks/users.dart`: This file defines a mock interface
which is compatible with the `UserService` class,
defined in `lib/services/users.dart`, except instead of connecting
to an actual API server, it simulates the API using an internal `User` list.
This is extremely useful for ensuring a consistent testing environment,
without relying on a consistent API service.
- `test/userEdit_test.dart`: This file defines a set of widget tests
to ensure that the UserEdit widget is able to correctly upload new users
and updates to existing users.
- `test/userProfile_test.dart`: This file defines a set of widget tests
to ensure that the UserProfile widget is able to correctly display
and interact with a user's profile information.
- `test/usersList_test.dart`: This file defines a set of widget tests
to ensure that the UsersList widget is able to correctly display a list
of users from the API server.
- `pubspec.yaml`: This file defines the application configuration,
including a list of all of the dependencies of the app.
- `pubspec.lock`: This file is auto-generated by flutter's `pub get` command.
It includes more detailed information regarding the exact version of each
of the dependencies in order to maintain a consistent build environment.
It's kind of like Node.JS's `package-lock.json` file.
