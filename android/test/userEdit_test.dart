import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:the_buzz/components/userEdit.dart';
import 'package:the_buzz/services/users.dart';
import 'mocks/users.dart';
//import 'wrappers/userEdit.dart';

/**
* This function is the main entrypoint for this part of the test harness.
*/
void main() {
	/**
	* Define a group of tests for the UserEdit widget.
	*/
	group('UserEdit', () {
		/**
		* Define a test to ensure the process of uploading a new user works properly.
		*/
		testWidgets('should upload a new user when nothing is provided', (WidgetTester tester) async {
			// Define the mock service:
			MockUserService service = MockUserService();

			// Build our app and trigger a frame:
			await tester.pumpWidget(MediaQuery(
				data: MediaQueryData(),
				child: MaterialApp(
					// Construct the UserEdit object which will be tested:
					home: UserEdit(user: null, userService: service)
				)
			));

			// Locate all of the text input fields:
			final nameField = find.widgetWithText(TextFormField, 'Name');
			final emailField = find.widgetWithText(TextFormField, 'Email');
			final bioField = find.widgetWithText(TextFormField, 'Bio');

			// Ensure the title is properly displayed:
			expect(find.widgetWithText(AppBar, 'Create User'), findsOneWidget);

			// Enter a new user's details:
			final newUser = User(name: 'User C', email: 'c@example.com', bio: 'I am C');
			await tester.enterText(nameField, newUser.name);
			await tester.enterText(emailField, newUser.email);
			await tester.enterText(bioField, newUser.bio);

			// Tap the submit button & wait for the
			await tester.tap(find.widgetWithText(ElevatedButton, 'Submit'));
			await tester.pumpAndSettle();

			// Check that the UserEdit element has been destroyed:
			expect(find.byType(UserEdit), findsNothing);

			// Ensure that the User has been uploaded:
			expect(await service.getAll(), hasLength(3));
			expect(await service.get(newUser.email), equals(newUser));
		});

		/**
		* Define a test to ensure the process of updating an existing user works properly.
		*/
		testWidgets('should update an existing user when one is provided', (WidgetTester tester) async {
			// Define the mock service:
			MockUserService service = MockUserService();

			// Define the original user:
			final originalUser = await service.get('a@example.com');

			// Build our app and trigger a frame:
			await tester.pumpWidget(MediaQuery(
				data: MediaQueryData(),
				child: MaterialApp(
					// Construct the UserEdit object which will be tested:
					home: UserEdit(user: User.copy(originalUser), userService: service)
				)
			));

			// Locate all of the text input fields:
			final nameField = find.widgetWithText(TextFormField, 'Name');
			final emailField = find.widgetWithText(TextFormField, 'Email');
			final bioField = find.widgetWithText(TextFormField, 'Bio');

			// Ensure the title is properly displayed:
			expect(find.widgetWithText(AppBar, 'User A'), findsOneWidget);

			// Ensure the user's data is properly displayed:
			expect(find.ancestor(of: find.textContaining(originalUser.name), matching: nameField), findsOneWidget);
			expect(find.ancestor(of: find.textContaining(originalUser.email), matching: emailField), findsOneWidget);
			expect(find.ancestor(of: find.textContaining(originalUser.bio), matching: bioField), findsOneWidget);

			// Enter a new user's details:
			final updatedUser = User(name: 'User C', email: 'c@example.com', bio: 'I am C');
			await tester.enterText(nameField, updatedUser.name);
			await tester.enterText(emailField, updatedUser.email);
			await tester.enterText(bioField, updatedUser.bio);

			// Tap the submit button & wait for the
			await tester.tap(find.widgetWithText(ElevatedButton, 'Submit'));
			await tester.pumpAndSettle();

			// Check that the UserEdit element has been destroyed:
			expect(find.byType(UserEdit), findsNothing);

			// Ensure that the User has been uploaded:
			expect(await service.getAll(), hasLength(2));
			expect(await service.get(updatedUser.email), equals(updatedUser));

			// Ensure that the old user no longer exists, and the looking them up results in an error:
			expect(service.get(originalUser.email), throwsA(isA<Exception>()));
		});
	});
}
