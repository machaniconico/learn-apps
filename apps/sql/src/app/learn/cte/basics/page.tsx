import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function CteBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CTE基本</h1>
        <p className="text-gray-400">WITH句を使った共通テーブル式（CTE）の基本構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CTEとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CTE（Common Table Expression、共通テーブル式）は
          <code className="text-violet-300 bg-gray-800 px-1.5 py-0.5 rounded">WITH</code>句を使って定義する一時的な名前付きクエリです。
          複雑なクエリを読みやすく分割したり、同じサブクエリを複数回参照したりするために使います。
          CTEはそのクエリの実行中のみ有効で、次のSQL文では使えません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>複雑なクエリを段階的に分解して可読性を高める</li>
          <li>同じサブクエリを複数回参照できる（DRY原則）</li>
          <li>インラインビュー（FROM句サブクエリ）の代替として使える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CTEは<code className="text-violet-300 bg-gray-800 px-1.5 py-0.5 rounded">WITH CTE名 AS (SELECT ...)</code>の形式で定義し、
          その直後のSELECT・INSERT・UPDATE・DELETE文の中で通常のテーブルと同様に参照できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なCTEの定義と使用</h2>
        <SqlEditor
          defaultCode={`WITH high_earners AS (
  SELECT id, name, salary, department
  FROM employees
  WHERE salary >= 450000
)
SELECT
  he.name,
  he.salary,
  he.department
FROM high_earners he
ORDER BY he.salary DESC;`}
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
          expectedOutput={`name     | salary | department
---------+--------+-----------
鈴木花子  | 520000 | 開発部
山田二郎  | 480000 | 開発部
佐藤一郎  | 450000 | 営業部`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CTEで集計してから結合</h2>
        <SqlEditor
          defaultCode={`WITH dept_avg AS (
  SELECT
    department,
    ROUND(AVG(salary), 0) AS avg_salary
  FROM employees
  GROUP BY department
)
SELECT
  e.name,
  e.department,
  e.salary,
  da.avg_salary AS dept_avg_salary,
  e.salary - da.avg_salary AS diff_from_avg
FROM employees e
JOIN dept_avg da ON e.department = da.department
ORDER BY e.department, e.salary DESC;`}
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
          expectedOutput={`name     | department | salary | dept_avg_salary | diff_from_avg
---------+------------+--------+-----------------+--------------
佐藤一郎  | 営業部      | 450000 | 425000          | 25000
田中太郎  | 営業部      | 400000 | 425000          | -25000
鈴木花子  | 開発部      | 520000 | 500000          | 20000
山田二郎  | 開発部      | 480000 | 500000          | -20000
伊藤花代  | 人事部      | 360000 | 360000          | 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: サブクエリをCTEに書き換える</h2>
        <SqlEditor
          defaultCode={`-- サブクエリ版（読みにくい）
-- SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);

-- CTE版（読みやすい）
WITH avg_salary AS (
  SELECT AVG(salary) AS avg_val FROM employees
)
SELECT
  e.name,
  e.salary,
  ROUND(a.avg_val, 0) AS company_avg
FROM employees e, avg_salary a
WHERE e.salary > a.avg_val
ORDER BY e.salary DESC;`}
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
          expectedOutput={`name     | salary | company_avg
---------+--------+------------
鈴木花子  | 520000 | 442000
山田二郎  | 480000 | 442000
佐藤一郎  | 450000 | 442000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/cte" />
    </div>
  );
}
