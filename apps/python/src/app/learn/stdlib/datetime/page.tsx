import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function DatetimePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">datetimeモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">datetime</code> モジュールで日付・時刻の取得・演算・フォーマットを行う方法を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">datetime モジュールの主要クラス</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { name: "date", desc: "年・月・日を表すクラス", example: "date(2024, 3, 15)" },
            { name: "time", desc: "時・分・秒・マイクロ秒を表すクラス", example: "time(14, 30, 0)" },
            { name: "datetime", desc: "日付と時刻を組み合わせたクラス", example: "datetime.now()" },
            { name: "timedelta", desc: "期間を表すクラス（加算・減算に使用）", example: "timedelta(days=7)" },
          ].map((item) => (
            <div key={item.name} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-teal-400 font-mono text-sm">{item.name}</code>
              <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
              <code className="text-gray-500 font-mono text-xs">{item.example}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">日付・時刻の基本操作</h2>
        <PythonPlayground
          defaultCode={`from datetime import datetime, date, time, timedelta

# 現在の日時を取得
now = datetime.now()
print(f"現在の日時: {now}")

# 日付だけ
today = date.today()
print(f"今日: {today}")

# 特定の日付を作成
birthday = date(1990, 4, 1)
print(f"誕生日: {birthday}")

# timedelta で日付計算
week_later = today + timedelta(weeks=1)
print(f"1週間後: {week_later}")

yesterday = today - timedelta(days=1)
print(f"昨日: {yesterday}")

# 2つの日付の差
diff = today - birthday
print(f"誕生から {diff.days} 日経過")
years = diff.days // 365
print(f"約 {years} 歳")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">フォーマットと文字列変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strftime()</code> で日時を文字列に、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strptime()</code> で文字列を日時に変換できます。
        </p>
        <PythonPlayground
          defaultCode={`from datetime import datetime

now = datetime.now()

# strftime: datetime → 文字列
formats = [
    ("%Y年%m月%d日", "日本語形式"),
    ("%Y-%m-%d", "ISO形式"),
    ("%m/%d/%Y", "US形式"),
    ("%Y/%m/%d %H:%M:%S", "日時フル"),
    ("%A, %B %d, %Y", "英語形式"),
    ("%H:%M", "時刻のみ"),
]

print("=== strftime フォーマット例 ===")
for fmt, label in formats:
    print(f"{label}: {now.strftime(fmt)}")

print()
print("=== strptime 文字列 → datetime ===")
# strptime: 文字列 → datetime
date_strings = [
    ("2024-03-15", "%Y-%m-%d"),
    ("15/03/2024", "%d/%m/%Y"),
    ("2024年03月15日", "%Y年%m月%d日"),
]
for s, fmt in date_strings:
    dt = datetime.strptime(s, fmt)
    print(f"'{s}' → {dt.date()}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="datetime" />
      </div>
      <LessonNav lessons={lessons} currentId="datetime" basePath="/learn/stdlib" />
    </div>
  );
}
