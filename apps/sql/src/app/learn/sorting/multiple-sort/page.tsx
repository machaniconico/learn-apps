import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function MultipleSortPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数カラムソート</h1>
        <p className="text-gray-400">優先順位をつけた複数カラムの並び替え方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数カラムでのソート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ORDER BYにカンマ区切りで複数のカラムを指定すると、優先順位をつけて並び替えができます。
          最初に指定したカラムで並び替え、値が同じ場合に次のカラムで並び替えます。
          各カラムに個別にASC/DESCを指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ORDER BY カラム1, カラム2</code> — カラム1優先、同値ならカラム2</li>
          <li><code className="text-blue-300">ORDER BY カラム1 DESC, カラム2 ASC</code> — カラムごとに方向指定</li>
          <li>指定できるカラム数に制限はない</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実務での活用例</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数カラムのソートは実務でよく使われます。
          例えば「部署ごとにまとめ、各部署内では給与の高い順に表示」や
          「カテゴリ順に並べ、同カテゴリ内では名前のアルファベット順」などです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>部署→給与順: <code className="text-blue-300">ORDER BY department, salary DESC</code></li>
          <li>年度→月順: <code className="text-blue-300">ORDER BY year DESC, month ASC</code></li>
          <li>優先度→作成日: <code className="text-blue-300">ORDER BY priority ASC, created_at ASC</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部署名→給与の順でソート</h2>
        <SqlEditor
          defaultCode={`-- 部署名の昇順、同部署内は給与の降順
SELECT name, department, salary FROM employees
ORDER BY department ASC, salary DESC;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 380000);
INSERT INTO employees VALUES (4, '山田次郎', '営業', 420000);
INSERT INTO employees VALUES (5, '高橋美咲', '人事', 320000);
INSERT INTO employees VALUES (6, '伊藤健二', '人事', 350000);`}
          expectedOutput={`name     | department | salary
---------+------------+--------
伊藤健二  | 人事        | 350000
高橋美咲  | 人事        | 320000
鈴木花子  | 開発        | 450000
佐藤一郎  | 開発        | 380000
山田次郎  | 営業        | 420000
田中太郎  | 営業        | 300000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カテゴリ→価格の順でソート</h2>
        <SqlEditor
          defaultCode={`-- カテゴリの昇順、同カテゴリ内は価格の昇順
SELECT name, category, price FROM products
ORDER BY category ASC, price ASC;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', '果物', 150);
INSERT INTO products VALUES (2, 'バナナ', '果物', 80);
INSERT INTO products VALUES (3, '牛乳', '乳製品', 200);
INSERT INTO products VALUES (4, 'チーズ', '乳製品', 350);
INSERT INTO products VALUES (5, 'みかん', '果物', 100);
INSERT INTO products VALUES (6, 'バター', '乳製品', 280);`}
          expectedOutput={`name   | category | price
-------+----------+-------
バナナ  | 果物      | 80
みかん  | 果物      | 100
りんご  | 果物      | 150
牛乳    | 乳製品    | 200
バター  | 乳製品    | 280
チーズ  | 乳製品    | 350`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 3カラムを使ったソート</h2>
        <SqlEditor
          defaultCode={`-- 部署→年齢→名前の順でソート
SELECT name, department, age FROM employees
ORDER BY department, age, name;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, age INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 30);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 28);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 28);
INSERT INTO employees VALUES (4, '山田次郎', '営業', 30);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 25);`}
          expectedOutput={`name     | department | age
---------+------------+-----
高橋美咲  | 営業        | 25
田中太郎  | 営業        | 30
山田次郎  | 営業        | 30
佐藤一郎  | 開発        | 28
鈴木花子  | 開発        | 28`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="multiple-sort" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-sort" basePath="/learn/sorting" />
    </div>
  );
}
