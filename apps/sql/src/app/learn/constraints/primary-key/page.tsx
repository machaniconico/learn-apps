import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function PrimaryKeyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">主キー</h1>
        <p className="text-gray-400">PRIMARY KEY制約の設定と役割</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PRIMARY KEY制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">PRIMARY KEY</code> 制約は、テーブル内の各行を一意に識別するカラム（または複数カラムの組み合わせ）に設定します。
          主キーは <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT NULL</code> かつ <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE</code> が保証されます。
          テーブルに設定できる主キーは1つだけです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 型 PRIMARY KEY</code> — インライン定義</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">PRIMARY KEY (カラム名)</code> — テーブル制約として定義</li>
          <li>主キー値はNULLを持てず、重複も不可</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: インライン主キーの定義</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE customers (
  id    INTEGER PRIMARY KEY,
  name  TEXT    NOT NULL,
  email TEXT    NOT NULL
);

INSERT INTO customers VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO customers VALUES (2, '佐藤花子', 'sato@example.com');

-- 重複IDを挿入しようとするとエラー
-- INSERT INTO customers VALUES (1, '鈴木次郎', 'suzuki@example.com');

SELECT id, name, email FROM customers;`}
          expectedOutput={`id  name    email
1   田中太郎  tanaka@example.com
2   佐藤花子  sato@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブル制約としての主キー定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カラム定義の後に <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">PRIMARY KEY (カラム名)</code> と書く方法もあります。
          複数カラムで主キーを構成する複合主キーを定義するにはこの書き方が必要です。
          可読性のためにカラム定義と制約を分けて書くスタイルもよく使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: テーブル制約として主キーを定義</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  product_code TEXT NOT NULL,
  name         TEXT NOT NULL,
  price        REAL NOT NULL,
  PRIMARY KEY (product_code)
);

INSERT INTO products VALUES ('P001', 'ノートPC', 89800);
INSERT INTO products VALUES ('P002', 'マウス',   2800);
INSERT INTO products VALUES ('P003', 'キーボード', 8500);

SELECT product_code, name, price FROM products ORDER BY price DESC;`}
          expectedOutput={`product_code  name      price
P001          ノートPC   89800.0
P003          キーボード  8500.0
P002          マウス     2800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 主キー違反の確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE departments (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO departments VALUES (1, '開発部');
INSERT INTO departments VALUES (2, '営業部');
INSERT INTO departments VALUES (3, '人事部');

-- 主キーが重複しないことを確認
SELECT id, name FROM departments;

-- 主キー制約によりIDは一意
SELECT COUNT(DISTINCT id) = COUNT(*) AS all_unique FROM departments;`}
          expectedOutput={`id  name
1   開発部
2   営業部
3   人事部

all_unique
1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="primary-key" />
      </div>
      <LessonNav lessons={lessons} currentId="primary-key" basePath="/learn/constraints" />
    </div>
  );
}
