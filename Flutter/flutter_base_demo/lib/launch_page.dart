import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

/// 打开第三方应用
class LaunchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('打开第三方应用'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        body: Container(
          decoration: BoxDecoration(color: Colors.blueGrey),
          alignment: Alignment.center,
          child: Column(
            children: <Widget>[
              RaisedButton(
                onPressed: () => _launchURL(),
                child: Text('打开网页'),
              ),
              RaisedButton(
                onPressed: () => _openMap(),
                child: Text('打开地图'),
              )
            ],
          ),
        ),
      ),
    );
  }

  _launchURL() async {
    const url = 'https://www.baidu.com';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  _openMap() async {
    // android
    const url = 'geo:108.93,34.27'; //APp提供的 schema
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      const url = 'http://maps.apple.com?ll=108.93,34.27';
      if (await canLaunch(url)) {
        await launch(url);
      } else {
        throw 'Could not launch $url';
      }
    }
  }
}
