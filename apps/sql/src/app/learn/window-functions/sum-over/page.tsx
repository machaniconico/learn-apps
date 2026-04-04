import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function SumOverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SUM() OVER</h1>
        <p className="text-gray-400">累積合計・移動合計をSUM() OVERで計算する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集約関数のウィンドウ利用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SUM・AVG・COUNT・MIN・MAXなどの集約関数も<code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">OVER</code>句を付けることで
          ウィンドウ関数として使えます。
          行を集約せずに各行に計算結果を付与できるため、
          累積合計（running total）や移動平均（moving average）の計算が簡単になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">SUM(col) OVER (ORDER BY date)</code> — 累積合計</li>
          <li><code className="text-purple-300">AVG(col) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</code> — 3行移動平均</li>
          <li><code className="text-purple-300">SUM(col) OVER ()</code> — 全体合計（ORDER BYなし）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 累積売上を計算する</h2>
        <SqlEditor
          defaultCode={`SELECT
  month,
  sales,
  SUM(sales) OVER (ORDER BY month) AS cumulative_sales,
  ROUND(
    SUM(sales) OVER (ORDER BY month) * 100.0
    / SUM(sales) OVER (),
    1
  ) AS cumulative_pct
FROM monthly_sales
ORDER BY month;`}
          setupSql={`CREATE TABLE monthly_sales (
  month TEXT PRIMARY KEY,
  sales INTEGER NOT NULL
);
INSERT INTO monthly_sales VALUES ('2024-01', 100000);
INSERT INTO monthly_sales VALUES ('2024-02', 120000);
INSERT INTO monthly_sales VALUES ('2024-03', 95000);
INSERT INTO monthly_sales VALUES ('2024-04', 130000);
INSERT INTO monthly_sales VALUES ('2024-05', 115000);`}
          expectedOutput={`month   | sales  | cumulative_sales | cumulative_pct
--------+--------+------------------+---------------
2024-01 | 100000 | 100000           | 17.9
2024-02 | 120000 | 220000           | 39.3
2024-03 | 95000  | 315000           | 56.3
2024-04 | 130000 | 445000           | 79.5
2024-05 | 115000 | 560000           | 100.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 移動平均の計算</h2>
        <SqlEditor
          defaultCode={`SELECT
  day,
  temperature,
  ROUND(
    AVG(temperature) OVER (
      ORDER BY day
      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ),
    1
  ) AS moving_avg_3day
FROM daily_temp
ORDER BY day;`}
          setupSql={`CREATE TABLE daily_temp (
  day TEXT PRIMARY KEY,
  temperature REAL NOT NULL
);
INSERT INTO daily_temp VALUES ('2024-01-01', 5.2);
INSERT INTO daily_temp VALUES ('2024-01-02', 3.8);
INSERT INTO daily_temp VALUES ('2024-01-03', 7.1);
INSERT INTO daily_temp VALUES ('2024-01-04', 6.5);
INSERT INTO daily_temp VALUES ('2024-01-05', 8.3);
INSERT INTO daily_temp VALUES ('2024-01-06', 4.9);`}
          expectedOutput={`day        | temperature | moving_avg_3day
-----------+-------------+----------------
2024-01-01 | 5.2         | 5.2
2024-01-02 | 3.8         | 4.5
2024-01-03 | 7.1         | 5.4
2024-01-04 | 6.5         | 5.8
2024-01-05 | 8.3         | 7.3
2024-01-06 | 4.9         | 6.6`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 全体合計に対する割合</h2>
        <SqlEditor
          defaultCode={`SELECT
  category,
  revenue,
  SUM(revenue) OVER () AS total_revenue,
  ROUND(revenue * 100.0 / SUM(revenue) OVER (), 1) AS share_pct
FROM category_revenue
ORDER BY revenue DESC;`}
          setupSql={`CREATE TABLE category_revenue (
  category TEXT PRIMARY KEY,
  revenue INTEGER NOT NULL
);
INSERT INTO category_revenue VALUES ('食品', 450000);
INSERT INTO category_revenue VALUES ('衣料', 320000);
INSERT INTO category_revenue VALUES ('家電', 280000);
INSERT INTO category_revenue VALUES ('雑貨', 150000);`}
          expectedOutput={`category | revenue | total_revenue | share_pct
---------+---------+---------------+----------
食品      | 450000  | 1200000       | 37.5
衣料      | 320000  | 1200000       | 26.7
家電      | 280000  | 1200000       | 23.3
雑貨      | 150000  | 1200000       | 12.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="sum-over" />
      </div>
      <LessonNav lessons={lessons} currentId="sum-over" basePath="/learn/window-functions" />
    </div>
  );
}
