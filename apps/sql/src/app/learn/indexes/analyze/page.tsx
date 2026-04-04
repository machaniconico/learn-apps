import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function AnalyzePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ANALYZE・統計情報</h1>
        <p className="text-gray-400">テーブル統計の更新とEXPLAIN QUERY PLANの読み方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ANALYZEコマンド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ANALYZE</code> コマンドはテーブルの統計情報を収集・更新します。
          SQLiteのクエリオプティマイザはこの統計情報を使って、
          どのインデックスを使うか・どの順番でテーブルをアクセスするかを決定します。
          大量のデータ変更後にANALYZEを実行すると、クエリ実行計画が改善されることがあります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ANALYZE;</code> — 全テーブルの統計を更新</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ANALYZE テーブル名;</code> — 特定テーブルの統計を更新</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">EXPLAIN QUERY PLAN</code> — クエリ実行計画を確認</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: EXPLAIN QUERY PLANでインデックス使用を確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  department TEXT NOT NULL,
  salary     REAL NOT NULL
);

CREATE INDEX idx_emp_dept   ON employees(department);
CREATE INDEX idx_emp_salary ON employees(salary);

INSERT INTO employees VALUES (1, '田中', '開発', 550000);
INSERT INTO employees VALUES (2, '佐藤', '営業', 480000);
INSERT INTO employees VALUES (3, '鈴木', '開発', 620000);

ANALYZE;

-- クエリ実行計画を確認
EXPLAIN QUERY PLAN
SELECT name, salary FROM employees WHERE department = '開発';`}
          expectedOutput={`QUERY PLAN
SEARCH employees USING INDEX idx_emp_dept (department=?)`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">EXPLAIN QUERY PLANの読み方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">EXPLAIN QUERY PLAN</code> の出力で重要なキーワード：
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SCAN</code> はフルテーブルスキャン（インデックス未使用）、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SEARCH ... USING INDEX</code> はインデックスを使った検索（高速）、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SEARCH ... USING COVERING INDEX</code> はカバリングインデックス（最速）を意味します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: フルスキャンとインデックス検索の比較</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status      TEXT    NOT NULL,
  total       REAL    NOT NULL
);

CREATE INDEX idx_orders_customer ON orders(customer_id);

INSERT INTO orders VALUES (1, 101, 'shipped',   15000);
INSERT INTO orders VALUES (2, 102, 'pending',    8000);
INSERT INTO orders VALUES (3, 101, 'delivered', 22000);

-- インデックスあり → SEARCH USING INDEX
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 101;`}
          expectedOutput={`QUERY PLAN
SEARCH orders USING INDEX idx_orders_customer (customer_id=?)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 統計情報テーブルの確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  price    REAL NOT NULL
);

CREATE INDEX idx_products_cat ON products(category);

INSERT INTO products VALUES (1, '電子機器', 89800);
INSERT INTO products VALUES (2, '電子機器',  2800);
INSERT INTO products VALUES (3, '家具',     45000);
INSERT INTO products VALUES (4, '電子機器',  8500);

ANALYZE;

-- SQLiteの統計情報テーブルを確認
SELECT * FROM sqlite_stat1;`}
          expectedOutput={`tbl       idx                  stat
products  idx_products_cat     4 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="analyze" />
      </div>
      <LessonNav lessons={lessons} currentId="analyze" basePath="/learn/indexes" />
    </div>
  );
}
