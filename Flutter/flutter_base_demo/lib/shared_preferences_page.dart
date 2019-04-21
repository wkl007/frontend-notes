import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TestSharedPreferences extends StatefulWidget {
  @override
  _TestSharedPreferencesState createState() => _TestSharedPreferencesState();
}

class _TestSharedPreferencesState extends State<TestSharedPreferences> {
  String countString = '';
  String localCount = '';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('SharePreferences'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        body: Center(
          child: Column(
            children: <Widget>[
              RaisedButton(
                onPressed: _incrementCounter,
                child: Text('Increment Counter'),
              ),
              RaisedButton(
                onPressed: _getCounter,
                child: Text('Get Counter'),
              ),
              Text(countString, style: TextStyle(fontSize: 20)),
              Text(localCount, style: TextStyle(fontSize: 20))
            ],
          ),
        ),
      ),
    );
  }

  _incrementCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      countString = countString + ' 1';
    });
    int counter = (prefs.getInt('counter') ?? 0) + 1;
    await prefs.setInt('counter', counter);
  }

  _getCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      localCount = prefs.getInt('counter').toString();
    });
  }
}
