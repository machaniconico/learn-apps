import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function MultipleJoinsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数テーブル結合</h1>
        <p className="text-gray-400">3つ以上のテーブルを連続してJOINする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数テーブル結合とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実務では3つ以上のテーブルを連続してJOINすることが多くあります。
          JOINは左から順番に評価され、前の結合結果に次のテーブルを結合していきます。
          各JOINには独自のON句が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">連鎖結合</span> — JOIN ... ON を繰り返す</li>
          <li><span className="text-purple-400">エイリアス</span> — テーブルが増えるほど重要になる</li>
          <li><span className="text-purple-400">可読性</span> — 1つのJOINを1行にまとめると読みやすい</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">結合の順序</h2>
        <p className="text-gray-300 leading-relaxed">
          SQLオプティマイザが実行順序を最適化しますが、書く順序はロジックに沿って
          「主テーブル → 関連テーブル → さらに関連するテーブル」と整理すると読みやすくなります。
          どのJOINも混在できます（INNER、LEFT、RIGHT）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 注文・顧客・商品を3テーブル結合</h2>
        <SqlEditor
          defaultCode={`SELECT c.name AS customer, p.name AS product, o.quantity
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id
INNER JOIN products AS p ON o.product_id = p.id;`}
          expectedOutput={`customer   | product    | quantity
-----------|------------|--------
田中太郎   | ノートPC   | 1
鈴木花子   | マウス     | 2
田中太郎   | キーボード | 1`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO products VALUES (1, 'ノートPC', 120000), (2, 'マウス', 3000), (3, 'キーボード', 8000);
INSERT INTO orders VALUES (1, 1, 1, 1), (2, 2, 2, 2), (3, 1, 3, 1);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 4テーブル結合（カテゴリも含める）</h2>
        <SqlEditor
          defaultCode={`SELECT c.name AS customer, cat.name AS category,
       p.name AS product, o.quantity
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id
INNER JOIN products AS p ON o.product_id = p.id
INNER JOIN categories AS cat ON p.category_id = cat.id;`}
          expectedOutput={`customer   | category | product    | quantity
-----------|----------|------------|--------
田中太郎   | PC周辺機器 | ノートPC  | 1
鈴木花子   | PC周辺機器 | マウス    | 2
田中太郎   | PC周辺機器 | キーボード | 1`}
          setupSql={`CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category_id INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO categories VALUES (1, 'PC周辺機器');
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO products VALUES (1, 'ノートPC', 120000, 1), (2, 'マウス', 3000, 1), (3, 'キーボード', 8000, 1);
INSERT INTO orders VALUES (1, 1, 1, 1), (2, 2, 2, 2), (3, 1, 3, 1);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: INNER JOINとLEFT JOINの混在</h2>
        <SqlEditor
          defaultCode={`SELECT c.name AS customer, p.name AS product,
       r.comment AS review
FROM orders AS o
INNER JOIN customers AS c ON o.customer_id = c.id
INNER JOIN products AS p ON o.product_id = p.id
LEFT JOIN reviews AS r ON r.order_id = o.id;`}
          expectedOutput={`customer   | product    | review
-----------|------------|--------
田中太郎   | ノートPC   | とても良い
鈴木花子   | マウス     | NULL
田中太郎   | キーボード | NULL`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER);
CREATE TABLE reviews (id INTEGER PRIMARY KEY, order_id INTEGER, comment TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO products VALUES (1, 'ノートPC', 120000), (2, 'マウス', 3000), (3, 'キーボード', 8000);
INSERT INTO orders VALUES (1, 1, 1, 1), (2, 2, 2, 2), (3, 1, 3, 1);
INSERT INTO reviews VALUES (1, 1, 'とても良い');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="multiple-joins" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-joins" basePath="/learn/joins" />
    </div>
  );
}
