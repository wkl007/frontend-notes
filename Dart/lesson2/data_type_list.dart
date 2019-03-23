void main() {
  var list1 = [1, 2, 3, 'dart', true];
  print(list1);

  print(list1[2]);
  print(list1.length);
  list1[2] = 4;
  print(list1);

  var list2 = const [1, 2, 3];
  print(list2);

  var list3 = new List();
  print(list3);

  var list = ['hello', 'dart'];
  list.add('wkl');
  list.insert(3, 'love');
  list.remove(3);
  print(list);
//  list.clear();
  print(list.indexOf('dart'));
  print(list.lastIndexOf('wkl'));
//  list.sort();
  print(list.sublist(2));

  list.forEach(print);
}
