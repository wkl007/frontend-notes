void main() {
  var list = new List<void>();
  list.add('1');
  list.add('2');
  list.add(3);
  print(list);

  var utils = new Utils<int>();
  utils.put(2);

  var util = new Util();
  util.put<String>('1');
}

class Utils<T> {
  T element;

//  String elementStr;

  void put(T element) {
    this.element = element;
  }

/*void putString(String elementStr) {
    this.elementStr = elementStr;
  }*/
}

class Util {
  void put<T>(T element) {
    print(element);
  }
}
