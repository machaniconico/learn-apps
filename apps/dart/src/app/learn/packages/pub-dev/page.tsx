import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PubDevPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">パッケージ管理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">pub.dev</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">pub.dev</strong>はDartとFlutterの公式パッケージリポジトリです。
            パッケージのスコア・いいね・人気度などの指標でパッケージの品質を評価できます。
            良いパッケージを選ぶ基準を理解しましょう。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pub.dev スコアの見方</h2>
        <p className="text-gray-400 mb-4">
          pub.devの各スコア指標を理解して、信頼できるパッケージを選びましょう。
        </p>
        <DartEditor
          defaultCode={`// pub.dev の評価指標について

void explainPubDevScores() {
  print('=== pub.dev スコア指標 ===\\n');

  final scores = {
    'Pub Points (最大160点)': [
      '  ドキュメント充実度',
      '  plat対応 (Android/iOS/Web等)',
      '  静的解析（lint）パス',
      '  nullセーフティ対応',
      '  セマンティックバージョニング遵守',
    ],
    'Popularity': [
      '  過去60日間のダウンロード数',
      '  100% = pub.dev最多パッケージ比',
    ],
    'Likes': [
      '  開発者が★を付けた数',
    ],
  };

  for (final entry in scores.entries) {
    print('\${entry.key}:');
    entry.value.forEach(print);
    print('');
  }
}

void recommendedPackages() {
  print('=== カテゴリ別おすすめパッケージ ===\\n');
  final packages = {
    'HTTP通信': ['http ^1.1.0', 'dio ^5.3.0'],
    'JSON': ['json_annotation', 'freezed'],
    'ログ': ['logger ^2.0.0'],
    'テスト': ['test ^1.24.0', 'mockito ^5.4.0'],
    'パス': ['path ^1.8.0'],
    '日付': ['intl ^0.18.0'],
  };
  packages.forEach((cat, pkgs) => print('\$cat: \${pkgs.join(', ')}'));
}

void main() {
  explainPubDevScores();
  recommendedPackages();
}`}
          expectedOutput={`=== pub.dev スコア指標 ===

Pub Points (最大160点):
  ドキュメント充実度
  plat対応 (Android/iOS/Web等)
  静的解析（lint）パス
  nullセーフティ対応
  セマンティックバージョニング遵守

Popularity:
  過去60日間のダウンロード数
  100% = pub.dev最多パッケージ比

Likes:
  開発者が★を付けた数

=== カテゴリ別おすすめパッケージ ===

HTTP通信: http ^1.1.0, dio ^5.3.0
JSON: json_annotation, freezed
ログ: logger ^2.0.0
テスト: test ^1.24.0, mockito ^5.4.0
パス: path ^1.8.0
日付: intl ^0.18.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの使用例</h2>
        <p className="text-gray-400 mb-4">
          pub.devからインストールしたパッケージの典型的な使用パターンです。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';
import 'dart:math';

// logger パッケージの模擬実装
class Logger {
  final String _name;
  Logger(this._name);

  void d(String message) => print('[DEBUG] [\$_name] \$message');
  void i(String message) => print('[INFO]  [\$_name] \$message');
  void w(String message) => print('[WARN]  [\$_name] \$message');
  void e(String message) => print('[ERROR] [\$_name] \$message');
}

void main() {
  final log = Logger('MyApp');

  log.i('アプリケーション起動');

  try {
    final data = jsonDecode('{"key": "value"}');
    log.d('JSON解析成功: \$data');

    final result = sqrt(16);
    log.i('計算結果: \$result');

  } catch (e, s) {
    log.e('エラー: \$e');
  }

  log.w('この機能は非推奨です');
  log.i('処理完了');
}`}
          expectedOutput={`[INFO]  [MyApp] アプリケーション起動
[DEBUG] [MyApp] JSON解析成功: {key: value}
[INFO]  [MyApp] 計算結果: 4.0
[WARN]  [MyApp] この機能は非推奨です
[INFO]  [MyApp] 処理完了`}
        />
      </section>

      <LessonCompleteButton lessonId="pub-dev" categoryId="packages" />
      <LessonNav lessons={lessons} currentId="pub-dev" basePath="/learn/packages" />
    </div>
  );
}
