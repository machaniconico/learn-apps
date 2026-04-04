import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LoggingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ロギング</h1>
        <p className="text-gray-400">dart:developerのlogを使った構造化ログ出力を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ロギングとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ロギングはアプリケーションの動作を記録する仕組みです。単純なprint()と違い、
          ログレベル・タイムスタンプ・構造化情報を管理できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">DEBUG</code>: 詳細な開発情報</li>
          <li>• <code className="text-orange-300">INFO</code>: 通常の動作情報</li>
          <li>• <code className="text-orange-300">WARNING</code>: 注意が必要な状況</li>
          <li>• <code className="text-orange-300">ERROR</code>: エラー情報</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなロガーの実装</h2>
        <p className="text-gray-400 mb-4">
          ログレベルとフォーマットを管理するロガークラスです。
        </p>
        <DartEditor
          defaultCode={`enum LogLevel { debug, info, warning, error }

class Logger {
  final String name;
  LogLevel minLevel;

  Logger(this.name, {this.minLevel = LogLevel.debug});

  void _log(LogLevel level, String message) {
    if (level.index < minLevel.index) return;
    final label = level.name.toUpperCase().padRight(7);
    print('[\$label] [\$name] \$message');
  }

  void debug(String msg) => _log(LogLevel.debug, msg);
  void info(String msg) => _log(LogLevel.info, msg);
  void warning(String msg) => _log(LogLevel.warning, msg);
  void error(String msg) => _log(LogLevel.error, msg);
}

void main() {
  final appLog = Logger('App');
  final dbLog = Logger('DB', minLevel: LogLevel.warning);

  appLog.debug('アプリ初期化中');
  appLog.info('サーバー起動: port=8080');
  appLog.warning('設定ファイルが見つかりません、デフォルト値を使用');
  appLog.error('重大エラーが発生しました');

  print('');

  // DBロガーはwarning以上のみ表示
  dbLog.debug('クエリ実行: SELECT * FROM users');
  dbLog.info('接続確立');
  dbLog.warning('スロークエリ: 2.3秒');
  dbLog.error('接続タイムアウト');
}`}
          expectedOutput={`[DEBUG  ] [App] アプリ初期化中\n[INFO   ] [App] サーバー起動: port=8080\n[WARNING] [App] 設定ファイルが見つかりません、デフォルト値を使用\n[ERROR  ] [App] 重大エラーが発生しました\n\n[WARNING] [DB] スロークエリ: 2.3秒\n[ERROR  ] [DB] 接続タイムアウト`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">構造化ロギング</h2>
        <p className="text-gray-400 mb-4">
          コンテキスト情報を付加した構造化ロギングパターンです。
        </p>
        <DartEditor
          defaultCode={`class StructuredLogger {
  final String component;
  final Map<String, dynamic> _context = {};

  StructuredLogger(this.component);

  void withContext(Map<String, dynamic> ctx) {
    _context.addAll(ctx);
  }

  void log(String level, String message, [Map<String, dynamic>? extra]) {
    final fields = {..._context, if (extra != null) ...extra};
    final fieldsStr = fields.entries.map((e) => '\${e.key}=\${e.value}').join(' ');
    print('level=\$level component=\$component msg="\$message"\${fieldsStr.isNotEmpty ? " \$fieldsStr" : ""}');
  }
}

void main() {
  final logger = StructuredLogger('UserService');
  logger.withContext({'env': 'production'});

  logger.log('INFO', 'ユーザー登録開始', {'userId': 'u-123', 'email': 'user@example.com'});
  logger.log('INFO', 'メール送信完了', {'userId': 'u-123', 'type': 'welcome'});
  logger.log('ERROR', '登録失敗', {'userId': 'u-456', 'reason': 'duplicate_email'});
}`}
          expectedOutput={`level=INFO component=UserService msg="ユーザー登録開始" env=production userId=u-123 email=user@example.com\nlevel=INFO component=UserService msg="メール送信完了" env=production userId=u-123 type=welcome\nlevel=ERROR component=UserService msg="登録失敗" env=production userId=u-456 reason=duplicate_email`}
        />
      </section>
      <LessonCompleteButton lessonId="logging" categoryId="debug" />
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/debug" />
    </div>
  );
}
