import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartのパッケージ管理ツールは何ですか？",
    options: ["npm", "pip", "pub", "cargo"],
    answer: 2,
    explanation: "Dartはpub（pub.dev）をパッケージ管理システムとして使います。dart pub getコマンドでパッケージをインストールします。",
  },
  {
    question: "pubspec.yamlの主な役割は何ですか？",
    options: [
      "Dartのバージョンを管理する",
      "プロジェクトのメタデータと依存パッケージを定義する",
      "テストの設定を行う",
      "ビルド設定を管理する",
    ],
    answer: 1,
    explanation: "pubspec.yamlはプロジェクト名、バージョン、説明、依存関係（dependencies、dev_dependencies）などを定義するプロジェクト設定ファイルです。",
  },
  {
    question: "ライブラリをエクスポートするための構文は？",
    options: [
      "module.exports = ...",
      "export 'src/my_class.dart'",
      "public class MyClass",
      "publish MyClass",
    ],
    answer: 1,
    explanation: "exportディレクティブを使って、ライブラリのパブリックAPIを定義します。例：export 'src/my_class.dart' show MyClass;",
  },
  {
    question: "hide キーワードの役割は何ですか？",
    options: [
      "クラスを非表示にする",
      "インポート時に特定の名前を除外する",
      "変数をprivateにする",
      "ファイルを隠す",
    ],
    answer: 1,
    explanation: "import 'package:foo/foo.dart' hide SomeName;のようにhideを使うと、特定の名前だけをインポートから除外できます。",
  },
];

export default function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">パッケージ管理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのパッケージ管理システムを学びましょう。import/export構文、pubコマンド、pubspec.yaml、pub.devの活用方法など、ライブラリを使いこなして効率的な開発を行うための知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="packages" totalLessons={6} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/packages" color="orange" categoryId="packages" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">import・show・hide</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">import</code>文で他のライブラリを使用できます。<code className="text-orange-300">show</code>・<code className="text-orange-300">hide</code>で必要な部分だけをインポートできます。
        </p>
        <DartEditor
          defaultCode={`// dart:math から必要なものだけimport
import 'dart:math' show sqrt, pi, Random;
// import 'dart:math' hide Point; // 除外もできる

void main() {
  // sqrt と pi を使用
  print('√2 = \${sqrt(2).toStringAsFixed(4)}');
  print('π = \${pi.toStringAsFixed(4)}');

  // Random を使用
  final rand = Random(42); // シード値でテスト可能
  final values = List.generate(5, (_) => rand.nextInt(100));
  print('乱数: \$values');

  // as でエイリアス
  // import 'dart:math' as math;
  // math.sqrt(2) のように使う

  // dart:core は自動でimportされる
  print('文字列操作: \${'hello'.toUpperCase()}');
}`}
          expectedOutput={`√2 = 1.4142
π = 3.1416
乱数: [0, 85, 9, 77, 8]
文字列操作: HELLO`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pubspec.yaml の構造</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">pubspec.yaml</code>はDartプロジェクトの設定ファイルです。名前、バージョン、依存関係を定義します。
        </p>
        <DartEditor
          defaultCode={`// pubspec.yaml の例（コード内でコメントとして説明）
/*
name: my_dart_app
description: Dart学習アプリのサンプル
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  http: ^1.1.0        # HTTPクライアント
  path: ^1.8.3        # パス操作

dev_dependencies:
  test: ^1.24.0       # テストフレームワーク
  lints: ^3.0.0       # 静的解析ルール
*/

// バージョン制約の表記
void explainVersionConstraints() {
  const constraints = {
    '^1.2.3': '>=1.2.3 <2.0.0（互換バージョン）',
    '>=1.0.0 <2.0.0': '範囲指定',
    '1.2.3': '完全一致（非推奨）',
    'any': '任意のバージョン（非推奨）',
  };

  for (final entry in constraints.entries) {
    print('\${entry.key}: \${entry.value}');
  }
}

void main() {
  explainVersionConstraints();
}`}
          expectedOutput={`^1.2.3: >=1.2.3 <2.0.0（互換バージョン）
>=1.0.0 <2.0.0: 範囲指定
1.2.3: 完全一致（非推奨）
any: 任意のバージョン（非推奨）`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
