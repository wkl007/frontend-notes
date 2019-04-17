import 'package:flutter/material.dart';

///StateFulWidget与基础组件
class StateFulGroupPage extends StatefulWidget {
  @override
  _StateFulGroupState createState() => _StateFulGroupState();
}

class _StateFulGroupState extends State<StateFulGroupPage> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20, color: Colors.white);

    return MaterialApp(
      title: 'StateFulWidget与基础组件',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('StateFulWidget与基础组件'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            items: [
              BottomNavigationBarItem(
                  icon: Icon(Icons.home, color: Colors.grey),
                  activeIcon: Icon(Icons.home, color: Colors.red),
                  title: Text('首页')),
              BottomNavigationBarItem(
                icon: Icon(Icons.list, color: Colors.grey),
                activeIcon: Icon(Icons.list, color: Colors.red),
                title: Text('列表'),
              )
            ]),
        floatingActionButton: FloatingActionButton(
          onPressed: null,
          child: Text('点我'),
        ),
        body: _currentIndex == 0
            ? RefreshIndicator(
                child: ListView(
                  children: <Widget>[
                    Container(
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
                          /*  AlertDialog(
                title: Text('干他'),
                content: Text('你这个糟老婆子坏得很'),
              )*/
                        ],
                      ),
                    ),
                  ],
                ),
                onRefresh: _handleRefresh)
            : Container(
                child: Column(
                  children: <Widget>[
                    Image.network(
                      'http://p1.pstatp.com/large/61640000c66f7b2cf064',
                      width: 100,
                      height: 100,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.fromLTRB(5, 0, 0, 0),
                          hintText: '请输入',
                          hintStyle: TextStyle(fontSize: 16)),
                    ),
                    Container(
                      height: 100,
                      margin: EdgeInsets.only(top: 10),
                      decoration: BoxDecoration(color: Colors.lightBlueAccent),
                      child: PageView(
                        children: <Widget>[
                          _item('Page1', Colors.deepPurple),
                          _item('Page2', Colors.green),
                          _item('Page3', Colors.red)
                        ],
                      ),
                    )
                  ],
                ),
              ),
      ),
    );
  }

  Future<Null> _handleRefresh() async {
    await Future.delayed(Duration(milliseconds: 1000));
    return null;
  }

  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(title, style: TextStyle(fontSize: 22, color: Colors.white)),
    );
  }
}
