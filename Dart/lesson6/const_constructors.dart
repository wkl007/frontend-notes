void main() {
  const person = const Person('wkl', 20, 'male');
  person.work();
}

class Person {
  final String name;
  final int age;
  final String gender;

  const Person(this.name, this.age, this.gender);

  void work() {
    print('work...');
  }
}
