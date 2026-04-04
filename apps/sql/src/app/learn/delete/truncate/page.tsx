import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "delete")!.lessons;

export default function TruncatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">データ削除 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TRUNCATE</h1>
        <p className="text-gray-400">テーブルの全行を高速削除 — DELETE FROM より高速な全件削除</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TRUNCATEとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TRUNCATEはテーブルの全行を高速に削除するDDL文です。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE FROM テーブル</code>（WHERE句なし）と同じ結果ですが、
          多くのDBでは行単位のログを残さないため大幅に高速です。
          自動採番（SERIAL/AUTOINCREMENT）もリセットされます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">TRUNCATE TABLE テーブル名</code> — 全行を高速削除</li>
          <li><span className="text-red-400">ロールバック不可</span> — 多くのDBでトランザクション外は戻せない</li>
          <li><span className="text-red-400">SQLite</span> — TRUNCATEはなく、DELETE FROM で代替する</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DELETE vs TRUNCATE</h2>
        <p className="text-gray-300 leading-relaxed">
          DELETE はWHERE条件が使え、トリガーが発火し、ROLLBACKが可能です。
          TRUNCATE は条件指定不可で、トリガーが発火しないDBもあり、非常に高速です。
          テストデータのリセット、一時テーブルのクリアなど全件削除が確定しているときにTRUNCATEを使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: TRUNCATEで全行削除（PostgreSQL構文）</h2>
        <SqlEditor
          defaultCode={`-- PostgreSQL / MySQL での構文
TRUNCATE TABLE temp_data;

-- 削除後の確認
SELECT COUNT(*) AS row_count FROM temp_data;`}
          expectedOutput={`row_count
---------
0`}
          setupSql={`CREATE TABLE temp_data (id INTEGER PRIMARY KEY, value TEXT);
INSERT INTO temp_data VALUES (1, 'データ1'), (2, 'データ2'), (3, 'データ3');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: SQLiteでの全件DELETE（TRUNCATE代替）</h2>
        <SqlEditor
          defaultCode={`-- SQLiteではDELETE FROM で全件削除
DELETE FROM temp_data;

SELECT COUNT(*) AS row_count FROM temp_data;`}
          expectedOutput={`row_count
---------
0`}
          setupSql={`CREATE TABLE temp_data (id INTEGER PRIMARY KEY, value TEXT);
INSERT INTO temp_data VALUES (1, 'データ1'), (2, 'データ2'), (3, 'データ3');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数テーブルの一括TRUNCATE</h2>
        <SqlEditor
          defaultCode={`-- テスト環境のデータをリセットするパターン
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM customers;

SELECT
  (SELECT COUNT(*) FROM customers) AS customers,
  (SELECT COUNT(*) FROM orders) AS orders,
  (SELECT COUNT(*) FROM order_items) AS order_items;`}
          expectedOutput={`customers | orders | order_items
----------|--------|------------
0         | 0      | 0`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER);
CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中'), (2, '鈴木');
INSERT INTO orders VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delete" lessonId="truncate" />
      </div>
      <LessonNav lessons={lessons} currentId="truncate" basePath="/learn/delete" />
    </div>
  );
}
