import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function TypeCheckPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型チェック</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">is演算子</strong>を使うと、実行時に変数の型を安全に確認できます。
            <code className="text-teal-300">is</code>がtrueの場合、そのスコープ内では型が自動的に絞り込まれます（型の昇格）。
            <code className="text-teal-300">is!</code>は型が一致しない場合にtrueを返します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">is 演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">変数 is 型</code>でランタイム型を確認します。ifブロック内では型が絞り込まれます。
        </p>
        <DartEditor
          defaultCode={`void describe(Object value) {
  print('値: \$value');

  if (value is int) {
    // ここでは value は int として扱われる
    print('  整数: \${value.isEven ? '偶数' : '奇数'}');
    print('  2倍: \${value * 2}');
  } else if (value is String) {
    // ここでは value は String として扱われる
    print('  文字列: 長さ\${value.length}');
    print('  大文字: \${value.toUpperCase()}');
  } else if (value is List) {
    print('  リスト: \${value.length}要素');
    print('  最初: \${value.first}');
  } else if (value is bool) {
    print('  ブール: \${value ? 'true' : 'false'}');
  }
}

void main() {
  describe(42);
  print('');
  describe('hello dart');
  print('');
  describe([10, 20, 30]);
  print('');
  describe(true);
}`}
          expectedOutput={`値: 42
  整数: 偶数
  2倍: 84

値: hello dart
  文字列: 長さ10
  大文字: HELLO DART

値: [10, 20, 30]
  リスト: 3要素
  最初: 10

値: true
  ブール: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">is! 演算子と型の昇格</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">is!</code>は否定の型チェックです。Dart のフロー解析により型が自動的に昇格します。
        </p>
        <DartEditor
          defaultCode={`String processValue(Object? value) {
  // is! で早期リターン
  if (value is! String) {
    return '文字列ではありません: \${value.runtimeType}';
  }
  // ここから value は String として扱われる
  return '文字列: "\${value.toUpperCase()}" (長さ: \${value.length})';
}

abstract class Shape {
  double area();
}

class Circle extends Shape {
  double radius;
  Circle(this.radius);
  @override
  double area() => 3.14159 * radius * radius;
}

class Rectangle extends Shape {
  double w, h;
  Rectangle(this.w, this.h);
  @override
  double area() => w * h;
}

void analyzeShape(Shape shape) {
  print('面積: \${shape.area().toStringAsFixed(2)}');

  if (shape is Circle) {
    print('  円の半径: \${shape.radius}');
  }
  if (shape is Rectangle) {
    print('  矩形のサイズ: \${shape.w}x\${shape.h}');
  }
}

void main() {
  print(processValue('hello'));
  print(processValue(42));
  print(processValue(null));

  print('');
  analyzeShape(Circle(5.0));
  analyzeShape(Rectangle(3.0, 4.0));
}`}
          expectedOutput={`文字列: "HELLO" (長さ: 5)
文字列ではありません: int
文字列ではありません: Null

面積: 78.54
  円の半径: 5.0
面積: 12.00
  矩形のサイズ: 3.0x4.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型チェックとパターンマッチ</h2>
        <p className="text-gray-400 mb-4">
          Dart 3の<code className="text-teal-300">switch</code>式でも型チェックができます。
        </p>
        <DartEditor
          defaultCode={`String describe(Object? value) {
  return switch (value) {
    null => 'null値',
    int n when n < 0 => '負の整数: \$n',
    int n => '正の整数: \$n',
    double d => '小数: \${d.toStringAsFixed(2)}',
    String s when s.isEmpty => '空文字列',
    String s => '文字列: "\$s"',
    List l when l.isEmpty => '空リスト',
    List l => 'リスト: \${l.length}要素',
    _ => 'その他: \${value.runtimeType}',
  };
}

void main() {
  final values = <Object?>[
    null,
    -5,
    42,
    3.14,
    '',
    'Dart',
    <int>[],
    [1, 2, 3],
    true,
  ];

  for (final v in values) {
    print(describe(v));
  }
}`}
          expectedOutput={`null値
負の整数: -5
正の整数: 42
小数: 3.14
空文字列
文字列: "Dart"
空リスト
リスト: 3要素
その他: bool`}
        />
      </section>

      <LessonCompleteButton lessonId="type-check" categoryId="types" />
      <LessonNav lessons={lessons} currentId="type-check" basePath="/learn/types" />
    </div>
  );
}
