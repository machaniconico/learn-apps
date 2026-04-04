import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function BreakingChangesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Dart 3の変更点</h1>
        <p className="text-gray-400">Dart 3での重要な変更点と移行時の注意点を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart 3の主な変更点</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart 3はDart 2からのメジャーバージョンアップです。NullSafetyが完全必須となり、
          新しいクラス修飾子によってライブラリAPIの表現が豊かになりました。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• Null Safety が完全必須（オプトアウト不可）</li>
          <li>• <code className="text-violet-300">mixin</code>は<code className="text-violet-300">mixin class</code>以外のクラスをextendsできない</li>
          <li>• switch文が網羅性チェックをサポート</li>
          <li>• Records・Patterns・Class modifiers の追加</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart 2との比較</h2>
        <p className="text-gray-400 mb-4">
          Dart 2とDart 3のコードスタイルを比較します。
        </p>
        <DartEditor
          defaultCode={`// Dart 3: レコード型（Dart 2では使えない）
(String name, int age) getUser() => ('田中', 30);

// Dart 3: switch式（Dart 2ではswitch文のみ）
String grade(int score) => switch (score) {
  >= 90 => 'A',
  >= 80 => 'B',
  >= 70 => 'C',
  >= 60 => 'D',
  _ => 'F',
};

// Dart 3: パターンマッチングによる分解
void processData(Object data) {
  if (data case [int x, int y]) {
    print('座標: (\$x, \$y)');
  } else if (data case {'name': String name}) {
    print('名前: \$name');
  } else {
    print('不明: \$data');
  }
}

void main() {
  // レコード分解
  final (name, age) = getUser();
  print('\$nameは\$age歳');

  // switch式
  [95, 82, 71, 55].forEach((s) => print('スコア\$s: \${grade(s)}'));

  // パターンマッチング
  processData([10, 20]);
  processData({'name': '鈴木'});
  processData('文字列');
}`}
          expectedOutput={`田中は30歳\nスコア95: A\nスコア82: B\nスコア71: C\nスコア55: F\n座標: (10, 20)\n名前: 鈴木\n不明: 文字列`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart 3への移行チェックリスト</h2>
        <p className="text-gray-400 mb-4">
          既存のDartプロジェクトをDart 3に移行するための確認事項です。
        </p>
        <DartEditor
          defaultCode={`// Dart 3移行の注意点を概念コードで示す

// 1. Null Safety: 完全必須
// Dart 2: // @dart=2.9 で回避可能だった
// Dart 3: 回避不可、すべてNull Safe必須

// 2. Mixin制限
// Dart 2: 任意のクラスをmixinとして使えた
// Dart 3: mixin/mixin classのみmixin可能

class Point {
  final int x, y;
  const Point(this.x, this.y);

  // Dart 3: constコンストラクタでも分解可能
  @override
  String toString() => '(\$x, \$y)';
}

void main() {
  // Dart 3の機能を活用した移行後コード
  final points = [
    const Point(1, 2),
    const Point(3, 4),
    const Point(5, 6),
  ];

  // パターンによる分解
  for (final Point(x: x, y: y) in points) {
    print('x=\$x, y=\$y, 距離=\${(x * x + y * y).toDouble()}');
  }

  print('');
  print('Dart 3への移行チェック:');
  print('✅ Null Safety 対応済み');
  print('✅ mixin は mixin class に変換済み');
  print('✅ switch文をswitch式に更新');
  print('✅ pubspec.yamlのSDK制約を>=3.0.0に更新');
}`}
          expectedOutput={`x=1, y=2, 距離=5.0\nx=3, y=4, 距離=25.0\nx=5, y=6, 距離=61.0\n\nDart 3への移行チェック:\n✅ Null Safety 対応済み\n✅ mixin は mixin class に変換済み\n✅ switch文をswitch式に更新\n✅ pubspec.yamlのSDK制約を>=3.0.0に更新`}
        />
      </section>
      <LessonCompleteButton lessonId="breaking-changes" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="breaking-changes" basePath="/learn/dart3" />
    </div>
  );
}
