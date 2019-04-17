import 'package:flutter/material.dart';

/// 导入和使用Flutter的资源文件
class ResourcePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '导入和使用Flutter的资源文件',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('导入和使用Flutter的资源文件'),
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
              Image(
                width: 100,
                height: 100,
                image: AssetImage('images/avatar.jpg'),

              )
            ],
          ),
        ),
      ),
    );
  }
}
