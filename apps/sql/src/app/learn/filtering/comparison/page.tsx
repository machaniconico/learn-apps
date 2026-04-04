import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">比較演算子</h1>
        <p className="text-gray-400">= &lt;&gt; &lt; &gt; &lt;= &gt;= を使った条件指定の方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          比較演算子はWHERE句で値を比較するために使います。
          数値の大小比較から文字列の等値比較まで幅広く使えます。
          結果は TRUE または FALSE になり、TRUE の行だけが返されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">=</code> — 等しい</li>
          <li><code className="text-blue-300">&lt;&gt; または !=</code> — 等しくない</li>
          <li><code className="text-blue-300">&lt;</code> — より小さい</li>
          <li><code className="text-blue-300">&gt;</code> — より大きい</li>
          <li><code className="text-blue-300">&lt;=</code> — 以下</li>
          <li><code className="text-blue-300">&gt;=</code> — 以上</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列・日付の比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          比較演算子は数値だけでなく、文字列や日付にも使えます。
          文字列の比較はアルファベット順（辞書順）で行われます。
          日付の比較は時系列順で行われ、<code className="text-blue-300">'2024-01-01' &lt; '2024-12-31'</code> は TRUE です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE name = '田中'</code> — 文字列の等値比較</li>
          <li><code className="text-blue-300">WHERE created_at &gt; '2024-01-01'</code> — 日付比較</li>
          <li>NULL との比較には <code className="text-blue-300">IS NULL</code> / <code className="text-blue-300">IS NOT NULL</code> を使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 等値・不等値の比較</h2>
        <SqlEditor
          defaultCode={`-- 価格が200円ちょうどの商品
SELECT * FROM products WHERE price = 200;

-- 価格が200円でない商品
-- SELECT * FROM products WHERE price <> 200;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, stock INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150, 50);
INSERT INTO products VALUES (2, 'バナナ', 80, 100);
INSERT INTO products VALUES (3, '牛乳', 200, 30);
INSERT INTO products VALUES (4, 'チーズ', 350, 20);
INSERT INTO products VALUES (5, 'みかん', 200, 60);`}
          expectedOutput={`id | name  | price | stock
---+-------+-------+-------
3  | 牛乳   | 200   | 30
5  | みかん | 200   | 60`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 大小比較</h2>
        <SqlEditor
          defaultCode={`-- 価格が150円以下の商品
SELECT name, price FROM products WHERE price <= 150;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, stock INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150, 50);
INSERT INTO products VALUES (2, 'バナナ', 80, 100);
INSERT INTO products VALUES (3, '牛乳', 200, 30);
INSERT INTO products VALUES (4, 'チーズ', 350, 20);
INSERT INTO products VALUES (5, 'みかん', 100, 60);`}
          expectedOutput={`name   | price
-------+-------
りんご  | 150
バナナ  | 80
みかん  | 100`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 在庫が少ない商品の警告</h2>
        <SqlEditor
          defaultCode={`-- 在庫が25個未満の商品を特定
SELECT name, price, stock FROM products WHERE stock < 25;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, stock INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150, 50);
INSERT INTO products VALUES (2, 'バナナ', 80, 100);
INSERT INTO products VALUES (3, '牛乳', 200, 20);
INSERT INTO products VALUES (4, 'チーズ', 350, 5);
INSERT INTO products VALUES (5, 'みかん', 100, 60);`}
          expectedOutput={`name   | price | stock
-------+-------+-------
牛乳    | 200   | 20
チーズ  | 350   | 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/filtering" />
    </div>
  );
}
