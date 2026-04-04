import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function EntitiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エンティティ</h1>
        <p className="text-gray-400">データベース設計の基本単位であるエンティティを識別・定義する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エンティティとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          エンティティとは、システムで管理したい「もの」や「概念」のことです。
          ECサイトであれば「顧客」「商品」「注文」などがエンティティになります。
          各エンティティはテーブルとして実装され、属性（カラム）と識別子（主キー）を持ちます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">強エンティティ</code> — 単独で存在できるエンティティ（例: 顧客、商品）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">弱エンティティ</code> — 親エンティティに依存して存在するエンティティ</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">属性</code> — エンティティが持つ特性（カラムに対応）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エンティティの識別方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          業務要件の中から名詞を探すとエンティティ候補が見つかります。
          「顧客が商品を注文する」という文から「顧客」「商品」「注文」の3つのエンティティが見つかります。
          各エンティティには一意に識別できる主キー属性が必要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: エンティティをテーブルとして定義する</h2>
        <SqlEditor
          defaultCode={`-- ECサイトの主要エンティティを確認
SELECT 'customers' AS entity, COUNT(*) AS row_count FROM customers
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders;`}
          setupSql={`CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TEXT DEFAULT '2024-01-01'
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER DEFAULT 0
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TEXT NOT NULL
);
INSERT INTO customers VALUES (1,'田中太郎','tanaka@example.com','2024-01-05');
INSERT INTO customers VALUES (2,'鈴木花子','suzuki@example.com','2024-01-10');
INSERT INTO products VALUES (101,'ノートPC',120000,5),(102,'マウス',3000,50);
INSERT INTO orders VALUES (1,1,'2024-02-01'),(2,2,'2024-02-03');`}
          expectedOutput={`entity    | row_count
----------+-----------
customers | 2
products  | 2
orders    | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: エンティティの属性を確認する</h2>
        <SqlEditor
          defaultCode={`-- 顧客エンティティの全属性を取得
SELECT id, name, email, created_at FROM customers;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE, created_at TEXT);
INSERT INTO customers VALUES (1,'田中太郎','tanaka@example.com','2024-01-05');
INSERT INTO customers VALUES (2,'鈴木花子','suzuki@example.com','2024-01-10');`}
          expectedOutput={`id | name     | email              | created_at
---+----------+--------------------+------------
1  | 田中太郎  | tanaka@example.com | 2024-01-05
2  | 鈴木花子  | suzuki@example.com | 2024-01-10`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 主キーで一意識別できることを確認</h2>
        <SqlEditor
          defaultCode={`-- 主キー(id)で特定の顧客を一意に取得
SELECT * FROM customers WHERE id = 1;`}
          setupSql={`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO customers VALUES (1,'田中太郎','tanaka@example.com'),(2,'鈴木花子','suzuki@example.com');`}
          expectedOutput={`id | name     | email
---+----------+--------------------
1  | 田中太郎  | tanaka@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="entities" />
      </div>
      <LessonNav lessons={lessons} currentId="entities" basePath="/learn/er-diagram" />
    </div>
  );
}
