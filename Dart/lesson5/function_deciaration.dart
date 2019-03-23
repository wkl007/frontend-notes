void main(List args) {
  print(args);
  print(getPerson('张三', 18));
  printPerson('李四', 20);
  print(printPerson('王五', 24));
}

/*String getPerson(String name, int age) {
  return 'name=$name,age=$age';
}*/
int gender = 1;

getPerson(name, age) => gender == 1 ? 'name=$name,age=$age' : 'test';

printPerson(name, age) {
  print('name=$name,age=$age');
}
