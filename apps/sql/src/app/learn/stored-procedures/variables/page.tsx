import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数と制御</h1>
        <p className="text-gray-400">DECLARE・SETで変数を使いこなしてSQL手続きを柔軟にする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数の使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MySQLやPostgreSQLのストアドプロシージャでは、DECLARE文で変数を宣言しSET文で値を代入します。
          変数はクエリの中間結果を保持したり、繰り返し処理のカウンターとして使用します。
          SQLiteではCTEや一時テーブルを使って変数と同等の機能を実現できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">DECLARE v_name TYPE</code> — 変数の宣言と型指定</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SET v_name = value</code> — 変数への値代入</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT INTO v_name</code> — クエリ結果を変数に格納</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: CTEで変数を模擬する</h2>
        <SqlEditor
          defaultCode={`-- DECLARE v_threshold INT = 10000 の代わりに CTE を使用
WITH params AS (
  SELECT 10000 AS threshold, '2024-01-01' AS start_date
),
filtered AS (
  SELECT o.* FROM orders o, params p
  WHERE o.total >= p.threshold AND o.order_date >= p.start_date
)
SELECT id, customer_id, total, order_date FROM filtered;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,12000,'2024-01-20'),(3,1,8000,'2023-12-15'),(4,3,15000,'2024-02-01'),(5,2,3000,'2024-02-10');`}
          expectedOutput={`id | customer_id | total | order_date
---+-------------+-------+------------
2  | 2           | 12000 | 2024-01-20
4  | 3           | 15000 | 2024-02-01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 一時テーブルで中間結果を保持</h2>
        <SqlEditor
          defaultCode={`-- 一時テーブルを変数の代わりに使う
CREATE TEMP TABLE high_value_customers AS
SELECT customer_id, SUM(total) AS total_spent
FROM orders GROUP BY customer_id HAVING SUM(total) >= 15000;

SELECT c.name, hvc.total_spent
FROM high_value_customers hvc
JOIN customers c ON hvc.customer_id = c.id
ORDER BY hvc.total_spent DESC;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000),(4,3,15000),(5,3,8000),(6,1,4000);`}
          expectedOutput={`name     | total_spent
---------+------------
佐藤次郎  | 23000
田中太郎  | 21000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 変数を使った連続計算</h2>
        <SqlEditor
          defaultCode={`-- 前月比・累計を変数的に計算する
WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month ORDER BY month
),
with_prev AS (
  SELECT month, revenue,
         LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly
)
SELECT month, revenue,
       ROUND((revenue - prev_revenue) * 100.0 / prev_revenue, 1) AS growth_pct
FROM with_prev;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,3000,'2024-01-20'),(3,1,12000,'2024-02-05'),(4,3,8000,'2024-02-15'),(5,2,15000,'2024-03-01'),(6,1,6000,'2024-03-20');`}
          expectedOutput={`month   | revenue | growth_pct
--------+---------+-----------
2024-01 | 8000    | NULL
2024-02 | 20000   | 150.0
2024-03 | 21000   | 5.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/stored-procedures" />
    </div>
  );
}
