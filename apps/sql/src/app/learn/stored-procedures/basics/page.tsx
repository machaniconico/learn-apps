import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストアドプロシージャ基本</h1>
        <p className="text-gray-400">データベースに保存して再利用できる手続きを作成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストアドプロシージャとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストアドプロシージャとは、データベースサーバー内に保存して繰り返し呼び出せるSQL手続きです。
          アプリケーションからCALL文で実行でき、複数のSQL文をまとめて実行することができます。
          ビジネスロジックをデータベース側に持たせることでネットワーク往復を減らし、パフォーマンスを向上させます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE PROCEDURE</code> — プロシージャを定義</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CALL</code> — プロシージャを実行</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP PROCEDURE</code> — プロシージャを削除</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteでの代替実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteはストアドプロシージャをネイティブでサポートしていないため、
          ここではトリガーやCTEを使って同等の動作を示します。
          MySQLやPostgreSQLでは CREATE PROCEDURE / CALL 構文が使えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数ステップの処理を1回で実行</h2>
        <SqlEditor
          defaultCode={`-- ストアドプロシージャ相当: 注文登録と在庫更新を一連で実行
BEGIN;
INSERT INTO orders (customer_id, product_id, quantity) VALUES (1, 101, 2);
UPDATE products SET stock = stock - 2 WHERE id = 101;
COMMIT;
SELECT id, name, stock FROM products WHERE id = 101;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, stock INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO products VALUES (101,'ノートPC',120000,10),(102,'マウス',3000,50);`}
          expectedOutput={`id  | name    | stock
----+---------+-------
101 | ノートPC | 8`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CTEで複雑な処理を整理する</h2>
        <SqlEditor
          defaultCode={`-- CTE を使って月次集計プロシージャを模擬
WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month,
         COUNT(*) AS order_count,
         SUM(total) AS revenue
  FROM orders
  GROUP BY month
)
SELECT month, order_count, revenue,
       SUM(revenue) OVER (ORDER BY month) AS cumulative_revenue
FROM monthly;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,3000,'2024-01-20'),(3,1,8000,'2024-02-05'),(4,3,12000,'2024-02-15'),(5,2,4000,'2024-03-01');`}
          expectedOutput={`month   | order_count | revenue | cumulative_revenue
--------+-------------+---------+-------------------
2024-01 | 2           | 8000    | 8000
2024-02 | 2           | 20000   | 28000
2024-03 | 1           | 4000    | 32000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 再利用可能なビューでプロシージャを代替</h2>
        <SqlEditor
          defaultCode={`-- 顧客サマリービューを作成して再利用
CREATE VIEW customer_summary AS
SELECT c.id, c.name,
       COUNT(o.id) AS total_orders,
       COALESCE(SUM(o.total), 0) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
SELECT * FROM customer_summary ORDER BY lifetime_value DESC;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000);`}
          expectedOutput={`id | name     | total_orders | lifetime_value
---+----------+--------------+---------------
1  | 田中太郎  | 2            | 17000
2  | 鈴木花子  | 1            | 3000
3  | 佐藤次郎  | 0            | 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/stored-procedures" />
    </div>
  );
}
