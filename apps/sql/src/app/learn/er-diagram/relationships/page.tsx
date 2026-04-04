import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function RelationshipsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リレーションシップ</h1>
        <p className="text-gray-400">エンティティ間の関連を外部キーで表現する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リレーションシップとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リレーションシップとは、エンティティ間の関連のことです。
          「顧客が注文を持つ」「注文に商品が含まれる」などの関連がリレーションシップです。
          SQLでは外部キー（FOREIGN KEY）を使ってリレーションシップを表現し、参照整合性を保証します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">FOREIGN KEY</code> — 他テーブルの主キーを参照するカラム</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">参照整合性</code> — 存在しない親レコードを参照できない制約</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">ON DELETE CASCADE</code> — 親削除時に子も自動削除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 外部キーでリレーションシップを定義</h2>
        <SqlEditor
          defaultCode={`-- 注文と顧客のリレーションシップを確認
SELECT o.id AS order_id, c.name AS customer_name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子');
INSERT INTO orders VALUES (1,1,'2024-01-10'),(2,1,'2024-01-15'),(3,2,'2024-01-20');`}
          expectedOutput={`order_id | customer_name | order_date
---------+---------------+------------
1        | 田中太郎       | 2024-01-10
2        | 田中太郎       | 2024-01-15
3        | 鈴木花子       | 2024-01-20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 中間テーブルで多対多リレーションを表現</h2>
        <SqlEditor
          defaultCode={`-- 注文と商品の多対多リレーションシップ
SELECT o.id AS order_id, p.name AS product, oi.quantity
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER);
CREATE TABLE order_items (
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO products VALUES (1,'ノートPC',120000),(2,'マウス',3000),(3,'キーボード',8000);
INSERT INTO orders VALUES (1,1),(2,2);
INSERT INTO order_items VALUES (1,1,1),(1,2,2),(2,2,1),(2,3,1);`}
          expectedOutput={`order_id | product   | quantity
---------+-----------+---------
1        | ノートPC   | 1
1        | マウス     | 2
2        | マウス     | 1
2        | キーボード  | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 親子関係の連鎖削除</h2>
        <SqlEditor
          defaultCode={`-- 顧客を削除すると関連する注文も削除される（CASCADE）
DELETE FROM customers WHERE id = 1;
SELECT * FROM orders;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子');
INSERT INTO orders VALUES (1,1,'2024-01-10'),(2,1,'2024-01-15'),(3,2,'2024-01-20');`}
          expectedOutput={`id | customer_id | order_date
---+-------------+------------
3  | 2           | 2024-01-20`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="relationships" />
      </div>
      <LessonNav lessons={lessons} currentId="relationships" basePath="/learn/er-diagram" />
    </div>
  );
}
