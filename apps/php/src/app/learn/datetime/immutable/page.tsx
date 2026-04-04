import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

export default function ImmutablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">日付・時刻 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">DateTimeImmutable</h1>
        <p className="text-gray-400">不変な日時オブジェクトDateTimeImmutableの使い方と、なぜDateTimeより推奨されるかを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeImmutableとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          DateTimeImmutableはDateTimeの不変（イミュータブル）バージョンです。
          変更メソッドを呼び出すと元のオブジェクトは変更されず、新しいオブジェクトが返されます。
          これにより予期せぬ副作用を防ぎ、バグを減らせます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">modify()</code><code className="text-orange-300">add()</code><code className="text-orange-300">sub()</code>などは新しいインスタンスを返す</li>
          <li>• 元のオブジェクトは変更されない（不変性の保証）</li>
          <li>• 関数型プログラミングスタイルとの相性が良い</li>
          <li>• 現代的なPHPコードではDateTimeよりDateTimeImmutableが推奨される</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeとDateTimeImmutableの違い</h2>
        <p className="text-gray-400 mb-4">
          変更操作の挙動の違いを比較します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// DateTime（ミュータブル）- 元のオブジェクトが変更される
$mutable = new DateTime('2024-01-01');
$modified = $mutable->modify('+1 month');

echo "=== DateTime（ミュータブル）===\\n";
echo "mutable: " . $mutable->format('Y-m-d') . "\\n";  // 変更されている！
echo "modified: " . $modified->format('Y-m-d') . "\\n"; // 同じオブジェクト
echo "同一?: " . ($mutable === $modified ? "はい" : "いいえ") . "\\n";

// DateTimeImmutable（イミュータブル）- 元のオブジェクトは変更されない
$immutable = new DateTimeImmutable('2024-01-01');
$added = $immutable->modify('+1 month');

echo "\\n=== DateTimeImmutable（イミュータブル）===\\n";
echo "immutable: " . $immutable->format('Y-m-d') . "\\n"; // 変わらない！
echo "added: " . $added->format('Y-m-d') . "\\n";         // 新しいオブジェクト
echo "同一?: " . ($immutable === $added ? "はい" : "いいえ") . "\\n";`}
          expectedOutput={`=== DateTime（ミュータブル）===\nmutable: 2024-02-01\nmodified: 2024-02-01\n同一?: はい\n\n=== DateTimeImmutable（イミュータブル）===\nimmutable: 2024-01-01\nadded: 2024-02-01\n同一?: いいえ`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeImmutableの実用的な使い方</h2>
        <p className="text-gray-400 mb-4">
          メソッドチェーンで安全に日時計算ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php
$baseDate = new DateTimeImmutable('2024-01-15');

// メソッドチェーンで安全な計算
$startOfMonth = $baseDate->modify('first day of this month');
$endOfMonth   = $baseDate->modify('last day of this month');
$nextQuarter  = $baseDate->modify('+3 months')->modify('first day of this month');

echo "基準日: " . $baseDate->format('Y-m-d') . "\\n";
echo "月初: " . $startOfMonth->format('Y-m-d') . "\\n";
echo "月末: " . $endOfMonth->format('Y-m-d') . "\\n";
echo "次四半期: " . $nextQuarter->format('Y-m-d') . "\\n";
echo "基準日は変わらず: " . $baseDate->format('Y-m-d') . "\\n";

// 期間の計算
$diff = $startOfMonth->diff($endOfMonth);
echo "月の日数: " . ($diff->days + 1) . "日\\n";`}
          expectedOutput={`基準日: 2024-01-15\n月初: 2024-01-01\n月末: 2024-01-31\n次四半期: 2024-04-01\n基準日は変わらず: 2024-01-15\n月の日数: 31日`}
        />
      </section>
      <LessonCompleteButton lessonId="immutable" categoryId="datetime" />
      <LessonNav lessons={lessons} currentId="immutable" basePath="/learn/datetime" />
    </div>
  );
}
