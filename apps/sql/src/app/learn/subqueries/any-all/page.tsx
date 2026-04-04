import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function AnyAllPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ANY・ALL</h1>
        <p className="text-gray-400">比較演算子とサブクエリの組み合わせ — 部分一致・全一致の判定</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ANY・ALLとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ANY・ALLは比較演算子（=・&gt;・&lt;など）とサブクエリを組み合わせて使う演算子です。
          ANYはサブクエリの結果のうち1つでも条件を満たせばTRUE、
          ALLはサブクエリの結果すべてが条件を満たす場合にTRUEになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">= ANY</span> — IN と等価（どれか1つに一致）</li>
          <li><span className="text-violet-400">&gt; ANY</span> — サブクエリの最小値より大きい</li>
          <li><span className="text-violet-400">&gt; ALL</span> — サブクエリの最大値より大きい</li>
          <li><span className="text-violet-400">&lt; ALL</span> — サブクエリの最小値より小さい</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MIN/MAXとの関係</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt; ALL (SELECT ...)</code> は
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt; (SELECT MAX(...))</code> と等価です。
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt; ANY (SELECT ...)</code> は
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt; (SELECT MIN(...))</code> と等価です。
          MAX/MINの方が直感的なため実務ではそちらが多く使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ANY — 開発部の誰かより給与が高い</h2>
        <SqlEditor
          defaultCode={`SELECT name, dept, salary
FROM employees
WHERE salary > ANY (
  SELECT salary FROM employees WHERE dept = '開発'
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
        <h2 className="text-lg font-bold text-white mb-3">例2: ALL — 開発部の全員より給与が高い</h2>
        <SqlEditor
          defaultCode={`SELECT name, dept, salary
FROM employees
WHERE salary > ALL (
  SELECT salary FROM employees WHERE dept = '開発'
);`}
          expectedOutput={`name       | dept | salary
-----------|------|--------
田中太郎   | 営業 | 450000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES
  (1, '田中太郎', 450000, '営業'),
  (2, '鈴木花子', 350000, '営業'),
  (3, '佐藤次郎', 380000, '開発'),
  (4, '高橋一郎', 420000, '開発');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: = ANY は IN と同等</h2>
        <SqlEditor
          defaultCode={`-- = ANY は IN と等価
SELECT name
FROM customers
WHERE id = ANY (SELECT customer_id FROM orders);`}
          expectedOutput={`name
--------
田中太郎
鈴木花子`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="any-all" />
      </div>
      <LessonNav lessons={lessons} currentId="any-all" basePath="/learn/subqueries" />
    </div>
  );
}
