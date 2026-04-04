import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function SubqueryComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブクエリ vs JOIN</h1>
        <p className="text-gray-400">サブクエリとJOINの使い分け — 読みやすさとパフォーマンスのバランス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">どちらを使うべきか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          多くのケースでサブクエリとJOINは同じ結果を返しますが、書き方や目的によって適切な選択が変わります。
          モダンなSQLオプティマイザはどちらも同等に最適化することが多いですが、
          読みやすさと意図の明確さを優先して選ぶことが重要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">JOIN推奨</span> — 結果に両テーブルのカラムが必要な場合</li>
          <li><span className="text-violet-400">サブクエリ推奨</span> — 存在確認・集約値との比較・段階的な処理</li>
          <li><span className="text-violet-400">CTE推奨</span> — 複雑なサブクエリを再利用・可読性向上</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使い分けのガイドライン</h2>
        <p className="text-gray-300 leading-relaxed">
          「注文した顧客の名前だけが欲しい」場合はEXISTSやINが意図を明確に表現します。
          「注文と顧客の両方の情報を並べたい」場合はJOINが適しています。
          迷ったらまずクエリの意図を日本語で考え、それに近い構文を選びましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: サブクエリ版 vs JOIN版（同じ結果）</h2>
        <SqlEditor
          defaultCode={`-- サブクエリ版（存在確認の意図が明確）
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- JOIN版（重複排除のDISTINCTが必要）
-- SELECT DISTINCT c.name FROM customers c
-- JOIN orders o ON c.id = o.customer_id;`}
          expectedOutput={`name
--------
田中太郎
鈴木花子`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス'), (3, 1, 'キーボード');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: JOINが自然なケース（両テーブルのカラムが必要）</h2>
        <SqlEditor
          defaultCode={`-- 顧客名と注文商品を一緒に表示 → JOINが自然
SELECT c.name, o.product, o.amount
FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
鈴木花子   | マウス     | 3000
田中太郎   | キーボード | 8000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 集約値との比較はサブクエリが簡潔</h2>
        <SqlEditor
          defaultCode={`-- 平均注文金額より高い注文を持つ顧客
SELECT c.name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.id
    AND o.amount > (SELECT AVG(amount) FROM orders)
);`}
          expectedOutput={`name
--------
田中太郎`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="subquery-comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="subquery-comparison" basePath="/learn/subqueries" />
    </div>
  );
}
