import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
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
          シングルトンパターンは、クラスのインスタンスが1つだけ存在することを保証し、そのインスタンスへのグローバルなアクセス点を提供するパターンです。
          データベース接続・設定管理・ログ記録などに使われます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• コンストラクタを<code className="text-pink-300">private</code>にして外部からのnewを禁止</li>
          <li>• <code className="text-pink-300">static</code>プロパティにインスタンスを保持</li>
          <li>• <code className="text-pink-300">getInstance()</code>静的メソッドでアクセスを提供</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なシングルトンの実装</h2>
        <p className="text-gray-400 mb-4">
          コンストラクタをprivateにし、staticメソッドでインスタンスを管理します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Config {
    private static ?Config $instance = null;
    private array $settings = [];

    private function __construct() {
        // デフォルト設定
        $this->settings = [
            'debug' => false,
            'timezone' => 'Asia/Tokyo',
            'version' => '1.0.0',
        ];
    }

    // クローンを禁止
    private function __clone() {}

    public static function getInstance(): Config {
        if (self::$instance === null) {
            self::$instance = new Config();
        }
        return self::$instance;
    }

    public function get(string $key, mixed $default = null): mixed {
        return $this->settings[$key] ?? $default;
    }

    public function set(string $key, mixed $value): void {
        $this->settings[$key] = $value;
    }
}

$config1 = Config::getInstance();
$config1->set('debug', true);

$config2 = Config::getInstance();
echo "同じインスタンス: " . ($config1 === $config2 ? "はい" : "いいえ") . "\\n";
echo "debug: " . ($config2->get('debug') ? "true" : "false") . "\\n";
echo "timezone: " . $config2->get('timezone') . "\\n";
echo "version: " . $config2->get('version') . "\\n";`}
          expectedOutput={`同じインスタンス: はい\ndebug: true\ntimezone: Asia/Tokyo\nversion: 1.0.0`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ロガーへの応用</h2>
        <p className="text-gray-400 mb-4">
          アプリケーション全体で1つのロガーを共有するパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
class Logger {
    private static ?Logger $instance = null;
    private array $logs = [];

    private function __construct() {}

    public static function getInstance(): Logger {
        if (self::$instance === null) {
            self::$instance = new Logger();
        }
        return self::$instance;
    }

    public function log(string $level, string $message): void {
        $timestamp = date('H:i:s');
        $this->logs[] = "[{$timestamp}] [{$level}] {$message}";
        echo "[{$level}] {$message}\\n";
    }

    public function info(string $message): void {
        $this->log('INFO', $message);
    }

    public function error(string $message): void {
        $this->log('ERROR', $message);
    }

    public function getLogs(): array {
        return $this->logs;
    }
}

// アプリケーションのどこからでも同じLoggerインスタンスを使用
$logger = Logger::getInstance();
$logger->info("アプリケーション起動");
$logger->info("ユーザーログイン: tanaka@example.com");
$logger->error("データベース接続タイムアウト");

echo "ログ件数: " . count(Logger::getInstance()->getLogs()) . "件\\n";`}
          expectedOutput={`[INFO] アプリケーション起動\n[INFO] ユーザーログイン: tanaka@example.com\n[ERROR] データベース接続タイムアウト\nログ件数: 3件`}
        />
      </section>
      <LessonCompleteButton lessonId="singleton" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/oop-advanced" />
    </div>
  );
}
