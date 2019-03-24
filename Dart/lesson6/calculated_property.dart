void main() {
  var rect = new Rectangle();
  rect.height = 20;
  rect.width = 10;

  print(rect.area);
  rect.area = 200;
  print(rect.width);
}

class Rectangle {
  num width, height;

/*  num area() {
    return width * height;
  }*/
  num get area {
    return width * height;
  }

  set area(value) {
    width = value / 20;
  }
}
