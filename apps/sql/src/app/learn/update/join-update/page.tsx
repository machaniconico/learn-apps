import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function JoinUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JOIN更新</h1>
        <p className="text-gray-400">他テーブルを参照して更新 — 結合した値を使ってUPDATEする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JOIN更新とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          UPDATE文に別テーブルをJOINして、そのテーブルの値を参照しながら更新できます。
          MySQLでは <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE A JOIN B ON ... SET</code> の構文を使います。
          PostgreSQLとSQLiteでは <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE A SET ... FROM B WHERE ...</code> です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE t SET ... FROM other WHERE t.id = other.id</code> — SQLite/PostgreSQL</li>
          <li><span className="text-yellow-400">参照更新</span> — 他テーブルの最新値で一括更新</li>
          <li><span className="text-yellow-400">バッチ同期</span> — マスタテーブルからデータを同期</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteでのFROM句</h2>
        <p className="text-gray-300 leading-relaxed">
          SQLiteは <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE ... FROM</code> 構文をサポートしています。
          WHERE句でテーブル間の結合条件を指定し、SET句で参照テーブルのカラムを使います。
          サブクエリでも同じことが実現できますが、FROMの方が読みやすいケースがあります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: マスタテーブルから価格を同期</h2>
        <SqlEditor
          defaultCode={`UPDATE products
SET price = price_master.new_price
FROM price_master
WHERE products.id = price_master.product_id;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 135000 | PC周辺機器
2  | マウス     | 3500   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
CREATE TABLE price_master (product_id INTEGER PRIMARY KEY, new_price INTEGER);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');
INSERT INTO price_master VALUES (1, 135000), (2, 3500);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 注文合計を顧客テーブルに反映</h2>
        <SqlEditor
          defaultCode={`UPDATE customers
SET total_spent = order_totals.total
FROM (
  SELECT customer_id, SUM(amount) AS total
  FROM orders
  GROUP BY customer_id
) AS order_totals
WHERE customers.id = order_totals.customer_id;

SELECT * FROM customers;`}
          expectedOutput={`id | name       | total_spent
---|------------|------------
1  | 田中太郎   | 128000
2  | 鈴木花子   | 3000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, total_spent INTEGER DEFAULT 0);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎', 0), (2, '鈴木花子', 0);
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カテゴリ名を別テーブルから同期</h2>
        <SqlEditor
          defaultCode={`UPDATE products
SET category = categories.name
FROM categories
WHERE products.category_id = categories.id;

SELECT name, category FROM products;`}
          expectedOutput={`name       | category
-----------|----------
ノートPC   | PC周辺機器
マウス     | 入力デバイス
キーボード | 入力デバイス`}
          setupSql={`CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category_id INTEGER, category TEXT);
INSERT INTO categories VALUES (1, 'PC周辺機器'), (2, '入力デバイス');
INSERT INTO products VALUES (1, 'ノートPC', 120000, 1, NULL), (2, 'マウス', 3000, 2, NULL), (3, 'キーボード', 8000, 2, NULL);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="join-update" />
      </div>
      <LessonNav lessons={lessons} currentId="join-update" basePath="/learn/update" />
    </div>
  );
}
