import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function CaseStudyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ケーススタディ</h1>
        <p className="text-gray-400">ECサイトのDB設計を実際に構築して理解を深める</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ECサイトのDB設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ECサイトには「ユーザー」「商品」「カテゴリ」「注文」「注文明細」「レビュー」などのエンティティがあります。
          それぞれのカーディナリティを整理し、適切なテーブル設計を行います。
          ユーザーは複数の注文を持ち（1:N）、注文には複数の商品が含まれ（M:N）、商品は複数のカテゴリに属せます（M:N）。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">users</code> — ユーザー情報</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">products + categories</code> — 商品とカテゴリ（M:N）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">orders + order_items</code> — 注文と注文明細</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ECサイト全体のスキーマを確認</h2>
        <SqlEditor
          defaultCode={`-- ユーザーごとの注文数と合計金額
SELECT u.name, COUNT(DISTINCT o.id) AS orders, SUM(p.price * oi.quantity) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
GROUP BY u.id, u.name;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE product_categories (product_id INTEGER, category_id INTEGER, PRIMARY KEY (product_id, category_id));
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, order_date TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO users VALUES (1,'田中太郎','tanaka@example.com'),(2,'鈴木花子','suzuki@example.com'),(3,'佐藤次郎','sato@example.com');
INSERT INTO categories VALUES (1,'PC'),(2,'周辺機器');
INSERT INTO products VALUES (101,'ノートPC',120000),(102,'マウス',3000),(103,'キーボード',8000);
INSERT INTO product_categories VALUES (101,1),(102,2),(103,2);
INSERT INTO orders VALUES (1,1,'2024-01-10'),(2,1,'2024-02-05'),(3,2,'2024-01-20');
INSERT INTO order_items VALUES (1,101,1),(1,102,1),(2,103,1),(3,102,2);`}
          expectedOutput={`name     | orders | total_spent
---------+--------+------------
田中太郎  | 2      | 131000
鈴木花子  | 1      | 6000
佐藤次郎  | 0      | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カテゴリ別の売上集計</h2>
        <SqlEditor
          defaultCode={`SELECT cat.name AS category, SUM(p.price * oi.quantity) AS revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN product_categories pc ON p.id = pc.product_id
JOIN categories cat ON pc.category_id = cat.id
GROUP BY cat.id, cat.name
ORDER BY revenue DESC;`}
          setupSql={`CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE product_categories (product_id INTEGER, category_id INTEGER, PRIMARY KEY (product_id, category_id));
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO categories VALUES (1,'PC'),(2,'周辺機器');
INSERT INTO products VALUES (101,'ノートPC',120000),(102,'マウス',3000),(103,'キーボード',8000);
INSERT INTO product_categories VALUES (101,1),(102,2),(103,2);
INSERT INTO orders VALUES (1,1),(2,1),(3,2);
INSERT INTO order_items VALUES (1,101,1),(1,102,1),(2,103,1),(3,102,2);`}
          expectedOutput={`category | revenue
---------+--------
PC       | 120000
周辺機器  | 17000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 人気商品ランキング</h2>
        <SqlEditor
          defaultCode={`SELECT p.name, SUM(oi.quantity) AS total_sold,
       RANK() OVER (ORDER BY SUM(oi.quantity) DESC) AS rank
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO products VALUES (101,'ノートPC',120000),(102,'マウス',3000),(103,'キーボード',8000);
INSERT INTO order_items VALUES (1,101,1),(1,102,1),(2,103,1),(3,102,2),(4,102,3),(5,103,2);`}
          expectedOutput={`name      | total_sold | rank
----------+------------+-----
マウス     | 6          | 1
キーボード  | 3          | 2
ノートPC   | 1          | 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="case-study" />
      </div>
      <LessonNav lessons={lessons} currentId="case-study" basePath="/learn/er-diagram" />
    </div>
  );
}
