import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "delete")!.lessons;

export default function JoinDeletePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">データ削除 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JOIN削除</h1>
        <p className="text-gray-400">他テーブルを参照して削除 — 関連テーブルの条件で削除対象を決める</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JOIN削除とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          別テーブルの条件に基づいて削除対象を決定する手法です。
          SQLiteでは <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE WHERE id IN (SELECT ...)</code> や
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE WHERE EXISTS (SELECT ...)</code> を使います。
          MySQLでは <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE A FROM A JOIN B ON ...</code> 構文が使えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-red-400">IN サブクエリ</span> — DELETE WHERE id IN (SELECT id FROM ...)</li>
          <li><span className="text-red-400">EXISTS</span> — DELETE WHERE EXISTS (SELECT 1 FROM ... WHERE ...)</li>
          <li><span className="text-red-400">カスケード</span> — 外部キーのON DELETE CASCADEでも関連行を削除できる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">参照整合性に注意</h2>
        <p className="text-gray-300 leading-relaxed">
          外部キー制約が設定されている場合、親レコードを削除する前に
          子レコードを削除する必要があります。
          削除順序を正しく管理するか、ON DELETE CASCADEを活用しましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 退会済み顧客の注文を削除</h2>
        <SqlEditor
          defaultCode={`DELETE FROM orders
WHERE customer_id IN (
  SELECT id FROM customers WHERE status = 'withdrawn'
);

SELECT * FROM orders;`}
          expectedOutput={`id | customer_id | product    | amount
---|-------------|------------|-------
1  | 1           | ノートPC   | 120000
3  | 1           | キーボード | 8000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, status TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎', 'active'), (2, '鈴木花子', 'withdrawn');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: EXISTSを使った削除</h2>
        <SqlEditor
          defaultCode={`-- レビューが存在する注文の古いログを削除
DELETE FROM order_logs
WHERE EXISTS (
  SELECT 1 FROM reviews
  WHERE reviews.order_id = order_logs.order_id
);

SELECT * FROM order_logs;`}
          expectedOutput={`id | order_id | action
---|----------|--------
2  | 2        | shipped`}
          setupSql={`CREATE TABLE order_logs (id INTEGER PRIMARY KEY, order_id INTEGER, action TEXT);
CREATE TABLE reviews (id INTEGER PRIMARY KEY, order_id INTEGER, comment TEXT);
INSERT INTO order_logs VALUES (1, 1, 'created'), (2, 2, 'shipped');
INSERT INTO reviews VALUES (1, 1, '良かった');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 重複行を削除（最小IDを残す）</h2>
        <SqlEditor
          defaultCode={`-- 同じメールアドレスの重複行で、IDが大きい方を削除
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id)
  FROM users
  GROUP BY email
);

SELECT * FROM users ORDER BY id;`}
          expectedOutput={`id | name       | email
---|------------|------------------
1  | 田中太郎   | tanaka@example.com
3  | 佐藤次郎   | sato@example.com`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com'), (2, '田中太郎2', 'tanaka@example.com'), (3, '佐藤次郎', 'sato@example.com');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delete" lessonId="join-delete" />
      </div>
      <LessonNav lessons={lessons} currentId="join-delete" basePath="/learn/delete" />
    </div>
  );
}
