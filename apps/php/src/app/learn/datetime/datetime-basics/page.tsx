import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

export default function DatetimeBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">日付・時刻 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">DateTime基礎</h1>
        <p className="text-gray-400">DateTimeクラスを使った日付・時刻の操作基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeクラスとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          PHPのDateTimeクラスは日付・時刻を扱うオブジェクト指向のAPIです。
          昔ながらの<code className="text-orange-300">date()</code>関数より強力で、タイムゾーン管理や日付計算が簡単です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">new DateTime()</code> — 現在日時でインスタンス作成</li>
          <li>• <code className="text-orange-300">new DateTime('2024-01-15')</code> — 特定日時を指定</li>
          <li>• <code className="text-orange-300">DateTime::createFromFormat()</code> — フォーマットを指定してパース</li>
          <li>• <code className="text-orange-300">format()</code> — 日時を文字列にフォーマット</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeの生成方法</h2>
        <p className="text-gray-400 mb-4">
          様々な方法でDateTimeオブジェクトを生成できます。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 現在日時
$now = new DateTime();
echo "現在: " . $now->format('Y-m-d H:i:s') . "\\n";

// 特定の日時を文字列で指定
$specific = new DateTime('2024-03-20 09:00:00');
echo "指定: " . $specific->format('Y年m月d日 H時i分') . "\\n";

// 相対的な日時
$tomorrow = new DateTime('tomorrow');
$nextWeek = new DateTime('+7 days');
$lastMonth = new DateTime('-1 month');

echo "明日: " . $tomorrow->format('Y-m-d') . "\\n";
echo "1週間後: " . $nextWeek->format('Y-m-d') . "\\n";
echo "1ヶ月前: " . $lastMonth->format('Y-m-d') . "\\n";

// UNIXタイムスタンプから
$fromTimestamp = new DateTime('@1700000000');
$fromTimestamp->setTimezone(new DateTimeZone('Asia/Tokyo'));
echo "タイムスタンプ: " . $fromTimestamp->format('Y-m-d H:i:s') . "\\n";`}
          expectedOutput={`現在: 2024-01-15 10:30:00\n指定: 2024年03月20日 09時00分\n明日: 2024-01-16\n1週間後: 2024-01-22\n1ヶ月前: 2023-12-15\nタイムスタンプ: 2023-11-15 08:13:20`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">createFromFormatでパース</h2>
        <p className="text-gray-400 mb-4">
          日本語形式など特殊なフォーマットの文字列をパースします。
        </p>
        <PhpEditor
          defaultCode={`<?php
// createFromFormatで独自フォーマットをパース
$dt1 = DateTime::createFromFormat('Y年m月d日', '2024年3月15日');
echo $dt1->format('Y-m-d') . "\\n";

$dt2 = DateTime::createFromFormat('d/m/Y H:i', '25/12/2024 14:30');
echo $dt2->format('Y-m-d H:i:s') . "\\n";

// パース失敗のチェック
$dt3 = DateTime::createFromFormat('Y-m-d', '不正な日付');
if ($dt3 === false) {
    echo "パース失敗\\n";
    $errors = DateTime::getLastErrors();
    echo "エラー: " . implode(", ", $errors['errors']) . "\\n";
}

// 日時の比較
$date1 = new DateTime('2024-01-01');
$date2 = new DateTime('2024-06-01');
echo ($date1 < $date2 ? "date1が前" : "date2が前") . "\\n";`}
          expectedOutput={`2024-03-15\n2024-12-25 14:30:00\nパース失敗\nエラー: The timezone could not be found in the database\n2024-01-01が前... date1が前`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeの変更操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">modify()</code>メソッドで日時を変更します。
        </p>
        <PhpEditor
          defaultCode={`<?php
$dt = new DateTime('2024-01-15 12:00:00');
echo "元: " . $dt->format('Y-m-d H:i:s') . "\\n";

// modifyで変更（破壊的変更）
$dt->modify('+3 days');
echo "+3日: " . $dt->format('Y-m-d H:i:s') . "\\n";

$dt->modify('next monday');
echo "次の月曜: " . $dt->format('Y-m-d (l)') . "\\n";

$dt->modify('first day of next month');
echo "来月初日: " . $dt->format('Y-m-d') . "\\n";

$dt->modify('last day of this month');
echo "今月末: " . $dt->format('Y-m-d') . "\\n";`}
          expectedOutput={`元: 2024-01-15 12:00:00\n+3日: 2024-01-18 12:00:00\n次の月曜: 2024-01-22 (Monday)\n来月初日: 2024-02-01\n今月末: 2024-02-29`}
        />
      </section>
      <LessonCompleteButton lessonId="datetime-basics" categoryId="datetime" />
      <LessonNav lessons={lessons} currentId="datetime-basics" basePath="/learn/datetime" />
    </div>
  );
}
