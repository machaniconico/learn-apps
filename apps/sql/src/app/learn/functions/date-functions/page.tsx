import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function DateFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">日付関数</h1>
        <p className="text-gray-400">DATE・TIME・DATETIME・STRFTIMEを使った日付・時刻の操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteの日付関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteには日付・時刻を扱うための関数が用意されています。
          現在時刻の取得から、日付の加算・減算、フォーマット変換まで対応できます。
          日付はISO 8601形式（YYYY-MM-DD）でテキストとして保存されることが多いです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">DATE('now')</code> — 今日の日付（YYYY-MM-DD）</li>
          <li><code className="text-green-300">DATETIME('now')</code> — 現在の日時</li>
          <li><code className="text-green-300">STRFTIME(format, date)</code> — 書式を指定して変換</li>
          <li><code className="text-green-300">DATE(date, '+N days')</code> — 日付の加算・減算</li>
          <li><code className="text-green-300">JULIANDAY(date)</code> — ユリウス日数に変換（差分計算に使う）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 現在日時の取得と書式変換</h2>
        <SqlEditor
          defaultCode={`SELECT
  DATE('now') AS today,
  TIME('now') AS current_time,
  DATETIME('now') AS now_datetime,
  STRFTIME('%Y年%m月%d日', 'now') AS formatted_date,
  STRFTIME('%Y', 'now') AS year,
  STRFTIME('%m', 'now') AS month;`}
          expectedOutput={`today      | current_time | now_datetime        | formatted_date | year | month
-----------+--------------+---------------------+----------------+------+------
2024-01-15 | 10:30:00     | 2024-01-15 10:30:00 | 2024年01月15日  | 2024 | 01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 日付の加算・減算</h2>
        <SqlEditor
          defaultCode={`SELECT
  order_date,
  DATE(order_date, '+7 days') AS ship_date,
  DATE(order_date, '+1 month') AS next_month,
  DATE(order_date, '-1 year') AS last_year
FROM orders;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  order_date TEXT NOT NULL
);
INSERT INTO orders VALUES (1, '商品A', '2024-01-15');
INSERT INTO orders VALUES (2, '商品B', '2024-03-20');
INSERT INTO orders VALUES (3, '商品C', '2024-12-01');`}
          expectedOutput={`order_date | ship_date  | next_month | last_year
-----------+------------+------------+-----------
2024-01-15 | 2024-01-22 | 2024-02-15 | 2023-01-15
2024-03-20 | 2024-03-27 | 2024-04-20 | 2023-03-20
2024-12-01 | 2024-12-08 | 2025-01-01 | 2023-12-01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 日付の差分計算</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  birth_date,
  CAST((JULIANDAY('now') - JULIANDAY(birth_date)) / 365.25 AS INTEGER) AS age,
  CAST(JULIANDAY('now') - JULIANDAY(join_date) AS INTEGER) AS days_since_join
FROM members;`}
          setupSql={`CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  join_date TEXT NOT NULL
);
INSERT INTO members VALUES (1, '田中太郎', '1990-05-15', '2020-01-10');
INSERT INTO members VALUES (2, '鈴木花子', '1985-11-20', '2019-06-01');
INSERT INTO members VALUES (3, '佐藤一郎', '2000-03-08', '2023-04-01');`}
          expectedOutput={`name     | birth_date | age | days_since_join
---------+------------+-----+----------------
田中太郎  | 1990-05-15 | 33  | 1470
鈴木花子  | 1985-11-20 | 38  | 1688
佐藤一郎  | 2000-03-08 | 23  | 289`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="date-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="date-functions" basePath="/learn/functions" />
    </div>
  );
}
