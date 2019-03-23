void main() {
  String str1 = 'hello dart';

  String str2 = "hello dart";

  String str3 = '''
                hello 
                dart
                ''';

//  String str4 = 'hello \n dart';
  String str4 = r'hello \n dart';
  print(str4);

  String str5 = 'this is my favorite language';
  print(str5 + ' new');
  print(str5 * 2);
  print(str3 == str4);
  print(str5[0]);

  int a = 1;
  int b = 2;
  print('a+b=${a + b}');
  print('a=$a');

  print(str5.length);
  print(str5.isEmpty);
  print(str5.isNotEmpty);
  
  print(str5.contains('this'));
  print(str5.substring(0,4));

  print(str5.startsWith('a'));
  print(str5.endsWith('ge'));

  print(str5.toUpperCase());

  print(str5.split(' '));

  print(str5.replaceAll('this', 'that'));
}
