import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function AliasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エイリアス</h1>
        <p className="text-gray-400">AS句を使ってカラムやテーブルに別名をつける方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カラムエイリアスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          エイリアス（別名）を使うと、カラム名やテーブル名に分かりやすい名前を付けることができます。
          結果セットのカラム名を日本語にしたり、計算式の結果に名前を付けたりするときに使います。
          AS キーワードで指定しますが、AS は省略することも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SELECT カラム名 AS 別名</code> — カラムに別名を付ける</li>
          <li><code className="text-blue-300">SELECT カラム名 別名</code> — ASを省略することも可能</li>
          <li>スペースを含む別名はダブルクォートで囲む: <code className="text-blue-300">"商品 名前"</code></li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブルエイリアスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テーブル名にも別名を付けることができます。テーブル名が長い場合や、同じテーブルを複数回参照する場合（自己結合）に便利です。
          テーブルエイリアスはFROM句で定義し、クエリ全体で使用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">FROM テーブル名 AS t</code> — テーブルに別名を付ける</li>
          <li><code className="text-blue-300">t.カラム名</code> — エイリアスでカラムを参照</li>
          <li>JOINクエリでは必須になる場合が多い</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: カラムに日本語の別名をつける</h2>
        <SqlEditor
          defaultCode={`SELECT
  name AS 商品名,
  price AS 価格,
  category AS カテゴリ
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');`}
          expectedOutput={`商品名  | 価格 | カテゴリ
-------+------+---------
りんご  | 150  | 果物
バナナ  | 80   | 果物
牛乳    | 200  | 乳製品`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 計算式の結果に別名をつける</h2>
        <SqlEditor
          defaultCode={`SELECT
  name AS 商品名,
  price AS 税抜価格,
  ROUND(price * 1.1) AS 税込価格
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');`}
          expectedOutput={`商品名  | 税抜価格 | 税込価格
-------+--------+--------
りんご  | 150    | 165
バナナ  | 80     | 88
牛乳    | 200    | 220`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テーブルエイリアスを使う</h2>
        <SqlEditor
          defaultCode={`SELECT p.name AS 商品名, p.price AS 価格
FROM products AS p
WHERE p.price < 200;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'みかん', 100, '果物');`}
          expectedOutput={`商品名  | 価格
-------+------
りんご  | 150
バナナ  | 80
みかん  | 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="aliases" />
      </div>
      <LessonNav lessons={lessons} currentId="aliases" basePath="/learn/basics" />
    </div>
  );
}
