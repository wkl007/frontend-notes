void main() {
  var func = (str) {
    print('hello--$str');
  };
  func(30);

  (() {
    print('test');
  })();

  var list2 = ['h', 'e', 'l', 'l', 'o'];

  var result = listTimes(list2, (str) {
    return str * 3;
  });
  print(result);
}

List listTimes(List list, String times(str)) {
  for (var index = 0; index < list.length; index++) {
    list[index] = times(list[index]);
  }
  return list;
}
