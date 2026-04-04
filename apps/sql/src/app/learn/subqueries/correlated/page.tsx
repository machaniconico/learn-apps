import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function CorrelatedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">相関サブクエリ</h1>
        <p className="text-gray-400">外部クエリの値を参照するサブクエリ — 行ごとに実行される</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">相関サブクエリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          相関サブクエリは外部クエリの現在行の値を参照するサブクエリです。
          外部クエリの各行ごとにサブクエリが実行されます。
          「同じ部署内での給与の最大値」「同じ顧客の平均注文金額」など、
          グループ内での比較に非常に便利です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">外部参照</span> — サブクエリ内で外部テーブルのカラムを参照する</li>
          <li><span className="text-violet-400">行ごと実行</span> — 外部クエリの各行に対してサブクエリが走る</li>
          <li><span className="text-violet-400">パフォーマンス</span> — 大量データでは遅くなることがある</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非相関サブクエリとの違い</h2>
        <p className="text-gray-300 leading-relaxed">
          非相関サブクエリは独立して一度だけ実行されます。
          相関サブクエリは外部クエリの各行について実行されるため、
          大きなテーブルでは注意が必要です。
          可能であればJOINや集約関数で書き換えることを検討してください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部署内の平均より高い給与の社員</h2>
        <SqlEditor
          defaultCode={`SELECT name, dept, salary
FROM employees AS e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE dept = e.dept
);`}
          expectedOutput={`name       | dept | salary
-----------|------|--------
田中太郎   | 営業 | 450000
高橋一郎   | 開発 | 420000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES
  (1, '田中太郎', 450000, '営業'),
  (2, '鈴木花子', 350000, '営業'),
  (3, '佐藤次郎', 380000, '開発'),
  (4, '高橋一郎', 420000, '開発');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 最新の注文だけを取得</h2>
        <SqlEditor
          defaultCode={`SELECT customer_id, product, order_date
FROM orders AS o
WHERE order_date = (
  SELECT MAX(order_date)
  FROM orders
  WHERE customer_id = o.customer_id
);`}
          expectedOutput={`customer_id | product    | order_date
------------|------------|----------
1           | キーボード | 2024-02-01
2           | マウス     | 2024-01-15`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, order_date TEXT);
INSERT INTO orders VALUES
  (1, 1, 'ノートPC', '2024-01-01'),
  (2, 1, 'キーボード', '2024-02-01'),
  (3, 2, 'マウス', '2024-01-15');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 自分の部署人数を各行に表示</h2>
        <SqlEditor
          defaultCode={`SELECT name, dept,
  (SELECT COUNT(*) FROM employees WHERE dept = e.dept) AS dept_count
FROM employees AS e;`}
          expectedOutput={`name       | dept | dept_count
-----------|------|----------
田中太郎   | 営業 | 2
鈴木花子   | 営業 | 2
佐藤次郎   | 開発 | 2
高橋一郎   | 開発 | 2`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES
  (1, '田中太郎', 450000, '営業'),
  (2, '鈴木花子', 350000, '営業'),
  (3, '佐藤次郎', 380000, '開発'),
  (4, '高橋一郎', 420000, '開発');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="correlated" />
      </div>
      <LessonNav lessons={lessons} currentId="correlated" basePath="/learn/subqueries" />
    </div>
  );
}
