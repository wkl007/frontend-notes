import 'person.dart';

void main() {
  /* var student = new Student();
  student.study();
  student.name = 'wkl';
  student.age = 20;
  print(student.isAdult);
  student.run();*/

  Person person = new Student();

  if (person is Student) {
    person.study();
  }

  print(person);
}

class Student extends Person {
  void study() {
    print('student study...');
  }

  @override
  bool get isAdult => age > 19;

  @override
  void run() {
    print('fuck');
  }
}
