/*const spring = 0;
const summer = 1;
const autumn = 2;
const winter = 3;*/

void main() {
  var currentSeason = Season.autumn;

  print(currentSeason.index);

  switch (currentSeason) {
    case Season.spring:
      print('1到3月');
      break;
    case Season.summer:
      print('4到6月');
      break;
    case Season.autumn:
      print('7到9月');
      break;
    case Season.winter:
      print('10到12月');
      break;
  }
}

enum Season {
  spring,
  summer,
  autumn,
  winter,
}
