import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function PubDevEcosystemPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold">エコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">pub.devエコシステム</h1>
        <p className="text-gray-400">pub.devパッケージリポジトリの活用方法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pub.devとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="text-indigo-300">pub.dev</code>はDartとFlutterパッケージの公式リポジトリです。
          6万以上のパッケージが公開されており、品質スコアで評価されています。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-indigo-300">Likes</code>: コミュニティからのいいね数</li>
          <li>• <code className="text-indigo-300">Pub Points</code>: コード品質・ドキュメント・メンテナンス度</li>
          <li>• <code className="text-indigo-300">Popularity</code>: 他パッケージからの依存度</li>
          <li>• <code className="text-indigo-300">Publisher</code>: 公式（dart.dev/flutter.dev）かどうか</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カテゴリ別人気パッケージ</h2>
        <p className="text-gray-400 mb-4">
          用途別によく使われるDart/Flutterパッケージです。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final packages = {
    'HTTP・ネットワーク': [
      ('http',    'dart.dev',    'シンプルなHTTPクライアント'),
      ('dio',     'flutter.cn',  '高機能HTTPクライアント・インターセプタ'),
      ('retrofit','tchoforwilson','型安全なREST APIクライアント'),
    ],
    'JSON・シリアライズ': [
      ('json_serializable', 'google.dev', 'コード生成ベースのJSONシリアライズ'),
      ('freezed',           'rrousselGit', 'イミュータブルクラス・Union型生成'),
      ('built_value',       'google.dev',  'イミュータブル値オブジェクト'),
    ],
    '状態管理（Flutter）': [
      ('provider',  'flutter.dev', 'シンプルな状態管理'),
      ('riverpod',  'remi.rousselet', 'タイプセーフなリアクティブ状態管理'),
      ('bloc',      'bloclibrary.dev', 'BLoCパターンの状態管理'),
    ],
    'テスト': [
      ('test',       'dart.dev',     'Dartテストフレームワーク'),
      ('mockito',    'dart.dev',     'モックライブラリ'),
      ('faker',      'faker.dev',    'テストデータ生成'),
    ],
    'ユーティリティ': [
      ('collection', 'dart.dev',   '高度なコレクション操作'),
      ('logger',     'simc0de.dev', '高機能ログ出力'),
      ('equatable',  'felangel',    '値の等価性比較'),
    ],
  };

  packages.forEach((category, pkgs) {
    print('■ \$category');
    for (final (name, publisher, desc) in pkgs) {
      print('  \${name.padRight(18)} [\$publisher]');
      print('    \$desc');
    }
    print('');
  });
}`}
          expectedOutput={`■ HTTP・ネットワーク\n  http               [dart.dev]\n    シンプルなHTTPクライアント\n  dio                [flutter.cn]\n    高機能HTTPクライアント・インターセプタ\n  retrofit           [tchoforwilson]\n    型安全なREST APIクライアント\n\n■ JSON・シリアライズ\n  json_serializable  [google.dev]\n    コード生成ベースのJSONシリアライズ\n  freezed            [rrousselGit]\n    イミュータブルクラス・Union型生成\n  built_value        [google.dev]\n    イミュータブル値オブジェクト\n\n■ 状態管理（Flutter）\n  provider           [flutter.dev]\n    シンプルな状態管理\n  riverpod           [remi.rousselet]\n    タイプセーフなリアクティブ状態管理\n  bloc               [bloclibrary.dev]\n    BLoCパターンの状態管理\n\n■ テスト\n  test               [dart.dev]\n    Dartテストフレームワーク\n  mockito            [dart.dev]\n    モックライブラリ\n  faker              [faker.dev]\n    テストデータ生成\n\n■ ユーティリティ\n  collection         [dart.dev]\n    高度なコレクション操作\n  logger             [simc0de.dev]\n    高機能ログ出力\n  equatable          [felangel]\n    値の等価性比較\n`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの選定基準</h2>
        <p className="text-gray-400 mb-4">
          安全なパッケージを選ぶためのチェックポイントです。
        </p>
        <DartEditor
          defaultCode={`class PackageEvaluator {
  static String evaluate(Map<String, dynamic> pkg) {
    final score = pkg['pubPoints'] as int;
    final likes = pkg['likes'] as int;
    final publisher = pkg['publisher'] as String;
    final lastUpdate = pkg['daysSinceUpdate'] as int;
    final nullSafe = pkg['nullSafe'] as bool;

    final issues = <String>[];
    final goods = <String>[];

    if (score >= 110) goods.add('高品質スコア(\$score/130)');
    else issues.add('スコア低め(\$score/130)');

    if (likes >= 500) goods.add('人気(\$likes likes)');
    else if (likes < 50) issues.add('いいね少なめ(\$likes)');

    if (publisher.endsWith('.dev')) goods.add('公式Publisher');

    if (lastUpdate <= 180) goods.add('最近更新あり(\${lastUpdate}日前)');
    else issues.add('更新停滞(\${lastUpdate}日前)');

    if (nullSafe) goods.add('Null Safety対応');
    else issues.add('Null Safety未対応');

    final recommend = issues.isEmpty ? '✅ 推奨' : issues.length == 1 ? '⚠️ 要確認' : '❌ 非推奨';
    return '\${pkg["name"]}: \$recommend\\n  👍 \${goods.join(", ")}\\n  ⚠️  \${issues.isEmpty ? "なし" : issues.join(", ")}';
  }
}

void main() {
  final packages = [
    {'name': 'http', 'pubPoints': 130, 'likes': 5200, 'publisher': 'dart.dev', 'daysSinceUpdate': 30, 'nullSafe': true},
    {'name': 'old_pkg', 'pubPoints': 60, 'likes': 20, 'publisher': 'unknown', 'daysSinceUpdate': 730, 'nullSafe': false},
  ];

  for (final pkg in packages) {
    print(PackageEvaluator.evaluate(pkg));
    print('');
  }
}`}
          expectedOutput={`http: ✅ 推奨\n  👍 高品質スコア(130/130), 人気(5200 likes), 公式Publisher, 最近更新あり(30日前), Null Safety対応\n  ⚠️  なし\n\nold_pkg: ❌ 非推奨\n  👍 \n  ⚠️  スコア低め(60/130), いいね少なめ(20), 更新停滞(730日前), Null Safety未対応`}
        />
      </section>
      <LessonCompleteButton lessonId="pub-dev-ecosystem" categoryId="ecosystem" />
      <LessonNav lessons={lessons} currentId="pub-dev-ecosystem" basePath="/learn/ecosystem" />
    </div>
  );
}
