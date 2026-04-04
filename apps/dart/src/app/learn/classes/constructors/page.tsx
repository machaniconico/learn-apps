import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ConstructorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">コンストラクタ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            コンストラクタはインスタンス生成時に呼ばれる特別なメソッドです。
            Dartには<strong className="text-orange-300">デフォルトコンストラクタ</strong>、
            <strong className="text-orange-300">名前付きコンストラクタ</strong>、
            <strong className="text-orange-300">初期化リスト</strong>などの機能があります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトコンストラクタと初期化形式</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">this.フィールド名</code>を引数に書くと、フィールドへの代入を簡潔に書けます（initializing formal）。
        </p>
        <DartEditor
          defaultCode={`class Person {
  String name;
  int age;
  String? email;

  // this.x 構文で簡潔に初期化
  Person(this.name, this.age, {this.email});

  @override
  String toString() {
    String emailStr = email != null ? ', \$email' : '';
    return 'Person(\$name, \$age\$emailStr)';
  }
}

class Rectangle {
  final double width;
  final double height;

  Rectangle(this.width, this.height);

  // 初期化リスト（: の後）でfinalフィールドを設定
  Rectangle.square(double side) : width = side, height = side;

  double get area => width * height;

  @override
  String toString() => 'Rectangle(\$width x \$height, area=\${area})';
}

void main() {
  var p1 = Person('Alice', 30);
  var p2 = Person('Bob', 25, email: 'bob@example.com');
  print(p1);
  print(p2);

  var rect = Rectangle(5, 3);
  var square = Rectangle.square(4);
  print(rect);
  print(square);
}`}
          expectedOutput={`Person(Alice, 30)
Person(Bob, 25, bob@example.com)
Rectangle(5.0 x 3.0, area=15.0)
Rectangle(4.0 x 4.0, area=16.0)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前付きコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">クラス名.名前()</code>の形式で複数のコンストラクタを定義できます。用途ごとに分かりやすい名前を付けられます。
        </p>
        <DartEditor
          defaultCode={`class Color {
  final int r, g, b;

  const Color(this.r, this.g, this.b);

  // 名前付きコンストラクタ
  Color.red() : r = 255, g = 0, b = 0;
  Color.green() : r = 0, g = 255, b = 0;
  Color.blue() : r = 0, g = 0, b = 255;
  Color.white() : r = 255, g = 255, b = 255;
  Color.black() : r = 0, g = 0, b = 0;

  // 16進数文字列から生成
  Color.fromHex(String hex) :
    r = int.parse(hex.substring(0, 2), radix: 16),
    g = int.parse(hex.substring(2, 4), radix: 16),
    b = int.parse(hex.substring(4, 6), radix: 16);

  @override
  String toString() => 'Color(r:\$r, g:\$g, b:\$b)';
}

void main() {
  print(Color(128, 64, 32));
  print(Color.red());
  print(Color.green());
  print(Color.fromHex('FF5733'));
}`}
          expectedOutput={`Color(r:128, g:64, b:32)
Color(r:255, g:0, b:0)
Color(r:0, g:255, b:0)
Color(r:255, g:87, b:51)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">constコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">const</code>コンストラクタを使うと、コンパイル時定数のインスタンスを作れます。全フィールドがfinalである必要があります。
        </p>
        <DartEditor
          defaultCode={`class ImmutablePoint {
  final double x;
  final double y;

  // constコンストラクタ
  const ImmutablePoint(this.x, this.y);

  // 定数インスタンス
  static const origin = ImmutablePoint(0, 0);
  static const unitX = ImmutablePoint(1, 0);
  static const unitY = ImmutablePoint(0, 1);

  double distanceTo(ImmutablePoint other) {
    double dx = x - other.x;
    double dy = y - other.y;
    return (dx * dx + dy * dy);
  }

  @override
  String toString() => '(\$x, \$y)';
}

void main() {
  // constインスタンスはコンパイル時定数
  const p1 = ImmutablePoint(3, 4);
  const p2 = ImmutablePoint(3, 4);

  print('p1: \$p1');
  print('p2: \$p2');
  print('同一インスタンス: \${identical(p1, p2)}'); // constなので同一

  print('原点: \${ImmutablePoint.origin}');
  print('距離の二乗: \${p1.distanceTo(ImmutablePoint.origin)}');
}`}
          expectedOutput={`p1: (3.0, 4.0)
p2: (3.0, 4.0)
同一インスタンス: true
原点: (0.0, 0.0)
距離の二乗: 25.0`}
        />
      </section>

      <LessonCompleteButton lessonId="constructors" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
