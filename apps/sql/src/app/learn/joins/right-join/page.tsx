import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function RightJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RIGHT JOIN</h1>
        <p className="text-gray-400">右外部結合 — 右テーブルの全行を保持しながら左テーブルを結合する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RIGHT JOINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          RIGHT JOIN（RIGHT OUTER JOIN）は右テーブルの全行を結果に含めます。
          LEFT JOINとは左右が逆で、左テーブルに一致する行がない場合はNULLになります。
          テーブルの順序を入れ替えれば LEFT JOIN で同じ結果が得られるため、実務では LEFT JOIN を多く見かけます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">RIGHT JOIN</span> — 右テーブルの行はすべて保持</li>
          <li><span className="text-purple-400">一致なし</span> — 左テーブル側はNULLになる</li>
          <li><span className="text-purple-400">LEFT JOINへの変換</span> — テーブル順を入れ替えれば等価</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LEFT JOINとの対称性</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">A RIGHT JOIN B</code> は
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">B LEFT JOIN A</code> と等価です。
          SQLiteはRIGHT JOINをサポートしていないDBもあるため、LEFT JOINに書き換える習慣を身につけておくと良いでしょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 全注文と顧客情報を取得</h2>
        <SqlEditor
          defaultCode={`SELECT c.name, o.product, o.amount
FROM customers AS c
RIGHT JOIN orders AS o ON c.id = o.customer_id;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
鈴木花子   | マウス     | 3000
田中太郎   | キーボード | 8000
NULL       | 海外発送品 | 5000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000), (4, 99, '海外発送品', 5000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: LEFT JOINで同じ結果を得る</h2>
        <SqlEditor
          defaultCode={`-- RIGHT JOIN を LEFT JOIN に書き換えた等価クエリ
SELECT c.name, o.product, o.amount
FROM orders AS o
LEFT JOIN customers AS c ON c.id = o.customer_id;`}
          expectedOutput={`name       | product    | amount
-----------|------------|-------
田中太郎   | ノートPC   | 120000
鈴木花子   | マウス     | 3000
田中太郎   | キーボード | 8000
NULL       | 海外発送品 | 5000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000), (4, 99, '海外発送品', 5000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 顧客不明の注文を抽出</h2>
        <SqlEditor
          defaultCode={`SELECT o.product, o.amount
FROM customers AS c
RIGHT JOIN orders AS o ON c.id = o.customer_id
WHERE c.id IS NULL;`}
          expectedOutput={`product    | amount
-----------|-------
海外発送品 | 5000`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC', 120000), (2, 2, 'マウス', 3000), (3, 1, 'キーボード', 8000), (4, 99, '海外発送品', 5000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="right-join" />
      </div>
      <LessonNav lessons={lessons} currentId="right-join" basePath="/learn/joins" />
    </div>
  );
}
