void main() {
  num a = 10; // num 是数字类型的父类
  a = 12.5;

  int b = 20; // int 只能是整数

  double c = 10.5; // double 双精度

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
  print(e.abs()); // abs 绝对值

  double f = 10.5;
  print(f.round());
  print(f.floor());
  print(f.ceil());
  print(f.toInt()); // toInt 转整数
  print(e.toDouble()); // toDouble 转双精度
}
