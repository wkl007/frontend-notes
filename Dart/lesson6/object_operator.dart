void main() {
//  Person person = new Person();
//  person?.work();
/*  var person;
  person = ' ';
  person = new Person();*/

//  (person as Person).work();
/*  if (person is Person) {
    person.work();
  }*/

  var person = new Person();
  person
    ..name = 'wkl'
    ..age = 20
    ..work();
}

class Person {
  String name;
  int age;

  void work() {
    print('work...');
  }
}
