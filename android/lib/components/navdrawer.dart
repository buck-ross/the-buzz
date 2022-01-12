import 'package:adaptive_theme/adaptive_theme.dart';
import 'package:flutter/material.dart';
import '../views/about.dart';
import '../views/home.dart';

/**
* The `NavDrawer` widget provides the left-side navigation panel of the app
* which can be opened either by clicking on the upper-left sandwich icon,
* or by swiping right from the far-left side of the app.
*/
class NavDrawer extends Drawer {
	bool toggleTheme = false;
	NavDrawer(BuildContext context): super(
		// Add a ListView to the drawer. This ensures the user can scroll
		// through the options in the drawer if there isn't enough vertical
		// space to fit everything.
		child: ListView(
			padding: EdgeInsets.zero, // Remove all padding from the ListView
			children: [
				// At the top of the drawer, display a little header with an account icon:
				DrawerHeader(
					decoration: BoxDecoration(
						color: Theme.of(context).colorScheme.primary
					),
					child: Icon(Icons.account_circle, size: 90)
				),

				// Display a list of links, each of which opens a different page of the application:
				ListTile(
					title: const Text('Home'),
					onTap: () {
						Navigator.pushReplacement(context, new MaterialPageRoute(
							builder: (_) => new HomePage(title: 'The Buzz')
						));
					}
				),
				ListTile(
					title: const Text('About'),
					onTap: () {
						Navigator.pushReplacement(context, new MaterialPageRoute(
							builder: (_) => new AboutPage()
						));
					}
				),

				// At the bottom of the navigation drawer, add an `ElevatedButton` to
				// allow the user to toggle between light and dark mode:
				Padding(
					padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
					child: ElevatedButton(
						child: const Text('Toggle Dark Mode'),
						// Use the `AdaptiveTheme` class in order to switch the application
						// between light and dark mode each time the button is pressed:
						onPressed: () {
							final theme = AdaptiveTheme.of(context);
							if(theme.mode == AdaptiveThemeMode.light) {
								theme.setDark();
							} else {
								theme.setLight();
							}
						}
					)
				)
			]
		)
	);
}
