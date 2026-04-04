import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

export default function IntervalsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">日付・時刻 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">DateInterval</h1>
        <p className="text-gray-400">DateIntervalを使った期間の計算と日付の加減算を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateIntervalとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          DateIntervalは期間（年・月・日・時・分・秒）を表すクラスです。
          ISO 8601の期間形式（P1Y2M3DT4H5M6S）を使って期間を定義します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">P</code> — 期間の開始（必須）</li>
          <li>• <code className="text-orange-300">Y</code>/<code className="text-orange-300">M</code>/<code className="text-orange-300">D</code> — 年/月/日</li>
          <li>• <code className="text-orange-300">T</code> — 時刻部分の区切り</li>
          <li>• <code className="text-orange-300">H</code>/<code className="text-orange-300">M</code>/<code className="text-orange-300">S</code> — 時/分/秒</li>
          <li>• 例：<code className="text-orange-300">P1Y2M3D</code> = 1年2ヶ月3日、<code className="text-orange-300">PT2H30M</code> = 2時間30分</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateIntervalの基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">add()</code>と<code className="text-orange-300">sub()</code>で日付に期間を加算・減算します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$base = new DateTimeImmutable('2024-01-15');

// 加算
$plus1Year   = $base->add(new DateInterval('P1Y'));
$plus3Months = $base->add(new DateInterval('P3M'));
$plus2Weeks  = $base->add(new DateInterval('P14D'));
$plus2Hours  = $base->add(new DateInterval('PT2H'));
$complex     = $base->add(new DateInterval('P1Y2M15DT3H'));

echo "基準日: " . $base->format('Y-m-d H:i') . "\\n";
echo "+1年: " . $plus1Year->format('Y-m-d') . "\\n";
echo "+3ヶ月: " . $plus3Months->format('Y-m-d') . "\\n";
echo "+2週間: " . $plus2Weeks->format('Y-m-d') . "\\n";
echo "+2時間: " . $plus2Hours->format('Y-m-d H:i') . "\\n";
echo "+1年2ヶ月15日3時間: " . $complex->format('Y-m-d H:i') . "\\n";

// 減算
$minus1Month = $base->sub(new DateInterval('P1M'));
echo "-1ヶ月: " . $minus1Month->format('Y-m-d') . "\\n";`}
          expectedOutput={`基準日: 2024-01-15 00:00\n+1年: 2025-01-15\n+3ヶ月: 2024-04-15\n+2週間: 2024-01-29\n+2時間: 2024-01-15 02:00\n+1年2ヶ月15日3時間: 2025-03-30 03:00\n-1ヶ月: 2023-12-15`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">diff()で日付の差分を計算</h2>
        <p className="text-gray-400 mb-4">
          2つの日時の差分をDateIntervalで取得します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$birthdate = new DateTimeImmutable('1995-08-20');
$today = new DateTimeImmutable('2024-03-15');

$age = $today->diff($birthdate);

echo "誕生日: " . $birthdate->format('Y年m月d日') . "\\n";
echo "今日: " . $today->format('Y年m月d日') . "\\n";
echo "年齢: " . $age->y . "歳\\n";
echo "詳細: " . $age->y . "年" . $age->m . "ヶ月" . $age->d . "日\\n";
echo "総日数: " . $age->days . "日\\n";

// イベントまでのカウントダウン
$event = new DateTimeImmutable('2024-12-31');
$countdown = $today->diff($event);
echo "\\n年末まで: " . $countdown->days . "日\\n";
echo "         " . $countdown->m . "ヶ月" . $countdown->d . "日\\n";

// 過去かどうかの確認
$past = new DateTimeImmutable('2020-01-01');
$diffPast = $today->diff($past);
echo "過去の日付: " . ($diffPast->invert ? "はい（{$diffPast->days}日前）" : "いいえ") . "\\n";`}
          expectedOutput={`誕生日: 1995年08月20日\n今日: 2024年03月15日\n年齢: 28歳\n詳細: 28年6ヶ月23日\n総日数: 10434日\n\n年末まで: 291日\n         9ヶ月16日\n過去の日付: はい（1535日前）`}
        />
      </section>
      <LessonCompleteButton lessonId="intervals" categoryId="datetime" />
      <LessonNav lessons={lessons} currentId="intervals" basePath="/learn/datetime" />
    </div>
  );
}
