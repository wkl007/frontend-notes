import 'package:flutter/material.dart';
import 'package:flutter_color_plugin/flutter_color_plugin.dart';

/// plugin使用
class PluginUsePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'plugin使用',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('plugin使用'),
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
              Text(
                'I am 老王',
                style: TextStyle(color: ColorUtil.color('#000000')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
