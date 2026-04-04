import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function NumericFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値関数</h1>
        <p className="text-gray-400">ROUND・ABS・CEIL・FLOOR・MODなど数値計算関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主な数値関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLの数値関数は、金額の丸め処理、統計計算、数値の変換などに使われます。
          四捨五入や切り捨て・切り上げはビジネスロジックで頻繁に登場します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">ROUND(x, d)</code> — 小数点d桁で四捨五入</li>
          <li><code className="text-green-300">ABS(x)</code> — 絶対値を返す</li>
          <li><code className="text-green-300">CEIL(x)</code> — 切り上げ（天井関数）</li>
          <li><code className="text-green-300">FLOOR(x)</code> — 切り捨て（床関数）</li>
          <li><code className="text-green-300">MOD(x, y)</code> — x÷yの余り</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ROUND・ABS</h2>
        <SqlEditor
          defaultCode={`SELECT
  price,
  tax_rate,
  price * tax_rate AS tax_raw,
  ROUND(price * tax_rate, 0) AS tax_rounded,
  ABS(discount) AS discount_abs
FROM products;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  tax_rate REAL NOT NULL DEFAULT 0.1,
  discount REAL NOT NULL DEFAULT 0
);
INSERT INTO products VALUES (1, '商品A', 1980, 0.1, -100);
INSERT INTO products VALUES (2, '商品B', 3333, 0.1, -200);
INSERT INTO products VALUES (3, '商品C', 5678, 0.08, -50);`}
          expectedOutput={`price | tax_rate | tax_raw | tax_rounded | discount_abs
------+----------+---------+-------------+--------------
1980  | 0.1      | 198.0   | 198         | 100
3333  | 0.1      | 333.3   | 333         | 200
5678  | 0.08     | 454.24  | 454         | 50`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CEIL・FLOOR</h2>
        <SqlEditor
          defaultCode={`SELECT
  value,
  CEIL(value) AS ceiling_val,
  FLOOR(value) AS floor_val,
  ROUND(value) AS rounded_val
FROM measurements;`}
          setupSql={`CREATE TABLE measurements (
  id INTEGER PRIMARY KEY,
  value REAL NOT NULL
);
INSERT INTO measurements VALUES (1, 3.2);
INSERT INTO measurements VALUES (2, 3.7);
INSERT INTO measurements VALUES (3, -2.3);
INSERT INTO measurements VALUES (4, -2.8);`}
          expectedOutput={`value | ceiling_val | floor_val | rounded_val
------+-------------+-----------+------------
3.2   | 4.0         | 3.0       | 3.0
3.7   | 4.0         | 3.0       | 4.0
-2.3  | -2.0        | -3.0      | -2.0
-2.8  | -2.0        | -3.0      | -3.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: MOD・整数演算</h2>
        <SqlEditor
          defaultCode={`SELECT
  id,
  MOD(id, 2) AS mod2,
  CASE WHEN MOD(id, 2) = 0 THEN '偶数' ELSE '奇数' END AS parity,
  id / 3 AS div3,
  MOD(id, 3) AS mod3
FROM generate_series(1, 8);`}
          setupSql={`CREATE TABLE generate_series AS
SELECT 1 AS id UNION ALL SELECT 2 UNION ALL SELECT 3
UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
UNION ALL SELECT 7 UNION ALL SELECT 8;`}
          expectedOutput={`id | mod2 | parity | div3 | mod3
---+------+--------+------+------
1  | 1    | 奇数    | 0    | 1
2  | 0    | 偶数    | 0    | 2
3  | 1    | 奇数    | 1    | 0
4  | 0    | 偶数    | 1    | 1
5  | 1    | 奇数    | 1    | 2
6  | 0    | 偶数    | 2    | 0
7  | 1    | 奇数    | 2    | 1
8  | 0    | 偶数    | 2    | 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="numeric-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-functions" basePath="/learn/functions" />
    </div>
  );
}
