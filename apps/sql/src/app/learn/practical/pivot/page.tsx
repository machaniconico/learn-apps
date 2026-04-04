import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function PivotPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ピボット</h1>
        <p className="text-gray-400">行列変換（クロス集計）でデータを見やすく整形する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ピボットとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ピボット（行列変換）とは、行として並んでいるデータをカラム（列）方向に展開してクロス集計表を作る技術です。
          たとえば「月・商品・売上」の行データを「商品行 × 月列」の表に変換できます。
          SQLiteではCASE式とSUM/MAXを組み合わせてピボットを実現します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">CASE + SUM</code> — 条件付き集計でピボット列を作成</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">GROUP BY</code> — 行方向の集約キーを指定</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">COALESCE</code> — NULL値を0に置き換える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 月別・商品別売上ピボット</h2>
        <SqlEditor
          defaultCode={`SELECT
  product_name,
  SUM(CASE WHEN month = '2024-01' THEN revenue ELSE 0 END) AS jan,
  SUM(CASE WHEN month = '2024-02' THEN revenue ELSE 0 END) AS feb,
  SUM(CASE WHEN month = '2024-03' THEN revenue ELSE 0 END) AS mar
FROM (
  SELECT p.name AS product_name,
         strftime('%Y-%m', o.order_date) AS month,
         p.price * oi.quantity AS revenue
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  JOIN orders o ON oi.order_id = o.id
) t
GROUP BY product_name
ORDER BY product_name;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, order_date TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO products VALUES (1,'ノートPC',120000),(2,'マウス',3000),(3,'キーボード',8000);
INSERT INTO orders VALUES (1,'2024-01-10'),(2,'2024-01-25'),(3,'2024-02-15'),(4,'2024-03-05');
INSERT INTO order_items VALUES (1,1,1),(1,2,2),(2,3,1),(3,1,1),(3,2,3),(4,3,2);`}
          expectedOutput={`product_name | jan    | feb    | mar
-------------+--------+--------+-------
キーボード    | 8000   | 0      | 16000
ノートPC     | 120000 | 120000 | 0
マウス        | 6000   | 9000   | 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ステータス別件数のピボット</h2>
        <SqlEditor
          defaultCode={`SELECT
  strftime('%Y-%m', order_date) AS month,
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
  SUM(CASE WHEN status = 'shipped'   THEN 1 ELSE 0 END) AS shipped,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders
GROUP BY month
ORDER BY month;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, status TEXT, order_date TEXT);
INSERT INTO orders VALUES (1,'delivered','2024-01-10'),(2,'shipped','2024-01-15'),(3,'cancelled','2024-01-20'),(4,'delivered','2024-02-05'),(5,'delivered','2024-02-10'),(6,'shipped','2024-02-20'),(7,'cancelled','2024-03-01'),(8,'delivered','2024-03-15');`}
          expectedOutput={`month   | delivered | shipped | cancelled
--------+-----------+---------+----------
2024-01 | 1         | 1       | 1
2024-02 | 2         | 1       | 0
2024-03 | 1         | 0       | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ピボット解除（UNPIVOT相当）</h2>
        <SqlEditor
          defaultCode={`-- 横持ちデータを縦持ちに変換（UNPIVOT）
SELECT name, 'Q1' AS quarter, q1 AS sales FROM quarterly_sales
UNION ALL
SELECT name, 'Q2', q2 FROM quarterly_sales
UNION ALL
SELECT name, 'Q3', q3 FROM quarterly_sales
UNION ALL
SELECT name, 'Q4', q4 FROM quarterly_sales
ORDER BY name, quarter;`}
          setupSql={`CREATE TABLE quarterly_sales (name TEXT, q1 INTEGER, q2 INTEGER, q3 INTEGER, q4 INTEGER);
INSERT INTO quarterly_sales VALUES ('田中',500000,600000,550000,700000),('鈴木',300000,350000,400000,380000);`}
          expectedOutput={`name | quarter | sales
-----+---------+-------
田中  | Q1      | 500000
田中  | Q2      | 600000
田中  | Q3      | 550000
田中  | Q4      | 700000
鈴木  | Q1      | 300000
鈴木  | Q2      | 350000
鈴木  | Q3      | 400000
鈴木  | Q4      | 380000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="pivot" />
      </div>
      <LessonNav lessons={lessons} currentId="pivot" basePath="/learn/practical" />
    </div>
  );
}
