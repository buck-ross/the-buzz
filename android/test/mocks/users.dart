import 'package:the_buzz/services/users.dart';

/**
* This class provides an interface compatible with the UserService interface,
* except without making any calls to the HTTP API.
* Instead, it used an internal list of users in order to simulate the results
* of interactions with an external HTTP API.
*/
class MockUserService implements UserService {
	// Declare the list of users which will be used to simulate API results:
	List<User> users = [
		User(name: 'User A', email: 'a@example.com', bio: 'I am A'),
		User(name: 'User B', email: 'b@example.com', bio: 'I am B')
	];

	/**
	* Mock the `getAll` method from the UserService class by returning a list of all users
	* stored inside `this.users`.
	*/
	Future<List<User>> getAll() async {
		// Use the `List.map` to remove the `bio` field from each of the User objects in the output:
		return this.users.map((user) {
			return User(name: user.name, email: user.email);
		}).toList();
	}

	/**
	* Mock the `get` method from the UserService class by scanning the `users` list
	* for the user in question, and returning their details.
	*/
	Future<User> get(String email) async {
		// Scan the `users` list for the user with the corresponding email address:
		for(User user in this.users) {
			if(user.email == email) {
				return User.copy(user);
			}
		}

		// If no user is found, throw an error:
		throw Exception("User ${email} not found");
	}

	/**
	* Mock the `post` method from the UserService class by inserting the provided user
	* into the `users` list.
	*/
	Future<void> post(User newUser) async {
		// Throw an error if the user already exists:
		for(User user in this.users) {
			if(user.email == newUser.email) {
				throw Exception("User ${newUser.email} already exists");
			}
		}

		// Insert the user into the list:
		this.users.add(User.copy(newUser));
	}

	/**
	* Mock the `put` method from the UserService class by updating the information
	* of the user with the corresponding email address.
	**/
	Future<void> put(String email, User updatedUser) async {
		// Scan the `users` list for the user with the corresponding email address:
		for(User user in this.users) {
			if(user.email == email) {
				user.name = updatedUser.name;
				user.email = updatedUser.email;
				user.bio = updatedUser.bio;
				return;
			}
		}

		// If no user is found, throw an error:
		throw Exception("User ${email} not found");
	}

	/**
	* Mock the `delete` method of the UserService class by removing the user
	* with the corresponding email address from the `users` list.
	*/
	Future<void> delete(String email) async {
		// Scan the `users` list for the user with the corresponding email address:
		for(int i = 0; i < this.users.length; i++) {
			if(this.users[i].email == email) {
				this.users.removeAt(i);
				return;
			}
		}

		// If no user is found, throw an error:
		throw Exception("User ${email} not found");
	}
}
