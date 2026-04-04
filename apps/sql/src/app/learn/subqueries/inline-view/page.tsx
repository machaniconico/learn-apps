import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "subqueries")!.lessons;

export default function InlineViewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">サブクエリ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インラインビュー</h1>
        <p className="text-gray-400">FROM句でのサブクエリ — 仮想テーブルとして扱う</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インラインビューとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インラインビューはFROM句の中に書くサブクエリです。
          クエリの結果を一時的なテーブルとして扱い、外部クエリからSELECTできます。
          必ずエイリアスを付ける必要があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-violet-400">FROM (SELECT ...)</span> — サブクエリをテーブルとして使う</li>
          <li><span className="text-violet-400">エイリアス必須</span> — AS alias で名前を付ける</li>
          <li><span className="text-violet-400">集約結果を再利用</span> — 集約した結果にさらにフィルタをかける</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CTEとの関係</h2>
        <p className="text-gray-300 leading-relaxed">
          インラインビューと同じことをWITH句（CTE）でも表現できます。
          複数回参照する場合や可読性を重視する場合はCTEが適しています。
          一度だけ使うシンプルなケースではインラインビューが手軽です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部署ごとの集計を外部クエリで絞り込む</h2>
        <SqlEditor
          defaultCode={`SELECT dept, avg_salary
FROM (
  SELECT dept, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY dept
) AS dept_avg
WHERE avg_salary > 370000;`}
          expectedOutput={`dept  | avg_salary
------|----------
営業  | 400000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業'), (4, '高橋一郎', 390000, '開発');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: TOP-N取得のためのインラインビュー</h2>
        <SqlEditor
          defaultCode={`SELECT name, salary, rank
FROM (
  SELECT name, salary,
         ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
  FROM employees
) AS ranked
WHERE rank <= 2;`}
          expectedOutput={`name       | salary | rank
-----------|--------|-----
田中太郎   | 400000 | 1
佐藤次郎   | 400000 | 2`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業'), (4, '高橋一郎', 390000, '開発');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: インラインビューとJOINの組み合わせ</h2>
        <SqlEditor
          defaultCode={`SELECT e.name, e.salary, d.avg_salary
FROM employees AS e
JOIN (
  SELECT dept, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY dept
) AS d ON e.dept = d.dept;`}
          expectedOutput={`name       | salary | avg_salary
-----------|--------|----------
田中太郎   | 400000 | 400000
鈴木花子   | 350000 | 370000
佐藤次郎   | 400000 | 400000
高橋一郎   | 390000 | 370000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 400000, '営業'), (2, '鈴木花子', 350000, '開発'), (3, '佐藤次郎', 400000, '営業'), (4, '高橋一郎', 390000, '開発');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="subqueries" lessonId="inline-view" />
      </div>
      <LessonNav lessons={lessons} currentId="inline-view" basePath="/learn/subqueries" />
    </div>
  );
}
