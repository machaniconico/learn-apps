import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function CoveragePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">カバレッジ</h1>
        <p className="text-gray-400">コードカバレッジの測定とカバレッジレポートの読み方を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コードカバレッジとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          コードカバレッジはテストがコードのどれだけをカバーしているかを示す指標です。
          未テストの分岐・行を発見し、テストの抜け漏れを防ぐのに役立ちます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-green-300">行カバレッジ：</span>実行された行の割合（最も基本的）</li>
          <li>• <span className="text-green-300">分岐カバレッジ：</span>if/elseの各分岐が通ったかどうか</li>
          <li>• <span className="text-green-300">パスカバレッジ：</span>実行可能な全経路をカバー（最も厳密）</li>
          <li>• <code className="text-green-300">./vendor/bin/phpunit --coverage-html coverage/</code> でHTMLレポート生成</li>
          <li>• 目標は80〜90%が現実的（100%は過剰な場合も）</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カバレッジのシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          どのコードパスがテストされているかを追跡します。
        </p>
        <PhpEditor
          defaultCode={`<?php
class OrderProcessor {
    public function calculateTotal(array $items, string $coupon = ''): float {
        if (empty($items)) {                    // 分岐1
            throw new InvalidArgumentException("商品が空です");
        }

        $subtotal = array_sum(array_column($items, 'price'));

        if ($coupon === 'SAVE10') {             // 分岐2
            $subtotal *= 0.9;
        } elseif ($coupon === 'SAVE20') {       // 分岐3
            $subtotal *= 0.8;
        }

        $tax = $subtotal * 0.1;                // 行: 常に実行
        return round($subtotal + $tax, 2);
    }
}

// テストケースとカバレッジ追跡
class CoverageTracker {
    private array $coveredPaths = [];

    public function track(string $path): void {
        $this->coveredPaths[$path] = true;
    }

    public function getCoverage(array $allPaths): float {
        $covered = count(array_intersect_key($this->coveredPaths, array_flip($allPaths)));
        return round($covered / count($allPaths) * 100, 1);
    }
}

$proc = new OrderProcessor();
$tracker = new CoverageTracker();

$allPaths = ['empty_items', 'coupon_save10', 'coupon_save20', 'no_coupon'];

// テスト1: 空の商品
try {
    $proc->calculateTotal([]);
} catch (InvalidArgumentException $e) {
    $tracker->track('empty_items');
    echo "空の商品テスト: PASS\\n";
}

// テスト2: SAVE10クーポン
$items = [['price' => 1000], ['price' => 2000]];
$total = $proc->calculateTotal($items, 'SAVE10');
$tracker->track('coupon_save10');
echo "SAVE10クーポン: {$total}円\\n";

// テスト3: クーポンなし
$total2 = $proc->calculateTotal($items);
$tracker->track('no_coupon');
echo "クーポンなし: {$total2}円\\n";

echo "\\nカバレッジ: " . $tracker->getCoverage($allPaths) . "% (SAVE20未テスト)\\n";`}
          expectedOutput={`空の商品テスト: PASS\nSAVE10クーポン: 2970円\nクーポンなし: 3300円\n\nカバレッジ: 75.0% (SAVE20未テスト)`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カバレッジを上げるテスト追加</h2>
        <p className="text-gray-400 mb-4">
          未カバーのパスをテストして100%カバレッジを達成します。
        </p>
        <PhpEditor
          defaultCode={`<?php
function classify(int $score): string {
    if ($score < 0 || $score > 100) {     // 境界チェック
        throw new RangeException("スコアは0-100の範囲");
    }
    if ($score >= 90) return "S";          // 分岐A
    if ($score >= 80) return "A";          // 分岐B
    if ($score >= 70) return "B";          // 分岐C
    if ($score >= 60) return "C";          // 分岐D
    return "F";                            // 分岐E
}

// 全分岐をカバーするテスト
$testSuite = [
    [-1,  null,  "範囲外（下限）"],
    [101, null,  "範囲外（上限）"],
    [95,  "S",   "S評価"],
    [85,  "A",   "A評価"],
    [75,  "B",   "B評価"],
    [65,  "C",   "C評価"],
    [50,  "F",   "F評価"],
    [0,   "F",   "最低値"],
    [100, "S",   "最高値"],
];

$passed = 0;
foreach ($testSuite as [$score, $expected, $label]) {
    try {
        $result = classify($score);
        $ok = $result === $expected;
        if ($ok) $passed++;
        echo ($ok ? "[PASS]" : "[FAIL]") . " {$label}: {$result}\\n";
    } catch (RangeException $e) {
        $ok = $expected === null;
        if ($ok) $passed++;
        echo ($ok ? "[PASS]" : "[FAIL]") . " {$label}: 例外発生\\n";
    }
}
echo "\\n全分岐カバレッジ: {$passed}/" . count($testSuite) . " PASS\\n";`}
          expectedOutput={`[PASS] 範囲外（下限）: 例外発生\n[PASS] 範囲外（上限）: 例外発生\n[PASS] S評価: S\n[PASS] A評価: A\n[PASS] B評価: B\n[PASS] C評価: C\n[PASS] F評価: F\n[PASS] 最低値: F\n[PASS] 最高値: S\n\n全分岐カバレッジ: 9/9 PASS`}
        />
      </section>
      <LessonCompleteButton lessonId="coverage" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="coverage" basePath="/learn/testing" />
    </div>
  );
}
