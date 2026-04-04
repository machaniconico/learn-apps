import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">var_dump・print_r</h1>
        <p className="text-gray-400">var_dump、print_r、var_exportを使ったデバッグ出力を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ出力関数の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPには変数の内容を確認するための関数が複数あります。用途に応じて使い分けましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">var_dump()</code> - 型情報付きで詳細に表示。デバッグに最適</li>
          <li><code className="text-orange-300">print_r()</code> - 人間が読みやすい形式で表示。配列確認に便利</li>
          <li><code className="text-orange-300">var_export()</code> - PHPコードとして出力。設定ファイル生成に使用</li>
          <li>第2引数にtrueを渡すと文字列として返せる（print_r・var_export）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各関数の出力比較</h2>
        <p className="text-gray-400 mb-4">同じデータを3つの関数で出力して違いを確認しましょう。</p>
        <PhpEditor
          defaultCode={`<?php
$data = [
    'string' => 'Hello',
    'int' => 42,
    'float' => 3.14,
    'bool' => true,
    'null' => null,
    'nested' => [1, 2, 3],
];

// var_dump: 型情報付き
echo "=== var_dump ===\n";
var_dump($data['string']);
var_dump($data['int']);
var_dump($data['bool']);
var_dump($data['null']);

echo "\n=== print_r（配列） ===\n";
print_r($data['nested']);

echo "\n=== var_export ===\n";
var_export(['key' => 'value', 'num' => 42]);
echo "\n";

// 文字列として取得
$str = print_r($data['nested'], true);
echo "\n配列の要素数: " . substr_count($str, '=>') . "\n";`}
          expectedOutput={`=== var_dump ===
string(5) "Hello"
int(42)
bool(true)
NULL

=== print_r（配列） ===
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
)

=== var_export ===
array (
  'key' => 'value',
  'num' => 42,
)

配列の要素数: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグヘルパー関数の作成</h2>
        <p className="text-gray-400 mb-4">開発中に使いやすいデバッグヘルパー関数を作成して活用しましょう。</p>
        <PhpEditor
          defaultCode={`<?php
// デバッグヘルパー関数
function dd(mixed ...$vars): never {
    foreach ($vars as $var) {
        echo "<pre>";
        var_dump($var);
        echo "</pre>";
    }
    exit(1);
}

function dump(mixed ...$vars): void {
    foreach ($vars as $var) {
        var_dump($var);
    }
}

function dumpTable(array $rows): void {
    if (empty($rows)) {
        echo "(空のデータ)\n";
        return;
    }
    $keys = array_keys($rows[0]);
    $widths = array_map(fn($k) => max(mb_strlen($k), 10), $keys);

    // ヘッダー
    $header = implode(' | ', array_map(fn($k, $w) => str_pad($k, $w), $keys, $widths));
    echo $header . "\n";
    echo str_repeat('-', strlen($header)) . "\n";

    // データ行
    foreach ($rows as $row) {
        $line = implode(' | ', array_map(fn($k, $w) => str_pad((string)$row[$k], $w), $keys, $widths));
        echo $line . "\n";
    }
}

$users = [
    ['name' => '田中太郎', 'age' => 30, 'role' => 'admin'],
    ['name' => '鈴木花子', 'age' => 25, 'role' => 'user'],
    ['name' => '佐藤次郎', 'age' => 35, 'role' => 'user'],
];

echo "デバッグテーブル:\n";
dumpTable($users);

echo "\n変数のダンプ:\n";
dump(42, 'Hello', true);`}
          expectedOutput={`デバッグテーブル:
name       | age        | role
-----------------------------------
田中太郎   | 30         | admin
鈴木花子   | 25         | user
佐藤次郎   | 35         | user

変数のダンプ:
int(42)
string(5) "Hello"
bool(true)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="var-dump" />
      </div>
      <LessonNav lessons={lessons} currentId="var-dump" basePath="/learn/debug" />
    </div>
  );
}
