import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function DartSdkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold">エコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Dart SDK</h1>
        <p className="text-gray-400">Dart SDKの構成要素とコアライブラリの概要を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart SDKの構成</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart SDKにはDartアプリ開発に必要なすべてのツールとライブラリが含まれています。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-indigo-300">dart</code>コマンド: コンパイル・実行・テスト・フォーマット</li>
          <li>• <code className="text-indigo-300">pub</code>: パッケージマネージャー（dartコマンドに統合）</li>
          <li>• コアライブラリ: dart:core・dart:async・dart:io など</li>
          <li>• <code className="text-indigo-300">dart compile</code>: JS・ネイティブへのコンパイル</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dartコマンドの全体像</h2>
        <p className="text-gray-400 mb-4">
          Dart SDKに含まれるコマンドの一覧です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final dartCommands = {
    '実行・コンパイル': [
      ('dart run file.dart',      'Dartファイルを実行'),
      ('dart compile exe file.dart', 'ネイティブバイナリを生成'),
      ('dart compile js file.dart',  'JavaScriptにコンパイル'),
    ],
    '開発ツール': [
      ('dart analyze',    '静的解析（エラー・警告を表示）'),
      ('dart format .',   'コードを自動フォーマット'),
      ('dart fix --apply', '自動修正を適用'),
      ('dart doc',        'APIドキュメントを生成'),
    ],
    'テスト': [
      ('dart test',                   'すべてのテストを実行'),
      ('dart test test/unit_test.dart', '特定のテストを実行'),
      ('dart test --coverage=coverage', 'カバレッジ付きでテスト'),
    ],
    'パッケージ管理': [
      ('dart pub get',        'パッケージを取得'),
      ('dart pub add http',   'パッケージを追加'),
      ('dart pub remove pkg', 'パッケージを削除'),
      ('dart pub outdated',   '更新可能なパッケージを確認'),
      ('dart pub upgrade',    'パッケージを更新'),
    ],
  };

  dartCommands.forEach((category, cmds) {
    print('■ \$category');
    for (final (cmd, desc) in cmds) {
      print('  \${cmd.padRight(38)} # \$desc');
    }
    print('');
  });
}`}
          expectedOutput={`■ 実行・コンパイル\n  dart run file.dart                     # Dartファイルを実行\n  dart compile exe file.dart             # ネイティブバイナリを生成\n  dart compile js file.dart              # JavaScriptにコンパイル\n\n■ 開発ツール\n  dart analyze                           # 静的解析（エラー・警告を表示）\n  dart format .                          # コードを自動フォーマット\n  dart fix --apply                       # 自動修正を適用\n  dart doc                               # APIドキュメントを生成\n\n■ テスト\n  dart test                              # すべてのテストを実行\n  dart test test/unit_test.dart          # 特定のテストを実行\n  dart test --coverage=coverage          # カバレッジ付きでテスト\n\n■ パッケージ管理\n  dart pub get                           # パッケージを取得\n  dart pub add http                      # パッケージを追加\n  dart pub remove pkg                    # パッケージを削除\n  dart pub outdated                      # 更新可能なパッケージを確認\n  dart pub upgrade                       # パッケージを更新\n`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コアライブラリの詳細</h2>
        <p className="text-gray-400 mb-4">
          Dartのコアライブラリに含まれる主要なクラスと機能です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // dart:core の主要クラス（自動インポート）
  print('=== dart:core の主要型 ===');
  final coreTypes = {
    'int': '整数型 (-2^63 〜 2^63-1)',
    'double': '浮動小数点数型',
    'String': '文字列型（Unicode）',
    'bool': '論理型（true/false）',
    'List<T>': '動的配列',
    'Map<K,V>': 'キー・バリューマップ',
    'Set<T>': '重複なし集合',
    'Future<T>': '非同期処理の結果',
    'Stream<T>': '非同期データの流れ',
    'DateTime': '日時型',
    'Duration': '時間間隔型',
    'RegExp': '正規表現',
    'Exception': '例外基底クラス',
    'Iterable<T>': '反復可能コレクション',
  };

  coreTypes.forEach((type, desc) {
    print('  \${type.padRight(15)} - \$desc');
  });
}`}
          expectedOutput={`=== dart:core の主要型 ===\n  int             - 整数型 (-2^63 〜 2^63-1)\n  double          - 浮動小数点数型\n  String          - 文字列型（Unicode）\n  bool            - 論理型（true/false）\n  List<T>         - 動的配列\n  Map<K,V>        - キー・バリューマップ\n  Set<T>          - 重複なし集合\n  Future<T>       - 非同期処理の結果\n  Stream<T>       - 非同期データの流れ\n  DateTime        - 日時型\n  Duration        - 時間間隔型\n  RegExp          - 正規表現\n  Exception       - 例外基底クラス\n  Iterable<T>     - 反復可能コレクション`}
        />
      </section>
      <LessonCompleteButton lessonId="dart-sdk" categoryId="ecosystem" />
      <LessonNav lessons={lessons} currentId="dart-sdk" basePath="/learn/ecosystem" />
    </div>
  );
}
