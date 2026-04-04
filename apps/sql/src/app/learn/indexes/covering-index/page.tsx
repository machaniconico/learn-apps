import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function CoveringIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カバリングインデックス</h1>
        <p className="text-gray-400">クエリを完全にカバーするインデックスで最大限の高速化</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カバリングインデックスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クエリが必要とするすべてのカラム（SELECT句・WHERE句・ORDER BY句）が
          インデックスに含まれている場合、テーブル本体へのアクセスが不要になります。
          これを<span className="text-teal-400">カバリングインデックス</span>（インデックスオンリースキャン）と呼びます。
          テーブルへのランダムI/Oがなくなるため、特に大きなテーブルで劇的な高速化が期待できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>SELECT・WHERE・ORDER BYの全カラムをインデックスに含める</li>
          <li>テーブル本体へのアクセスが不要になる（インデックスオンリースキャン）</li>
          <li>インデックスサイズは増えるが、読み取りパフォーマンスは最大化</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: カバリングインデックスの作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status      TEXT    NOT NULL,
  total       REAL    NOT NULL,
  order_date  TEXT    NOT NULL
);

-- customer_id, status, total をすべてインデックスに含める
-- SELECT total ... WHERE customer_id=? AND status=? の場合テーブル不要
CREATE INDEX idx_covering
ON orders(customer_id, status, total);

INSERT INTO orders VALUES (1, 101, 'shipped',   15000, '2024-01-10');
INSERT INTO orders VALUES (2, 101, 'pending',    8000, '2024-01-15');
INSERT INTO orders VALUES (3, 101, 'shipped',   22000, '2024-01-20');
INSERT INTO orders VALUES (4, 102, 'shipped',   35000, '2024-02-01');

-- このクエリはインデックスのみで完結（テーブルアクセス不要）
SELECT SUM(total) AS shipped_total
FROM orders
WHERE customer_id = 101 AND status = 'shipped';`}
          expectedOutput={`shipped_total
37000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックス設計の考え方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カバリングインデックスの設計では、よく実行されるクエリのパターンを分析します。
          カラムの順序は「等値条件のカラム → ソートカラム → SELECTのカラム」が基本です。
          ただし、インデックスに含めるカラムが多すぎるとインデックスサイズが大きくなり、
          INSERT/UPDATE/DELETEのコストが増えるため、バランスが重要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: レポートクエリのカバリングインデックス</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE sales (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  category   TEXT    NOT NULL,
  amount     REAL    NOT NULL,
  sale_date  TEXT    NOT NULL
);

-- カテゴリ別・日付別の集計に最適化
CREATE INDEX idx_sales_report
ON sales(category, sale_date, amount);

INSERT INTO sales VALUES (1, 201, '電子機器', 89800, '2024-01');
INSERT INTO sales VALUES (2, 202, '電子機器',  2800, '2024-01');
INSERT INTO sales VALUES (3, 203, '家具',     45000, '2024-01');
INSERT INTO sales VALUES (4, 204, '電子機器', 89800, '2024-02');
INSERT INTO sales VALUES (5, 205, '家具',     38000, '2024-02');

SELECT category, sale_date, SUM(amount) AS total
FROM sales
WHERE category = '電子機器'
GROUP BY category, sale_date;`}
          expectedOutput={`category  sale_date  total
電子機器   2024-01    92600.0
電子機器   2024-02    89800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: EXPLAINでカバリングを確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  dept       TEXT NOT NULL,
  salary     REAL NOT NULL,
  name       TEXT NOT NULL
);

CREATE INDEX idx_dept_salary ON employees(dept, salary);

INSERT INTO employees VALUES (1, '開発', 550000, '田中');
INSERT INTO employees VALUES (2, '営業', 480000, '佐藤');
INSERT INTO employees VALUES (3, '開発', 620000, '鈴木');
INSERT INTO employees VALUES (4, '開発', 580000, '高橋');

-- dept と salary だけ使うクエリ → カバリングインデックス
EXPLAIN QUERY PLAN
SELECT dept, AVG(salary)
FROM employees
WHERE dept = '開発'
GROUP BY dept;`}
          expectedOutput={`QUERY PLAN
SEARCH employees USING INDEX idx_dept_salary (dept=?)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="covering-index" />
      </div>
      <LessonNav lessons={lessons} currentId="covering-index" basePath="/learn/indexes" />
    </div>
  );
}
