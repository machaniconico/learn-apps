import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function ExistsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">EXISTS</h1>
        <p className="text-gray-400">存在チェックサブクエリ — 行が存在するかどうかを判定する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">EXISTSとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          EXISTSはサブクエリが1行以上返すかどうかだけを評価し、TRUEまたはFALSEを返します。
          サブクエリが何を返すかは問わず、存在するかどうかだけを確認します。
          NOT INのNULL問題がなく、大量データでもパフォーマンスが良い場合があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">EXISTS</span> — 1行以上存在すればTRUE</li>
          <li><span className="text-violet-400">NOT EXISTS</span> — 1行も存在しなければTRUE</li>
          <li><span className="text-violet-400">SELECT 1</span> — EXISTSでは慣習的にSELECT 1を使う</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IN vs EXISTS</h2>
        <p className="text-gray-300 leading-relaxed">
          小さなリストならINが読みやすく、大量データではEXISTSが高速になる傾向があります。
          NULLを含む可能性があるカラムにNOT INを使う場合は必ずEXISTSに書き換えるか
          NULLを除外する条件を加えてください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 注文が存在する顧客を取得</h2>
        <SqlEditor
          defaultCode={`SELECT name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.id
);`}
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
        <h2 className="text-lg font-bold text-white mb-3">例2: NOT EXISTS — 注文がない顧客</h2>
        <SqlEditor
          defaultCode={`SELECT name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.id
);`}
          expectedOutput={`name
--------
佐藤次郎`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス'), (3, 1, 'キーボード');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 条件付きEXISTS</h2>
        <SqlEditor
          defaultCode={`-- 5000円以上の注文が存在する顧客
SELECT c.name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  JOIN products AS p ON o.product_id = p.id
  WHERE o.customer_id = c.id AND p.price >= 5000
);`}
          expectedOutput={`name
--------
田中太郎`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤次郎');
INSERT INTO products VALUES (1, 'ノートPC', 120000), (2, 'マウス', 3000), (3, 'キーボード', 8000);
INSERT INTO orders VALUES (1, 1, 1), (2, 2, 2), (3, 1, 3);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="exists" />
      </div>
      <LessonNav lessons={lessons} currentId="exists" basePath="/learn/subqueries" />
    </div>
  );
}
