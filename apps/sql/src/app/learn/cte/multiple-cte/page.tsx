import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function MultipleCTEPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数CTE</h1>
        <p className="text-gray-400">WITH句で複数のCTEを定義して段階的にデータを処理する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数CTEの定義方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1つのWITH句の中に複数のCTEをカンマ区切りで定義できます。
          後から定義するCTEは、前に定義したCTEを参照できるため、
          複雑な処理を段階的なステップに分解して表現できます。
          これはパイプライン処理のように読めるため、可読性が大幅に向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>カンマで区切って複数のCTEを定義する</li>
          <li>後のCTEは前のCTEを参照できる（上から順に処理）</li>
          <li>最後のSELECT文で任意のCTEを参照できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 2段階のCTEで集計</h2>
        <SqlEditor
          defaultCode={`WITH
-- ステップ1: 月別売上集計
monthly_totals AS (
  SELECT
    STRFTIME('%Y-%m', sale_date) AS month,
    SUM(amount) AS total
  FROM sales
  GROUP BY STRFTIME('%Y-%m', sale_date)
),
-- ステップ2: 前月比計算
with_growth AS (
  SELECT
    month,
    total,
    LAG(total) OVER (ORDER BY month) AS prev_total
  FROM monthly_totals
)
-- 最終クエリ
SELECT
  month,
  total,
  prev_total,
  ROUND((total - prev_total) * 100.0 / prev_total, 1) AS growth_pct
FROM with_growth
ORDER BY month;`}
          setupSql={`CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  sale_date TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO sales VALUES (1, '2024-01-05', 30000);
INSERT INTO sales VALUES (2, '2024-01-15', 45000);
INSERT INTO sales VALUES (3, '2024-02-03', 60000);
INSERT INTO sales VALUES (4, '2024-02-20', 40000);
INSERT INTO sales VALUES (5, '2024-03-10', 55000);
INSERT INTO sales VALUES (6, '2024-03-25', 70000);`}
          expectedOutput={`month   | total  | prev_total | growth_pct
--------+--------+------------+-----------
2024-01 | 75000  | NULL       | NULL
2024-02 | 100000 | 75000      | 33.3
2024-03 | 125000 | 100000     | 25.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 3つのCTEを連鎖させる</h2>
        <SqlEditor
          defaultCode={`WITH
active_users AS (
  SELECT id, name FROM users WHERE active = 1
),
user_orders AS (
  SELECT
    u.id,
    u.name,
    COUNT(o.id) AS order_count,
    SUM(o.amount) AS total_amount
  FROM active_users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id, u.name
),
ranked_users AS (
  SELECT
    name,
    order_count,
    total_amount,
    RANK() OVER (ORDER BY total_amount DESC) AS rank_num
  FROM user_orders
)
SELECT * FROM ranked_users ORDER BY rank_num;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO users VALUES (1, '田中太郎', 1);
INSERT INTO users VALUES (2, '鈴木花子', 1);
INSERT INTO users VALUES (3, '佐藤一郎', 0);
INSERT INTO users VALUES (4, '山田二郎', 1);
INSERT INTO orders VALUES (1, 1, 5000);
INSERT INTO orders VALUES (2, 1, 8000);
INSERT INTO orders VALUES (3, 2, 12000);
INSERT INTO orders VALUES (4, 4, 3000);`}
          expectedOutput={`name     | order_count | total_amount | rank_num
---------+-------------+--------------+---------
鈴木花子  | 1           | 12000        | 1
田中太郎  | 2           | 13000        | 1
山田二郎  | 1           | 3000         | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: CTEとUNIONの組み合わせ</h2>
        <SqlEditor
          defaultCode={`WITH
top_products AS (
  SELECT product_name, sales, 'トップ3' AS category
  FROM products
  ORDER BY sales DESC
  LIMIT 3
),
bottom_products AS (
  SELECT product_name, sales, 'ワースト3' AS category
  FROM products
  ORDER BY sales ASC
  LIMIT 3
)
SELECT * FROM top_products
UNION ALL
SELECT * FROM bottom_products;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  sales INTEGER NOT NULL
);
INSERT INTO products VALUES (1, '商品A', 500000);
INSERT INTO products VALUES (2, '商品B', 320000);
INSERT INTO products VALUES (3, '商品C', 150000);
INSERT INTO products VALUES (4, '商品D', 480000);
INSERT INTO products VALUES (5, '商品E', 90000);
INSERT INTO products VALUES (6, '商品F', 410000);`}
          expectedOutput={`product_name | sales  | category
-------------+--------+---------
商品A         | 500000 | トップ3
商品D         | 480000 | トップ3
商品F         | 410000 | トップ3
商品E         | 90000  | ワースト3
商品C         | 150000 | ワースト3
商品B         | 320000 | ワースト3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="multiple-cte" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-cte" basePath="/learn/cte" />
    </div>
  );
}
