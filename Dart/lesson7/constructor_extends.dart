void main() {
  var student = new Student('wkl', 'male');
  print(student.name);
}

class Person {
  String name;

  Person(this.name);

  Person.withName(this.name);
}

class Student extends Person {
  int age;
  final String gender;

  Student(String name, String gender)
      : gender = gender,
        super(name);
}
