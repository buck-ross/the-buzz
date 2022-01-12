import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import '../components/userEdit.dart';
import '../services/users.dart';

/**
* This widget represents the page which displays all of the details of a single user account.
*/
class UserProfile extends StatefulWidget {
	// Store the UserService singleton in order to perform all necessary calls to the API server:
	final UserService userService;

	// Store the email of the account to lookup:
	final String email;

	/**
	* Define the default constructor
	*/
	UserProfile({Key? key, required this.email, required this.userService}) : super(key: key);

	/**
	* Initialize the state of the widget
	*/
	@override
	UserProfileState createState() => UserProfileState();
}

/**
* This class stores all of the state information relating to the profile page.
*/
class UserProfileState extends State<UserProfile> {
	// Keep track of the download progress when getting the user data from the API server:
	late Future<User> futureUser;

	/**
	* Initialize the state from the email address provided to the widget
	*/
	@override
	void initState() {
		futureUser = widget.userService.get(widget.email);
	}

	/**
	* Provide a helper function to send a DELETE request to the API server
	* in order to delete the current user.
	*/
	Future<void> _delete() async {
		// Wait for the user data to download from the API;
		User user = await this.futureUser;

		// Send the API request to delete the user:
		await widget.userService.delete(user.email);

		// Return to the previous screen:
		Navigator.pop(context);
	}

	/**
	* Provide a helper function to open an editor screen to update
	* the current user's information
	*/
	void _edit() async {
		// Wait for the user data to download from the API;
		User user = await this.futureUser;

		// Open the UserEdit widget, keeping track of the email address yielded after the edit:
		String? email = await Navigator.push(
			context,
			MaterialPageRoute(
				builder: (context) {
					return UserEdit(user: user, userService: widget.userService);
				}
			)
		);

		// If the UserEdit widget yields a new email address, update the current widget to reflect
		// the content of the updated user's detauls:
		if(email != null) {
			setState(() {
				futureUser = widget.userService.get(email);
			});
		}
	}

	/**
	* Define a helper-method to open a confirmation prompt before sending a DELETE request
	* to the API server to delete the current user.
	*/
	void _confirmDelete(BuildContext context) async {
		// Wait for the user data to download from the API;
		User user = await this.futureUser;

		// Display a dialog widget asking the user if they are sure they want
		// to delete the current user:
		showDialog(
			context: context,
			builder: (BuildContext context) {
				return AlertDialog(
					// Display the warning text:
					title: Text('Warning'),
					content: Text(
						'This action cannot be undone. Are you sure you want to delete the user'
						+ ' ${user.name}?'
					),
					actions: [
						// Display the "Cancel" button:
						TextButton(
							child: Text('Cancel'),
							onPressed: () {
								Navigator.of(context).pop(); // dismiss the dialog
							}
						),
						// Display the "Delete" button:
						TextButton(
							child: Text('Delete Forever', style: TextStyle(color: Colors.red)),
							onPressed: () async {
								await this._delete(); // Send the "delete" request
								Navigator.of(context).pop(); // dismiss the dialog
							}
						)
					]
				);
			}
		);
	}

	/**
	* Construct the actual content of the UserProfile widget
	*/
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(
				// Update the title, depending on the status of the download
				// of the user's data from the API server:
				title: FutureBuilder<User>(
					future: futureUser,
					builder: (context, snapshot) {
						if(snapshot.hasData) {
							return Text('${snapshot.data!.name}\'s Profile');
						}
						if(snapshot.hasError) {
							return Text('Error');
						}
						return Text('Loading Profile ...');
					}
				)
			),
			body: Center(
				child: Padding(
					padding: EdgeInsets.fromLTRB(10, 20, 10, 10),
					// Update the content of the page depending on the status of the download
					// of the user's data from the API server:
					child: FutureBuilder<User>(
						future: futureUser,
						builder: (context, snapshot) {
							if(snapshot.hasData) {
								// If the download completes successfully, build the profile page,
								// filling in all of the user's details in the appropriate places:
								return Column(
									mainAxisAlignment: MainAxisAlignment.start,
									children: [
										// Display the user's name at the top of the page:
										Text(
											'${snapshot.data!.name}',
											style: Theme.of(context).textTheme.headline1,
											textAlign: TextAlign.center
										),
										// Display the user's email address:
										Padding(
											padding: EdgeInsets.fromLTRB(0, 10, 0, 0),
											child: Text.rich(
												TextSpan(
													text: 'Email: ',
													style: Theme.of(context).textTheme.headline2,
													children: [
														// Stylize the email address itself as a hyperlink:
														TextSpan(
															text: '${snapshot.data!.email}',
															style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
															// If the link is clicked, open it in the device's email client:
															// https://en.wikipedia.org/wiki/Mailto
															recognizer: new TapGestureRecognizer()
																..onTap = () { launch('mailto:${snapshot.data!.email}'); }
														)
													]
												),
												textAlign: TextAlign.center
											)
										),
										// Display the user's bio text:
										Padding(
											padding: EdgeInsets.fromLTRB(0, 10, 0, 0),
											child: Text(
												'${snapshot.data!.bio}',
												textAlign: TextAlign.center
											)
										)
									]
								);
							} else if (snapshot.hasError) {
								// If the download from the API server fails, display the error message on the screen:
								print(snapshot.error);
								return Text('${snapshot.error}', style: TextStyle(color: Colors.red));
							} else {
								// By default (assuming the API server's download is still being processed),
								// show a loading spinner:
								return CircularProgressIndicator();
							}
						}
					)
				)
			),

			// Display a SpeedDial widget in place of the application's action-button.
			// The SpeedDial widget can be used to expand one button into a set of other buttons.
			// In this case, we'll use it to show buttons for editing and deleting the user's profile:
			floatingActionButton: SpeedDial(
				animatedIcon: AnimatedIcons.menu_close,
				backgroundColor: Theme.of(context).colorScheme.primary,
				children: [
					// Declare the sub-button to trigger the user-deletion process:
					SpeedDialChild(
						backgroundColor: Colors.red,
						child: Icon(Icons.delete_forever),
						label: 'Delete',
						onTap: () => this._confirmDelete(context)
					),
					// Declare the sub-button to display the user-edit form:
					SpeedDialChild(
						child: Icon(Icons.edit),
						label: 'Edit',
						onTap: () => this._edit()
					)
				]
			)
		);
	}
}
