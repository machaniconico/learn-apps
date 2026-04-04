import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Xdebug</h1>
        <p className="text-gray-400">Xdebugのインストールとブレークポイントデバッグの方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Xdebugとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          XdebugはPHPの定番デバッグ拡張です。ブレークポイントを使ったステップ実行、変数ウォッチ、コールスタックの確認、コードカバレッジ測定などが可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">xdebug_break()</code> - コードからブレークポイントを設定</li>
          <li><code className="text-orange-300">xdebug_var_dump()</code> - Xdebug強化版のvar_dump</li>
          <li><code className="text-orange-300">xdebug_get_function_stack()</code> - コールスタック取得</li>
          <li>VS Code + PHP Debug拡張でGUIデバッグ可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールスタックの理解</h2>
        <p className="text-gray-400 mb-4">デバッグの基本はコールスタックの理解です。PHPで手動でスタックトレースを確認する方法を学びます。</p>
        <PhpEditor
          defaultCode={`<?php
// コールスタックのシミュレーション
function getCallStack(): array {
    $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    return array_map(fn($frame) => [
        'function' => $frame['function'],
        'file' => basename($frame['file'] ?? 'unknown'),
        'line' => $frame['line'] ?? 0,
    ], array_slice($trace, 1)); // 自分自身を除く
}

function level3(): void {
    $stack = getCallStack();
    echo "=== コールスタック ===\n";
    foreach ($stack as $i => $frame) {
        echo "  #$i {$frame['function']}() at {$frame['file']}:{$frame['line']}\n";
    }
}

function level2(): void {
    level3();
}

function level1(): void {
    level2();
}

level1();

echo "\n";

// 例外のスタックトレース
function divide(int $a, int $b): float {
    if ($b === 0) {
        throw new InvalidArgumentException("ゼロ除算: $a / $b");
    }
    return $a / $b;
}

function calculate(int $x, int $y): void {
    echo "結果: " . divide($x, $y) . "\n";
}

try {
    calculate(10, 0);
} catch (InvalidArgumentException $e) {
    echo "エラー: " . $e->getMessage() . "\n";
    echo "発生箇所: " . basename($e->getFile()) . ":" . $e->getLine() . "\n";
}`}
          expectedOutput={`=== コールスタック ===
  #0 level3() at script.php:18
  #1 level2() at script.php:22
  #2 level1() at script.php:26
  #3 {main}() at script.php:0

エラー: ゼロ除算: 10 / 0
発生箇所: script.php:32`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ情報の整形出力</h2>
        <p className="text-gray-400 mb-4">Xdebugがない環境でも、カスタム関数でデバッグ情報を見やすく整形できます。</p>
        <PhpEditor
          defaultCode={`<?php
// カラー付きデバッグ出力（CLIでの開発用）
function debugDump(mixed $var, string $label = ''): void {
    if ($label) echo "[$label]\n";

    $type = gettype($var);
    switch ($type) {
        case 'array':
            echo "array(" . count($var) . ") {\n";
            foreach ($var as $k => $v) {
                $val = is_array($v) ? "array(" . count($v) . ")" : var_export($v, true);
                echo "  [$k] => $val\n";
            }
            echo "}\n";
            break;
        case 'object':
            echo get_class($var) . " {\n";
            foreach ((array)$var as $k => $v) {
                echo "  $k => " . var_export($v, true) . "\n";
            }
            echo "}\n";
            break;
        default:
            echo "$type(" . var_export($var, true) . ")\n";
    }
}

debugDump(['name' => '田中', 'scores' => [85, 92]], 'ユーザーデータ');
debugDump(42, '整数');
debugDump(null, 'NULL値');`}
          expectedOutput={`[ユーザーデータ]
array(2) {
  [name] => '田中'
  [scores] => array(2)
}
[整数]
integer(42)
[NULL値]
NULL(NULL)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="xdebug" />
      </div>
      <LessonNav lessons={lessons} currentId="xdebug" basePath="/learn/debug" />
    </div>
  );
}
