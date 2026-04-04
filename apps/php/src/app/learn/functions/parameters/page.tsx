import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ</h1>
        <p className="text-gray-400">関数に引数を渡す方法と型宣言付きパラメータを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パラメータ（引数）は関数に外部から値を渡すための仕組みです。PHPでは型宣言を付けることで安全な関数を作れます。値渡しと参照渡しの違いも重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>型宣言（string, int, float, bool, array など）で型安全にする</li>
          <li>値渡しは元の変数に影響しない（デフォルト）</li>
          <li>&amp;を付けると参照渡しになり元の変数が変わる</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型宣言付きパラメータ</h2>
        <p className="text-gray-400 mb-4">パラメータに型を指定することで誤った型の引数を受け取らなくなります。</p>
        <PhpEditor
          defaultCode={`<?php
declare(strict_types=1);

function formatPrice(int $price, string $currency = "円"): string {
    return number_format($price) . $currency;
}

function calculateBMI(float $weight, float $height): float {
    return round($weight / ($height * $height), 1);
}

function printUserInfo(string $name, int $age, bool $isAdmin): void {
    $role = $isAdmin ? "管理者" : "一般ユーザー";
    echo "{$name}（{$age}歳）: {$role}\\n";
}

echo formatPrice(1500) . "\\n";
echo formatPrice(1000000, "ドル") . "\\n";
echo "BMI: " . calculateBMI(65.0, 1.70) . "\\n";
printUserInfo("田中太郎", 30, false);
printUserInfo("管理者", 25, true);`}
          expectedOutput={`1,500円
1,000,000ドル
BMI: 22.5
田中太郎（30歳）: 一般ユーザー
管理者（25歳）: 管理者`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照渡し</h2>
        <p className="text-gray-400 mb-4">&amp;を付けると変数の参照を渡し、関数内での変更が元の変数に反映されます。</p>
        <PhpEditor
          defaultCode={`<?php
function increment(int &$value, int $step = 1): void {
    $value += $step;
}

function appendItem(array &$list, string $item): void {
    $list[] = $item;
}

$count = 10;
echo "変更前: {$count}\\n";
increment($count);
echo "1増やした後: {$count}\\n";
increment($count, 5);
echo "5増やした後: {$count}\\n";

$fruits = ["りんご", "みかん"];
appendItem($fruits, "ぶどう");
appendItem($fruits, "いちご");
echo implode(", ", $fruits) . "\\n";`}
          expectedOutput={`変更前: 10
1増やした後: 11
5増やした後: 16
りんご, みかん, ぶどう, いちご`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列と複合型のパラメータ</h2>
        <p className="text-gray-400 mb-4">配列やnullable型（?型）もパラメータとして使えます。</p>
        <PhpEditor
          defaultCode={`<?php
function sumArray(array $numbers): int {
    return array_sum($numbers);
}

function findUser(?string $name): string {
    if ($name === null) {
        return "ゲストユーザー";
    }
    return "ユーザー: {$name}";
}

$scores = [85, 92, 78, 96, 88];
echo "合計: " . sumArray($scores) . "\\n";
echo "平均: " . (sumArray($scores) / count($scores)) . "\\n";

echo findUser("田中") . "\\n";
echo findUser(null) . "\\n";`}
          expectedOutput={`合計: 439
平均: 87.8
ユーザー: 田中
ゲストユーザー`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
