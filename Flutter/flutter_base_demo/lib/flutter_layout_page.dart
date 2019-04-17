import 'package:flutter/material.dart';

///如何进行Flutter布局开发
class FlutterLayoutPage extends StatefulWidget {
  @override
  _FlutterLayoutPageState createState() => _FlutterLayoutPageState();
}

class _FlutterLayoutPageState extends State<FlutterLayoutPage> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20, color: Colors.white);

    return MaterialApp(
      title: '如何进行Flutter布局开发',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('如何进行Flutter布局开发'),
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
                          Stack(
                            children: <Widget>[
                              Image.network(
                                'http://p1.pstatp.com/large/61640000c66f7b2cf064',
                                width: 100,
                                height: 100,
                              ),
                              Positioned(
                                left: 0,
                                bottom: 0,
                                child: Image.network(
                                  'http://p1.pstatp.com/large/61640000c66f7b2cf064',
                                  width: 50,
                                  height: 50,
                                ),
                              )
                            ],
                          ),
                          Wrap(
                            //创建一个wrap布局，从左向右进行排列，会自动换行
                            spacing: 8,
                            runSpacing: 6,
                            children: <Widget>[
                              _chip('Flutter1'),
                              _chip('Flutter2'),
                              _chip('Flutter3'),
                              _chip('Flutter4'),
                              _chip('Flutter5'),
                            ],
                          )
                        ],
                      ),
                    ),
                  ],
                ),
                onRefresh: _handleRefresh)
            : Container(
                color: Colors.blueGrey,
                child: Column(
                  children: <Widget>[
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.red,
                        ),
                        child: Text('拉伸填满高度'),
                      ),
                    ),
                    Row(
                      children: <Widget>[
                        ClipOval(
                          child: SizedBox(
                            width: 100,
                            height: 100,
                            child: Image.network(
                                'http://p1.pstatp.com/large/61640000c66f7b2cf064'),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                          child: ClipRRect(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            child: Opacity(
                              opacity: 0.2,
                              child: Image.network(
                                  'http://p1.pstatp.com/large/61640000c66f7b2cf064',
                                  width: 100,
                                  height: 100),
                            ),
                          ),
                        )
                      ],
                    ),
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
                        margin: EdgeInsets.all(10),
                        child: PhysicalModel(
                          color: Colors.transparent,
                          borderRadius: BorderRadius.circular(6),
                          clipBehavior: Clip.antiAlias, // 抗锯齿
                          child: PageView(
                            children: <Widget>[
                              _item('Page1', Colors.deepPurple),
                              _item('Page2', Colors.green),
                              _item('Page3', Colors.red)
                            ],
                          ),
                        )),
                    Column(
                      children: <Widget>[
                        FractionallySizedBox(
                          widthFactor: 1,
                          child: Container(
                            decoration:
                                BoxDecoration(color: Colors.greenAccent),
                            child: Text('宽度撑满'),
                          ),
                        )
                      ],
                    ),
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

  _chip(String label) {
    return Chip(
      label: Text(label),
      avatar: CircleAvatar(
        backgroundColor: Colors.blue.shade900,
        child: Text(
          label.substring(0, 1),
          style: TextStyle(fontSize: 10),
        ),
      ),
    );
  }
}
