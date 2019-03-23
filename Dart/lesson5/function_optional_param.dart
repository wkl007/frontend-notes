void main() {
  printPerson('张三', age: 20, gender: 'male');
  printPerson2('张三', 12, 'woman');
}

printPerson(String name, {int age, String gender}) {
  print('name=$name,age=$age,gender=$gender');
}

printPerson2(String name, [int age, String gender]) {
  print('name=$name,age=$age,gender=$gender');
}

