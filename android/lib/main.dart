import 'package:adaptive_theme/adaptive_theme.dart';
import 'package:flutter/material.dart';
import 'views/home.dart';

/**
* This helper-method provides a way to generate the theme-data for the app in a way
* which is consistent between light and dark modes.
*/
TextTheme _generateTheme(Color fontColor) {
	return TextTheme(
		headline1: TextStyle(color: fontColor, fontSize: 28, fontWeight: FontWeight.bold),
		headline2: TextStyle(color: fontColor, fontSize: 22, decoration: TextDecoration.underline, fontWeight: FontWeight.bold),
		headline3: TextStyle(color: fontColor, fontSize: 22),
		headline4: TextStyle(color: fontColor, fontSize: 18, fontWeight: FontWeight.bold),
		headline5: TextStyle(color: fontColor, fontSize: 18)
	);
}

/**
* This class represents the root widget of the application.
*/
class MyApp extends StatelessWidget {
	/**
	* The "build" method defines the process of rendering the application to the screen.
	* In this case, it simply sets the theme of the app, and then populates the screen
	* with a new instance of `HomePage`.
	*/
	@override
	Widget build(BuildContext context) {
		// Set the title of the application's home page:
		final title = 'The Buzz';

		// Use the `AdaptiveTheme` library to allow the theme to be transitioned
		// between dark and light mode while the app is in use.
		return AdaptiveTheme(
			builder: (theme, darkTheme) {
				return MaterialApp(
					title: title,
					theme: theme,
					darkTheme: darkTheme,
					// Show the HomePage widget by default:
					home: HomePage(title: title)
				);
			},
			dark: ThemeData(
				brightness: Brightness.dark,
				primarySwatch: Colors.yellow,
				textTheme: _generateTheme(Colors.white)
			),
			initial: AdaptiveThemeMode.light,
			light: ThemeData(
				brightness: Brightness.light,
				primarySwatch: Colors.yellow,
				textTheme: _generateTheme(Colors.black)
			)
		);
	}
}

/**
* This is the main entrypoint to the entire application.
* When run, the app will be initialized with a new instance of `MyApp`, as defined above.
*/
void main() {
	runApp(MyApp());
}
