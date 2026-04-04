import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function FullJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">FULL OUTER JOIN</h1>
        <p className="text-gray-400">完全外部結合 — 両テーブルの全行を保持して結合する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FULL OUTER JOINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          FULL OUTER JOINは左テーブルと右テーブルの両方の全行を結果に含めます。
          一方のテーブルに一致する行がない場合はNULLで埋められます。
          2つのテーブルを完全に照合したい場合（データ差分の確認など）に使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">FULL OUTER JOIN</span> — 両テーブルの全行を保持</li>
          <li><span className="text-purple-400">左のみ</span> — 右テーブル側がNULL</li>
          <li><span className="text-purple-400">右のみ</span> — 左テーブル側がNULL</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteでのFULL OUTER JOIN</h2>
        <p className="text-gray-300 leading-relaxed">
          SQLiteはFULL OUTER JOINを直接サポートしていません。
          代わりに <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">LEFT JOIN UNION ALL RIGHT JOIN WHERE LEFT IS NULL</code>
          で同等の結果を得られます。
          PostgreSQL・MySQL 8.0+・SQLServerではFULL OUTER JOINが使えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: FULL OUTER JOINの概念（PostgreSQL構文）</h2>
        <SqlEditor
          defaultCode={`-- PostgreSQL / SQLServer での書き方
SELECT c.name, o.product
FROM customers AS c
FULL OUTER JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product
-----------|-----------
田中太郎   | ノートPC
田中太郎   | キーボード
鈴木花子   | マウス
佐藤次郎   | NULL
NULL       | 海外発送品`}
          setupSql={`-- 概念説明用のサンプルデータ
-- customers: 田中太郎(1), 鈴木花子(2), 佐藤次郎(3)
-- orders: customer_id 1,2,1,99 (99は存在しない顧客)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: SQLiteでの代替実装（UNION ALL）</h2>
        <SqlEditor
          defaultCode={`-- LEFT JOIN + UNION ALL + RIGHT JOIN WHERE IS NULL で代替
SELECT c.name, o.product
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
UNION ALL
SELECT c.name, o.product
FROM customers AS c
RIGHT JOIN orders AS o ON c.id = o.customer_id
WHERE c.id IS NULL;`}
          expectedOutput={`name       | product
-----------|-----------
田中太郎   | ノートPC
鈴木花子   | マウス
田中太郎   | キーボード
佐藤次郎   | NULL
NULL       | 海外発送品`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000), (4, 99, '海外発送品', 5000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 差分のみを取得</h2>
        <SqlEditor
          defaultCode={`-- 一方にしか存在しない行を抽出
SELECT c.name AS customer, o.product AS orphan_order
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
WHERE o.id IS NULL
UNION ALL
SELECT NULL, o.product
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id = c.id
WHERE c.id IS NULL;`}
          expectedOutput={`customer   | orphan_order
-----------|-------------
佐藤次郎   | NULL
NULL       | 海外発送品`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000), (4, 99, '海外発送品', 5000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="full-join" />
      </div>
      <LessonNav lessons={lessons} currentId="full-join" basePath="/learn/joins" />
    </div>
  );
}
