import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function DataProvidersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold">テスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">データプロバイダー</h1>
        <p className="text-gray-400">DataProviderを使ったパラメータ化テストの書き方を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">データプロバイダーとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          データプロバイダーは複数のテストデータで同じテストを繰り返し実行する仕組みです。
          テストコードの重複を排除し、境界値や異常値のテストを簡潔に書けます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• PHPUnitでは<code className="text-green-300">#[DataProvider('methodName')]</code>属性を使用（PHP 8）</li>
          <li>• データプロバイダーメソッドは<code className="text-green-300">static</code>で定義</li>
          <li>• 各データセットはテスト名として表示される</li>
          <li>• 境界値・正常値・異常値を一つのテストメソッドでカバーできる</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">データプロバイダーパターン</h2>
        <p className="text-gray-400 mb-4">
          複数のテストケースを配列で定義して繰り返しテストします。
        </p>
        <PhpEditor
          defaultCode={`<?php
function calculateBmi(float $weight, float $height): float {
    if ($height <= 0) throw new InvalidArgumentException("身長は正の値が必要");
    return round($weight / ($height ** 2), 1);
}

function getBmiCategory(float $bmi): string {
    return match(true) {
        $bmi < 18.5 => "低体重",
        $bmi < 25.0 => "普通体重",
        $bmi < 30.0 => "肥満（1度）",
        default     => "肥満（2度以上）",
    };
}

// データプロバイダーパターン
$testCases = [
    "低体重"     => [45, 1.70, 15.6, "低体重"],
    "普通体重"   => [65, 1.70, 22.5, "普通体重"],
    "肥満1度"   => [80, 1.70, 27.7, "肥満（1度）"],
    "肥満2度以上" => [100, 1.70, 34.6, "肥満（2度以上）"],
];

echo "BMI計算テスト:\\n";
$passed = 0;
foreach ($testCases as $label => [$weight, $height, $expectedBmi, $expectedCategory]) {
    $bmi = calculateBmi($weight, $height);
    $category = getBmiCategory($bmi);
    $bmiOk = $bmi === $expectedBmi;
    $catOk = $category === $expectedCategory;
    $status = ($bmiOk && $catOk) ? "PASS" : "FAIL";
    if ($bmiOk && $catOk) $passed++;
    echo "  [{$status}] {$label}: BMI={$bmi}, カテゴリ={$category}\\n";
}
echo "結果: {$passed}/" . count($testCases) . " PASS\\n";`}
          expectedOutput={`BMI計算テスト:\n  [PASS] 低体重: BMI=15.6, カテゴリ=低体重\n  [PASS] 普通体重: BMI=22.5, カテゴリ=普通体重\n  [PASS] 肥満1度: BMI=27.7, カテゴリ=肥満（1度）\n  [PASS] 肥満2度以上: BMI=34.6, カテゴリ=肥満（2度以上）\n結果: 4/4 PASS`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">境界値テスト</h2>
        <p className="text-gray-400 mb-4">
          境界値（ちょうど・直前・直後）を網羅的にテストします。
        </p>
        <PhpEditor
          defaultCode={`<?php
function isAdult(int $age): bool {
    return $age >= 18;
}

function getDiscount(int $quantity): int {
    return match(true) {
        $quantity >= 100 => 20,
        $quantity >= 50  => 10,
        $quantity >= 10  => 5,
        default          => 0,
    };
}

// 境界値テストデータ（等価クラス + 境界値分析）
$ageCases = [
    [17, false, "未成年（境界直前）"],
    [18, true,  "成人（境界値）"],
    [19, true,  "成人（境界直後）"],
];

echo "年齢境界値テスト:\\n";
foreach ($ageCases as [$age, $expected, $label]) {
    $result = isAdult($age);
    $status = ($result === $expected) ? "PASS" : "FAIL";
    echo "  [{$status}] {$label}: age={$age} → " . ($result ? "成人" : "未成年") . "\\n";
}

$discountCases = [
    [9, 0, "割引なし"], [10, 5, "5%割引境界"], [49, 5, "5%割引"],
    [50, 10, "10%割引境界"], [99, 10, "10%割引"], [100, 20, "20%割引境界"],
];

echo "\\n割引率境界値テスト:\\n";
foreach ($discountCases as [$qty, $expected, $label]) {
    $result = getDiscount($qty);
    $status = ($result === $expected) ? "PASS" : "FAIL";
    echo "  [{$status}] {$label}: qty={$qty} → {$result}%\\n";
}`}
          expectedOutput={`年齢境界値テスト:\n  [PASS] 未成年（境界直前）: age=17 → 未成年\n  [PASS] 成人（境界値）: age=18 → 成人\n  [PASS] 成人（境界直後）: age=19 → 成人\n\n割引率境界値テスト:\n  [PASS] 割引なし: qty=9 → 0%\n  [PASS] 5%割引境界: qty=10 → 5%\n  [PASS] 5%割引: qty=49 → 5%\n  [PASS] 10%割引境界: qty=50 → 10%\n  [PASS] 10%割引: qty=99 → 10%\n  [PASS] 20%割引境界: qty=100 → 20%`}
        />
      </section>
      <LessonCompleteButton lessonId="data-providers" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="data-providers" basePath="/learn/testing" />
    </div>
  );
}
