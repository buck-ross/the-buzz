import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:url_launcher/url_launcher.dart';
import '../components/navdrawer.dart';

/**
* The `AboutPage` is a stateless page which contains some cursory information about the application.
* This page isn't strictly necessary to the application's functionality, but it does provide
* a good example of how to properly use a `StatelessWidget`, and it also may be useful to inform
* anyone who happens to stumble across the app on the Google Play Store as to the purpose of this app.
*/
class AboutPage extends StatelessWidget {
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(title: Text('About')),
			body: Center(
				child: Padding(
					padding: EdgeInsets.fromLTRB(10, 20, 10, 10),
					child: Column(
						mainAxisAlignment: MainAxisAlignment.start,
						children: [
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
							),

							// Inserting padding along the top of each RichText component spaces
							// them out into separate paragraphs:
							Padding(
								padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
								child: Text.rich(
									TextSpan(
										text: 'The Buzz',
										style: TextStyle(fontStyle: FontStyle.italic),
										children: <TextSpan>[
											TextSpan(
												text: ' is a simple template for a modern full-stack application'
													+ ' with all the bells and whistles included.'
													+ ' This project includes an administrative library/CLI,'
													+ ' a backend HTTP API server, a web UI powered by React,'
													+ ' and an android app built with the Flutter framework.',
												style: TextStyle(fontStyle: FontStyle.normal)
											),
										]
									),
									textAlign: TextAlign.center
								)
							),

							Padding(
								padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
								child: Text.rich(
									TextSpan(
										text: 'With a little development effort, you can turn',
										children: <TextSpan>[
											TextSpan(
												text: ' The Buzz',
												style: TextStyle(fontStyle: FontStyle.italic)
											),
											TextSpan(
												text: ' into anything you want it to be.'
											)
										]
									),
									textAlign: TextAlign.center
								)
							),

							Padding(
								padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
								child: Text.rich(
									TextSpan(
										text: 'For more information, check out our ',
										children: <TextSpan>[
											// The TapGestureRecognizer code here turns this TextSpan into a clickable link:
											TextSpan(
												text: 'Official Development Guide',
												style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
												recognizer: new TapGestureRecognizer()
													..onTap = () { launch('https://buck-ross.github.io/survival-guide/the_buzz'); }
											),
											TextSpan(
												text: ', or visit our '
											),
											// The TapGestureRecognizer code here turns this TextSpan into a clickable link:
											TextSpan(
												text: 'BitBucket Page',
												style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
												recognizer: new TapGestureRecognizer()
													..onTap = () { launch('https://bitbucket.org/buck-ross/the-buzz'); }
											),
											TextSpan(
												text: '.'
											)
										]
									),
									textAlign: TextAlign.center
								)
							)
						]
					)
				)
			),
			drawer: NavDrawer(context)
		);
	}
}
