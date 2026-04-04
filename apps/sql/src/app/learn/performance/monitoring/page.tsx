import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function MonitoringPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モニタリング</h1>
        <p className="text-gray-400">スロークエリを検出してデータベースの健全性を維持する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DBモニタリングの重要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データベースのモニタリングとは、クエリの実行時間・テーブルサイズ・インデックス使用率などを継続的に観察することです。
          スロークエリ（実行に時間がかかるクエリ）を早期に発見し、チューニングすることでシステム全体のパフォーマンスを維持できます。
          SQLレベルでは統計情報の確認や実行計画の定期チェックがモニタリングの基本です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">スロークエリログ</code> — 一定時間以上かかるクエリを記録</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">テーブル統計</code> — 行数・データ量の把握</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ANALYZE</code> — 統計情報を更新してオプティマイザを助ける</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: テーブルごとの行数を集計</h2>
        <SqlEditor
          defaultCode={`-- データ量の把握: 各テーブルの行数を確認
SELECT 'users' AS tbl, COUNT(*) AS rows FROM users
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL SELECT 'products', COUNT(*) FROM products;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, order_date TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO users VALUES (1,'田中'),(2,'鈴木'),(3,'佐藤');
INSERT INTO products VALUES (101,'ノートPC',120000),(102,'マウス',3000);
INSERT INTO orders VALUES (1,1,'2024-01-01'),(2,2,'2024-01-02'),(3,1,'2024-01-03');
INSERT INTO order_items VALUES (1,101,1),(1,102,2),(2,102,1),(3,101,1),(3,102,1);`}
          expectedOutput={`tbl         | rows
------------+------
users       | 3
orders      | 3
order_items | 5
products    | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: インデックスの有効活用を確認</h2>
        <SqlEditor
          defaultCode={`-- インデックスが存在するカラムへの検索
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE user_id = 1;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-01'),(2,2,3000,'2024-01-02'),(3,1,8000,'2024-01-03');`}
          expectedOutput={`id | parent | notused | detail
---+--------+---------+--------------------------------------------------
2  | 0      | 0       | SEARCH orders USING INDEX idx_orders_user (user_id=?)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 負荷の高いクエリパターンを特定</h2>
        <SqlEditor
          defaultCode={`-- 注文件数が多い顧客（負荷の高い顧客データを特定）
SELECT u.name, COUNT(o.id) AS order_count,
       SUM(oi.quantity) AS total_items
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY u.id, u.name
ORDER BY order_count DESC;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, order_date TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO users VALUES (1,'田中'),(2,'鈴木'),(3,'佐藤');
INSERT INTO orders VALUES (1,1,'2024-01-01'),(2,1,'2024-01-02'),(3,2,'2024-01-03'),(4,3,'2024-01-04'),(5,1,'2024-01-05');
INSERT INTO order_items VALUES (1,101,2),(2,102,1),(3,101,3),(4,103,1),(5,101,2);`}
          expectedOutput={`name | order_count | total_items
-----+-------------+------------
田中  | 3           | 5
鈴木  | 1           | 3
佐藤  | 1           | 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="monitoring" />
      </div>
      <LessonNav lessons={lessons} currentId="monitoring" basePath="/learn/performance" />
    </div>
  );
}
