import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TddPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">TDD</h1>
        <p className="text-gray-400">テスト駆動開発（Red-Green-Refactor）のワークフローを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">TDD（テスト駆動開発）とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          TDDは「テストを先に書く」開発手法です。Red-Green-Refactorの3ステップを繰り返すことで、
          シンプルで保守しやすいコードを設計できます。
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-800">
            <div className="text-red-400 font-bold mb-1">🔴 Red</div>
            <div className="text-gray-400 text-sm">失敗するテストを書く。まだ実装がないので当然失敗する</div>
          </div>
          <div className="p-3 rounded-lg bg-green-900/30 border border-green-800">
            <div className="text-green-400 font-bold mb-1">🟢 Green</div>
            <div className="text-gray-400 text-sm">テストが通る最小限の実装を書く。とにかく動かす</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-800">
            <div className="text-blue-400 font-bold mb-1">🔵 Refactor</div>
            <div className="text-gray-400 text-sm">テストを通したままコードを改善・整理する</div>
          </div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">TDDの実践：FizzBuzz</h2>
        <p className="text-gray-400 mb-4">
          FizzBuzzをTDDで実装します。テストを先に書き、少しずつ実装を追加します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// Step 1: Red - 失敗するテストを書く
// Step 2: Green - テストが通る最小実装
// Step 3: Refactor - コードを改善

class FizzBuzz {
    public function convert(int $n): string {
        // Refactor後の最終実装
        $result = '';
        if ($n % 3 === 0) $result .= 'Fizz';
        if ($n % 5 === 0) $result .= 'Buzz';
        return $result ?: (string)$n;
    }
}

// テスト（TDDで最初に書いたもの）
$fb = new FizzBuzz();
$tests = [
    [1,  "1",        "通常の数字"],
    [3,  "Fizz",     "3の倍数"],
    [5,  "Buzz",     "5の倍数"],
    [15, "FizzBuzz", "15の倍数"],
    [9,  "Fizz",     "9（3の倍数）"],
    [10, "Buzz",     "10（5の倍数）"],
    [30, "FizzBuzz", "30（3と5の倍数）"],
];

echo "TDD FizzBuzz テスト:\\n";
$passed = 0;
foreach ($tests as [$n, $expected, $label]) {
    $result = $fb->convert($n);
    $ok = $result === $expected;
    if ($ok) $passed++;
    echo "  [" . ($ok ? "PASS" : "FAIL") . "] {$label} ({$n}): {$result}\\n";
}

echo "\\nゲーム実行（1〜20）:\\n";
$output = array_map(fn($n) => $fb->convert($n), range(1, 20));
echo implode(", ", $output) . "\\n";
echo "\\n{$passed}/" . count($tests) . " テスト通過\\n";`}
          expectedOutput={`TDD FizzBuzz テスト:\n  [PASS] 通常の数字 (1): 1\n  [PASS] 3の倍数 (3): Fizz\n  [PASS] 5の倍数 (5): Buzz\n  [PASS] 15の倍数 (15): FizzBuzz\n  [PASS] 9（3の倍数） (9): Fizz\n  [PASS] 10（5の倍数） (10): Buzz\n  [PASS] 30（3と5の倍数） (30): FizzBuzz\n\nゲーム実行（1〜20）:\n1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz\n\n7/7 テスト通過`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">TDDでショッピングカートを実装</h2>
        <p className="text-gray-400 mb-4">
          要件をテストで表現し、実装を積み上げるTDDの流れを体験します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// TDDで実装したショッピングカート
class Cart {
    private array $items = [];

    public function add(string $name, int $price, int $qty = 1): void {
        if (isset($this->items[$name])) {
            $this->items[$name]['qty'] += $qty;
        } else {
            $this->items[$name] = ['price' => $price, 'qty' => $qty];
        }
    }

    public function remove(string $name): void {
        unset($this->items[$name]);
    }

    public function count(): int {
        return array_sum(array_column($this->items, 'qty'));
    }

    public function total(): int {
        return array_sum(array_map(
            fn($item) => $item['price'] * $item['qty'],
            $this->items
        ));
    }

    public function isEmpty(): bool {
        return empty($this->items);
    }
}

// テストスイート
function runCartTests(): void {
    $results = [];

    // T1: 空のカート
    $cart = new Cart();
    $results[] = [$cart->isEmpty() === true,  "空のカート"];

    // T2: 商品追加
    $cart->add("リンゴ", 100);
    $results[] = [$cart->count() === 1,        "商品を1つ追加"];
    $results[] = [$cart->total() === 100,       "合計金額100円"];

    // T3: 複数追加
    $cart->add("バナナ", 80, 2);
    $results[] = [$cart->count() === 3,         "合計3個"];
    $results[] = [$cart->total() === 260,       "合計260円"];

    // T4: 同じ商品を再追加
    $cart->add("リンゴ", 100);
    $results[] = [$cart->count() === 4,         "リンゴ2個に"];

    // T5: 商品削除
    $cart->remove("バナナ");
    $results[] = [$cart->count() === 2,         "バナナ削除後2個"];
    $results[] = [$cart->total() === 200,       "削除後合計200円"];

    $passed = 0;
    foreach ($results as [$ok, $label]) {
        echo "  [" . ($ok ? "PASS" : "FAIL") . "] {$label}\\n";
        if ($ok) $passed++;
    }
    echo "合計: {$passed}/" . count($results) . " PASS\\n";
}

runCartTests();`}
          expectedOutput={`  [PASS] 空のカート\n  [PASS] 商品を1つ追加\n  [PASS] 合計金額100円\n  [PASS] 合計3個\n  [PASS] 合計260円\n  [PASS] リンゴ2個に\n  [PASS] バナナ削除後2個\n  [PASS] 削除後合計200円\n合計: 8/8 PASS`}
        />
      </section>
      <LessonCompleteButton lessonId="tdd" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="tdd" basePath="/learn/testing" />
    </div>
  );
}
