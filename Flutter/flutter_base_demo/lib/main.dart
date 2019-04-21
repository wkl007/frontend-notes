import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import './plugin_use.dart';
import './less_group_page.dart';
import './stateful_group_page.dart';
import './flutter_layout_page.dart';
import './gesture_page.dart';
import './resource_page.dart';
import './launch_page.dart';
import './photo_app_page.dart';
import './animation_page.dart';
import './hero_animation_page.dart';
import './tabbed_app_bar_page.dart';
import './http_page.dart';
import './future_page.dart';
import './shared_preferences_page.dart';
import './list_page.dart';
import './expansion_title_page.dart';
import './grid_view_page.dart';
import './advanced_list_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
          appBar: AppBar(
            title: Text('这是标题'),
          ),
          body: RouteNavigator()),
      routes: <String, WidgetBuilder>{
        'plugin': (BuildContext context) => PluginUsePage(),
        'less': (BuildContext context) => StateLessGroupPage(),
        'ful': (BuildContext context) => StateFulGroupPage(),
        'layout': (BuildContext context) => FlutterLayoutPage(),
        'gesture': (BuildContext context) => GesturePage(),
        'resource': (BuildContext context) => ResourcePage(),
        'launch': (BuildContext context) => LaunchPage(),
        'photo': (BuildContext context) => PhotoAppPage(),
        'animation': (BuildContext context) => AnimationPage(),
        'hero': (BuildContext context) => HeroAnimationPage(),
        'radialHero': (BuildContext context) => RadialExpansionDemo(),
        'tabbedAppBar': (BuildContext context) => TabbedAppBarPage(),
        'http': (BuildContext context) => TestHttp(),
        'future': (BuildContext context) => TestFuture(),
        'sharedPreferences': (BuildContext context) => TestSharedPreferences(),
        'list': (BuildContext context) => ListPage(),
        'expansionTitle': (BuildContext context) => ExpansionTitlePage(),
        'gridView': (BuildContext context) => GridViewPage(),
        'advancedList': (BuildContext context) => AdvancedListPage(),
      },
    );
  }
}

class RouteNavigator extends StatefulWidget {
  @override
  _RouteNavigatorState createState() => _RouteNavigatorState();
}

class _RouteNavigatorState extends State<RouteNavigator> {
  bool byName = false;

  @override
  Widget build(BuildContext context) {
    return Container(
        child: ListView(
      children: <Widget>[
        Wrap(
          children: <Widget>[
            SwitchListTile(
              title: Text('${byName ? '' : '不'}通过路由名称跳转'),
              value: byName,
              onChanged: (value) {
                setState(() {
                  byName = value;
                });
              },
            ),
            _item('plugin使用', PluginUsePage(), 'plugin'),
            _item('StatelessWidget与基础组件', StateLessGroupPage(), 'less'),
            _item('StateFulWidget与基础组件', StateFulGroupPage(), 'ful'),
            _item('如何进行Flutter布局开发', FlutterLayoutPage(), 'layout'),
            _item('用户手势及点击事件', GesturePage(), 'gesture'),
            _item('导入和使用Flutter的资源文件', ResourcePage(), 'resource'),
            _item('打开第三方应用', LaunchPage(), 'launch'),
            _item('photo', PhotoAppPage(), 'photo'),
            _item('顶部tab', TabbedAppBarPage(), 'tabbedAppBar'),
            _item('http使用', TestHttp(), 'http'),
            _item('future使用', TestHttp(), 'future'),
            _item('sharedPreferences使用', TestSharedPreferences(),
                'sharedPreferences'),
            _item('基础list使用', ListPage(), 'list'),
            _item('高级列表使用', AdvancedListPage(), 'advancedList'),
            _item('expansionTitle使用', ExpansionTitlePage(), 'expansionTitle'),
            _item('网格布局', GridViewPage(), 'gridView'),
            _item('普通动画', AnimationPage(), 'animation'),
            _item('hero动画', HeroAnimationPage(), 'hero'),
            _item('径向hero动画', RadialExpansionDemo(), 'radialHero'),
          ],
        ),
      ],
    ));
  }

  _item(String title, Widget page, String routeName) {
    return Container(
      margin: EdgeInsets.all(10),
      child: RaisedButton(
        onPressed: () {
          if (byName) {
            Navigator.pushNamed(context, routeName);
          } else {
            Navigator.push(
                context, CupertinoPageRoute(builder: (context) => page));
          }
        },
        child: Text(title),
      ),
    );
  }
}
