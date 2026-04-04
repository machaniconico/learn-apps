import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラー追跡</h1>
        <p className="text-gray-400">スタックトレースの読み方とエラートラッキングツールを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラー追跡の重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境で発生するエラーを効率的に追跡・修正するには、適切なエラー捕捉と通知の仕組みが必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">set_exception_handler()</code> - 未捕捉例外のハンドラ設定</li>
          <li><code className="text-orange-300">set_error_handler()</code> - PHPエラーのカスタムハンドラ</li>
          <li><code className="text-orange-300">register_shutdown_function()</code> - 致命的エラーの捕捉</li>
          <li>Sentry、Bugsnagなどのエラートラッキングサービスと連携</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">グローバルエラーハンドラー</h2>
        <p className="text-gray-400 mb-4">set_exception_handlerとset_error_handlerを使って未捕捉のエラーを一元管理します。</p>
        <PhpEditor
          defaultCode={`<?php
// エラートラッカーの実装
class ErrorTracker {
    private array $errors = [];

    public function register(): void {
        set_exception_handler([$this, 'handleException']);
        set_error_handler([$this, 'handleError']);
    }

    public function handleException(\Throwable $e): void {
        $this->record([
            'type' => 'exception',
            'class' => get_class($e),
            'message' => $e->getMessage(),
            'file' => basename($e->getFile()),
            'line' => $e->getLine(),
            'trace_depth' => count($e->getTrace()),
        ]);
    }

    public function handleError(int $errno, string $errstr, string $errfile, int $errline): bool {
        $levels = [E_WARNING => 'WARNING', E_NOTICE => 'NOTICE', E_USER_ERROR => 'USER_ERROR'];
        $this->record([
            'type' => 'error',
            'level' => $levels[$errno] ?? "E_$errno",
            'message' => $errstr,
            'file' => basename($errfile),
            'line' => $errline,
        ]);
        return true; // PHPのデフォルト処理を抑制
    }

    private function record(array $data): void {
        $data['timestamp'] = date('H:i:s');
        $this->errors[] = $data;
        $type = strtoupper($data['type']);
        echo "[{$data['timestamp']}] [$type] {$data['message']} ({$data['file']}:{$data['line']})\n";
    }

    public function getSummary(): void {
        echo "\nエラーサマリー: " . count($this->errors) . "件\n";
        foreach ($this->errors as $e) {
            $level = $e['class'] ?? $e['level'] ?? 'ERROR';
            echo "  - [$level] {$e['message']}\n";
        }
    }
}

$tracker = new ErrorTracker();
$tracker->register();

// エラーをシミュレート
trigger_error("未定義変数にアクセスしました", E_USER_NOTICE);
trigger_error("データベース接続が遅延しています", E_USER_WARNING);

try {
    throw new RuntimeException("ファイルの書き込みに失敗しました", 500);
} catch (RuntimeException $e) {
    $tracker->handleException($e);
}

$tracker->getSummary();`}
          expectedOutput={`[00:00:00] [ERROR] 未定義変数にアクセスしました (script.php:45)
[00:00:00] [ERROR] データベース接続が遅延しています (script.php:46)
[00:00:00] [EXCEPTION] ファイルの書き込みに失敗しました (script.php:49)

エラーサマリー: 3件
  - [E_USER_NOTICE] 未定義変数にアクセスしました
  - [E_USER_WARNING] データベース接続が遅延しています
  - [RuntimeException] ファイルの書き込みに失敗しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの読み方</h2>
        <p className="text-gray-400 mb-4">スタックトレースをきれいに整形して、エラーの原因を素早く特定する方法を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
function formatException(\Throwable $e): string {
    $lines = [];
    $lines[] = get_class($e) . ": " . $e->getMessage();
    $lines[] = "  ファイル: " . $e->getFile() . ":" . $e->getLine();
    $lines[] = "";
    $lines[] = "スタックトレース:";

    foreach ($e->getTrace() as $i => $frame) {
        $location = isset($frame['file'])
            ? basename($frame['file']) . ":" . ($frame['line'] ?? '?')
            : '[internal function]';
        $call = ($frame['class'] ?? '') . ($frame['type'] ?? '') . $frame['function'] . '()';
        $lines[] = "  #$i $call at $location";
    }

    if ($prev = $e->getPrevious()) {
        $lines[] = "";
        $lines[] = "原因:";
        $lines[] = "  " . get_class($prev) . ": " . $prev->getMessage();
    }

    return implode("\n", $lines);
}

// 例外チェーンのデモ
try {
    try {
        throw new \PDOException("SQLSTATE[HY000]: General error");
    } catch (\PDOException $e) {
        throw new \RuntimeException("ユーザー一覧の取得に失敗しました", 0, $e);
    }
} catch (\RuntimeException $e) {
    echo formatException($e) . "\n";
}`}
          expectedOutput={`RuntimeException: ユーザー一覧の取得に失敗しました
  ファイル: /var/www/script.php:18

スタックトレース:
  #0 {main}() at script.php:0

原因:
  PDOException: SQLSTATE[HY000]: General error`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="error-tracking" />
      </div>
      <LessonNav lessons={lessons} currentId="error-tracking" basePath="/learn/debug" />
    </div>
  );
}
