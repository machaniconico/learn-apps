import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function CteCrudPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CTEと更新系</h1>
        <p className="text-gray-400">CTEをINSERT・UPDATE・DELETEと組み合わせて使う方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CTEは更新系でも使える</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CTEはSELECT文だけでなく、INSERT・UPDATE・DELETE文と組み合わせて使えます。
          複雑な条件でのデータ更新や削除を、読みやすく記述できます。
          特に「あるクエリの結果を元に更新する」パターンでCTEが威力を発揮します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>CTEで対象データを特定し、UPDATE/DELETEに渡す</li>
          <li>CTEで計算した値をINSERTに使う</li>
          <li>複数ステップの処理をCTEで整理できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: CTEを使ったUPDATE</h2>
        <SqlEditor
          defaultCode={`-- 平均を超えるスコアの生徒にボーナスポイント付与
WITH avg_score AS (
  SELECT AVG(score) AS avg_val FROM students
),
above_avg AS (
  SELECT s.id
  FROM students s, avg_score a
  WHERE s.score > a.avg_val
)
UPDATE students
SET bonus = 10
WHERE id IN (SELECT id FROM above_avg);

SELECT name, score, bonus FROM students ORDER BY score DESC;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  bonus INTEGER NOT NULL DEFAULT 0
);
INSERT INTO students VALUES (1, '田中太郎', 85, 0);
INSERT INTO students VALUES (2, '鈴木花子', 92, 0);
INSERT INTO students VALUES (3, '佐藤一郎', 70, 0);
INSERT INTO students VALUES (4, '山田二郎', 88, 0);
INSERT INTO students VALUES (5, '伊藤花代', 65, 0);`}
          expectedOutput={`name     | score | bonus
---------+-------+------
鈴木花子  | 92    | 10
山田二郎  | 88    | 10
田中太郎  | 85    | 10
佐藤一郎  | 70    | 0
伊藤花代  | 65    | 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CTEを使ったDELETE</h2>
        <SqlEditor
          defaultCode={`-- 各ユーザーの最新以外の注文を削除
WITH old_orders AS (
  SELECT id
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) AS rn
    FROM orders
  )
  WHERE rn > 1
)
DELETE FROM orders WHERE id IN (SELECT id FROM old_orders);

SELECT * FROM orders ORDER BY user_id, order_date;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  order_date TEXT NOT NULL
);
INSERT INTO orders VALUES (1, 1, '商品A', '2024-01-10');
INSERT INTO orders VALUES (2, 1, '商品B', '2024-02-15');
INSERT INTO orders VALUES (3, 1, '商品C', '2024-03-01');
INSERT INTO orders VALUES (4, 2, '商品D', '2024-01-20');
INSERT INTO orders VALUES (5, 2, '商品E', '2024-02-28');`}
          expectedOutput={`id | user_id | product | order_date
---+---------+---------+-----------
3  | 1       | 商品C   | 2024-03-01
5  | 2       | 商品E   | 2024-02-28`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: CTEを使ったINSERT SELECT</h2>
        <SqlEditor
          defaultCode={`-- 月次サマリーをarchiveテーブルに挿入
WITH monthly_summary AS (
  SELECT
    STRFTIME('%Y-%m', sale_date) AS month,
    COUNT(*) AS count,
    SUM(amount) AS total
  FROM sales
  GROUP BY STRFTIME('%Y-%m', sale_date)
)
INSERT INTO sales_archive (month, sale_count, total_amount)
SELECT month, count, total
FROM monthly_summary;

SELECT * FROM sales_archive ORDER BY month;`}
          setupSql={`CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  sale_date TEXT NOT NULL,
  amount INTEGER NOT NULL
);
CREATE TABLE sales_archive (
  month TEXT PRIMARY KEY,
  sale_count INTEGER NOT NULL,
  total_amount INTEGER NOT NULL
);
INSERT INTO sales VALUES (1, '2024-01-05', 10000);
INSERT INTO sales VALUES (2, '2024-01-20', 15000);
INSERT INTO sales VALUES (3, '2024-02-10', 20000);
INSERT INTO sales VALUES (4, '2024-02-25', 18000);`}
          expectedOutput={`month   | sale_count | total_amount
--------+------------+-------------
2024-01 | 2          | 25000
2024-02 | 2          | 38000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="cte-crud" />
      </div>
      <LessonNav lessons={lessons} currentId="cte-crud" basePath="/learn/cte" />
    </div>
  );
}
