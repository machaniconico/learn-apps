import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("modern");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">モダンPHP レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">名前付き引数</h1>
        <p className="text-gray-400">引数名を指定して関数を呼び出す名前付き引数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">名前付き引数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHP 8.0で追加された名前付き引数（Named Arguments）を使うと、引数名を明示して関数を呼び出せます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数の順序を気にせず渡せる</li>
          <li>デフォルト値を持つ引数を任意にスキップできる</li>
          <li>コードの意図が明確になり可読性が向上する</li>
          <li>組み込み関数にも使える（array_slice等）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <p className="text-gray-400 mb-4">引数名にコロンを付けて値を渡すことで、順序に依存しない呼び出しができます。</p>
        <PhpEditor
          defaultCode={`<?php
function createUser(
    string $name,
    int $age = 0,
    string $email = '',
    string $role = 'user',
    bool $active = true
): string {
    $status = $active ? '有効' : '無効';
    return "$name ($age歳, $role, $email, $status)";
}

// 従来の位置引数（読みにくい）
echo createUser('田中', 30, 'tanaka@example.com', 'admin', true) . "\n";

// 名前付き引数（意図が明確）
echo createUser(
    name: '鈴木',
    role: 'admin',
    age: 25,
    email: 'suzuki@example.com'
) . "\n";

// 中間の引数をスキップ
echo createUser(name: '佐藤', active: false) . "\n";

// 組み込み関数にも使える
$arr = [1, 2, 3, 4, 5];
$result = array_slice(array: $arr, offset: 1, length: 3, preserve_keys: true);
echo implode(', ', $result) . "\n";`}
          expectedOutput={`田中 (30歳, admin, tanaka@example.com, 有効)
鈴木 (25歳, admin, suzuki@example.com, 有効)
佐藤 (0歳, user, , 無効)
2, 3, 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スプレッド演算子との組み合わせ</h2>
        <p className="text-gray-400 mb-4">名前付き引数はスプレッド演算子と組み合わせて動的に引数を渡すことができます。</p>
        <PhpEditor
          defaultCode={`<?php
function formatDate(
    int $year,
    int $month,
    int $day,
    string $separator = '/',
    string $order = 'YMD'
): string {
    return match($order) {
        'YMD' => "$year{$separator}$month{$separator}$day",
        'DMY' => "$day{$separator}$month{$separator}$year",
        'MDY' => "$month{$separator}$day{$separator}$year",
        default => "$year{$separator}$month{$separator}$day",
    };
}

// 連想配列をスプレッドで展開（名前付き引数として渡せる）
$dateParams = ['year' => 2024, 'month' => 3, 'day' => 15];

echo formatDate(...$dateParams) . "\n";
echo formatDate(...$dateParams, separator: '-') . "\n";
echo formatDate(...$dateParams, separator: '.', order: 'DMY') . "\n";

// 設定の一部を上書き
$config = ['separator' => '年', 'order' => 'YMD'];
echo formatDate(year: 2024, month: 3, day: 15, ...$config) . "\n";`}
          expectedOutput={`2024/3/15
2024-3-15
15.3.2024
2024年3年15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="modern" lessonId="named-arguments" />
      </div>
      <LessonNav lessons={lessons} currentId="named-arguments" basePath="/learn/modern" />
    </div>
  );
}
