import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/users.dart';

/**
* The UserEdit widget allows the content of a particular user account to be updated,
* or for a new user account to be created.
*/
class UserEdit extends StatefulWidget {
	// Store the UserService singleton in order to perform all necessary calls to the API server:
	final UserService userService;

	// Store the user for editing, if one is provided:
	final User? user;

	/**
	* Define the default constructor, including an optional parameter for the initial User-data.
	*/
	UserEdit({Key? key, User? this.user, required this.userService}) : super(key: key);

	/**
	* Create the initial widget state
	*/
	@override
	UserEditState createState() => UserEditState();
}

/**
* Define a class to store the state data for the user editing form
*/
class UserEditState extends State<UserEdit> {
	// Declare a unique FormState in order to assist with validating the form's content:
	final _formKey = GlobalKey<FormState>();

	// Store data about the user being edited:
	String _originalEmail = '';
	User _user = User(email: '', name: '');

	/**
	* Initialize the state date with the provided data about the user being edited
	*/
	@override
	void initState() {
		if(widget.user != null) {
			this._originalEmail = widget.user!.email;
			this._user = widget.user!;
		}
	}

	/**
	* Define a short helper-method to upload the current user data to the API server.
	*/
	void _upload(BuildContext context) async {
		// Send a POST request if the user is being created from scratch,
		// and a PUT request if the user is being updated:
		if(this._originalEmail == '') {
			await widget.userService.post(this._user);
		} else {
			await widget.userService.put(this._originalEmail, this._user);
		}

		// Return to the previous screen, returning the new email address of the user:
		Navigator.pop(context, this._user.email);
	}

	/**
	* Construct the actual layout of the widget
	*/
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(title: Text(this._originalEmail == '' ? 'Create User' : this._user.name)),
			body: Center(
				child: Padding(
					padding: EdgeInsets.fromLTRB(10, 20, 10, 10),
					// The Form widget allows us to construct a set of form fields, like text inputs,
					// which are all connected to the same form key (_formKey), and which will all be
					// evaluated together when the "Submit" button is clicked:
					child: Form(
						key: _formKey,
						child: Column(
							crossAxisAlignment: CrossAxisAlignment.start,
							children: [
								// define the text field to input the "name" value:
								Padding(
									padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
									// The TextFormField widget creates a new text-entry box inside of a form widget:
									child: TextFormField(
										decoration: InputDecoration(
											border: OutlineInputBorder(),
											labelText: 'Name'
										),
										initialValue: this._user.name,
										// The validator checks that the name is valid before it is saved:
										validator: (String? value) {
											if (value == null || value.isEmpty) {
												return 'Name cannot be empty';
											}
											return null;
										},
										// The save-handler stores the name value back into the widget's user state:
										onSaved: (String? value) {
											setState(() {
												this._user.name = value!;
											});
										}
									)
								),

								// Define the text field to input the "email" value:
								Padding(
									padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
									child: TextFormField(
										decoration: InputDecoration(
											border: OutlineInputBorder(),
											labelText: 'Email'
										),
										initialValue: this._user.email,
										// The validator checks that the email is valid before it is saved:
										validator: (String? value) {
											if (value == null || value.isEmpty) {
												return 'Email cannot be empty';
											}
										},
										// The save-handler stores the email value back into the widget's user state:
										onSaved: (String? value) {
											setState(() {
												this._user.email = value!;
											});
										}
									)
								),

								// Define the text field to input the "bio" value:
								Padding(
									padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
									child: TextFormField(
										decoration: InputDecoration(
											border: OutlineInputBorder(),
											labelText: 'Bio'
										),
										initialValue: this._user.bio,
										// The validator checks that the bio is valid before it is saved:
										validator: (String? value) {
											if (value == null || value.isEmpty) {
												return 'Bio cannot be empty';
											}
										},
										// The save-handler stores the bio value back into the widget's user state:
										onSaved: (String? value) {
											setState(() {
												this._user.bio = value!;
											});
										}
									)
								),

								// Add a "submit" button to the bottom of the page:
								ElevatedButton(
									child: const Text('Submit'),
									onPressed: () {
										// Attempt to validate the input, and only proceed if it is valid:
										if (_formKey.currentState!.validate()) {
											// Display a snackbar message to indicate the data is being uploaded:
											ScaffoldMessenger.of(context).showSnackBar(
												const SnackBar(content: Text('Uploading User Data ...'))
											);

											// Save the form data back to the widget state, and upload it to the API server:
											this._formKey.currentState!.save();
											this._upload(context);
										}
									}
								)
							]
						)
					)
				)
			)
		);
	}
}
