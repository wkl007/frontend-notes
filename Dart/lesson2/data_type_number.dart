void main() {
  num a = 10;
  a = 12.5;

  int b = 20;

  double c = 10.5;

  print(a + c);
  print(a - c);
  print(a * c);
  print(a / c);
  print(a ~/ c);
  print(a % c);

  print(0.0 / 0.0);

  print(b.isEven);
  print(b.isOdd);

  int d = 11;
  print(d.isEven);
  print(d.isOdd);

  int e = -100;
  print(e.abs());

  double f = 10.5;
  print(f.round());
  print(f.floor());
  print(f.ceil());
  print(f.toInt());
  print(e.toDouble());

}
