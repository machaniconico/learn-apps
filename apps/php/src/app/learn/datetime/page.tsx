import { PhpEditor } from "@/components/php-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("datetime");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PHPで現在の日時を取得するDateTimeクラスのコンストラクタ引数はどれですか？",
    options: ["DateTime::now()", "new DateTime()", "new DateTime('now')", "DateTime::current()"],
    answer: 1,
    explanation: "new DateTime() または new DateTime('now') で現在日時のオブジェクトを生成できます。引数なしでも'now'と同じ動作をします。",
  },
  {
    question: "DateTimeとDateTimeImmutableの違いは何ですか？",
    options: [
      "DateTimeImmutableはタイムゾーンを扱えない",
      "DateTimeImmutableは変更メソッドが新しいオブジェクトを返す",
      "DateTimeは変更できない",
      "DateTimeImmutableはより高速",
    ],
    answer: 1,
    explanation: "DateTimeImmutableのmodifyやaddなどのメソッドは元のオブジェクトを変更せず、新しいオブジェクトを返します。これによりバグを防ぎやすくなります。",
  },
  {
    question: "日時を'2024-01-15'形式にフォーマットするformat()の引数はどれですか？",
    options: ["'DD-MM-YYYY'", "'Y-m-d'", "'d/m/Y'", "'yyyy-mm-dd'"],
    answer: 1,
    explanation: "PHPのformat()メソッドでは Y=4桁年, m=2桁月, d=2桁日 を使います。例：$dt->format('Y-m-d')",
  },
  {
    question: "DateIntervalで1ヶ月2日を表す文字列はどれですか？",
    options: ["P1M2D", "1M2D", "PT1M2D", "P1m2d"],
    answer: 0,
    explanation: "DateIntervalのISO 8601期間形式はPで始まります。P1M2DはP（期間）1ヶ月（M）2日（D）を意味します。",
  },
];

export default function DatetimePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">日付・時刻</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PHPの日付・時刻操作を学びましょう。DateTimeクラス・DateTimeImmutable・フォーマット・タイムゾーン・DateIntervalを使った期間計算まで、実用的な日時処理を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="datetime" totalLessons={5} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/datetime" color="orange" categoryId="datetime" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DateTimeの基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">DateTime</code>クラスを使って日時を生成・フォーマットします。
        </p>
        <PhpEditor
          defaultCode={`<?php
// 特定の日時を作成
$dt = new DateTime('2024-03-15 10:30:00');
echo $dt->format('Y年m月d日 H:i:s') . "\\n";

// タイムスタンプから作成
$dt2 = new DateTime('@1710000000');
$dt2->setTimezone(new DateTimeZone('Asia/Tokyo'));
echo $dt2->format('Y-m-d H:i:s') . "\\n";

// 現在時刻
$now = new DateTime();
echo "現在: " . $now->format('Y-m-d') . "\\n";`}
          expectedOutput={`2024年03月15日 10:30:00\n2024-03-10 01:20:00\n現在: 2024-03-15`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DateIntervalで期間計算</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">DateInterval</code>を使って日付の加算・減算・差分計算ができます。
        </p>
        <PhpEditor
          defaultCode={`<?php
$start = new DateTimeImmutable('2024-01-01');
$end = new DateTimeImmutable('2024-12-31');

// 差分を計算
$diff = $start->diff($end);
echo "日数: " . $diff->days . "日\\n";
echo "月数: " . $diff->m . "ヶ月\\n";

// 日付を加算
$nextMonth = $start->add(new DateInterval('P1M'));
echo "1ヶ月後: " . $nextMonth->format('Y-m-d') . "\\n";

// 日付を減算
$lastWeek = $end->sub(new DateInterval('P7D'));
echo "1週間前: " . $lastWeek->format('Y-m-d') . "\\n";`}
          expectedOutput={`日数: 365日\n月数: 11ヶ月\n1ヶ月後: 2024-02-01\n1週間前: 2024-12-24`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
