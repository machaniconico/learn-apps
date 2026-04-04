import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function BetweenPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">BETWEEN演算子</h1>
        <p className="text-gray-400">範囲指定による絞り込みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">BETWEENとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          BETWEEN演算子は、値が指定した範囲内にあるかどうかを判定します。
          <code className="text-blue-300">WHERE age BETWEEN 20 AND 30</code> は
          <code className="text-blue-300">WHERE age &gt;= 20 AND age &lt;= 30</code> と同じ意味です。
          両端の値（20と30）も含まれることに注意してください（閉区間）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">BETWEEN 下限 AND 上限</code> — 両端を含む範囲</li>
          <li><code className="text-blue-300">NOT BETWEEN 下限 AND 上限</code> — 範囲外の値</li>
          <li>数値・文字列・日付のいずれにも使える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">日付範囲の指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          BETWEENは日付の範囲指定でよく使われます。
          例えば「2024年1月の注文」を取得するには
          <code className="text-blue-300">BETWEEN '2024-01-01' AND '2024-01-31'</code> と書きます。
          日付はシングルクォートで囲み、YYYY-MM-DD形式が標準です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE date BETWEEN '2024-01-01' AND '2024-12-31'</code></li>
          <li>タイムスタンプの場合、終了日の時刻も考慮が必要</li>
          <li>文字列のBETWEENは辞書順（アルファベット順）で判定される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 価格の範囲指定</h2>
        <SqlEditor
          defaultCode={`-- 100円以上300円以下の商品
SELECT * FROM products WHERE price BETWEEN 100 AND 300;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);
INSERT INTO products VALUES (6, 'バター', 300);`}
          expectedOutput={`id | name   | price
---+--------+-------
1  | りんご  | 150
3  | 牛乳    | 200
5  | みかん  | 100
6  | バター  | 300`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 年齢の範囲でフィルタリング</h2>
        <SqlEditor
          defaultCode={`-- 25歳以上35歳以下の社員
SELECT name, age, department FROM employees
WHERE age BETWEEN 25 AND 35;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 22, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 28, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 35, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');
INSERT INTO employees VALUES (5, '高橋美咲', 25, '営業');`}
          expectedOutput={`name     | age | department
---------+-----+-----------
鈴木花子  | 28  | 開発
佐藤一郎  | 35  | 人事
高橋美咲  | 25  | 営業`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NOT BETWEENで範囲外を取得</h2>
        <SqlEditor
          defaultCode={`-- 価格が100円未満または300円超の商品
SELECT * FROM products WHERE price NOT BETWEEN 100 AND 300;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);
INSERT INTO products VALUES (6, 'バター', 300);`}
          expectedOutput={`id | name   | price
---+--------+-------
2  | バナナ  | 80
4  | チーズ  | 350`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="between" />
      </div>
      <LessonNav lessons={lessons} currentId="between" basePath="/learn/filtering" />
    </div>
  );
}
