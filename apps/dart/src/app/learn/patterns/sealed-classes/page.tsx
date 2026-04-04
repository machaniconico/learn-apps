import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function SealedClassesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">sealedクラス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-pink-300">sealedクラス</strong>はDart 3で追加された機能で、継承できるサブクラスを同一ファイル内に限定します。
            switchでsealedクラスの全サブクラスを網羅しないとコンパイルエラーになるため、安全な網羅的パターンマッチングが可能です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">sealedクラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">sealed</code>キーワードでクラスを定義し、switchで全サブクラスを網羅します。
        </p>
        <DartEditor
          defaultCode={`sealed class Shape {}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);
}

class Rectangle extends Shape {
  final double width, height;
  Rectangle(this.width, this.height);
}

class Triangle extends Shape {
  final double base, height;
  Triangle(this.base, this.height);
}

double area(Shape shape) => switch (shape) {
  Circle(radius: var r)               => 3.14159 * r * r,
  Rectangle(width: var w, height: var h) => w * h,
  Triangle(base: var b, height: var h)   => 0.5 * b * h,
  // 全サブクラスを網羅しないとコンパイルエラー
};

void main() {
  final shapes = <Shape>[
    Circle(5),
    Rectangle(4, 6),
    Triangle(3, 8),
  ];

  for (final shape in shapes) {
    final name = switch (shape) {
      Circle()    => '円',
      Rectangle() => '長方形',
      Triangle()  => '三角形',
    };
    print('\$name: 面積 = \${area(shape).toStringAsFixed(2)}');
  }
}`}
          expectedOutput={`円: 面積 = 78.54
長方形: 面積 = 24.00
三角形: 面積 = 12.00`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">sealedクラスとResult型</h2>
        <p className="text-gray-400 mb-4">
          sealedクラスはRust/Kotlinの<code className="text-pink-300">Result</code>型のようなエラー処理パターンに最適です。
        </p>
        <DartEditor
          defaultCode={`sealed class Result<T> {}

class Success<T> extends Result<T> {
  final T value;
  Success(this.value);
}

class Failure<T> extends Result<T> {
  final String error;
  Failure(this.error);
}

Result<int> parseInt(String s) {
  final n = int.tryParse(s);
  if (n == null) return Failure('"\$s"は有効な整数ではありません');
  return Success(n);
}

void main() {
  final inputs = ['42', 'abc', '100', '', '-5'];

  for (final input in inputs) {
    final result = parseInt(input);
    final message = switch (result) {
      Success(value: var n) => '成功: \$n (2倍=\${n * 2})',
      Failure(error: var e) => 'エラー: \$e',
    };
    print(message);
  }
}`}
          expectedOutput={`成功: 42 (2倍=84)
エラー: "abc"は有効な整数ではありません
成功: 100 (2倍=200)
エラー: ""は有効な整数ではありません
成功: -5 (2倍=-10)`}
        />
      </section>

      <LessonCompleteButton lessonId="sealed-classes" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="sealed-classes" basePath="/learn/patterns" />
    </div>
  );
}
