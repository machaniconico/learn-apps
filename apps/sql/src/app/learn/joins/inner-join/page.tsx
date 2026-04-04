import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function InnerJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">INNER JOIN</h1>
        <p className="text-gray-400">内部結合の基本 — 両テーブルに一致する行だけを取得する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INNER JOINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INNER JOINは2つのテーブルを結合し、ON句の条件を満たす行だけを返します。
          どちらか一方にしか存在しない行は結果から除外されます。
          最も基本的な結合方法で、関連データを一度に取得するときに広く使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">INNER JOIN</code> — 両テーブルで一致する行のみ返す</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">ON</code> — 結合条件を指定する句</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">JOIN</code> — INNER JOIN の省略形</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INNER JOINは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">FROM テーブルA INNER JOIN テーブルB ON 条件</code> の形で書きます。
          ON句には結合に使うカラムの等値条件を書くのが一般的です。
          テーブル名が長い場合はエイリアスを使って短くできます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 顧客と注文を結合する</h2>
        <SqlEditor
          defaultCode={`SELECT customers.name, orders.product, orders.amount
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
鈴木花子   | マウス     | 3000
田中太郎   | キーボード | 8000`}
          setupSql={`CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product TEXT,
  amount INTEGER
);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: エイリアスを使って短く書く</h2>
        <SqlEditor
          defaultCode={`SELECT c.name, o.product, o.amount
FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id
WHERE o.amount > 5000;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
田中太郎   | キーボード | 8000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 一致しない行は除外される</h2>
        <SqlEditor
          defaultCode={`-- 佐藤次郎 (id=3) は注文がないため結果に出ない
SELECT c.name, o.product
FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product
-----------|-----------
田中太郎   | ノートPC
鈴木花子   | マウス
田中太郎   | キーボード`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="inner-join" />
      </div>
      <LessonNav lessons={lessons} currentId="inner-join" basePath="/learn/joins" />
    </div>
  );
}
