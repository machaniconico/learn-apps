import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function IndexBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インデックス基本</h1>
        <p className="text-gray-400">CREATE INDEXの基本構文と仕組み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インデックスは、テーブルの検索を高速化するデータ構造です。
          本の索引と同様に、特定の値を持つ行をすばやく見つけられます。
          インデックスがない場合、WHERE句の検索はテーブル全体をスキャン（フルテーブルスキャン）しますが、
          インデックスがあれば対象行に直接アクセスできます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE INDEX 名前 ON テーブル(カラム)</code> — 基本構文</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP INDEX 名前</code> — インデックスの削除</li>
          <li>インデックスはSELECTを高速化するが、INSERT/UPDATE/DELETEのコストは増える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: インデックスの作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  department TEXT,
  salary     REAL
);

INSERT INTO employees VALUES (1, '田中太郎', '開発', 550000);
INSERT INTO employees VALUES (2, '佐藤花子', '営業', 480000);
INSERT INTO employees VALUES (3, '鈴木次郎', '開発', 620000);
INSERT INTO employees VALUES (4, '高橋美咲', '人事', 450000);
INSERT INTO employees VALUES (5, '渡辺健太', '開発', 580000);

-- departmentカラムにインデックスを作成
CREATE INDEX idx_employees_department ON employees(department);

-- インデックスを使った検索（高速）
SELECT id, name, department, salary
FROM employees
WHERE department = '開発';`}
          expectedOutput={`id  name    department  salary
1   田中太郎  開発         550000.0
3   鈴木次郎  開発         620000.0
5   渡辺健太  開発         580000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックスの仕組みとトレードオフ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteのインデックスはB-tree構造で実装されています。
          検索時はO(log n)で対象行を見つけられます。
          ただし、INSERT・UPDATE・DELETE時にはインデックスも更新する必要があるため、
          書き込みコストが増加します。また、インデックス自体もストレージを消費します。
          頻繁に検索されるカラムに絞って作成するのが基本です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: EXPLAINでインデックスの使用を確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  total       REAL    NOT NULL,
  status      TEXT    NOT NULL DEFAULT 'pending'
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status   ON orders(status);

INSERT INTO orders VALUES (1, 101, 15000, 'shipped');
INSERT INTO orders VALUES (2, 102, 8000,  'pending');
INSERT INTO orders VALUES (3, 101, 22000, 'delivered');

-- インデックスの一覧を確認
SELECT name FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'orders';`}
          expectedOutput={`name
idx_orders_customer
idx_orders_status`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: インデックスの削除</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  price    REAL
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price    ON products(price);

-- 使わなくなったインデックスを削除
DROP INDEX idx_products_price;

-- 残っているインデックスを確認
SELECT name FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'products';`}
          expectedOutput={`name
idx_products_category`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/indexes" />
    </div>
  );
}
