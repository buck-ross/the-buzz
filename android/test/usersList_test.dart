import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:the_buzz/components/userEdit.dart';
import 'package:the_buzz/views/usersList.dart';
import 'package:the_buzz/views/userProfile.dart';
import 'mocks/users.dart';

/**
* This helper method loads the UsersList widget into the test harness,
* and waits for it to finish loading data from the mock API service.
*/
Future<void> loadWidget(WidgetTester tester) async {
	// Initialize our mock-up of the UserService object which will be passed into the widget:
	MockUserService service = MockUserService();

	// Build our app and trigger a frame:
	await tester.pumpWidget(MediaQuery(
		data: MediaQueryData(),
		child: MaterialApp(
			// Construct the UsersList object which will be tested:
			home: UsersList(userService: service)
		)
	));

	// Extract the state data from the UsersList widget:
	UsersListState state = tester.state(find.byType(UsersList));

	// Wait for the list to be returned, and the widget to reload:
	await state.futureList;
	await tester.pumpAndSettle();
}

/**
* This function is the main entrypoint for this part of the test harness.
*/
void main() {
	/**
	* Define a group of tests for the UsersList widget.
	*/
	group('UsersList', () {
		/**
		* Define a test to ensure the list of users is properly displayed by the widget.
		*/
		testWidgets('should display a list of all users', (WidgetTester tester) async {
			// Load the widget into the test harness:
			await loadWidget(tester);

			// Verify that the widget displays the two users returned by the mock:
			expect(find.byType(Card), findsNWidgets(2));

			// Ensure User A's account is displayed:
			expect(find.textContaining('User A'), findsOneWidget);
			expect(find.textContaining('a@example.com'), findsOneWidget);

			// Ensure User B's account is displayed:
			expect(find.textContaining('User B'), findsOneWidget);
			expect(find.textContaining('b@example.com'), findsOneWidget);
		});

		/**
		* Define a test to ensure the list of users is properly displayed by the widget.
		*/
		testWidgets('should open UserEdit when the + button is clicked', (WidgetTester tester) async {
			// Load the widget into the test harness:
			await loadWidget(tester);

			// Ensure the UserEdit screen is not open initially:
			expect(find.byType(UserEdit), findsNothing);

			// Tap the '+' button to trigger the create-user sequence:
			await tester.tap(find.byIcon(Icons.add));
			await tester.pumpAndSettle();

			// Ensure the UserEdit widget has been opened:
			expect(find.byType(UserEdit), findsOneWidget);
		});

		/**
		* Define a test to ensure that clicking on a user's card opens their profile page.
		*/
		testWidgets("should open UserProfile when a user's card is clicked", (WidgetTester tester) async {
			// Load the widget into the test harness:
			await loadWidget(tester);

			// Ensure the UserProfile screen is not open initially:
			expect(find.byType(UserProfile), findsNothing);

			// Tap User B's card to open their profile page:
			await tester.tap(find.textContaining('User B'));
			await tester.pumpAndSettle();

			// Ensure the UserProfile widget has been opened with the appropriate content:
			expect(find.byType(UserProfile), findsOneWidget);
			expect(find.textContaining('User A'), findsNothing);
			expect(find.textContaining("User B's Profile"), findsOneWidget);
		});
	});
}
