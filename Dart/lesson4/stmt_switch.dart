void main() {
  String language = 'java';

  switch (language) {
    case 'dart':
      print(language);
      break;
    case 'java':
      print(language);
      break;
    case 'javascript':
      print(language);
      break;
    default:
      print('default');
  }

  switch (language) {
    Test:
    case 'dart':
      print(language);
      break;
    case 'java':
      print(language);
      continue Test;
//      break;
    case 'javascript':
      print(language);
      break;
    default:
      print('default');
  }
}
