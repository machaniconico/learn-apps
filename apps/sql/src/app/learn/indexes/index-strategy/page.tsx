import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function IndexStrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インデックス戦略</h1>
        <p className="text-gray-400">効果的なインデックス設計の原則と判断基準</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックスを作成すべきカラム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インデックスは万能ではありません。適切なカラムに絞って作成することが重要です。
          一般的に、<span className="text-teal-400">WHERE句で頻繁に使われるカラム</span>・
          <span className="text-teal-400">JOIN条件のカラム</span>・
          <span className="text-teal-400">ORDER BYで頻繁に使われるカラム</span>に有効です。
          逆に、値の種類が少ないカラム（性別など）や更新頻度が極めて高いカラムは効果が薄い場合があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-teal-400">有効</span>: 外部キー・検索条件・ソートカラム</li>
          <li><span className="text-red-400">非効率</span>: 選択性の低いカラム（true/false等）</li>
          <li><span className="text-yellow-400">注意</span>: 更新頻度の高いカラムはコスト増</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 外部キーカラムへのインデックス</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE departments (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE employees (
  id            INTEGER PRIMARY KEY,
  name          TEXT    NOT NULL,
  department_id INTEGER NOT NULL,
  salary        REAL    NOT NULL
);

-- 外部キーカラムにはインデックスを作成する（JOIN高速化）
CREATE INDEX idx_emp_dept ON employees(department_id);

INSERT INTO departments VALUES (1, '開発'), (2, '営業'), (3, '人事');
INSERT INTO employees VALUES (1, '田中', 1, 550000);
INSERT INTO employees VALUES (2, '佐藤', 2, 480000);
INSERT INTO employees VALUES (3, '鈴木', 1, 620000);
INSERT INTO employees VALUES (4, '高橋', 3, 450000);
INSERT INTO employees VALUES (5, '渡辺', 1, 580000);

SELECT d.name AS dept, COUNT(*) AS headcount, AVG(e.salary) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name;`}
          expectedOutput={`dept  headcount  avg_salary
人事   1          450000.0
営業   1          480000.0
開発   3          583333.33`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックスが使われないケース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インデックスが存在しても使われないケースがあります。
          カラムを関数で加工した場合（<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE UPPER(name) = 'TANAKA'</code>）、
          LIKE検索で先頭がワイルドカードの場合（<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHERE name LIKE '%田中'</code>）、
          型変換が発生する場合などです。インデックスを活かすクエリの書き方が重要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: インデックスが効く・効かないクエリの比較</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    REAL NOT NULL
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price    ON products(price);

INSERT INTO products VALUES (1, 'ノートPC',  '電子機器', 89800);
INSERT INTO products VALUES (2, 'マウス',    '電子機器',  2800);
INSERT INTO products VALUES (3, 'デスク',    '家具',     45000);
INSERT INTO products VALUES (4, 'キーボード', '電子機器',  8500);

-- インデックスが効くクエリ（等値・範囲）
SELECT id, name, price FROM products WHERE category = '電子機器';`}
          expectedOutput={`id  name      price
1   ノートPC   89800.0
2   マウス     2800.0
4   キーボード  8500.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: インデックス一覧の管理</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id  INTEGER NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'pending',
  total       REAL    NOT NULL,
  created_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_customer  ON orders(customer_id);
CREATE INDEX idx_orders_product   ON orders(product_id);
CREATE INDEX idx_orders_status    ON orders(status);
CREATE INDEX idx_orders_created   ON orders(created_at);

-- 全インデックスを確認
SELECT name, tbl_name,
       CASE WHEN sql LIKE '%UNIQUE%' THEN 'UNIQUE' ELSE 'NORMAL' END AS index_type
FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'orders'
ORDER BY name;`}
          expectedOutput={`name                tbl_name  index_type
idx_orders_created  orders    NORMAL
idx_orders_customer orders    NORMAL
idx_orders_product  orders    NORMAL
idx_orders_status   orders    NORMAL`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="index-strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="index-strategy" basePath="/learn/indexes" />
    </div>
  );
}
