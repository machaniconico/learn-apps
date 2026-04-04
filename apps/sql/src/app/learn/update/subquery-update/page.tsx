import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function SubqueryUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブクエリ更新</h1>
        <p className="text-gray-400">サブクエリの結果で更新 — クエリ結果を使って動的に値を設定する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">サブクエリ更新とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SET句やWHERE句にサブクエリを使って更新値や条件を動的に決定できます。
          集計値での更新、別テーブルの値を参照した更新、条件付き更新など
          柔軟な更新処理が可能になります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-yellow-400">SET句のサブクエリ</span> — スカラーサブクエリで更新値を動的に取得</li>
          <li><span className="text-yellow-400">WHERE句のサブクエリ</span> — 更新対象行の絞り込みにサブクエリを使う</li>
          <li><span className="text-yellow-400">相関サブクエリ</span> — 更新行に紐づく値で各行を更新</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JOIN更新との使い分け</h2>
        <p className="text-gray-300 leading-relaxed">
          サブクエリ更新はSQLの標準に近く移植性が高いです。
          JOIN更新はDB方言があります。
          複雑な集計を伴う場合はサブクエリやCTEが読みやすく、
          単純な参照更新ではJOINが直感的です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部署平均給与でボーナスを計算</h2>
        <SqlEditor
          defaultCode={`UPDATE employees
SET bonus = (
  SELECT AVG(salary) * 0.1
  FROM employees AS e2
  WHERE e2.dept = employees.dept
);

SELECT name, salary, bonus FROM employees;`}
          expectedOutput={`name       | salary | bonus
-----------|--------|-------
田中太郎   | 450000 | 40000
鈴木花子   | 350000 | 40000
佐藤次郎   | 420000 | 40500
高橋一郎   | 390000 | 40500`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT, bonus INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 450000, '営業', 0), (2, '鈴木花子', 350000, '営業', 0), (3, '佐藤次郎', 420000, '開発', 0), (4, '高橋一郎', 390000, '開発', 0);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: WHERE句のサブクエリで対象を絞る</h2>
        <SqlEditor
          defaultCode={`-- 注文がある顧客だけステータスを更新
UPDATE customers
SET status = 'active'
WHERE id IN (
  SELECT DISTINCT customer_id FROM orders
);

SELECT * FROM customers;`}
          expectedOutput={`id | name       | status
---|------------|-------
1  | 田中太郎   | active
2  | 鈴木花子   | active
3  | 佐藤次郎   | inactive`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, status TEXT DEFAULT 'inactive');
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎', 'inactive'), (2, '鈴木花子', 'inactive'), (3, '佐藤次郎', 'inactive');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 最新注文日を顧客テーブルに反映</h2>
        <SqlEditor
          defaultCode={`UPDATE customers
SET last_order_date = (
  SELECT MAX(order_date)
  FROM orders
  WHERE orders.customer_id = customers.id
);

SELECT * FROM customers;`}
          expectedOutput={`id | name       | last_order_date
---|------------|----------------
1  | 田中太郎   | 2024-02-01
2  | 鈴木花子   | 2024-01-15
3  | 佐藤次郎   | NULL`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, last_order_date TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, order_date TEXT);
INSERT INTO customers VALUES (1, '田中太郎', NULL), (2, '鈴木花子', NULL), (3, '佐藤次郎', NULL);
INSERT INTO orders VALUES (1, 1, 'ノートPC', '2024-01-01'), (2, 1, 'キーボード', '2024-02-01'), (3, 2, 'マウス', '2024-01-15');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="subquery-update" />
      </div>
      <LessonNav lessons={lessons} currentId="subquery-update" basePath="/learn/update" />
    </div>
  );
}
