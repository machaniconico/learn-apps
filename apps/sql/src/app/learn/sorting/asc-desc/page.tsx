import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function AscDescPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ASC・DESC</h1>
        <p className="text-gray-400">昇順・降順の指定方法と使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ASCとDESCの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ASC（Ascending）は昇順（小さい→大きい、古い→新しい）で並び替えます。
          DESC（Descending）は降順（大きい→小さい、新しい→古い）で並び替えます。
          ORDER BYのデフォルトはASCなので、昇順の場合はASCを省略できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ASC</code> — 昇順: 1, 2, 3... / a, b, c... / 古い, 新しい...</li>
          <li><code className="text-blue-300">DESC</code> — 降順: 3, 2, 1... / c, b, a... / 新しい, 古い...</li>
          <li>デフォルトはASC（省略可能）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DESCの典型的な使用場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DESCはさまざまな場面で使われます。最新の投稿を先頭に表示する、売上ランキングで上位から表示する、
          最高点を先に見たいときなど、「大きい・新しいものから見たい」場合に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最新順の記事・コメント一覧</li>
          <li>売上・スコアのランキング表示</li>
          <li>高額商品から順に表示</li>
          <li>LIMIT と組み合わせた「上位N件」の取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 価格の高い順に並び替え</h2>
        <SqlEditor
          defaultCode={`-- 価格が高い順（降順）
SELECT name, price FROM products ORDER BY price DESC;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');`}
          expectedOutput={`name   | price
-------+-------
チーズ  | 350
牛乳    | 200
りんご  | 150
みかん  | 100
バナナ  | 80`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 年齢の若い順（ASC）・年齢の高い順（DESC）</h2>
        <SqlEditor
          defaultCode={`-- 年齢が若い順（昇順）
SELECT name, age FROM employees ORDER BY age ASC;

-- 年齢が高い順（降順）
-- SELECT name, age FROM employees ORDER BY age DESC;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 22, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');
INSERT INTO employees VALUES (5, '高橋美咲', 30, '営業');`}
          expectedOutput={`name     | age
---------+-----
佐藤一郎  | 22
田中太郎  | 25
高橋美咲  | 30
鈴木花子  | 32
山田次郎  | 45`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 最高給与TOP3を取得</h2>
        <SqlEditor
          defaultCode={`-- 給与が高い社員トップ3
SELECT name, salary FROM employees
ORDER BY salary DESC
LIMIT 3;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', 25, 300000);
INSERT INTO employees VALUES (2, '鈴木花子', 32, 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', 28, 320000);
INSERT INTO employees VALUES (4, '山田次郎', 45, 600000);
INSERT INTO employees VALUES (5, '高橋美咲', 30, 380000);`}
          expectedOutput={`name     | salary
---------+--------
山田次郎  | 600000
鈴木花子  | 450000
高橋美咲  | 380000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="asc-desc" />
      </div>
      <LessonNav lessons={lessons} currentId="asc-desc" basePath="/learn/sorting" />
    </div>
  );
}
