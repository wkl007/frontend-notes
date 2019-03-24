void main() {
  var student = new Student();
  student.run();
}

/*class Person {
  String name;

  int get age => 18;

  void run() {
    print('person run...');
  }
}*/

abstract class Person {
  void run();
}

class Student implements Person {
  @override
  void run() {
    print('student run...');
  }
}
