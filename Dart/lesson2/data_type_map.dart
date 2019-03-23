void main() {
  var map1 = {'first': 'dart', 1: true};
  print(map1['first']);
  print(map1[1]);
  map1['1'] = false;
  print(map1);

  var map2 = const {1: 'dart', 2: 'java'};
  print(map2);

  var map3 = new Map();

  var map = {'first': 'dart', 'second': 'java', 'third': 'python'};

  print(map.length);
  print(map.keys);
  print(map.values);
  print(map.containsKey('first'));
  print(map.containsValue('dart'));
  map.remove('first');
  print(map);
  map.forEach(f);

  var list = [1, 2, 3];
  print(list.asMap());
}

void f(key, value) {
  print('key=$key value=$value');
}
