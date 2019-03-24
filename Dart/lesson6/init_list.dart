void main() {
  var person = new Person('wkl', 20, 'male');
}

class Person {
  String name;
  int age;
  final String gender;

  Person(this.name, this.age, this.gender);

  Person.withMap(Map map)
      : name = map['name'],
        age = map['age'],
        gender = map['gender'] {
    /* this.name = map['name'];
    this.age = map['age'];*/
  }

  void work() {
    print('work...');
  }
}
