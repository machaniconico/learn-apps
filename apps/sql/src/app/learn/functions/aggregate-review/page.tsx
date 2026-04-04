import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function AggregateReviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">集約関数まとめ</h1>
        <p className="text-gray-400">COUNT・SUM・AVG・MIN・MAXの応用パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集約関数の応用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          集約関数はGROUP BYと組み合わせるだけでなく、FILTER句・DISTINCT・CASE式との組み合わせで
          より複雑な集計を実現できます。
          ウィンドウ関数と違い、集約関数はグループを1行に集約します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">COUNT(*)</code> — NULL含む全行数、<code className="text-green-300">COUNT(col)</code> — NULLを除く件数</li>
          <li><code className="text-green-300">COUNT(DISTINCT col)</code> — 重複を除いた件数</li>
          <li><code className="text-green-300">GROUP_CONCAT(col, sep)</code> — 値を連結して1つの文字列に</li>
          <li><code className="text-green-300">SUM(CASE WHEN ... END)</code> — 条件付き合計</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: COUNT の各パターン</h2>
        <SqlEditor
          defaultCode={`SELECT
  COUNT(*) AS total_rows,
  COUNT(email) AS with_email,
  COUNT(*) - COUNT(email) AS no_email,
  COUNT(DISTINCT department) AS dept_count
FROM employees;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 'tanaka@example.com');
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', 'suzuki@example.com');
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', NULL);
INSERT INTO employees VALUES (4, '山田二郎', '人事部', 'yamada@example.com');
INSERT INTO employees VALUES (5, '伊藤花代', '開発部', NULL);`}
          expectedOutput={`total_rows | with_email | no_email | dept_count
-----------+------------+----------+-----------
5          | 3          | 2        | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: GROUP_CONCATで値を連結</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  COUNT(*) AS member_count,
  GROUP_CONCAT(name, ', ') AS members
FROM employees
GROUP BY department
ORDER BY department;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部');
INSERT INTO employees VALUES (2, '鈴木花子', '開発部');
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部');
INSERT INTO employees VALUES (4, '山田二郎', '開発部');
INSERT INTO employees VALUES (5, '伊藤花代', '人事部');`}
          expectedOutput={`department | member_count | members
-----------+--------------+------------------
営業部      | 2            | 田中太郎, 佐藤一郎
開発部      | 2            | 鈴木花子, 山田二郎
人事部      | 1            | 伊藤花代`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 条件付き集計（ピボット）</h2>
        <SqlEditor
          defaultCode={`SELECT
  product_category,
  SUM(amount) AS total_amount,
  SUM(CASE WHEN month = '2024-01' THEN amount ELSE 0 END) AS jan,
  SUM(CASE WHEN month = '2024-02' THEN amount ELSE 0 END) AS feb,
  SUM(CASE WHEN month = '2024-03' THEN amount ELSE 0 END) AS mar
FROM sales
GROUP BY product_category;`}
          setupSql={`CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  product_category TEXT NOT NULL,
  month TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO sales VALUES (1, '食品', '2024-01', 50000);
INSERT INTO sales VALUES (2, '食品', '2024-02', 45000);
INSERT INTO sales VALUES (3, '食品', '2024-03', 60000);
INSERT INTO sales VALUES (4, '衣料', '2024-01', 80000);
INSERT INTO sales VALUES (5, '衣料', '2024-02', 90000);
INSERT INTO sales VALUES (6, '衣料', '2024-03', 75000);`}
          expectedOutput={`product_category | total_amount | jan   | feb   | mar
-----------------+--------------+-------+-------+------
食品              | 155000       | 50000 | 45000 | 60000
衣料              | 245000       | 80000 | 90000 | 75000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="aggregate-review" />
      </div>
      <LessonNav lessons={lessons} currentId="aggregate-review" basePath="/learn/functions" />
    </div>
  );
}
