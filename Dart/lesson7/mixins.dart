void main() {
  /*var d = new D();
  d.a();
  d.b();
  d.c();*/
}

/*class A {
  void a() {
    print('A.a()...');
  }
}

class B {
  void a() {
    print('B.a()...');
  }

  void b() {
    print('B.b()...');
  }
}

class C {
  void a() {
    print('C.a()...');
  }

  void b() {
    print('C.b()...');
  }

  void c() {
    print('C.c()...');
  }
}

class D extends A with B, C {}*/

abstract class Engine {
  void work();
}

class OilEngine implements Engine {
  @override
  void work() {
    print('work with oil...');
  }
}

class ElectricEngine implements Engine {
  @override
  void work() {
    print('work with electric...');
  }
}

class Tyre {
  String name;

  void run() {}
}

class Car = Tyre with ElectricEngine;

/*class Car1 extends Tyre with ElectricEngine {
  String name;
}*/

class Bus = Tyre with OilEngine;
