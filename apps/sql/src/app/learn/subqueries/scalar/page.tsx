import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function ScalarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スカラーサブクエリ</h1>
        <p className="text-gray-400">単一値を返すサブクエリ — SELECT句やWHERE句で値として使う</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スカラーサブクエリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スカラーサブクエリは1行1列（単一値）を返すサブクエリです。
          SELECT句・WHERE句・HAVING句など、値が期待される場所ならどこでも使えます。
          複数行を返した場合はエラーになるため、必ず1件以下になることを保証する必要があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">SELECT句</span> — 計算値として各行に付加する</li>
          <li><span className="text-violet-400">WHERE句</span> — 比較対象の値として使う</li>
          <li><span className="text-violet-400">1行1列のみ</span> — 複数行を返すとエラー</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使い所</h2>
        <p className="text-gray-300 leading-relaxed">
          「全体の平均と各行の値を並べて表示する」「最大値と同じ値を持つ行を取得する」
          といったケースで、JOINを書かずに簡潔に表現できます。
          ただし外部クエリの行ごとに実行されるとパフォーマンスに影響する場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SELECT句で平均値と比較</h2>
        <SqlEditor
          defaultCode={`SELECT name, salary,
       (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;`}
          expectedOutput={`name       | salary | avg_salary
-----------|--------|----------
田中太郎   | 400000 | 383333.33
鈴木花子   | 350000 | 383333.33
佐藤次郎   | 400000 | 383333.33`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: WHERE句で最大値と一致する行を取得</h2>
        <SqlEditor
          defaultCode={`SELECT name, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);`}
          expectedOutput={`name       | salary
-----------|--------
田中太郎   | 400000
佐藤次郎   | 400000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 平均より高い給与の社員</h2>
        <SqlEditor
          defaultCode={`SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`}
          expectedOutput={`name       | salary
-----------|--------
田中太郎   | 400000
佐藤次郎   | 400000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="scalar" />
      </div>
      <LessonNav lessons={lessons} currentId="scalar" basePath="/learn/subqueries" />
    </div>
  );
}
