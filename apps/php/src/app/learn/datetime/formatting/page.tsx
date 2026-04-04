import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

export default function FormattingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">日付・時刻 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">フォーマット</h1>
        <p className="text-gray-400">date関数やformat()メソッドによる日時の書式整形を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">日時フォーマット文字</h2>
        <p className="text-gray-400 leading-relaxed mb-3">PHPの日時フォーマット文字の主なものを覚えましょう。</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-400"><code className="text-orange-300">Y</code> — 4桁の年 (2024)</div>
          <div className="text-gray-400"><code className="text-orange-300">y</code> — 2桁の年 (24)</div>
          <div className="text-gray-400"><code className="text-orange-300">m</code> — 2桁の月 (01-12)</div>
          <div className="text-gray-400"><code className="text-orange-300">n</code> — 月 (1-12)</div>
          <div className="text-gray-400"><code className="text-orange-300">d</code> — 2桁の日 (01-31)</div>
          <div className="text-gray-400"><code className="text-orange-300">j</code> — 日 (1-31)</div>
          <div className="text-gray-400"><code className="text-orange-300">H</code> — 24時間制時 (00-23)</div>
          <div className="text-gray-400"><code className="text-orange-300">i</code> — 分 (00-59)</div>
          <div className="text-gray-400"><code className="text-orange-300">s</code> — 秒 (00-59)</div>
          <div className="text-gray-400"><code className="text-orange-300">l</code> — 曜日英語名</div>
          <div className="text-gray-400"><code className="text-orange-300">N</code> — 曜日番号 (1=月)</div>
          <div className="text-gray-400"><code className="text-orange-300">U</code> — UNIXタイムスタンプ</div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">様々なフォーマット例</h2>
        <p className="text-gray-400 mb-4">
          同じ日時を様々なフォーマットで表示します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$dt = new DateTimeImmutable('2024-03-15 14:30:45');

$formats = [
    'Y-m-d'              => '標準的な日付',
    'Y年m月d日'           => '日本語形式',
    'd/m/Y'              => 'ヨーロッパ形式',
    'm/d/Y'              => 'アメリカ形式',
    'Y-m-d H:i:s'        => '日時（秒まで）',
    'Y-m-d H:i'          => '日時（分まで）',
    'H:i'                => '時刻のみ',
    'l, F j, Y'          => '英語の完全な日付',
    'D M j G:i:s Y'      => 'ログ形式',
    'U'                  => 'UNIXタイムスタンプ',
    'c'                  => 'ISO 8601',
    'r'                  => 'RFC 2822',
];

foreach ($formats as $format => $label) {
    printf("%-20s → %s\\n", $label, $dt->format($format));
}`}
          expectedOutput={`標準的な日付           → 2024-03-15\n日本語形式             → 2024年03月15日\nヨーロッパ形式         → 15/03/2024\nアメリカ形式           → 03/15/2024\n日時（秒まで）         → 2024-03-15 14:30:45\n日時（分まで）         → 2024-03-15 14:30\n時刻のみ               → 14:30\n英語の完全な日付       → Friday, March 15, 2024\nログ形式               → Fri Mar 15 14:30:45 2024\nUNIXタイムスタンプ     → 1710509445\nISO 8601               → 2024-03-15T14:30:45+00:00\nRFC 2822               → Fri, 15 Mar 2024 14:30:45 +0000`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">date()関数とIntlDateFormatter</h2>
        <p className="text-gray-400 mb-4">
          PHPの組み込み<code className="text-orange-300">date()</code>関数と国際化対応のフォーマットを使います。
        </p>
        <PhpEditor
          defaultCode={`<?php
// date()関数（シンプル）
$timestamp = mktime(14, 30, 0, 3, 15, 2024);
echo date('Y-m-d H:i:s', $timestamp) . "\\n";
echo date('Y年n月j日 H時i分', $timestamp) . "\\n";

// 曜日を日本語で表示（カスタム変換）
$dt = new DateTimeImmutable('2024-03-15');
$weekdays = ['日', '月', '火', '水', '木', '金', '土'];
$weekday = $weekdays[(int)$dt->format('w')];
echo $dt->format('Y年m月d日') . "（{$weekday}）\\n";

// 月名を日本語で
$months = ['', '1月', '2月', '3月', '4月', '5月', '6月',
           '7月', '8月', '9月', '10月', '11月', '12月'];
$month = $months[(int)$dt->format('n')];
echo $dt->format('Y年') . $month . $dt->format('d日') . "\\n";`}
          expectedOutput={`2024-03-15 14:30:00\n2024年3月15日 14時30分\n2024年03月15日（金）\n2024年3月15日`}
        />
      </section>
      <LessonCompleteButton lessonId="formatting" categoryId="datetime" />
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/datetime" />
    </div>
  );
}
