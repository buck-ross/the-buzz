import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../components/navdrawer.dart';
import '../components/userEdit.dart';
import '../services/users.dart';
import 'userProfile.dart';

/**
* The UsersList widget defines the main directory list of all of the users
* on the platform.
*/
class UsersList extends StatefulWidget {
	// Store the UserService singleton in order to perform all necessary calls to the API server:
	final UserService userService;

	/**
	* Define the default constructor
	*/
	UsersList({Key? key, required this.userService}): super(key: key);

	/**
	* Override the createState function
	*/
	@override
	UsersListState createState() => UsersListState();
}

/**
* Define the widget state and structure of the UsersList
*/
class UsersListState extends State<UsersList> {
	// Keep track of the download progress when getting the list of users from the API server:
	late Future<List<User>> futureList;

	/**
	* Initialize the widget's state data.
	*/
	@override
	void initState() {
		futureList = widget.userService.getAll();
	}

	/**
	* This helper-method handles the process of transitioning over to the UserEdit
	* screen in order to create a new user's profile.
	*/
	void _addUser() async {
		// Prompt the user to create the new user, and
		// wait for them to finish the upload process:
		await Navigator.push(
			context,
			MaterialPageRoute(
				builder: (context) {
					return UserEdit(userService: widget.userService);
				}
			)
		);

		// Refresh the user state after the upload is complete:
		setState(() {
			futureList = widget.userService.getAll();
		});
	}

	/**
	* This helper-method handles the process of transitioning over to the UserProfile
	* screen whenever a user's name/email is tapped.
	*/
	void _tapUser(User user) async {
		// Open the UserProfile widget:
		await Navigator.push(
			context,
			MaterialPageRoute(
				builder: (context) {
					return UserProfile(email: user.email, userService: widget.userService);
				}
			)
		);

		// In case the user was updated, refresh the widget:
		setState(() {
			futureList = widget.userService.getAll();
		});
	}

	/**
	* Construct the actual structure of the UsersList widget.
	*/
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			// Declare the page title at the top of the screen:
			appBar: AppBar(title: Text('Users')),

			// Change what the body of the application is displaying depending on the current state
			// of the download of the list of all of the users from the API server:
			body: FutureBuilder<List<User>>(
				future: futureList,
				builder: (context, snapshot) {
					if(snapshot.hasData) {
						// If the list data is available, render a list of all of the users, including
						// their name and email address:
						//
						// ListView is a nice widget for displaying potentially long lists of widgets.
						// It has built-in support for scroll-wrapping in case the list is too long
						// to fit in the ListView.
						return ListView(
							children: [
								// Construct a separate Card widget to present each user whose data
								// is present in the list downloaded from the API server:
								for(User user in snapshot.data!) Card(
									child: InkWell(
										child: Center(
											child: Padding(
												padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
												// Display the user's information:
												child: Text(
													'${user.name} <${user.email}>',
													textAlign: TextAlign.center
												)
											)
										),
										// When the Card is tapped, navigate to the UserProfile page:
										onTap: () {
											_tapUser(user);
										}
									)
								)
							]
						);
					} else if (snapshot.hasError) {
						// If the list data is not available due to some sort of error, display
						// that error message in place of the users list:
						print(snapshot.error);
						return Center(
							child: Text('${snapshot.error}', style: TextStyle(color: Colors.red))
						);
					} else {
						// If the data from the API is still being processed, show a loading spinner:
						return Center(
							child: CircularProgressIndicator()
						);
					}
				}
			),

			// Declare a FloatingActionButton which will navigate to the EditUser page
			// in order to create a new user account whenever this button is tapped:
			floatingActionButton: FloatingActionButton(
				backgroundColor: Theme.of(context).colorScheme.primary,
				onPressed: () {
					_addUser();
				},
				tooltip: 'Add User',
				child: Icon(Icons.add)
			),

			// Declare the left-side navigation drawer:
			drawer: NavDrawer(context)
		);
	}
}
