import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ</h1>
        <p className="text-gray-400">IN・OUT・INOUTパラメータでプロシージャに柔軟性を持たせる</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストアドプロシージャのパラメータには3種類あります。
          INパラメータは呼び出し元から値を受け取るだけ、OUTパラメータは結果を呼び出し元に返すだけ、
          INOUTパラメータは受け取りと返却の両方が可能です。
          SQLiteではこの仕組みをテーブル・CTE・サブクエリで模擬します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">IN</code> — 入力値のみ（読み取り専用）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">OUT</code> — 出力値のみ（結果を返す）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">INOUT</code> — 入力値を受け取り、加工して返す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: INパラメータで絞り込み検索</h2>
        <SqlEditor
          defaultCode={`-- IN パラメータ相当: category と min_price で絞り込む
SELECT id, name, price
FROM products
WHERE category = 'PC' AND price >= 50000
ORDER BY price;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1,'ノートPC','PC',120000),(2,'デスクトップPC','PC',80000),(3,'マウス','周辺機器',3000),(4,'タブレット','PC',45000),(5,'キーボード','周辺機器',8000);`}
          expectedOutput={`id | name          | price
---+---------------+-------
2  | デスクトップPC  | 80000
1  | ノートPC       | 120000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: OUTパラメータで集計値を返す</h2>
        <SqlEditor
          defaultCode={`-- OUT パラメータ相当: 顧客の統計を返す
SELECT
  COUNT(*) AS order_count,
  SUM(total) AS total_revenue,
  AVG(total) AS avg_order_value,
  MAX(total) AS max_order
FROM orders
WHERE customer_id = 1;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,1,12000,'2024-02-15'),(3,2,3000,'2024-01-20'),(4,1,8000,'2024-03-05');`}
          expectedOutput={`order_count | total_revenue | avg_order_value | max_order
------------+---------------+-----------------+----------
3           | 25000         | 8333.33...      | 12000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: INOUTパラメータで値を加工して返す</h2>
        <SqlEditor
          defaultCode={`-- INOUT 相当: 税込み価格への変換（税率 10%）
SELECT
  id, name, price AS price_before_tax,
  ROUND(price * 1.1) AS price_with_tax
FROM products
WHERE category = 'PC'
ORDER BY price;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1,'ノートPC','PC',120000),(2,'デスクトップPC','PC',80000),(3,'タブレット','PC',45000);`}
          expectedOutput={`id | name          | price_before_tax | price_with_tax
---+---------------+------------------+---------------
3  | タブレット     | 45000            | 49500.0
2  | デスクトップPC  | 80000            | 88000.0
1  | ノートPC       | 120000           | 132000.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/stored-procedures" />
    </div>
  );
}
