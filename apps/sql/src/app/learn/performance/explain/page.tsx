import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function ExplainPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">EXPLAIN</h1>
        <p className="text-gray-400">クエリの実行計画を読んでボトルネックを特定する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">EXPLAINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          EXPLAINはSQLクエリを実際に実行せずに、データベースエンジンがどのような実行計画で処理するかを表示するコマンドです。
          実行計画にはテーブルスキャンの方法（フルスキャンかインデックス利用か）、結合順序、推定行数などが含まれます。
          パフォーマンスチューニングの出発点として必須のツールです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">EXPLAIN</code> — 実行計画を表示（SQLiteではQUERY PLANを確認）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">SCAN</code> — テーブル全体を読む（フルスキャン）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">SEARCH ... USING INDEX</code> — インデックスを利用した検索</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実行計画の読み方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteのEXPLAIN QUERY PLANでは、各ステップのアクション（SCAN/SEARCH）とインデックス使用状況が表示されます。
          「SCAN」が表示されたらフルテーブルスキャンで、大きなテーブルではパフォーマンスに影響します。
          「SEARCH ... USING INDEX」が表示されればインデックスが効いており効率的です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: フルスキャンの実行計画を確認</h2>
        <SqlEditor
          defaultCode={`EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 1;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-01'),(2,2,3000,'2024-01-02'),(3,1,8000,'2024-01-03');`}
          expectedOutput={`id | parent | notused | detail
---+--------+---------+---------------------------
2  | 0      | 0       | SCAN orders`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: インデックスを作成して実行計画を改善</h2>
        <SqlEditor
          defaultCode={`CREATE INDEX idx_orders_customer ON orders(customer_id);
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 1;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-01'),(2,2,3000,'2024-01-02'),(3,1,8000,'2024-01-03');`}
          expectedOutput={`id | parent | notused | detail
---+--------+---------+--------------------------------------------------
2  | 0      | 0       | SEARCH orders USING INDEX idx_orders_customer (customer_id=?)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: JOINの実行計画を確認</h2>
        <SqlEditor
          defaultCode={`EXPLAIN QUERY PLAN
SELECT c.name, o.total
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.total > 4000;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子');
INSERT INTO orders VALUES (1,1,5000),(2,2,3000),(3,1,8000);`}
          expectedOutput={`id | parent | notused | detail
---+--------+---------+---------------------------
3  | 0      | 0       | SCAN orders
5  | 0      | 0       | SEARCH customers USING INTEGER PRIMARY KEY (rowid=?)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="explain" />
      </div>
      <LessonNav lessons={lessons} currentId="explain" basePath="/learn/performance" />
    </div>
  );
}
