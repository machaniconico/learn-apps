import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function NestedAggPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">集約のネスト</h1>
        <p className="text-gray-400">サブクエリや CASE 式と組み合わせた集約関数の応用パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集約とCASE式の組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CASE式をSUM・COUNTと組み合わせることで、条件付きの集計ができます。
          例えば「合格者数と不合格者数を1行で表示」や「カテゴリごとの件数をピボット形式で表示」などの集計に使えます。
          これを「条件付き集計」または「ピボット集計」と呼びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SUM(CASE WHEN 条件 THEN 1 ELSE 0 END)</code> — 条件に合う行数を合計</li>
          <li><code className="text-blue-300">COUNT(CASE WHEN 条件 THEN 1 END)</code> — 条件に合う行数（ELSE NULLでCOUNTに除外）</li>
          <li>GROUP BYなしで複数の条件を1行にまとめられる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集約のネストとサブクエリ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLでは集約関数を直接ネストすること（<code className="text-blue-300">AVG(SUM(...))</code>）は通常できません。
          しかし、サブクエリを使うことで「グループごとの合計の平均」などの二段階集計が可能です。
          サブクエリで一段目の集計をし、外部クエリで二段目の集計をする構造です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>一段目の集計をサブクエリで実行</li>
          <li>外部クエリで二段目の集計を実行</li>
          <li>CTEを使うとより読みやすくなる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: CASE式で条件付きカウント</h2>
        <SqlEditor
          defaultCode={`-- 部署ごとに30歳以上と未満の人数を1行で集計
SELECT
  department AS 部署,
  COUNT(*) AS 総数,
  SUM(CASE WHEN age >= 30 THEN 1 ELSE 0 END) AS 30歳以上,
  SUM(CASE WHEN age < 30 THEN 1 ELSE 0 END) AS 30歳未満
FROM employees
GROUP BY department;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, age INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 25, 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 32, 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 28, 380000);
INSERT INTO employees VALUES (4, '山田次郎', '営業', 45, 420000);
INSERT INTO employees VALUES (5, '高橋美咲', '開発', 30, 600000);
INSERT INTO employees VALUES (6, '伊藤健二', '営業', 35, 380000);`}
          expectedOutput={`部署 | 総数 | 30歳以上 | 30歳未満
----+----+--------+--------
営業  | 3  | 2      | 1
開発  | 3  | 2      | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: サブクエリを使った二段階集計</h2>
        <SqlEditor
          defaultCode={`-- 部署ごとの給与合計を求め、その平均を計算
SELECT ROUND(AVG(dept_total), 0) AS 部署給与合計の平均
FROM (
  SELECT department, SUM(salary) AS dept_total
  FROM employees
  GROUP BY department
) AS dept_summary;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`部署給与合計の平均
---------------
490000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 全体平均と比較した集計</h2>
        <SqlEditor
          defaultCode={`-- 各部署の平均給与と全社平均の差を表示
SELECT
  department AS 部署,
  ROUND(AVG(salary), 0) AS 部署平均給与,
  ROUND(AVG(salary) - (SELECT AVG(salary) FROM employees), 0) AS 全社平均との差
FROM employees
GROUP BY department
ORDER BY 全社平均との差 DESC;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`部署 | 部署平均給与 | 全社平均との差
----+----------+-----------
開発  | 490000   | 81667
営業  | 340000   | -68333
人事  | 320000   | -88333`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="nested-agg" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-agg" basePath="/learn/aggregation" />
    </div>
  );
}
