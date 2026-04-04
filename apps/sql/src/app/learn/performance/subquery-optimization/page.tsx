import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function SubqueryOptimizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブクエリ最適化</h1>
        <p className="text-gray-400">サブクエリをJOINやCTEに書き換えて効率化する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">サブクエリの最適化ポイント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          相関サブクエリは外部クエリの各行に対して繰り返し実行されるため、行数が増えると急激に遅くなります。
          多くの場合、相関サブクエリはJOINに書き換えることで大幅に高速化できます。
          また、CTEを使うと複雑なサブクエリを読みやすく整理でき、オプティマイザの最適化も受けやすくなります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">相関サブクエリ → JOIN</code> — 繰り返し実行を1回のJOINに変換</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">IN → EXISTS</code> — 大きなリストのINはEXISTSが速い場合がある</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">サブクエリ → CTE</code> — 同じサブクエリを複数回使う場合はCTEで一度だけ計算</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 相関サブクエリをJOINに書き換え</h2>
        <SqlEditor
          defaultCode={`-- 各顧客の最新注文を取得（JOINで効率的に）
SELECT c.name, o.total, o.order_date
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN (
  SELECT customer_id, MAX(order_date) AS latest
  FROM orders GROUP BY customer_id
) latest_o ON o.customer_id = latest_o.customer_id AND o.order_date = latest_o.latest;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子');
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,1,8000,'2024-03-15'),(3,2,3000,'2024-02-20'),(4,2,6000,'2024-04-01');`}
          expectedOutput={`name     | total | order_date
---------+-------+------------
田中太郎  | 8000  | 2024-03-15
鈴木花子  | 6000  | 2024-04-01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 同一サブクエリをCTEにまとめる</h2>
        <SqlEditor
          defaultCode={`-- 平均売上を一度だけ計算してCTEで再利用
WITH avg_sales AS (
  SELECT AVG(total) AS avg_total FROM orders
)
SELECT o.id, o.customer_id, o.total,
       ROUND(o.total - a.avg_total, 0) AS diff_from_avg
FROM orders o, avg_sales a
ORDER BY diff_from_avg DESC;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000),(4,3,8000),(5,3,15000);`}
          expectedOutput={`id | customer_id | total | diff_from_avg
---+-------------+-------+--------------
5  | 3           | 15000 | 6400
2  | 1           | 12000 | 3400
4  | 3           | 8000  | -600
1  | 1           | 5000  | -3600
3  | 2           | 3000  | -5600`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: スカラーサブクエリをウィンドウ関数に変換</h2>
        <SqlEditor
          defaultCode={`-- 各行に全体平均を付与（ウィンドウ関数で効率的）
SELECT id, customer_id, total,
       AVG(total) OVER () AS avg_total,
       total - AVG(total) OVER () AS diff
FROM orders;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000),(4,3,8000),(5,3,15000);`}
          expectedOutput={`id | customer_id | total | avg_total | diff
---+-------------+-------+-----------+------
1  | 1           | 5000  | 8600.0    | -3600.0
2  | 1           | 12000 | 8600.0    | 3400.0
3  | 2           | 3000  | 8600.0    | -5600.0
4  | 3           | 8000  | 8600.0    | -600.0
5  | 3           | 15000 | 8600.0    | 6400.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="subquery-optimization" />
      </div>
      <LessonNav lessons={lessons} currentId="subquery-optimization" basePath="/learn/performance" />
    </div>
  );
}
