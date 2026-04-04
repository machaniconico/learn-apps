import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function LeftJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LEFT JOIN</h1>
        <p className="text-gray-400">左外部結合 — 左テーブルの全行を保持しながら右テーブルを結合する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LEFT JOINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LEFT JOIN（LEFT OUTER JOIN）は左テーブルの全行を結果に含めます。
          右テーブルに一致する行がない場合、右テーブルのカラムはNULLになります。
          「すべての顧客と、あればその注文を取得する」といったケースで活躍します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">LEFT JOIN</span> — 左テーブルの行はすべて保持</li>
          <li><span className="text-purple-400">一致なし</span> — 右テーブル側はNULLになる</li>
          <li><span className="text-purple-400">IS NULL</span> — 一致しない行だけを絞り込むのに使える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INNER JOINとの違い</h2>
        <p className="text-gray-300 leading-relaxed">
          INNER JOINは両テーブルに一致する行しか返しません。
          LEFT JOINは左テーブルの全行を返し、右テーブルに一致がない場合はNULLで埋めます。
          「注文していない顧客も含めてリスト化したい」場合はLEFT JOINを使います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 全顧客と注文を取得（注文なしはNULL）</h2>
        <SqlEditor
          defaultCode={`SELECT c.name, o.product, o.amount
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
田中太郎   | キーボード | 8000
鈴木花子   | マウス     | 3000
佐藤次郎   | NULL       | NULL`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 注文していない顧客だけを抽出</h2>
        <SqlEditor
          defaultCode={`SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id
WHERE o.id IS NULL;`}
          expectedOutput={`name
--------
佐藤次郎`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: COALESCE でNULLを置換</h2>
        <SqlEditor
          defaultCode={`SELECT c.name, COALESCE(o.product, '注文なし') AS product
FROM customers AS c
LEFT JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product
-----------|----------
田中太郎   | ノートPC
田中太郎   | キーボード
鈴木花子   | マウス
佐藤次郎   | 注文なし`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="left-join" />
      </div>
      <LessonNav lessons={lessons} currentId="left-join" basePath="/learn/joins" />
    </div>
  );
}
