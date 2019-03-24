void main() {
  var person = new Person('wkl', 20, 'male');
  new Person.withName('red');
}

class Person {
  String name;
  int age;
  final String gender = 'man';

  Person(String name, int age, String gender) {
    this.name = name;
    this.age = age;
//    this.gender = gender;
  }

/*  Person(this.name, this.age,this.gender) {
    print(name);
  }*/

  Person.withName(String name) {
    this.name = name;
  }

  void work() {
    print('work...');
  }
}
