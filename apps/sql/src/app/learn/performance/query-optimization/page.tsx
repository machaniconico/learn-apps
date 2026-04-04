import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function QueryOptimizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クエリ最適化</h1>
        <p className="text-gray-400">効率的なクエリを書くための実践的なテクニック</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クエリ最適化の基本原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クエリ最適化とは、同じ結果を返すクエリを、より少ないリソースで実行できる形に書き直すことです。
          基本原則は「早めに絞る」「不要なデータを取得しない」「インデックスを活用できる書き方にする」の3つです。
          カラムに関数を適用するとインデックスが効かなくなるため注意が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT *を避ける</code> — 必要なカラムだけ指定する</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE条件を早く</code> — JOINの前にフィルタリングを検討</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">カラムに関数を使わない</code> — WHERE UPPER(name)はインデックス無効化</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SELECT * vs 必要なカラムのみ</h2>
        <SqlEditor
          defaultCode={`-- 良い例: 必要なカラムだけ取得
SELECT id, name, email FROM users WHERE active = 1;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY, name TEXT, email TEXT, password_hash TEXT,
  bio TEXT, avatar_url TEXT, active INTEGER, created_at TEXT
);
INSERT INTO users VALUES (1,'田中太郎','tanaka@example.com','hash1','自己紹介','url1',1,'2024-01-01');
INSERT INTO users VALUES (2,'鈴木花子','suzuki@example.com','hash2','プロフィール','url2',0,'2024-01-05');
INSERT INTO users VALUES (3,'佐藤次郎','sato@example.com','hash3','説明','url3',1,'2024-01-10');`}
          expectedOutput={`id | name     | email
---+----------+--------------------
1  | 田中太郎  | tanaka@example.com
3  | 佐藤次郎  | sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カラムへの関数適用を避ける</h2>
        <SqlEditor
          defaultCode={`-- 悪い例 (インデックスが効かない): WHERE SUBSTR(order_date,1,4) = '2024'
-- 良い例 (インデックスが効く): 範囲指定
SELECT id, order_date, total
FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, order_date TEXT, total INTEGER);
CREATE INDEX idx_orders_date ON orders(order_date);
INSERT INTO orders VALUES (1,1,'2023-12-01',5000),(2,1,'2024-01-15',8000),(3,2,'2024-06-20',12000),(4,2,'2025-01-05',3000);`}
          expectedOutput={`id | order_date | total
---+------------+-------
2  | 2024-01-15 | 8000
3  | 2024-06-20 | 12000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: EXISTS vs IN のパフォーマンス</h2>
        <SqlEditor
          defaultCode={`-- EXISTSは条件を満たす最初の行を見つけたら停止するため高速
SELECT id, name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.total > 10000
);`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,15000),(3,2,3000),(4,3,20000);`}
          expectedOutput={`id | name
---+------
1  | 田中太郎
3  | 佐藤次郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="query-optimization" />
      </div>
      <LessonNav lessons={lessons} currentId="query-optimization" basePath="/learn/performance" />
    </div>
  );
}
