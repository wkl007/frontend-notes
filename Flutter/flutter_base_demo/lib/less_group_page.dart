import 'package:flutter/material.dart';

/// StatelessWidget与基础组件
class StateLessGroupPage extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20, color: Colors.white);

    return MaterialApp(
      title: 'StatelessWidget与基础组件',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('StatelessWidget与基础组件'),
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
                style: textStyle,
              ),
              Icon(
                Icons.android,
                size: 50,
                color: Colors.red,
              ),
              CloseButton(),
              BackButton(),
              Chip(
                avatar: Icon(Icons.people),
                label: Text('老王爱小王'),
              ),
              Divider(
                  height: 10, //容器高度，不是线的高度
                  indent: 10, //左侧间距
                  color: Colors.orange),
              Card(
                color: Colors.blue,
                elevation: 5,
                margin: EdgeInsets.all(10),
                child: Container(
                  padding: EdgeInsets.all(5),
                  child: Text('I am a Card', style: textStyle),
                ),
              ),
              AlertDialog(
                title: Text('干他'),
                content: Text('你这个糟老婆子坏得很'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
