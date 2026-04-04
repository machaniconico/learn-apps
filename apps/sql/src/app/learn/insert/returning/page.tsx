import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function ReturningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RETURNING句</h1>
        <p className="text-gray-400">挿入した行を返す — INSERT後に自動生成された値を取得する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RETURNING句とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          RETURNING句はINSERT・UPDATE・DELETE後に変更された行のデータを返します。
          PostgreSQL、SQLite 3.35以降でサポートされています。
          自動採番（AUTOINCREMENT/SERIAL）で生成されたIDを別途SELECTせずに
          一度のクエリで取得できるのが主なメリットです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT ... RETURNING *</code> — 挿入した全カラムを返す</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT ... RETURNING id</code> — 特定カラムだけ返す</li>
          <li><span className="text-orange-400">last_insert_rowid()</span> — SQLiteで最後のINSERTのIDを取得する代替方法</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使用場面</h2>
        <p className="text-gray-300 leading-relaxed">
          挿入後すぐにそのIDを使って別テーブルにもINSERTするような連続操作では
          RETURNING句で取得したIDをサブクエリやCTEで活用できます。
          アプリケーションからの追加クエリを減らせるため効率的です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: INSERT後にIDを取得</h2>
        <SqlEditor
          defaultCode={`INSERT INTO users (name, email)
VALUES ('田中太郎', 'tanaka@example.com')
RETURNING id, name;`}
          expectedOutput={`id | name
---|--------
1  | 田中太郎`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 全カラムを返す</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (name, price, category)
VALUES ('新商品', 9800, 'PC周辺機器')
RETURNING *;`}
          expectedOutput={`id | name   | price | category
---|--------|-------|----------
1  | 新商品 | 9800  | PC周辺機器`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: CTEでRETURNINGの結果を活用</h2>
        <SqlEditor
          defaultCode={`WITH new_order AS (
  INSERT INTO orders (customer_id, product, amount)
  VALUES (1, 'ノートPC', 120000)
  RETURNING id, customer_id
)
INSERT INTO order_logs (order_id, customer_id, action)
SELECT id, customer_id, 'created'
FROM new_order;

SELECT * FROM order_logs;`}
          expectedOutput={`id | order_id | customer_id | action
---|----------|-------------|-------
1  | 1        | 1           | created`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, product TEXT, amount INTEGER);
CREATE TABLE order_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, customer_id INTEGER, action TEXT);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="returning" />
      </div>
      <LessonNav lessons={lessons} currentId="returning" basePath="/learn/insert" />
    </div>
  );
}
