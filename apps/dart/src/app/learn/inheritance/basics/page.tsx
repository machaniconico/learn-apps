import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">継承の基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">継承</strong>とは、既存のクラス（親クラス・スーパークラス）の機能を引き継いで新しいクラス（子クラス・サブクラス）を作る仕組みです。
            Dartでは<code className="text-red-300">extends</code>キーワードを使い、<code className="text-red-300">super</code>で親クラスにアクセスします。
            Dartは単一継承のみサポートしています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">extends による継承</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">extends</code>キーワードで親クラスを指定します。子クラスは親クラスの全てのプロパティとメソッドを継承します。
        </p>
        <DartEditor
          defaultCode={`class Vehicle {
  String brand;
  int year;

  Vehicle(this.brand, this.year);

  void describe() {
    print('\$year年製 \$brand');
  }

  void start() {
    print('\$brand のエンジンが始動しました');
  }
}

class Car extends Vehicle {
  int doors;

  Car(String brand, int year, this.doors)
      : super(brand, year);

  void honk() {
    print('\$brand: プップー！');
  }
}

class Truck extends Vehicle {
  double payload; // 積載量(トン)

  Truck(String brand, int year, this.payload)
      : super(brand, year);

  void load() {
    print('\$brand に \$payload トン積載します');
  }
}

void main() {
  final car = Car('トヨタ', 2023, 4);
  car.describe(); // 親クラスのメソッド
  car.start();    // 親クラスのメソッド
  car.honk();     // 子クラスのメソッド
  print('ドア数: \${car.doors}');

  print('');

  final truck = Truck('いすゞ', 2022, 5.0);
  truck.describe();
  truck.load();
}`}
          expectedOutput={`2023年製 トヨタ
トヨタ のエンジンが始動しました
トヨタ: プップー！
ドア数: 4

2022年製 いすゞ
いすゞ に 5.0 トン積載します`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">super によるアクセス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">super</code>キーワードで親クラスのコンストラクタやメソッドを呼び出せます。
        </p>
        <DartEditor
          defaultCode={`class Shape {
  String color;

  Shape(this.color);

  double area() => 0.0;

  String get description => '\$color の図形';
}

class Circle extends Shape {
  double radius;

  Circle(String color, this.radius) : super(color);

  @override
  double area() => 3.14159 * radius * radius;

  @override
  String get description =>
      '\${super.description}（円、半径\$radius）';
}

class Rectangle extends Shape {
  double width;
  double height;

  Rectangle(String color, this.width, this.height)
      : super(color);

  @override
  double area() => width * height;

  @override
  String get description =>
      '\${super.description}（矩形 \${width}x\${height}）';
}

void main() {
  final c = Circle('赤', 5.0);
  print(c.description);
  print('面積: \${c.area().toStringAsFixed(2)}');

  final r = Rectangle('青', 4.0, 6.0);
  print(r.description);
  print('面積: \${r.area()}');
}`}
          expectedOutput={`赤 の図形（円、半径5.0）
面積: 78.54
青 の図形（矩形 4.0x6.0）
面積: 24.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">継承チェーン</h2>
        <p className="text-gray-400 mb-4">
          継承は複数レベルに連鎖させることができます。各レベルで機能を追加・拡張できます。
        </p>
        <DartEditor
          defaultCode={`class LivingThing {
  bool isAlive = true;
  void breathe() => print('呼吸中...');
}

class Animal extends LivingThing {
  String name;
  Animal(this.name);
  void eat() => print('\$name が食事中');
}

class Mammal extends Animal {
  bool isWarmBlooded = true;
  Mammal(String name) : super(name);
  void nurse() => print('\$name が授乳中');
}

class Dog extends Mammal {
  String breed;
  Dog(String name, this.breed) : super(name);
  void bark() => print('\$name (\$breed): ワン！');
}

void main() {
  final dog = Dog('ポチ', '柴犬');
  dog.breathe(); // LivingThing から
  dog.eat();     // Animal から
  dog.nurse();   // Mammal から
  dog.bark();    // Dog から
  print('温血動物: \${dog.isWarmBlooded}');
  print('生存中: \${dog.isAlive}');
}`}
          expectedOutput={`呼吸中...
ポチ が食事中
ポチ が授乳中
ポチ (柴犬): ワン！
温血動物: true
生存中: true`}
        />
      </section>

      <LessonCompleteButton lessonId="basics" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
