import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function OrderByPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ORDER BY</h1>
        <p className="text-gray-400">クエリ結果を並び替えるORDER BY句の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ORDER BYとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ORDER BY句は、SELECT文の結果を指定したカラムで並び替えます。
          ORDER BYを指定しない場合、行の返却順序は保証されません（データベースの内部処理順になる）。
          確定した順序でデータを取得したい場合は必ずORDER BYを指定しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ORDER BY カラム名</code> — そのカラムで昇順（小さい順）に並び替え</li>
          <li><code className="text-blue-300">ORDER BY カラム名 ASC</code> — 昇順（デフォルト）</li>
          <li><code className="text-blue-300">ORDER BY カラム名 DESC</code> — 降順（大きい順）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ORDER BYの位置</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ORDER BY句はSELECT文の最後に書きます。WHERE句の後、LIMIT句の前です。
          ORDER BYではカラム名の代わりにSELECT句でのカラム番号（1始まり）も使えます。
          エイリアスを参照することも可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ORDER BYはSELECT文の中で最後に評価される</li>
          <li><code className="text-blue-300">ORDER BY 2</code> — SELECT句の2番目のカラムで並び替え</li>
          <li><code className="text-blue-300">ORDER BY エイリアス名</code> — SELECT句のエイリアスも使える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 価格の昇順で並び替え</h2>
        <SqlEditor
          defaultCode={`-- 価格が安い順に並び替え
SELECT * FROM products ORDER BY price;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');`}
          expectedOutput={`id | name   | price | category
---+--------+-------+---------
2  | バナナ  | 80    | 果物
5  | みかん  | 100   | 果物
1  | りんご  | 150   | 果物
3  | 牛乳    | 200   | 乳製品
4  | チーズ  | 350   | 乳製品`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 名前のアルファベット順で並び替え</h2>
        <SqlEditor
          defaultCode={`-- 名前の昇順（辞書順）
SELECT name, age FROM employees ORDER BY name;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');`}
          expectedOutput={`name     | age
---------+-----
佐藤一郎  | 28
鈴木花子  | 32
田中太郎  | 25
山田次郎  | 45`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: WHERE句とORDER BYの組み合わせ</h2>
        <SqlEditor
          defaultCode={`-- 果物カテゴリを価格の安い順に表示
SELECT name, price FROM products
WHERE category = '果物'
ORDER BY price ASC;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'みかん', 100, '果物');`}
          expectedOutput={`name   | price
-------+-------
バナナ  | 80
みかん  | 100
りんご  | 150`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="order-by" />
      </div>
      <LessonNav lessons={lessons} currentId="order-by" basePath="/learn/sorting" />
    </div>
  );
}
