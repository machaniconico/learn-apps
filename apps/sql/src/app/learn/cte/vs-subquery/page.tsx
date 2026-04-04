import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function VsSubqueryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CTE vs サブクエリ</h1>
        <p className="text-gray-400">CTEとサブクエリの違いを理解し、適切に使い分ける方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CTEとサブクエリの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CTEとサブクエリはどちらも一時的なクエリ結果を定義する手段ですが、
          用途と可読性に違いがあります。
          どちらを使うかはケースバイケースですが、複雑になるほどCTEが有利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><span className="text-violet-300">CTE有利な場面</span> — 同じサブクエリを複数回使う、処理を段階的に分解したい、再帰処理が必要</li>
          <li><span className="text-violet-300">サブクエリ有利な場面</span> — 1回しか使わない単純な条件、EXISTS/IN句での存在チェック</li>
          <li>可読性ではCTEが優れている場合が多い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 同じサブクエリの重複 → CTEで解決</h2>
        <SqlEditor
          defaultCode={`-- サブクエリ版：同じ計算が2回登場する
-- SELECT name, salary,
--   salary - (SELECT AVG(salary) FROM employees) AS diff,
--   ROUND(salary * 100.0 / (SELECT AVG(salary) FROM employees), 1) AS ratio
-- FROM employees;

-- CTE版：平均を1回だけ計算してスッキリ
WITH avg_sal AS (
  SELECT ROUND(AVG(salary), 0) AS avg_val FROM employees
)
SELECT
  name,
  salary,
  salary - avg_val AS diff,
  ROUND(salary * 100.0 / avg_val, 1) AS ratio
FROM employees, avg_sal
ORDER BY salary DESC;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', 520000);
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 450000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '人事部', 360000);`}
          expectedOutput={`name     | salary | diff   | ratio
---------+--------+--------+-------
鈴木花子  | 520000 | 94200  | 122.1
山田二郎  | 480000 | 54200  | 112.7
佐藤一郎  | 450000 | 24200  | 105.7
田中太郎  | 400000 | -25800 | 93.9
伊藤花代  | 360000 | -65800 | 84.6`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: EXISTSサブクエリはそのままでOK</h2>
        <SqlEditor
          defaultCode={`-- EXISTSの存在チェックはサブクエリが自然
SELECT
  c.name AS customer_name,
  c.email
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
  AND o.order_date >= '2024-03-01'
);`}
          setupSql={`CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  order_date TEXT NOT NULL
);
INSERT INTO customers VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO customers VALUES (2, '鈴木花子', 'suzuki@example.com');
INSERT INTO customers VALUES (3, '佐藤一郎', 'sato@example.com');
INSERT INTO orders VALUES (1, 1, '商品A', '2024-02-10');
INSERT INTO orders VALUES (2, 2, '商品B', '2024-03-15');
INSERT INTO orders VALUES (3, 3, '商品C', '2024-04-01');`}
          expectedOutput={`customer_name | email
--------------+--------------------
鈴木花子       | suzuki@example.com
佐藤一郎       | sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複雑な集計 → CTEで段階処理</h2>
        <SqlEditor
          defaultCode={`-- 部門ごとの上位2名と部門平均の比較
WITH dept_stats AS (
  SELECT department, ROUND(AVG(salary), 0) AS avg_salary
  FROM employees GROUP BY department
),
ranked AS (
  SELECT name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT
  r.name,
  r.department,
  r.salary,
  d.avg_salary AS dept_avg,
  r.rnk AS dept_rank
FROM ranked r
JOIN dept_stats d ON r.department = d.department
WHERE r.rnk <= 2
ORDER BY r.department, r.rnk;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', 520000);
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 450000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '人事部', 360000);
INSERT INTO employees VALUES (6, '渡辺次郎', '営業部', 430000);`}
          expectedOutput={`name     | department | salary | dept_avg | dept_rank
---------+------------+--------+----------+----------
佐藤一郎  | 営業部      | 450000 | 426667   | 1
渡辺次郎  | 営業部      | 430000 | 426667   | 2
鈴木花子  | 開発部      | 520000 | 500000   | 1
山田二郎  | 開発部      | 480000 | 500000   | 2
伊藤花代  | 人事部      | 360000 | 360000   | 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="vs-subquery" />
      </div>
      <LessonNav lessons={lessons} currentId="vs-subquery" basePath="/learn/cte" />
    </div>
  );
}
