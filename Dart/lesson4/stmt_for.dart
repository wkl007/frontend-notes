void main() {
  var list = [1, 2, 3, 4, 5];

  for (var index = 0; index < list.length; index++) {
    print(list[index]);
  }

  for (var i in list) {
    print(i);
  }
}
