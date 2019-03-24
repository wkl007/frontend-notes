void main() {
  var person = new Person();
  person
    ..name = 'wkl'
    ..age = 20;

  print(person('test', 34));
}

class Person {
  String name;
  int age;

/*  void work() {
    print('name is $name,age is $age');
  }*/

  String call(String name, int age) {
    return 'name is $name,age is $age';
  }
}
