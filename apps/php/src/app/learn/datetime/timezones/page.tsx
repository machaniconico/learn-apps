import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

export default function TimezonesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">日付・時刻 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">タイムゾーン</h1>
        <p className="text-gray-400">DateTimeZoneを使ったタイムゾーンの管理と変換を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">タイムゾーンの重要性</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          グローバルなWebアプリケーションでは、タイムゾーンの適切な管理が不可欠です。
          データベースにはUTCで保存し、表示時にユーザーのタイムゾーンに変換するのが基本パターンです。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">new DateTimeZone('Asia/Tokyo')</code> でタイムゾーンを作成</li>
          <li>• <code className="text-orange-300">setTimezone()</code> でタイムゾーンを変更（DateTimeのみ）</li>
          <li>• DateTimeImmutableは<code className="text-orange-300">setTimezone()</code>が新しいオブジェクトを返す</li>
          <li>• <code className="text-orange-300">date_default_timezone_set()</code> でデフォルトタイムゾーンを設定</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">タイムゾーンの変換</h2>
        <p className="text-gray-400 mb-4">
          同じ瞬間を異なるタイムゾーンで表示します。
        </p>
        <PhpEditor
          defaultCode={`<?php
// UTCで日時を作成
$utc = new DateTimeImmutable('2024-03-15 05:00:00', new DateTimeZone('UTC'));

$timezones = [
    'UTC'             => '協定世界時',
    'Asia/Tokyo'      => '東京',
    'America/New_York' => 'ニューヨーク',
    'Europe/London'   => 'ロンドン',
    'Australia/Sydney' => 'シドニー',
];

echo "同じ瞬間を各タイムゾーンで表示:\\n";
foreach ($timezones as $tz => $label) {
    $local = $utc->setTimezone(new DateTimeZone($tz));
    echo sprintf("  %-20s %s\\n", $label . ':', $local->format('Y-m-d H:i:s T'));
}`}
          expectedOutput={`同じ瞬間を各タイムゾーンで表示:\n  協定世界時:          2024-03-15 05:00:00 UTC\n  東京:                2024-03-15 14:00:00 JST\n  ニューヨーク:        2024-03-15 01:00:00 EDT\n  ロンドン:            2024-03-15 05:00:00 GMT\n  シドニー:            2024-03-15 16:00:00 AEDT`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">実用的なタイムゾーン処理パターン</h2>
        <p className="text-gray-400 mb-4">
          データベース保存・取得・表示の標準パターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
// アプリのデフォルトタイムゾーンを設定
date_default_timezone_set('Asia/Tokyo');

// ユーザーのタイムゾーン（例：設定から取得）
$userTimezone = 'America/Los_Angeles';

// 1. ユーザー入力をローカル時間として受け取る
$userInput = '2024-03-15 10:00:00';
$local = new DateTimeImmutable($userInput, new DateTimeZone($userTimezone));
echo "ユーザー入力: " . $local->format('Y-m-d H:i:s T') . "\\n";

// 2. UTCに変換してDBに保存
$utcForDb = $local->setTimezone(new DateTimeZone('UTC'));
echo "DB保存(UTC): " . $utcForDb->format('Y-m-d H:i:s') . "\\n";

// 3. DBから取得してユーザーのタイムゾーンで表示
$fromDb = new DateTimeImmutable($utcForDb->format('Y-m-d H:i:s'), new DateTimeZone('UTC'));
$forUser = $fromDb->setTimezone(new DateTimeZone($userTimezone));
echo "表示用: " . $forUser->format('Y-m-d H:i:s T') . "\\n";

// タイムゾーンのオフセット確認
$tz = new DateTimeZone('Asia/Tokyo');
$offset = $tz->getOffset(new DateTimeImmutable());
echo "JST オフセット: +" . ($offset / 3600) . "時間\\n";`}
          expectedOutput={`ユーザー入力: 2024-03-15 10:00:00 PDT\nDB保存(UTC): 2024-03-15 17:00:00\n表示用: 2024-03-15 10:00:00 PDT\nJST オフセット: +9時間`}
        />
      </section>
      <LessonCompleteButton lessonId="timezones" categoryId="datetime" />
      <LessonNav lessons={lessons} currentId="timezones" basePath="/learn/datetime" />
    </div>
  );
}
