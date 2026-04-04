import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function SingletonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">シングルトン</h1>
        <p className="text-gray-400">インスタンスを1つに制限するシングルトンパターンを学び、グローバルな共有リソースを安全に管理します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          シングルトンパターンはクラスのインスタンスが1つだけ存在することを保証し、そのインスタンスへのグローバルなアクセス点を提供します。
          データベース接続・設定管理・ログ記録などに使われます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• コンストラクタを<code className="text-pink-300">プライベート</code>にして外部からのnewを禁止</li>
          <li>• <code className="text-pink-300">static</code>フィールドにインスタンスを保持</li>
          <li>• <code className="text-pink-300">getInstance()</code>静的メソッドでアクセスを提供</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なシングルトンの実装</h2>
        <p className="text-gray-400 mb-4">
          Dartでは<code className="text-teal-300">_internal()</code>ネームドコンストラクタでインスタンスをプライベートに初期化します。
        </p>
        <DartEditor
          defaultCode={`class AppConfig {
  static AppConfig? _instance;
  final Map<String, dynamic> _settings = {};

  AppConfig._internal() {
    _settings['debug'] = false;
    _settings['timezone'] = 'Asia/Tokyo';
    _settings['version'] = '1.0.0';
  }

  static AppConfig get instance {
    _instance ??= AppConfig._internal();
    return _instance!;
  }

  dynamic get(String key) => _settings[key];

  void set(String key, dynamic value) {
    _settings[key] = value;
  }
}

void main() {
  final config1 = AppConfig.instance;
  config1.set('debug', true);

  final config2 = AppConfig.instance;
  print('同じインスタンス: \${identical(config1, config2)}');
  print('debug: \${config2.get("debug")}');
  print('timezone: \${config2.get("timezone")}');
  print('version: \${config2.get("version")}');
}`}
          expectedOutput={`同じインスタンス: true\ndebug: true\ntimezone: Asia/Tokyo\nversion: 1.0.0`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ロガーへの応用</h2>
        <p className="text-gray-400 mb-4">
          アプリケーション全体で1つのロガーを共有するパターンです。
        </p>
        <DartEditor
          defaultCode={`class Logger {
  static Logger? _instance;
  final List<String> _logs = [];

  Logger._internal();

  static Logger get instance {
    _instance ??= Logger._internal();
    return _instance!;
  }

  void info(String message) {
    _logs.add('[INFO] \$message');
    print('[INFO] \$message');
  }

  void error(String message) {
    _logs.add('[ERROR] \$message');
    print('[ERROR] \$message');
  }

  int get logCount => _logs.length;
}

void main() {
  final logger = Logger.instance;
  logger.info('アプリケーション起動');
  logger.info('ユーザーログイン: tanaka@example.com');
  logger.error('データベース接続タイムアウト');
  print('ログ件数: \${Logger.instance.logCount}件');
}`}
          expectedOutput={`[INFO] アプリケーション起動\n[INFO] ユーザーログイン: tanaka@example.com\n[ERROR] データベース接続タイムアウト\nログ件数: 3件`}
        />
      </section>
      <LessonCompleteButton lessonId="singleton" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/oop-advanced" />
    </div>
  );
}
