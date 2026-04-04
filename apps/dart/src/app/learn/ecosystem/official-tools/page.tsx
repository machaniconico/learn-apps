import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function OfficialToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold">エコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">公式ツール</h1>
        <p className="text-gray-400">dart format・dart analyze・dart testなど公式ツールの使い方を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart公式ツールの概要</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          DartのSDKにはコード品質を維持するための公式ツールが含まれています。
          CI/CDパイプラインでこれらを自動実行することが推奨されます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-indigo-300">dart format</code>: コードを自動整形</li>
          <li>• <code className="text-indigo-300">dart analyze</code>: 静的解析でバグを早期発見</li>
          <li>• <code className="text-indigo-300">dart test</code>: ユニットテストの実行</li>
          <li>• <code className="text-indigo-300">dart doc</code>: APIドキュメントの生成</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">analysis_options.yamlの設定</h2>
        <p className="text-gray-400 mb-4">
          Dartの静的解析ルールを<code className="text-teal-300">analysis_options.yaml</code>で設定します。
        </p>
        <DartEditor
          defaultCode={`// analysis_options.yaml の例と解析ルールの概念

const analysisOptionsExample = """
# analysis_options.yaml
include: package:lints/recommended.yaml

analyzer:
  errors:
    # エラーレベルの調整
    unused_local_variable: warning
    dead_code: warning
    missing_return: error
  exclude:
    - "**/*.g.dart"   # 生成ファイルを除外
    - "**/*.freezed.dart"

linter:
  rules:
    # 強制するルール
    - prefer_const_constructors
    - prefer_final_locals
    - avoid_print          # productionではloggerを使う
    - prefer_single_quotes
    - sort_constructors_first

    # 無効化するルール
    - public_member_api_docs: false
""";

// コード品質チェックの自動化
void runQualityChecks() {
  final checks = [
    ('dart format --set-exit-if-changed .', 'フォーマット確認'),
    ('dart analyze --fatal-infos',         '静的解析'),
    ('dart test --coverage=coverage',      'テスト実行+カバレッジ'),
    ('dart doc',                           'ドキュメント生成'),
  ];

  print('=== CI/CD品質チェック ===\\n');
  for (final (cmd, desc) in checks) {
    print('✓ \$desc');
    print('  \$ \$cmd');
  }

  print('\\n=== Lintルール（おすすめ） ===');
  final lintRules = {
    'prefer_const_constructors': 'constコンストラクタを推奨',
    'prefer_final_locals': 'ローカル変数はfinalを推奨',
    'avoid_print': 'printの代わりにloggerを使う',
    'prefer_single_quotes': 'シングルクォートを優先',
    'unnecessary_null_checks': '不要なnullチェックを警告',
    'use_super_parameters': 'super.parameterの使用を推奨',
  };

  lintRules.forEach((rule, desc) {
    print('  • \$rule');
    print('    → \$desc');
  });
}

void main() {
  runQualityChecks();
}`}
          expectedOutput={`=== CI/CD品質チェック ===\n\n✓ フォーマット確認\n  $ dart format --set-exit-if-changed .\n✓ 静的解析\n  $ dart analyze --fatal-infos\n✓ テスト実行+カバレッジ\n  $ dart test --coverage=coverage\n✓ ドキュメント生成\n  $ dart doc\n\n=== Lintルール（おすすめ） ===\n  • prefer_const_constructors\n    → constコンストラクタを推奨\n  • prefer_final_locals\n    → ローカル変数はfinalを推奨\n  • avoid_print\n    → printの代わりにloggerを使う\n  • prefer_single_quotes\n    → シングルクォートを優先\n  • unnecessary_null_checks\n    → 不要なnullチェックを警告\n  • use_super_parameters\n    → super.parameterの使用を推奨`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart formatの動作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dart format</code>が適用するスタイルルールです。
        </p>
        <DartEditor
          defaultCode={`// dart format が修正するコードの例

// フォーマット前（整形されていない）
String bad = """
class  BadCode{
String name;
int   age;
BadCode(this.name,this.age);
void  greet(){
print('Hello '+name);
}
}
""";

// フォーマット後（dart format適用）
String good = """
class GoodCode {
  String name;
  int age;

  GoodCode(this.name, this.age);

  void greet() {
    print('Hello \$name');
  }
}
""";

void main() {
  print('dart format の主なルール:');
  final rules = [
    '• インデントは2スペース',
    '• 演算子の周りにスペース',
    '• コンマの後にスペース',
    '• 80文字を超える行は自動改行',
    '• 空行の統一（クラス間1行・メソッド間1行）',
    '• {}の前後のスペース',
    '• トレイリングカンマで縦並びに整形',
  ];

  for (final rule in rules) {
    print(rule);
  }

  print('\\n実行方法:');
  print('  dart format .          # カレントディレクトリを整形');
  print('  dart format lib/       # libディレクトリのみ整形');
  print('  dart format --output show lib/main.dart  # 変更内容を表示のみ');
}`}
          expectedOutput={`dart format の主なルール:\n• インデントは2スペース\n• 演算子の周りにスペース\n• コンマの後にスペース\n• 80文字を超える行は自動改行\n• 空行の統一（クラス間1行・メソッド間1行）\n• {}の前後のスペース\n• トレイリングカンマで縦並びに整形\n\n実行方法:\n  dart format .          # カレントディレクトリを整形\n  dart format lib/       # libディレクトリのみ整形\n  dart format --output show lib/main.dart  # 変更内容を表示のみ`}
        />
      </section>
      <LessonCompleteButton lessonId="official-tools" categoryId="ecosystem" />
      <LessonNav lessons={lessons} currentId="official-tools" basePath="/learn/ecosystem" />
    </div>
  );
}
