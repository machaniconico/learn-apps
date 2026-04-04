import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "pub.devの役割は何ですか？",
    options: [
      "Dartのソースコードをコンパイルする",
      "Dartパッケージの公式リポジトリ",
      "Dartのバグ追跡システム",
      "Dartのドキュメント生成ツール",
    ],
    answer: 1,
    explanation: "pub.devはDartとFlutterパッケージの公式リポジトリです。パッケージを検索・公開・管理できます。",
  },
  {
    question: "dart analyzeコマンドの役割は何ですか？",
    options: [
      "コードを実行する",
      "コードの静的解析を行いエラーや警告を表示する",
      "テストを実行する",
      "パッケージを更新する",
    ],
    answer: 1,
    explanation: "dart analyzeは静的解析ツールで、実行前にコードのエラー・警告・リントルールの違反を検出します。",
  },
  {
    question: "pubspec.yamlのversionフィールドで^1.2.3が意味することは何ですか？",
    options: [
      "バージョン1.2.3のみ",
      "1.2.3以上2.0.0未満の互換バージョン",
      "1.2.3より大きい任意のバージョン",
      "最新バージョン",
    ],
    answer: 1,
    explanation: "^1.2.3はセマンティックバージョニングの互換演算子で、1.2.3以上2.0.0未満のバージョンを意味します。",
  },
  {
    question: "dart formatコマンドの役割は何ですか？",
    options: [
      "コードを圧縮する",
      "Dartの公式スタイルガイドに従ってコードを自動整形する",
      "コードをコンパイルする",
      "ドキュメントを生成する",
    ],
    answer: 1,
    explanation: "dart formatはDartの公式スタイルガイド（effective dart）に従ってコードを自動整形します。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">エコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartエコシステムの全体像を学びましょう。Dart SDK・pub.devパッケージリポジトリ・公式ツール（dart format・dart analyze・dart test）・コミュニティ・バージョン管理まで、Dart開発者として必要な周辺知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="indigo" categoryId="ecosystem" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Dart SDKの概要</h2>
        <p className="text-gray-400 mb-4">
          Dart SDKに含まれるコアライブラリを確認しましょう。<code className="text-teal-300">dart:</code>プレフィックスのライブラリが組み込みで利用できます。
        </p>
        <DartEditor
          defaultCode={`// Dart SDKの主なコアライブラリ
void main() {
  // dart:core - 基本型・コレクション（自動インポート）
  final list = [1, 2, 3];
  print('dart:core - List: \$list');

  // dart:math - 数学関数
  // import 'dart:math' が必要（概念として）
  final pi = 3.141592653589793;
  final sqrt2 = 1.4142135623730951;
  print('dart:math - π: \${pi.toStringAsFixed(4)}');
  print('dart:math - √2: \${sqrt2.toStringAsFixed(4)}');

  // dart:convert - エンコード/デコード
  // import 'dart:convert' が必要
  // jsonEncode({'key': 'value'}) → '{"key":"value"}'
  print('dart:convert - JSON変換をサポート');

  // Dart SDKの主なライブラリ一覧
  const coreLibs = [
    'dart:core   - 基本型・コレクション・例外',
    'dart:async  - Future・Stream・非同期処理',
    'dart:io     - ファイル・HTTP・プロセス',
    'dart:math   - 数学関数・乱数',
    'dart:convert - JSON・UTF8・Base64変換',
    'dart:developer - デバッグ・ログ・DevTools',
  ];

  print('\\n=== Dart コアライブラリ ===');
  for (final lib in coreLibs) {
    print('• \$lib');
  }
}`}
          expectedOutput={`dart:core - List: [1, 2, 3]\ndart:math - π: 3.1416\ndart:math - √2: 1.4142\ndart:convert - JSON変換をサポート\n\n=== Dart コアライブラリ ===\n• dart:core   - 基本型・コレクション・例外\n• dart:async  - Future・Stream・非同期処理\n• dart:io     - ファイル・HTTP・プロセス\n• dart:math   - 数学関数・乱数\n• dart:convert - JSON・UTF8・Base64変換\n• dart:developer - デバッグ・ログ・DevTools`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pub.devの活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">pubspec.yaml</code>を使ったパッケージ管理の基本です。
        </p>
        <DartEditor
          defaultCode={`// pubspec.yamlの構造（概念コード）
const pubspecExample = """
name: my_dart_app
description: Dartアプリケーションの例
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  http: ^1.1.0          # HTTPクライアント
  json_annotation: ^4.8.1
  args: ^2.4.2           # CLI引数解析

dev_dependencies:
  test: ^1.24.0          # テストフレームワーク
  lints: ^3.0.0          # Lintルール
""";

// よく使われるパッケージ
void main() {
  print('=== pub.dev 人気パッケージ ===');

  final packages = {
    'http': 'HTTPリクエスト（REST API通信）',
    'provider': 'Flutter状態管理',
    'dio': '高機能HTTPクライアント',
    'freezed': 'イミュータブルクラス生成',
    'riverpod': 'リアクティブ状態管理',
    'get_it': '依存性注入コンテナ',
    'logger': '高機能ログ出力',
    'args': 'CLIコマンドライン引数',
  };

  packages.forEach((name, desc) {
    print('• \$name: \$desc');
  });

  print('\\ndart pub add http  # パッケージ追加コマンド');
}`}
          expectedOutput={`=== pub.dev 人気パッケージ ===\n• http: HTTPリクエスト（REST API通信）\n• provider: Flutter状態管理\n• dio: 高機能HTTPクライアント\n• freezed: イミュータブルクラス生成\n• riverpod: リアクティブ状態管理\n• get_it: 依存性注入コンテナ\n• logger: 高機能ログ出力\n• args: CLIコマンドライン引数\n\ndart pub add http  # パッケージ追加コマンド`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
