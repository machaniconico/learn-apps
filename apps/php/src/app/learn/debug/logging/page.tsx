import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ログ</h1>
        <p className="text-gray-400">error_log関数とPSR-3ロガーインターフェースを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ログの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境ではvar_dumpは使えません。ログは問題の診断、監査証跡、パフォーマンス分析に欠かせません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">DEBUG</code> - 詳細なデバッグ情報</li>
          <li><code className="text-orange-300">INFO</code> - 一般的な情報（リクエスト受付など）</li>
          <li><code className="text-orange-300">WARNING</code> - 注意が必要だが致命的でない</li>
          <li><code className="text-orange-300">ERROR</code> - エラー（対処が必要）</li>
          <li><code className="text-orange-300">CRITICAL</code> - 重大なエラー</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PSR-3準拠のロガー実装</h2>
        <p className="text-gray-400 mb-4">PSR-3のLoggerInterfaceに準拠したシンプルなロガーを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
// PSR-3インターフェースの簡易実装
class Logger {
    private const LEVELS = [
        'DEBUG'    => 100,
        'INFO'     => 200,
        'WARNING'  => 300,
        'ERROR'    => 400,
        'CRITICAL' => 500,
    ];

    public function __construct(
        private string $channel = 'app',
        private int $minLevel = 100,
    ) {}

    public function debug(string $message, array $context = []): void {
        $this->log('DEBUG', $message, $context);
    }

    public function info(string $message, array $context = []): void {
        $this->log('INFO', $message, $context);
    }

    public function warning(string $message, array $context = []): void {
        $this->log('WARNING', $message, $context);
    }

    public function error(string $message, array $context = []): void {
        $this->log('ERROR', $message, $context);
    }

    private function log(string $level, string $message, array $context): void {
        if (self::LEVELS[$level] < $this->minLevel) return;

        // コンテキストをメッセージに埋め込む（PSR-3）
        $message = preg_replace_callback('/\{(\w+)\}/', function($m) use ($context) {
            return $context[$m[1]] ?? $m[0];
        }, $message);

        $timestamp = date('Y-m-d H:i:s');
        $contextJson = empty($context) ? '' : ' ' . json_encode($context, JSON_UNESCAPED_UNICODE);
        echo "[$timestamp] [{$this->channel}] [$level] $message$contextJson\n";
    }
}

$logger = new Logger(channel: 'web', minLevel: 200); // DEBUGを除外

$logger->debug('詳細情報（除外される）', ['detail' => 'test']);
$logger->info('ユーザーログイン', ['user_id' => 42, 'ip' => '192.168.1.1']);
$logger->warning('ログイン試行失敗', ['user' => 'unknown', 'attempts' => 3]);
$logger->error('DBクエリ失敗', ['query' => 'SELECT * FROM users', 'error' => 'Connection refused']);`}
          expectedOutput={`[2024-01-01 00:00:00] [web] [INFO] ユーザーログイン {"user_id":42,"ip":"192.168.1.1"}
[2024-01-01 00:00:00] [web] [WARNING] ログイン試行失敗 {"user":"unknown","attempts":3}
[2024-01-01 00:00:00] [web] [ERROR] DBクエリ失敗 {"query":"SELECT * FROM users","error":"Connection refused"}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造化ログとコンテキスト</h2>
        <p className="text-gray-400 mb-4">構造化ログ（JSON形式）を使うと、ログ集約ツールでの検索・分析が容易になります。</p>
        <PhpEditor
          defaultCode={`<?php
class StructuredLogger {
    public function __construct(
        private string $service = 'php-app',
        private string $version = '1.0.0',
    ) {}

    public function log(string $level, string $message, array $context = []): void {
        $entry = array_merge([
            'timestamp' => date('c'),
            'level' => $level,
            'service' => $this->service,
            'version' => $this->version,
            'message' => $message,
        ], $context);

        echo json_encode($entry, JSON_UNESCAPED_UNICODE) . "\n";
    }
}

$logger = new StructuredLogger('user-api', '2.0.0');

$logger->log('INFO', 'APIリクエスト受信', [
    'method' => 'GET',
    'path' => '/api/users/42',
    'user_id' => 42,
    'duration_ms' => 15,
]);

$logger->log('ERROR', 'バリデーションエラー', [
    'field' => 'email',
    'value' => 'invalid-email',
    'rule' => 'email_format',
]);`}
          expectedOutput={`{"timestamp":"2024-01-01T00:00:00+00:00","level":"INFO","service":"user-api","version":"2.0.0","message":"APIリクエスト受信","method":"GET","path":"\/api\/users\/42","user_id":42,"duration_ms":15}
{"timestamp":"2024-01-01T00:00:00+00:00","level":"ERROR","service":"user-api","version":"2.0.0","message":"バリデーションエラー","field":"email","value":"invalid-email","rule":"email_format"}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="logging" />
      </div>
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/debug" />
    </div>
  );
}
