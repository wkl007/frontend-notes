void main() {
  int a = 1;
  int b;
  a ??= 2;
  b ??= 2;
  print(a);
  print(b);

  a += 2;
  a -= 2;
//  a /= 1;
  a ~/= 2;
  a %= 2;
  print(a);
}
