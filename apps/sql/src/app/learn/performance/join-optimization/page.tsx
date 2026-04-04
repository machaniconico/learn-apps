import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function JoinOptimizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JOIN最適化</h1>
        <p className="text-gray-400">結合クエリのパフォーマンスを改善するテクニック</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JOIN最適化の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JOIN最適化では「結合キーにインデックスを張る」「小さいテーブルを先に絞る」「不要なJOINを排除する」が基本です。
          結合するテーブルが大きい場合は、サブクエリやCTEで事前に絞り込んでから結合すると効率的です。
          また、INNER JOINはOUTER JOINより最適化されやすいため、可能な場合はINNER JOINを使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">結合キーにインデックス</code> — ON句のカラムにインデックスを作成</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">事前絞り込み</code> — JOINの前にWHEREやサブクエリで行数を削減</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INNER JOIN優先</code> — 結果が同じならOUTER JOINよりINNER JOINを使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 結合キーへのインデックス作成</h2>
        <SqlEditor
          defaultCode={`CREATE INDEX idx_orders_customer_id ON orders(customer_id);
-- 大量の注文テーブルと顧客の結合が高速化される
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,8000),(3,2,3000),(4,3,12000),(5,3,7000);`}
          expectedOutput={`name     | order_count
---------+------------
田中太郎  | 2
鈴木花子  | 1
佐藤次郎  | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 事前絞り込みで結合行数を削減</h2>
        <SqlEditor
          defaultCode={`-- 高額注文（10000以上）のみ絞り込んでから顧客情報を結合
SELECT c.name, o.total
FROM customers c
JOIN (
  SELECT customer_id, total FROM orders WHERE total >= 10000
) o ON c.id = o.customer_id;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000),(4,3,15000),(5,3,7000);`}
          expectedOutput={`name     | total
---------+-------
田中太郎  | 12000
佐藤次郎  | 15000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 不要なJOINを排除する</h2>
        <SqlEditor
          defaultCode={`-- 顧客名が不要なら customers テーブルをJOINしなくてよい
-- 悪い例: 不要なJOIN
-- SELECT o.id, c.name, o.total FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.total > 10000;
-- 良い例: JOINなし
SELECT id, customer_id, total FROM orders WHERE total > 10000;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1,'田中太郎'),(2,'鈴木花子'),(3,'佐藤次郎');
INSERT INTO orders VALUES (1,1,5000),(2,1,12000),(3,2,3000),(4,3,15000),(5,3,7000);`}
          expectedOutput={`id | customer_id | total
---+-------------+-------
2  | 1           | 12000
4  | 3           | 15000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="join-optimization" />
      </div>
      <LessonNav lessons={lessons} currentId="join-optimization" basePath="/learn/performance" />
    </div>
  );
}
