import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パターンの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 3で導入された<strong className="text-pink-300">パターン</strong>は、値の構造をチェックしながら変数への分割代入を行う機能です。
            switch式・if-case・変数宣言など様々な場所で使えます。
            リテラルパターン、変数パターン、型パターンなど多様なパターンが用意されています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">if-case によるパターンマッチ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">if (value case パターン)</code>構文で条件付きパターンマッチができます。
        </p>
        <DartEditor
          defaultCode={`void processJson(Object? json) {
  if (json case {'type': String type, 'value': var value}) {
    print('型: \$type, 値: \$value');
    return;
  }

  if (json case [int first, int second, ...]) {
    print('整数リスト: 先頭=\$first, 2番目=\$second');
    return;
  }

  if (json case String s when s.isNotEmpty) {
    print('文字列: \$s');
    return;
  }

  print('その他: \$json');
}

void main() {
  processJson({'type': 'user', 'value': '田中'});
  processJson([1, 2, 3, 4, 5]);
  processJson('Dart言語');
  processJson(null);
  processJson(42);
}`}
          expectedOutput={`型: user, 値: 田中
整数リスト: 先頭=1, 2番目=2
文字列: Dart言語
その他: null
その他: 42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パターンの種類</h2>
        <p className="text-gray-400 mb-4">
          Dartには多数のパターン型があります。リテラル、変数、型、ワイルドカードなどを組み合わせます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // リテラルパターン
  for (final n in [0, 1, 2, 99]) {
    final label = switch (n) {
      0 => 'ゼロ',
      1 => 'いち',
      2 => 'に',
      _ => 'その他(\$n)',
    };
    print(label);
  }

  print('---');

  // 変数パターン（値を束縛）
  final point = (3, 4);
  if (point case (var x, var y)) {
    print('座標: x=\$x, y=\$y');
    print('距離: \${(x * x + y * y).toDouble()}の平方根');
  }

  // 型パターン
  final values = [42, 'hello', 3.14, true];
  for (final v in values) {
    final desc = switch (v) {
      int()    => 'int: \$v',
      String() => 'String: \$v',
      double() => 'double: \$v',
      bool()   => 'bool: \$v',
      _        => '不明',
    };
    print(desc);
  }
}`}
          expectedOutput={`ゼロ
いち
に
その他(99)
---
座標: x=3, y=4
距離: 25.0の平方根
int: 42
String: hello
double: 3.14
bool: true`}
        />
      </section>

      <LessonCompleteButton lessonId="pattern-basics" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="pattern-basics" basePath="/learn/patterns" />
    </div>
  );
}
