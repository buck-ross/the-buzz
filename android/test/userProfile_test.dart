import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:the_buzz/components/userEdit.dart';
import 'package:the_buzz/services/users.dart';
import 'package:the_buzz/views/userProfile.dart';
import 'mocks/users.dart';

/**
* This helper method loads the UserProfile widget into the test harness,
* and waits for it to finish loading data from the mock API service.
*/
Future<void> loadWidget(WidgetTester tester, MockUserService service, String email) async {
	// Build our app and trigger a frame:
	await tester.pumpWidget(MediaQuery(
		data: MediaQueryData(),
		child: MaterialApp(
			// Construct the UserProfile object which will be tested:
			home: UserProfile(email: email, userService: service)
		)
	));

	// Extract the state data from the UserProfile widget:
	UserProfileState state = tester.state(find.byType(UserProfile));

	// Wait for the list to be returned, and the widget to reload:
	await state.futureUser;
	await tester.pumpAndSettle();
}

/**
* This function is the main entrypoint for this part of the test harness.
*/
void main() {
	/**
	* Define a group of tests for the UserProfile widget.
	*/
	group('UserProfile', () {
		/**
		* Define a test to ensure that the user's profile information is displayed on the page.
		*/
		testWidgets("should display the user's profile information", (WidgetTester tester) async {
			// Initialize our mock-up of the UserService object which will be passed into the widget:
			MockUserService service = MockUserService();

			// Extract the user to be displayed:
			final user = await service.get('b@example.com');

			// Load the widget into the test harness:
			await loadWidget(tester, service, user.email);

			// Ensure the title is properly displayed:
			expect(find.widgetWithText(AppBar, "${user.name}'s Profile"), findsOneWidget);

			// Ensure that all of the user's profile information is displayed on the page:
			expect(find.text(user.name), findsOneWidget);
			expect(find.textContaining(user.email), findsOneWidget);
			expect(find.textContaining(user.bio), findsOneWidget);
		});

		/**
		* Define a test to ensure that clicking the "edit" button launches the UserEdit widget:
		*/
		testWidgets("should open a UserEdit widget when the edit button is clicked", (WidgetTester tester) async {
			// Initialize our mock-up of the UserService object which will be passed into the widget:
			MockUserService service = MockUserService();

			// Extract the user to be displayed:
			final user = await service.get('b@example.com');

			// Load the widget into the test harness:
			await loadWidget(tester, service, user.email);

			// Ensure the UserEdit screen is not open initially:
			expect(find.byType(UserEdit), findsNothing);

			// Tap the menu button to open the speed-dial menu:
			await tester.tap(find.byType(SpeedDial));
			await tester.pumpAndSettle();

			// Tap the edit button to launch the UserEdit widget:
			await tester.tap(find.byIcon(Icons.edit));
			await tester.pumpAndSettle();

			// Ensure the UserEdit widget has been opened:
			expect(find.byType(UserEdit), findsOneWidget);
		});

		/**
		* Define a test to ensure that clicking the "delete" button prompts for user deletion:
		*/
		testWidgets("should prompt to delete the user's information when the delete button is clicked", (WidgetTester tester) async {
			// Initialize our mock-up of the UserService object which will be passed into the widget:
			MockUserService service = MockUserService();

			// Extract the user to be displayed:
			final user = await service.get('b@example.com');

			// Load the widget into the test harness:
			await loadWidget(tester, service, user.email);

			// Ensure the UserEdit screen is not open initially:
			expect(find.byType(UserEdit), findsNothing);

			// Tap the menu button to open the speed-dial menu:
			await tester.tap(find.byType(SpeedDial));
			await tester.pumpAndSettle();

			// Tap the delete button to prompt for user deletion:
			await tester.tap(find.byIcon(Icons.delete_forever));
			await tester.pumpAndSettle();

			// Ensure that the user has not yet been deleted:
			expect(await service.get('b@example.com'), equals(user));

			// Ensure a deletion button is displayed:
			final deleteButton = find.widgetWithText(TextButton, 'Delete Forever');
			expect(deleteButton, findsOneWidget);

			// Click on the deletion button:
			await tester.tap(deleteButton);
			await tester.pumpAndSettle();

			// Ensure the User was deleted:
			expect(service.get('b@example.com'), throwsA(isA<Exception>()));
		});
	});
}
