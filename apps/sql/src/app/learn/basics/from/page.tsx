import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function FromPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">FROM句</h1>
        <p className="text-gray-400">データを取得するテーブルを指定するFROM句の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FROM句とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          FROM句はSELECT文の一部で、データを取得するテーブルを指定します。
          テーブルとは、Excelのシートのように行と列でデータが整理された構造です。
          FROM句にはテーブル名を指定し、必要に応じてスキーマ名も含めることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">FROM テーブル名</code> — 単一テーブルの指定</li>
          <li><code className="text-blue-300">FROM スキーマ名.テーブル名</code> — スキーマを含む指定</li>
          <li><code className="text-blue-300">FROM テーブル1, テーブル2</code> — 複数テーブルの指定（クロス結合）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブルの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テーブルはカラム（列）とレコード（行）で構成されます。
          カラムにはデータの種類（整数、文字列、日付など）を定義します。
          FROM句でテーブルを指定することで、そのテーブルのすべての行にアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">カラム（列）</code> — データの属性。名前、年齢、価格など</li>
          <li><code className="text-blue-300">レコード（行）</code> — 1件のデータ。各カラムの値のセット</li>
          <li><code className="text-blue-300">テーブル</code> — 同じ種類のデータを格納するコンテナ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: テーブルからデータを取得</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');`}
          expectedOutput={`id | name   | price | category
---+--------+-------+---------
1  | りんご  | 150   | 果物
2  | バナナ  | 80    | 果物
3  | 牛乳    | 200   | 乳製品
4  | チーズ  | 350   | 乳製品`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 別のテーブルからデータを取得</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM orders;`}
          setupSql={`CREATE TABLE orders (order_id INTEGER, user_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO orders VALUES (1, 1, 2, 3);
INSERT INTO orders VALUES (2, 2, 1, 1);
INSERT INTO orders VALUES (3, 1, 3, 2);`}
          expectedOutput={`order_id | user_id | product_id | quantity
---------+---------+------------+---------
1        | 1       | 2          | 3
2        | 2       | 1          | 1
3        | 1       | 3          | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 特定カラムをFROMと組み合わせる</h2>
        <SqlEditor
          defaultCode={`SELECT name, price FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');`}
          expectedOutput={`name   | price
-------+-------
りんご  | 150
バナナ  | 80
牛乳    | 200`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="from" />
      </div>
      <LessonNav lessons={lessons} currentId="from" basePath="/learn/basics" />
    </div>
  );
}
