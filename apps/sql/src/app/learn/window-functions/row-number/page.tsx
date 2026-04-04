import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function RowNumberPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ROW_NUMBER</h1>
        <p className="text-gray-400">結果セットの各行に連番を付与するROW_NUMBER関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ウィンドウ関数とROW_NUMBER</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ウィンドウ関数は、集約関数と異なり行を集約せず、各行に対して計算結果を返します。
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">ROW_NUMBER()</code>は、
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">OVER</code>句で指定した順序に従って各行に1から始まる連番を付与します。
          同点でも必ず異なる番号が付くのが特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">ROW_NUMBER() OVER (ORDER BY col)</code> — 順序指定で連番</li>
          <li><code className="text-purple-300">ROW_NUMBER() OVER (PARTITION BY grp ORDER BY col)</code> — グループ別連番</li>
          <li>同順位でも必ず1,2,3...と連続する番号が付く</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 全体に連番を付ける</h2>
        <SqlEditor
          defaultCode={`SELECT
  ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num,
  name,
  score
FROM students
ORDER BY rank_num;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO students VALUES (1, '田中太郎', 85);
INSERT INTO students VALUES (2, '鈴木花子', 92);
INSERT INTO students VALUES (3, '佐藤一郎', 78);
INSERT INTO students VALUES (4, '山田二郎', 92);
INSERT INTO students VALUES (5, '伊藤花代', 88);`}
          expectedOutput={`rank_num | name     | score
---------+----------+------
1        | 鈴木花子  | 92
2        | 山田二郎  | 92
3        | 伊藤花代  | 88
4        | 田中太郎  | 85
5        | 佐藤一郎  | 78`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: グループ別に連番を付ける</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  name,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees
ORDER BY department, dept_rank;`}
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
INSERT INTO employees VALUES (6, '渡辺次郎', '開発部', 500000);`}
          expectedOutput={`department | name     | salary | dept_rank
-----------+----------+--------+-----------
営業部      | 佐藤一郎  | 450000 | 1
営業部      | 田中太郎  | 400000 | 2
人事部      | 伊藤花代  | 360000 | 1
開発部      | 鈴木花子  | 520000 | 1
開発部      | 渡辺次郎  | 500000 | 2
開発部      | 山田二郎  | 480000 | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ROW_NUMBERで重複排除（最新1件のみ取得）</h2>
        <SqlEditor
          defaultCode={`-- ユーザーごとに最新の注文1件だけを取得する
SELECT order_id, user_id, product, order_date
FROM (
  SELECT
    id AS order_id,
    user_id,
    product,
    order_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) AS rn
  FROM orders
)
WHERE rn = 1
ORDER BY user_id;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  order_date TEXT NOT NULL
);
INSERT INTO orders VALUES (1, 1, '商品A', '2024-01-10');
INSERT INTO orders VALUES (2, 1, '商品B', '2024-02-15');
INSERT INTO orders VALUES (3, 2, '商品C', '2024-01-20');
INSERT INTO orders VALUES (4, 2, '商品D', '2024-03-01');
INSERT INTO orders VALUES (5, 3, '商品A', '2024-02-28');`}
          expectedOutput={`order_id | user_id | product | order_date
---------+---------+---------+-----------
2        | 1       | 商品B   | 2024-02-15
4        | 2       | 商品D   | 2024-03-01
5        | 3       | 商品A   | 2024-02-28`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="row-number" />
      </div>
      <LessonNav lessons={lessons} currentId="row-number" basePath="/learn/window-functions" />
    </div>
  );
}
