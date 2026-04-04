import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function FrameClausePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フレーム句</h1>
        <p className="text-gray-400">ROWS/RANGE BETWEENでウィンドウのフレーム範囲を細かく制御する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フレーム句とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フレーム句はOVER句の中で、各行の計算に使う行範囲（フレーム）を指定します。
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">ROWS BETWEEN</code>は行数で範囲を指定し、
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">RANGE BETWEEN</code>は値の範囲で指定します。
          移動平均や移動合計の窓幅を制御する際に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> — 先頭から現在行（累積）</li>
          <li><code className="text-purple-300">ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> — 2行前から現在行（3行窓）</li>
          <li><code className="text-purple-300">ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING</code> — 現在行から末尾</li>
          <li><code className="text-purple-300">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> — 全行</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 累積合計 vs 移動合計</h2>
        <SqlEditor
          defaultCode={`SELECT
  day,
  sales,
  -- 累積合計（先頭から現在行）
  SUM(sales) OVER (
    ORDER BY day
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  -- 3日間移動合計
  SUM(sales) OVER (
    ORDER BY day
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS moving_3day_sum
FROM daily_sales
ORDER BY day;`}
          setupSql={`CREATE TABLE daily_sales (
  day TEXT PRIMARY KEY,
  sales INTEGER NOT NULL
);
INSERT INTO daily_sales VALUES ('2024-01-01', 10000);
INSERT INTO daily_sales VALUES ('2024-01-02', 15000);
INSERT INTO daily_sales VALUES ('2024-01-03', 12000);
INSERT INTO daily_sales VALUES ('2024-01-04', 18000);
INSERT INTO daily_sales VALUES ('2024-01-05', 14000);`}
          expectedOutput={`day        | sales | running_total | moving_3day_sum
-----------+-------+---------------+----------------
2024-01-01 | 10000 | 10000         | 10000
2024-01-02 | 15000 | 25000         | 25000
2024-01-03 | 12000 | 37000         | 37000
2024-01-04 | 18000 | 55000         | 45000
2024-01-05 | 14000 | 69000         | 44000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 前後の行を含むフレーム</h2>
        <SqlEditor
          defaultCode={`SELECT
  day,
  temperature,
  -- 前後1日を含む3日間平均
  ROUND(
    AVG(temperature) OVER (
      ORDER BY day
      ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ),
    1
  ) AS smooth_3day
FROM daily_temp
ORDER BY day;`}
          setupSql={`CREATE TABLE daily_temp (
  day TEXT PRIMARY KEY,
  temperature REAL NOT NULL
);
INSERT INTO daily_temp VALUES ('2024-01-01', 5.0);
INSERT INTO daily_temp VALUES ('2024-01-02', 8.0);
INSERT INTO daily_temp VALUES ('2024-01-03', 3.0);
INSERT INTO daily_temp VALUES ('2024-01-04', 10.0);
INSERT INTO daily_temp VALUES ('2024-01-05', 7.0);`}
          expectedOutput={`day        | temperature | smooth_3day
-----------+-------------+------------
2024-01-01 | 5.0         | 6.5
2024-01-02 | 8.0         | 5.3
2024-01-03 | 3.0         | 7.0
2024-01-04 | 10.0        | 6.7
2024-01-05 | 7.0         | 8.5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 末尾からの逆累積</h2>
        <SqlEditor
          defaultCode={`SELECT
  month,
  revenue,
  -- 通常の累積
  SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative,
  -- 残り合計（現在行から末尾）
  SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
  ) AS remaining
FROM monthly_revenue
ORDER BY month;`}
          setupSql={`CREATE TABLE monthly_revenue (
  month TEXT PRIMARY KEY,
  revenue INTEGER NOT NULL
);
INSERT INTO monthly_revenue VALUES ('2024-01', 100000);
INSERT INTO monthly_revenue VALUES ('2024-02', 120000);
INSERT INTO monthly_revenue VALUES ('2024-03', 90000);
INSERT INTO monthly_revenue VALUES ('2024-04', 110000);`}
          expectedOutput={`month   | revenue | cumulative | remaining
--------+---------+------------+----------
2024-01 | 100000  | 100000     | 420000
2024-02 | 120000  | 220000     | 320000
2024-03 | 90000   | 310000     | 200000
2024-04 | 110000  | 420000     | 110000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="frame-clause" />
      </div>
      <LessonNav lessons={lessons} currentId="frame-clause" basePath="/learn/window-functions" />
    </div>
  );
}
