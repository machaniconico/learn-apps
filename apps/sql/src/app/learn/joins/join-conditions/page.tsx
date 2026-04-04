import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function JoinConditionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">結合条件の応用</h1>
        <p className="text-gray-400">ON句の複雑な条件指定 — 等値以外の結合条件を活用する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ON句で使える条件</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ON句には等値条件（=）だけでなく、不等号・BETWEEN・AND/ORなどの複合条件も指定できます。
          これにより「有効期間内のレコードを結合する」「価格帯に合わせて結合する」といった
          柔軟な結合が可能になります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">等値以外の条件</span> — ON a.price BETWEEN b.min AND b.max</li>
          <li><span className="text-purple-400">複合条件</span> — ON a.id = b.id AND a.type = b.type</li>
          <li><span className="text-purple-400">USING句</span> — 同名カラムの等値結合を簡潔に書く</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">USING句について</h2>
        <p className="text-gray-300 leading-relaxed">
          両テーブルで同名のカラムを等値結合する場合、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">ON a.id = b.id</code> の代わりに
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">USING(id)</code> と書けます。
          結果セットでそのカラムが1列になるという違いがあります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複合条件での結合</h2>
        <SqlEditor
          defaultCode={`-- 部署と役職の両方が一致する場合に結合
SELECT e.name, b.budget
FROM employees AS e
INNER JOIN budgets AS b
  ON e.department = b.department AND e.level = b.level;`}
          expectedOutput={`name       | budget
-----------|--------
田中課長   | 500000
佐藤係長   | 200000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, level TEXT);
CREATE TABLE budgets (id INTEGER PRIMARY KEY, department TEXT, level TEXT, budget INTEGER);
INSERT INTO employees VALUES (1, '田中課長', '営業部', '課長'), (2, '佐藤係長', '営業部', '係長'), (3, '山田部長', '総務部', '部長');
INSERT INTO budgets VALUES (1, '営業部', '課長', 500000), (2, '営業部', '係長', 200000), (3, '開発部', '部長', 800000);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 範囲条件での結合（価格帯）</h2>
        <SqlEditor
          defaultCode={`-- 商品価格が価格帯の範囲に入る場合に結合
SELECT p.name, p.price, pt.tier_name
FROM products AS p
INNER JOIN price_tiers AS pt
  ON p.price BETWEEN pt.min_price AND pt.max_price;`}
          expectedOutput={`name        | price  | tier_name
------------|--------|----------
マウス      | 3000   | 低価格帯
キーボード  | 8000   | 中価格帯
ノートPC    | 120000 | 高価格帯`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE price_tiers (id INTEGER PRIMARY KEY, tier_name TEXT, min_price INTEGER, max_price INTEGER);
INSERT INTO products VALUES (1, 'マウス', 3000), (2, 'キーボード', 8000), (3, 'ノートPC', 120000);
INSERT INTO price_tiers VALUES (1, '低価格帯', 0, 5000), (2, '中価格帯', 5001, 50000), (3, '高価格帯', 50001, 999999);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: USING句での結合</h2>
        <SqlEditor
          defaultCode={`-- ON c.id = o.customer_id ではなく USING が使える場合
SELECT name, product
FROM customers
JOIN orders USING(customer_id);`}
          expectedOutput={`name       | product
-----------|----------
田中太郎   | ノートPC
鈴木花子   | マウス`}
          setupSql={`CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);
INSERT INTO customers VALUES (1, '田中太郎'), (2, '鈴木花子');
INSERT INTO orders VALUES (1, 1, 'ノートPC'), (2, 2, 'マウス');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="join-conditions" />
      </div>
      <LessonNav lessons={lessons} currentId="join-conditions" basePath="/learn/joins" />
    </div>
  );
}
