import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function SwitchExpressionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">switch式</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 3で強化された<strong className="text-pink-300">switch式</strong>は、値を返す式として使えます。
            従来のswitch文とは異なり、<code className="text-pink-300">=&gt;</code>でケースと結果をマッピングし、
            網羅性チェックによってコンパイル時に全ケースが処理されているかを確認できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本構文</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">switch (値) &#123; パターン =&gt; 結果, &#125;</code>の形式で使います。
        </p>
        <DartEditor
          defaultCode={`enum Direction { north, south, east, west }

String describeDirection(Direction dir) => switch (dir) {
  Direction.north => '北へ進む',
  Direction.south => '南へ進む',
  Direction.east  => '東へ進む',
  Direction.west  => '西へ進む',
};

int httpStatusMessage(int code) => switch (code) {
  200 => 200,
  201 => 201,
  400 || 401 || 403 => code,   // 複数パターン
  404 => 404,
  500 => 500,
  _ => -1,                      // デフォルト
};

void main() {
  for (final dir in Direction.values) {
    print('\$dir: \${describeDirection(dir)}');
  }

  print('');
  for (final code in [200, 404, 401, 999]) {
    print('HTTP \$code -> \${httpStatusMessage(code)}');
  }
}`}
          expectedOutput={`Direction.north: 北へ進む
Direction.south: 南へ進む
Direction.east: 東へ進む
Direction.west: 西へ進む

HTTP 200 -> 200
HTTP 404 -> 404
HTTP 401 -> 401
HTTP 999 -> -1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型パターンとswitch式</h2>
        <p className="text-gray-400 mb-4">
          switch式では型チェックパターンも使えます。<code className="text-pink-300">is</code>相当の型マッチングを簡潔に書けます。
        </p>
        <DartEditor
          defaultCode={`String describe(Object value) => switch (value) {
  int n when n < 0    => '負の整数: \$n',
  int n when n == 0   => 'ゼロ',
  int n               => '正の整数: \$n',
  double d            => '小数: \$d',
  String s when s.isEmpty => '空文字列',
  String s            => '文字列: "\$s" (\${s.length}文字)',
  bool b              => '真偽値: \$b',
  List l              => 'リスト: \${l.length}要素',
  null                => 'null',
  _                   => 'その他: \${value.runtimeType}',
};

void main() {
  final values = [42, -5, 0, 3.14, 'Dart', '', true, [1, 2, 3], null];

  for (final v in values) {
    print(describe(v));
  }
}`}
          expectedOutput={`正の整数: 42
負の整数: -5
ゼロ
小数: 3.14
文字列: "Dart" (4文字)
空文字列
真偽値: true
リスト: 3要素
null`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch式とコレクション</h2>
        <p className="text-gray-400 mb-4">
          switch式をコレクション生成の中でも使えます。
        </p>
        <DartEditor
          defaultCode={`enum Priority { low, medium, high, critical }

void main() {
  final tasks = [
    {'name': 'ドキュメント更新', 'priority': Priority.low},
    {'name': 'バグ修正', 'priority': Priority.high},
    {'name': 'セキュリティパッチ', 'priority': Priority.critical},
    {'name': 'UI改善', 'priority': Priority.medium},
  ];

  // switch式でソートキーを生成
  final sorted = [...tasks]..sort((a, b) {
    int order(Priority p) => switch (p) {
      Priority.critical => 0,
      Priority.high     => 1,
      Priority.medium   => 2,
      Priority.low      => 3,
    };
    return order(a['priority'] as Priority)
        .compareTo(order(b['priority'] as Priority));
  });

  for (final task in sorted) {
    final p = task['priority'] as Priority;
    final label = switch (p) {
      Priority.critical => '[緊急]',
      Priority.high     => '[高]  ',
      Priority.medium   => '[中]  ',
      Priority.low      => '[低]  ',
    };
    print('\$label \${task['name']}');
  }
}`}
          expectedOutput={`[緊急] セキュリティパッチ
[高]   バグ修正
[中]   UI改善
[低]   ドキュメント更新`}
        />
      </section>

      <LessonCompleteButton lessonId="switch-expressions" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="switch-expressions" basePath="/learn/patterns" />
    </div>
  );
}
