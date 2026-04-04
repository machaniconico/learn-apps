import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function DesignPracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設計演習</h1>
        <p className="text-gray-400">正規化の知識を組み合わせて実践的なDB設計を行う</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規化の総まとめ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          正規化は1NF→2NF→3NFと段階的に適用します。1NFで原子性を確保し、2NFで部分関数従属を排除、
          3NFで推移的関数従属を排除します。実務では3NFまで適用するのが一般的で、
          必要に応じて意図的な非正規化を加えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">1NF</code> — 原子値・繰り返しグループなし・主キーあり</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">2NF</code> — 1NF + 部分関数従属なし</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">3NF</code> — 2NF + 推移的関数従属なし</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 非正規化テーブルを3NFまで変換</h2>
        <SqlEditor
          defaultCode={`-- 正規化済みの受注テーブル構造を確認
SELECT o.id AS order_id, c.name AS customer, p.name AS product, oi.quantity, p.price
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, address TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, order_date TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO customers VALUES (1, '田中太郎', '東京都'), (2, '鈴木花子', '大阪府');
INSERT INTO products VALUES (101, 'ノートPC', 120000), (102, 'マウス', 3000);
INSERT INTO orders VALUES (1, 1, '2024-01-10'), (2, 2, '2024-01-12');
INSERT INTO order_items VALUES (1, 101, 1), (1, 102, 2), (2, 102, 1);`}
          expectedOutput={`order_id | customer | product  | quantity | price
---------+----------+----------+----------+-------
1        | 田中太郎  | ノートPC  | 1        | 120000
1        | 田中太郎  | マウス    | 2        | 3000
2        | 鈴木花子  | マウス    | 1        | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 注文合計を計算するクエリ</h2>
        <SqlEditor
          defaultCode={`SELECT o.id, c.name, SUM(p.price * oi.quantity) AS total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY o.id, c.name;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO products VALUES (101, 'ノートPC', 120000), (102, 'マウス', 3000);
INSERT INTO orders VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 101, 1), (1, 102, 2), (2, 102, 1);`}
          expectedOutput={`id | name     | total
---+----------+-------
1  | 田中太郎  | 126000
2  | 鈴木花子  | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 正規化テーブルへのデータ挿入</h2>
        <SqlEditor
          defaultCode={`-- 新規注文を正規化テーブルに登録する
INSERT INTO orders VALUES (3, 1);
INSERT INTO order_items VALUES (3, 102, 3);
SELECT o.id, c.name, p.name AS product, oi.quantity
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 3;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO products VALUES (101, 'ノートPC', 120000), (102, 'マウス', 3000);
INSERT INTO orders VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 101, 1), (1, 102, 2), (2, 102, 1);`}
          expectedOutput={`id | name     | product | quantity
---+----------+---------+---------
3  | 田中太郎  | マウス   | 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="design-practice" />
      </div>
      <LessonNav lessons={lessons} currentId="design-practice" basePath="/learn/normalization" />
    </div>
  );
}
