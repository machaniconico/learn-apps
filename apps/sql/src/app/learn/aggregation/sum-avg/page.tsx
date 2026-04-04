import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function SumAvgPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SUM・AVG関数</h1>
        <p className="text-gray-400">合計と平均を計算する集約関数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SUM関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SUM関数は数値カラムの合計を計算します。NULLは無視されます。
          売上の合計、在庫数の合計など、数値を足し合わせる場面で使います。
          対象行がない場合はNULLを返します（0ではない点に注意）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SUM(カラム名)</code> — 数値の合計を返す</li>
          <li>NULLは計算から除外される</li>
          <li>対象行が0件の場合はNULLを返す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AVG関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          AVG関数は数値カラムの平均値を計算します。NULLは除外されて計算されます。
          テストの平均点、商品の平均価格など、データの代表値を知りたいときに使います。
          <code className="text-blue-300">ROUND(AVG(カラム), 2)</code> で小数点以下の桁数を指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">AVG(カラム名)</code> — 平均値を返す（NULLを除外）</li>
          <li><code className="text-blue-300">ROUND(AVG(カラム), 桁数)</code> — 小数点以下の丸め</li>
          <li>AVG = SUM / COUNT（ただしNULLの扱いに注意）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 売上の合計を計算</h2>
        <SqlEditor
          defaultCode={`-- 全商品の売上合計
SELECT
  SUM(quantity) AS 総販売数,
  SUM(price * quantity) AS 総売上金額
FROM order_items;`}
          setupSql={`CREATE TABLE order_items (id INTEGER, name TEXT, price INTEGER, quantity INTEGER);
INSERT INTO order_items VALUES (1, 'りんご', 150, 10);
INSERT INTO order_items VALUES (2, 'バナナ', 80, 25);
INSERT INTO order_items VALUES (3, '牛乳', 200, 8);
INSERT INTO order_items VALUES (4, 'チーズ', 350, 5);
INSERT INTO order_items VALUES (5, 'みかん', 100, 15);`}
          expectedOutput={`総販売数 | 総売上金額
--------+---------
63      | 10250`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 平均価格と平均給与の計算</h2>
        <SqlEditor
          defaultCode={`SELECT
  ROUND(AVG(price), 0) AS 平均価格
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);`}
          expectedOutput={`平均価格
-------
176`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: SUM・AVG・COUNTをまとめて使う</h2>
        <SqlEditor
          defaultCode={`SELECT
  COUNT(*) AS 社員数,
  SUM(salary) AS 給与総額,
  ROUND(AVG(salary), 0) AS 平均給与,
  SUM(salary) / COUNT(*) AS 手計算平均
FROM employees;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);`}
          expectedOutput={`社員数 | 給与総額   | 平均給与  | 手計算平均
------+----------+--------+---------
5     | 2050000  | 410000 | 410000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="sum-avg" />
      </div>
      <LessonNav lessons={lessons} currentId="sum-avg" basePath="/learn/aggregation" />
    </div>
  );
}
