import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function FirstLastPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">FIRST_VALUE・LAST_VALUE</h1>
        <p className="text-gray-400">ウィンドウ内の先頭・末尾の値を取得する関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FIRST_VALUE・LAST_VALUEとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">FIRST_VALUE(col)</code>はウィンドウの最初の行の値を、
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">LAST_VALUE(col)</code>はウィンドウの最後の行の値を返します。
          LAST_VALUEはデフォルトのフレーム範囲（現在行まで）の影響を受けるため、
          正確な末尾の値を得るにはフレーム句の指定が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">FIRST_VALUE(col) OVER (ORDER BY col)</code> — ウィンドウ先頭の値</li>
          <li><code className="text-purple-300">LAST_VALUE(col) OVER (... ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)</code> — ウィンドウ末尾の値</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: FIRST_VALUEで最高スコアを各行に表示</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  score,
  FIRST_VALUE(name) OVER (ORDER BY score DESC) AS top_student,
  FIRST_VALUE(score) OVER (ORDER BY score DESC) AS top_score,
  score - FIRST_VALUE(score) OVER (ORDER BY score DESC) AS diff_from_top
FROM students
ORDER BY score DESC;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO students VALUES (1, '田中太郎', 85);
INSERT INTO students VALUES (2, '鈴木花子', 92);
INSERT INTO students VALUES (3, '佐藤一郎', 78);
INSERT INTO students VALUES (4, '山田二郎', 88);`}
          expectedOutput={`name     | score | top_student | top_score | diff_from_top
---------+-------+-------------+-----------+--------------
鈴木花子  | 92    | 鈴木花子     | 92        | 0
山田二郎  | 88    | 鈴木花子     | 92        | -4
田中太郎  | 85    | 鈴木花子     | 92        | -7
佐藤一郎  | 78    | 鈴木花子     | 92        | -14`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部門別の最初・最後の採用者</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  name,
  hire_date,
  FIRST_VALUE(name) OVER (
    PARTITION BY department ORDER BY hire_date
  ) AS first_hire,
  FIRST_VALUE(name) OVER (
    PARTITION BY department ORDER BY hire_date DESC
  ) AS latest_hire
FROM employees
ORDER BY department, hire_date;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  hire_date TEXT NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', '2018-04-01');
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', '2019-07-15');
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', '2020-10-01');
INSERT INTO employees VALUES (4, '山田二郎', '開発部', '2017-01-10');
INSERT INTO employees VALUES (5, '伊藤花代', '営業部', '2022-04-01');`}
          expectedOutput={`department | name     | hire_date  | first_hire | latest_hire
-----------+----------+------------+------------+------------
営業部      | 田中太郎  | 2018-04-01 | 田中太郎    | 伊藤花代
営業部      | 佐藤一郎  | 2020-10-01 | 田中太郎    | 伊藤花代
営業部      | 伊藤花代  | 2022-04-01 | 田中太郎    | 伊藤花代
開発部      | 山田二郎  | 2017-01-10 | 山田二郎    | 鈴木花子
開発部      | 鈴木花子  | 2019-07-15 | 山田二郎    | 鈴木花子`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: LAST_VALUEにフレーム句を指定</h2>
        <SqlEditor
          defaultCode={`SELECT
  month,
  sales,
  LAST_VALUE(sales) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS last_month_sales
FROM monthly_sales
ORDER BY month;`}
          setupSql={`CREATE TABLE monthly_sales (
  month TEXT PRIMARY KEY,
  sales INTEGER NOT NULL
);
INSERT INTO monthly_sales VALUES ('2024-01', 100000);
INSERT INTO monthly_sales VALUES ('2024-02', 120000);
INSERT INTO monthly_sales VALUES ('2024-03', 115000);
INSERT INTO monthly_sales VALUES ('2024-04', 130000);`}
          expectedOutput={`month   | sales  | last_month_sales
--------+--------+-----------------
2024-01 | 100000 | 130000
2024-02 | 120000 | 130000
2024-03 | 115000 | 130000
2024-04 | 130000 | 130000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="first-last" />
      </div>
      <LessonNav lessons={lessons} currentId="first-last" basePath="/learn/window-functions" />
    </div>
  );
}
