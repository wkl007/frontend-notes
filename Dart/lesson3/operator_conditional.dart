void main() {
  int gender = 0;
  String str = gender == 0 ? 'male=$gender' : 'female=$gender';
  print(str);

  String a;
  String b = 'java';
  String c = a ?? b;
  print(c);
}
