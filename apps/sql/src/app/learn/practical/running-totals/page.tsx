import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function RunningTotalsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">累計・移動平均</h1>
        <p className="text-gray-400">時系列データの累計・移動平均・前期比を計算する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">時系列集計の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          時系列データの分析では「累計（Running Total）」「移動平均（Moving Average）」「前期比」がよく使われます。
          ウィンドウ関数のフレーム句（ROWS BETWEEN）を使うと、集計対象の範囲を柔軟に指定できます。
          累計はUNBOUNDED PRECEDING、移動平均はN PRECEDING を使うのが定番です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ROWS UNBOUNDED PRECEDING</code> — 先頭行から現在行までの累計</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ROWS 2 PRECEDING</code> — 直前2行と現在行の3行移動平均</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">LAG(col, n)</code> — n行前の値を参照して前期比を計算</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 月次売上の累計</h2>
        <SqlEditor
          defaultCode={`WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month ORDER BY month
)
SELECT month, revenue,
       SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS cumulative
FROM monthly;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,8000,'2024-01-20'),(3,1,12000,'2024-02-05'),(4,3,6000,'2024-02-15'),(5,2,15000,'2024-03-10'),(6,1,9000,'2024-03-20'),(7,3,11000,'2024-04-05');`}
          expectedOutput={`month   | revenue | cumulative
--------+---------+-----------
2024-01 | 13000   | 13000
2024-02 | 18000   | 31000
2024-03 | 24000   | 55000
2024-04 | 11000   | 66000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 3ヶ月移動平均</h2>
        <SqlEditor
          defaultCode={`WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month ORDER BY month
)
SELECT month, revenue,
       ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS moving_avg_3m
FROM monthly;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,8000,'2024-01-20'),(3,1,12000,'2024-02-05'),(4,3,6000,'2024-02-15'),(5,2,15000,'2024-03-10'),(6,1,9000,'2024-03-20'),(7,3,11000,'2024-04-05'),(8,2,7000,'2024-04-15');`}
          expectedOutput={`month   | revenue | moving_avg_3m
--------+---------+--------------
2024-01 | 13000   | 13000.0
2024-02 | 18000   | 15500.0
2024-03 | 24000   | 18333.0
2024-04 | 18000   | 20000.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 前月比と累計構成比</h2>
        <SqlEditor
          defaultCode={`WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month ORDER BY month
),
totals AS (
  SELECT *, SUM(revenue) OVER () AS grand_total,
         SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS cumulative,
         LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly
)
SELECT month, revenue,
       ROUND((revenue - prev_revenue) * 100.0 / prev_revenue, 1) AS mom_pct,
       ROUND(cumulative * 100.0 / grand_total, 1) AS cumulative_pct
FROM totals;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,8000,'2024-01-20'),(3,1,12000,'2024-02-05'),(4,3,6000,'2024-02-15'),(5,2,15000,'2024-03-10'),(6,1,9000,'2024-03-20'),(7,3,11000,'2024-04-05');`}
          expectedOutput={`month   | revenue | mom_pct | cumulative_pct
--------+---------+---------+---------------
2024-01 | 13000   | NULL    | 19.7
2024-02 | 18000   | 38.5    | 46.9
2024-03 | 24000   | 33.3    | 83.2
2024-04 | 11000   | -54.2   | 100.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="running-totals" />
      </div>
      <LessonNav lessons={lessons} currentId="running-totals" basePath="/learn/practical" />
    </div>
  );
}
