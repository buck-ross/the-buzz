import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'base_url.dart';

/**
* Define a class to represent a single user, encompassing all of the data
* provided by the backend API server.
*/
class User {
	// Store all necessary information to keep track of a single user
	// Notice how these fields closely mirror those exposed in the backend API
	String email;
	String name;
	String bio;

	/**
	* Define a default constructor, taking all of the class's fields as required parameters
	*/
	User({Key? key, required this.email, required this.name, this.bio: '' });

	/**
	* Define a copy-constructor
	*/
	factory User.copy(User other) => User(
		email: other.email,
		name: other.name,
		bio: other.bio
	);

	/**
	* Define a secondary constructor ("factory") in order to de-serialize JSON strings
	* into `User` objects
	*/
	factory User.fromJson(Map<String, dynamic> json) {
		// If the 'bio' field is left null, leave it blank:
		var bio = json['bio'];
		if(bio == null) {
			bio = '';
		}

		// Construct the user from the JSON map:
		return User(
			email: json['email'],
			name: json['name'],
			bio: bio
		);
	}

	/**
	* Provide a method to convert the `User` object into a JSON string
	*/
	String toJson() {
		return jsonEncode(<String, String>{
			'email': this.email,
			'name': this.name,
			'bio': this.bio
		});
	}

	/**
	* Provide a method to check if two User objects are equal
	* I.E. if they contain all of the same information.
	*/
	operator==(Object other) {
		return other is User
			&& (this.email == other.email)
			&& (this.name == other.name)
			&& (this.bio == other.bio);
	}
}


/**
* Define a service class, containing a set of methods which allow
* user data structured within `User` objects to be directly sent & recieved
* to & from the API server.
*/
class UserService {
	// Use the Singleton pattern in order to provide a consistent UserService class:
	static final UserService _singleton = UserService._internal();

	// Declare the internal singleton constructor:
	UserService._internal();

	/**
	* Declare the singleton factory as the default constructor.
	*/
	factory UserService() {
		return _singleton;
	}


	/**
	* Provide a static method in order to construct a list of `User` objects
	* by sending a HTTP GET request to the API server.
	*/
	Future<List<User>> getAll() async {
		// Send the HTTP request:
		final response = await http.get(
			Uri.parse('${BASE_URL}/api/users')
		);
		print(response.body);

		// If the server did not return a 200 OK response, then throw an exception:
		if (response.statusCode != 200) {
			throw Exception('Failed to load list of users');
		}

		// Decode the list & return the result:
		List<dynamic> responseList= jsonDecode(response.body);
		List<User> userList = responseList.map((user) => User.fromJson(user)).toList();
		return userList;
	}

	/**
	* Provide a static method in order to construct a `User` object
	* by sending a HTTP GET request to the API server.
	*/
	Future<User> get(String email) async {
		// Send the HTTP request:
		final response = await http.get(
			Uri.parse('${BASE_URL}/api/users/${email}')
		);
		print(response.body);

		// If the server did not return a 200 OK response, then throw an exception:
		if (response.statusCode != 200) {
			throw Exception('Failed to load list of users');
		}

		// Decode the list & return the result:
		return User.fromJson(jsonDecode(response.body));
	}

	/**
	* Provide a method in order to upload a user to the application
	* by sending a HTTP POST request to the API server.
	*/
	Future<void> post(User user) async {
		// Send the HTTP request:
		final response = await http.post(
			Uri.parse('${BASE_URL}/api/users'),
			headers: <String, String>{
				'Content-Type': 'application/json',
			},
			body: user.toJson()
		);

		// If the server did not return a 201 OK response, then throw an exception:
		if (response.statusCode != 201) {
			print('Failed to upload user content');
			throw Exception('Failed to upload user content');
		}
	}

	/**
	* Provide a method in order to update a user within the application
	* by sending a HTTP PUT request to the API server.
	*/
	Future<void> put(String email, User user) async {
		// Send the HTTP request:
		final response = await http.put(
			Uri.parse('${BASE_URL}/api/users/${email}'),
			headers: <String, String>{
				'Content-Type': 'application/json',
			},
			body: user.toJson()
		);

		// If the server did not return a 204 OK response, then throw an exception:
		if (response.statusCode != 204) {
			print('Failed to upload user content');
			throw Exception('Failed to upload user content');
		}
	}

	/**
	* Provide a method in order to remove a user from the application
	* by sending a HTTP DELETE request to the API server.
	*/
	Future<void> delete(String email) async {
		// Send the HTTP request:
		final response = await http.delete(
			Uri.parse('${BASE_URL}/api/users/${email}'),
		);

		// If the server did not return a 204 OK response, then throw an exception:
		if (response.statusCode != 204) {
			print('Failed to upload user content');
			throw Exception('Failed to upload user content');
		}
	}
}
