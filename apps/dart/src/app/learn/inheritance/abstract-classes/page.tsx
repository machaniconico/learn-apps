import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function AbstractClassesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">抽象クラス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">抽象クラス</strong>は<code className="text-red-300">abstract</code>キーワードで定義し、インスタンス化できないクラスです。
            実装を持たない<strong className="text-red-300">抽象メソッド</strong>を宣言でき、サブクラスに実装を強制します。
            共通のインターフェースを定義しながら、一部の実装を共有したい場合に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">abstract クラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">abstract class</code>で定義し、抽象メソッドはボディなしで宣言します。
        </p>
        <DartEditor
          defaultCode={`abstract class Shape {
  // 抽象メソッド（実装なし）
  double area();
  double perimeter();

  // 具象メソッド（実装あり）
  void describe() {
    print('\${runtimeType}: 面積=\${area().toStringAsFixed(2)}, '
        '周囲=\${perimeter().toStringAsFixed(2)}');
  }
}

class Circle extends Shape {
  double radius;
  Circle(this.radius);

  @override
  double area() => 3.14159 * radius * radius;

  @override
  double perimeter() => 2 * 3.14159 * radius;
}

class Rectangle extends Shape {
  double width, height;
  Rectangle(this.width, this.height);

  @override
  double area() => width * height;

  @override
  double perimeter() => 2 * (width + height);
}

void main() {
  // final s = Shape(); // エラー: 抽象クラスはインスタンス化不可

  final shapes = <Shape>[
    Circle(5.0),
    Rectangle(4.0, 6.0),
    Circle(3.0),
  ];

  for (final shape in shapes) {
    shape.describe();
  }
}`}
          expectedOutput={`Circle: 面積=78.54, 周囲=31.42
Rectangle: 面積=24.00, 周囲=20.00
Circle: 面積=28.27, 周囲=18.85`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスの活用パターン</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスでテンプレートメソッドパターンを実装すると、アルゴリズムの骨格を定義しながら詳細を委譲できます。
        </p>
        <DartEditor
          defaultCode={`abstract class DataProcessor {
  // テンプレートメソッド
  void process(List<int> data) {
    final prepared = prepare(data);
    final result = compute(prepared);
    output(result);
  }

  // サブクラスで実装する抽象メソッド
  List<int> prepare(List<int> data);
  int compute(List<int> data);
  void output(int result);
}

class SumProcessor extends DataProcessor {
  @override
  List<int> prepare(List<int> data) =>
      data.where((n) => n > 0).toList();

  @override
  int compute(List<int> data) =>
      data.fold(0, (sum, n) => sum + n);

  @override
  void output(int result) => print('合計（正の数のみ）: \$result');
}

class MaxProcessor extends DataProcessor {
  @override
  List<int> prepare(List<int> data) => List.from(data)..sort();

  @override
  int compute(List<int> data) =>
      data.isEmpty ? 0 : data.last;

  @override
  void output(int result) => print('最大値: \$result');
}

void main() {
  final data = [3, -1, 4, -1, 5, 9, 2, -6];
  print('データ: \$data');

  SumProcessor().process(data);
  MaxProcessor().process(data);
}`}
          expectedOutput={`データ: [3, -1, 4, -1, 5, 9, 2, -6]
合計（正の数のみ）: 23
最大値: 9`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスと継承の組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスを継承した抽象クラスを作り、段階的に実装を提供することもできます。
        </p>
        <DartEditor
          defaultCode={`abstract class Animal {
  String name;
  Animal(this.name);

  // 抽象メソッド
  String sound();

  // 具象メソッド
  void makeSound() => print('\$name: \${sound()}');
}

abstract class Pet extends Animal {
  String owner;
  Pet(String name, this.owner) : super(name);

  // 追加の抽象メソッド
  String trick();

  void showTrick() => print('\$name のトリック: \${trick()}');
}

class GuideDog extends Pet {
  GuideDog(String name, String owner) : super(name, owner);

  @override
  String sound() => 'ワン！';

  @override
  String trick() => '道案内';
}

class ParrotPet extends Pet {
  List<String> phrases;
  ParrotPet(String name, String owner, this.phrases)
      : super(name, owner);

  @override
  String sound() => phrases.first;

  @override
  String trick() => '言葉を繰り返す';
}

void main() {
  final dog = GuideDog('ガイド', '田中さん');
  dog.makeSound();
  dog.showTrick();
  print('飼い主: \${dog.owner}');

  final parrot = ParrotPet('ピコ', '鈴木さん', ['こんにちは！', 'おやすみ']);
  parrot.makeSound();
  parrot.showTrick();
}`}
          expectedOutput={`ガイド: ワン！
ガイド のトリック: 道案内
飼い主: 田中さん
ピコ: こんにちは！
ピコ のトリック: 言葉を繰り返す`}
        />
      </section>

      <LessonCompleteButton lessonId="abstract-classes" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="abstract-classes" basePath="/learn/inheritance" />
    </div>
  );
}
