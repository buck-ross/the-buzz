import 'package:flutter/material.dart';
import '../components/navdrawer.dart';

/**
* The `HomePage` widget defines the content of the main page of the application.
* At the moment, this consists only of the application's logo & title.
*/
class HomePage extends StatelessWidget {
	final String title; // The title of the app

	/**
	* Define the default constructor for the page, taking the app's title as a parameter.
	*/
	HomePage({Key? key, required this.title}) : super(key: key);

	/**
	* The `build` method returns the page's content.
	*/
	@override
	Widget build(BuildContext context) {
		// The following three lines are used to compute the dimensions for the application's logo.
		// They basically just find the shortest side of the viewport, and multiply it by 2/3:
		var width = MediaQuery.of(context).size.width;
		var height = MediaQuery.of(context).size.height - MediaQuery.of(context).padding.top - 20;
		var dimensions = 2/3 * (width < height ? width : height);

		return Scaffold(
			// Declare the title bar which appears at the top of the app:
			appBar: AppBar(title: Text(this.title)),

			// Center is a layout widget which centers its contents relative to its parent:
			body: Center(
				// Column is also a layout widget. It takes a list of children and stacks them
				// on top of each other vertically, forming a vertical column:
				child: Column(
					mainAxisAlignment: MainAxisAlignment.start,
					children: <Widget>[
						// The Padding widget inserts some extra space around its child widget:
						Padding(
							// Pad all both sides and the bottom by 10 pixels, and pad the top by 20:
							padding: EdgeInsets.fromLTRB(10, 20, 10, 10),
							// Display the application's logo image:
							child: Image(
								image: AssetImage('assets/logo.png'),
								height: dimensions,
								width: dimensions
							),
						),

						// `Text.rich` is a good way to create a piece of text of which certain parts
						// are stylized differently from the whole. For example, certain sections
						// of text can be made bold, italicized, underlined, or colored differently:
						// https://api.flutter.dev/flutter/widgets/Text/Text.rich.html
						Text.rich(
							TextSpan(
								text: 'Welcome to ',
								style: Theme.of(context).textTheme.headline1,
								children: [
									TextSpan(
										text: 'The Buzz',
										style: TextStyle(fontStyle: FontStyle.italic)
									),
									TextSpan(text: '!')
								]
							),
							textAlign: TextAlign.center
						)
					]
				)
			),

			// Declare the application's navigation drawer:
			drawer: NavDrawer(context)
		);
	}
}
