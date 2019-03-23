void main() {
  var list = [1, 2, 3];
  for (var i in list) {
    if (i == 2) {
//      break;
      continue;
    }
    print(i);
  }
  print('---------------');
  var list2 = [4, 5, 6];

  for (var item1 in list) {
    if (item1 == 2) {
      break;
    }
    for (var item2 in list2) {
      if (item2 == 5) {
        break;
      }
      print(item2);
    }
  }
}
