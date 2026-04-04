import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function InSubqueryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">INサブクエリ</h1>
        <p className="text-gray-400">WHERE IN (SELECT ...) — サブクエリの結果リストで絞り込む</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INサブクエリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INサブクエリはWHERE句でIN演算子にサブクエリを組み合わせる手法です。
          サブクエリが返す値のリストに一致する行だけを取得します。
          NOT INを使えば一致しない行を取得できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">WHERE id IN (SELECT ...)</span> — リスト内に含まれる行</li>
          <li><span className="text-violet-400">WHERE id NOT IN (SELECT ...)</span> — リスト外の行</li>
          <li><span className="text-violet-400">NULL注意</span> — NOT INではNULLが含まれると意図しない結果になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOT INのNULL問題</h2>
        <p className="text-gray-300 leading-relaxed">
          サブクエリの結果にNULLが含まれる場合、NOT INは常にFALSEを返し行が取得できません。
          この問題を避けるには <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT EXISTS</code> を使うか、
          サブクエリにWHEREでNULL除外条件を加えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 注文した顧客の情報を取得</h2>
        <SqlEditor
          defaultCode={`SELECT name
FROM customers
WHERE id IN (SELECT customer_id FROM orders);`}
          expectedOutput={`name
--------
田中太郎
鈴木花子`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス'), (3, 1, 'キーボード');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 注文していない顧客を取得（NOT IN）</h2>
        <SqlEditor
          defaultCode={`SELECT name
FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);`}
          expectedOutput={`name
--------
佐藤次郎`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス'), (3, 1, 'キーボード');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数カラムのINサブクエリ</h2>
        <SqlEditor
          defaultCode={`-- 特定カテゴリの商品を注文した顧客
SELECT DISTINCT c.name
FROM customers AS c
WHERE c.id IN (
  SELECT o.customer_id
  FROM orders AS o
  JOIN products AS p ON o.product_id = p.id
  WHERE p.category = 'PC周辺機器'
);`}
          expectedOutput={`name
--------
田中太郎
鈴木花子`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO products VALUES (1, 'ノートPC', 'PC周辺機器'), (2, 'マウス', 'PC周辺機器'), (3, '本', '書籍');
INSERT INTO orders VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="in-subquery" />
      </div>
      <LessonNav lessons={lessons} currentId="in-subquery" basePath="/learn/subqueries" />
    </div>
  );
}
