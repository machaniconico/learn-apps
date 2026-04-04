import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function CreateViewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビューの作成</h1>
        <p className="text-gray-400">複雑なクエリをビューに保存して再利用する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">効果的なビューの設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビューは複雑なJOIN・集計・フィルタリングを一度定義すれば繰り返し使えます。
          良いビューの設計には明確な命名と単一の目的を持たせることが重要です。
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE OR REPLACE VIEW</code>（SQLiteでは非対応）の代わりに、
          SQLiteでは <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP VIEW IF EXISTS</code> してから再作成します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE VIEW IF NOT EXISTS 名前 AS ...</code> — 安全な作成</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP VIEW IF EXISTS 名前</code> — 安全な削除</li>
          <li>ビューの更新はDROP → CREATE で行う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 集計ビューの作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer    TEXT NOT NULL,
  product     TEXT NOT NULL,
  quantity    INTEGER NOT NULL,
  unit_price  REAL    NOT NULL,
  order_date  TEXT    NOT NULL
);

INSERT INTO orders VALUES
  (1, '田中', 'ノートPC',   1, 89800, '2024-01-10'),
  (2, '田中', 'マウス',      2,  2800, '2024-01-10'),
  (3, '佐藤', 'キーボード',  1,  8500, '2024-01-15'),
  (4, '田中', 'モニター',    1, 45000, '2024-02-01'),
  (5, '佐藤', 'ノートPC',   1, 89800, '2024-02-10');

CREATE VIEW order_summary AS
SELECT
  customer,
  COUNT(*)            AS order_count,
  SUM(quantity * unit_price) AS total_spent,
  MIN(order_date)     AS first_order,
  MAX(order_date)     AS last_order
FROM orders
GROUP BY customer;

SELECT * FROM order_summary ORDER BY total_spent DESC;`}
          expectedOutput={`customer  order_count  total_spent  first_order  last_order
田中      3            140400.0     2024-01-10   2024-02-01
佐藤      2            98300.0      2024-01-15   2024-02-10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビューの上にビューを作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビューは他のビューを参照して定義することもできます。
          段階的に抽象化することで、複雑なロジックを分割して管理できます。
          ただし、深くネストしたビューはパフォーマンスに影響する場合があるため注意が必要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ビューを使ったレポート作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE sales (
  id        INTEGER PRIMARY KEY,
  rep       TEXT NOT NULL,
  region    TEXT NOT NULL,
  amount    REAL NOT NULL,
  sale_date TEXT NOT NULL
);

INSERT INTO sales VALUES
  (1, '田中', '東', 150000, '2024-01'),
  (2, '佐藤', '西', 120000, '2024-01'),
  (3, '田中', '東', 180000, '2024-02'),
  (4, '鈴木', '東', 200000, '2024-02'),
  (5, '佐藤', '西', 140000, '2024-02');

CREATE VIEW monthly_sales AS
SELECT region, sale_date, SUM(amount) AS total
FROM sales GROUP BY region, sale_date;

CREATE VIEW top_regions AS
SELECT region, SUM(total) AS grand_total
FROM monthly_sales GROUP BY region ORDER BY grand_total DESC;

SELECT * FROM top_regions;`}
          expectedOutput={`region  grand_total
東       530000.0
西       260000.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ビューの再定義</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    REAL NOT NULL,
  in_stock INTEGER NOT NULL DEFAULT 1
);

INSERT INTO products VALUES (1, 'ノートPC', '電子機器', 89800, 1);
INSERT INTO products VALUES (2, 'マウス',   '電子機器',  2800, 0);
INSERT INTO products VALUES (3, 'デスク',   '家具',     45000, 1);

-- ビューを作成
CREATE VIEW available_products AS
SELECT id, name, category, price FROM products WHERE in_stock = 1;

-- ビューを再定義（DROP → CREATE）
DROP VIEW IF EXISTS available_products;
CREATE VIEW available_products AS
SELECT id, name, category, price,
       ROUND(price * 1.1, 0) AS price_with_tax
FROM products WHERE in_stock = 1;

SELECT * FROM available_products;`}
          expectedOutput={`id  name    category  price    price_with_tax
1   ノートPC  電子機器  89800.0  98780.0
3   デスク    家具      45000.0  49500.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="create-view" />
      </div>
      <LessonNav lessons={lessons} currentId="create-view" basePath="/learn/views" />
    </div>
  );
}
