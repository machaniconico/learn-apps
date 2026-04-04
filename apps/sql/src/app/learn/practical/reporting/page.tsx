import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function ReportingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">レポートクエリ</h1>
        <p className="text-gray-400">売上集計・月次レポートなど実務でよく使うレポートを作成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レポートクエリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レポートクエリとは、ビジネスの意思決定に使うデータを集計・整形するSQLです。
          月次売上、商品別売上ランキング、顧客分析など様々なレポートをSQLだけで作成できます。
          GROUP BY・集約関数・ウィンドウ関数・CTEを組み合わせることで複雑なレポートも実現できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">GROUP BY + 集約関数</code> — 基本的な集計レポート</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ROLLUP</code> — 小計・合計を同時に取得</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ウィンドウ関数</code> — 前月比・構成比などの計算</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 月次売上レポート</h2>
        <SqlEditor
          defaultCode={`SELECT
  strftime('%Y-%m', order_date) AS month,
  COUNT(*) AS order_count,
  SUM(total) AS revenue,
  ROUND(AVG(total), 0) AS avg_order_value
FROM orders
GROUP BY month
ORDER BY month;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,12000,'2024-01-20'),(3,1,8000,'2024-01-25'),(4,3,15000,'2024-02-05'),(5,2,3000,'2024-02-15'),(6,1,20000,'2024-02-28'),(7,3,9000,'2024-03-10'),(8,2,6000,'2024-03-20');`}
          expectedOutput={`month   | order_count | revenue | avg_order_value
--------+-------------+---------+----------------
2024-01 | 3           | 25000   | 8333.0
2024-02 | 3           | 38000   | 12667.0
2024-03 | 2           | 15000   | 7500.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 商品カテゴリ別売上と構成比</h2>
        <SqlEditor
          defaultCode={`SELECT
  category,
  SUM(revenue) AS total_revenue,
  ROUND(SUM(revenue) * 100.0 / SUM(SUM(revenue)) OVER (), 1) AS pct
FROM (
  SELECT p.category, p.price * oi.quantity AS revenue
  FROM order_items oi JOIN products p ON oi.product_id = p.id
) t
GROUP BY category
ORDER BY total_revenue DESC;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO products VALUES (1,'ノートPC','PC',120000),(2,'マウス','周辺機器',3000),(3,'キーボード','周辺機器',8000),(4,'モニター','PC',45000);
INSERT INTO order_items VALUES (1,1,2),(1,2,3),(2,3,1),(2,4,1),(3,2,5),(3,1,1);`}
          expectedOutput={`category | total_revenue | pct
---------+---------------+-----
PC       | 330000        | 88.3
周辺機器  | 44000         | 11.7`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 前月比を含む成長レポート</h2>
        <SqlEditor
          defaultCode={`WITH monthly AS (
  SELECT strftime('%Y-%m', order_date) AS month, SUM(total) AS revenue
  FROM orders GROUP BY month
)
SELECT month, revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 /
             LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly ORDER BY month;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,12000,'2024-01-20'),(3,1,8000,'2024-01-25'),(4,3,15000,'2024-02-05'),(5,2,3000,'2024-02-15'),(6,1,20000,'2024-02-28'),(7,3,9000,'2024-03-10'),(8,2,6000,'2024-03-20');`}
          expectedOutput={`month   | revenue | prev_revenue | growth_pct
--------+---------+--------------+-----------
2024-01 | 25000   | NULL         | NULL
2024-02 | 38000   | 25000        | 52.0
2024-03 | 15000   | 38000        | -60.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="reporting" />
      </div>
      <LessonNav lessons={lessons} currentId="reporting" basePath="/learn/practical" />
    </div>
  );
}
