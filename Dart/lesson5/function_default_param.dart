void main() {
  printPerson('张三', age: 20, gender: 'male');
}

printPerson(String name, {int age = 2, String gender = 'male'}) {
  print('name=$name,age=$age,gender=$gender');
}
