import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function LagLeadPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LAG・LEAD</h1>
        <p className="text-gray-400">前後の行の値を参照するLAGとLEAD関数で時系列分析を行います。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LAGとLEADとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">LAG(col, n)</code>は現在行のn行前の値を、
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">LEAD(col, n)</code>はn行後の値を返します。
          nを省略すると1行前/後になります。
          前月比・前日比などの時系列比較や、連続する行の差分計算に非常に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">LAG(col)</code> — 1行前の値（前の値がなければNULL）</li>
          <li><code className="text-purple-300">LAG(col, 2)</code> — 2行前の値</li>
          <li><code className="text-purple-300">LAG(col, 1, 0)</code> — 1行前の値、なければデフォルト値0</li>
          <li><code className="text-purple-300">LEAD(col)</code> — 1行後の値</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 前月比の計算</h2>
        <SqlEditor
          defaultCode={`SELECT
  month,
  sales,
  LAG(sales) OVER (ORDER BY month) AS prev_sales,
  sales - LAG(sales) OVER (ORDER BY month) AS diff,
  ROUND(
    CAST(sales - LAG(sales) OVER (ORDER BY month) AS REAL)
    / LAG(sales) OVER (ORDER BY month) * 100,
    1
  ) AS growth_rate
FROM monthly_sales
ORDER BY month;`}
          setupSql={`CREATE TABLE monthly_sales (
  month TEXT PRIMARY KEY,
  sales INTEGER NOT NULL
);
INSERT INTO monthly_sales VALUES ('2024-01', 100000);
INSERT INTO monthly_sales VALUES ('2024-02', 120000);
INSERT INTO monthly_sales VALUES ('2024-03', 115000);
INSERT INTO monthly_sales VALUES ('2024-04', 135000);
INSERT INTO monthly_sales VALUES ('2024-05', 128000);`}
          expectedOutput={`month   | sales  | prev_sales | diff   | growth_rate
--------+--------+------------+--------+------------
2024-01 | 100000 | NULL       | NULL   | NULL
2024-02 | 120000 | 100000     | 20000  | 20.0
2024-03 | 115000 | 120000     | -5000  | -4.2
2024-04 | 135000 | 115000     | 20000  | 17.4
2024-05 | 128000 | 135000     | -7000  | -5.2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: LEADで次の値を参照</h2>
        <SqlEditor
          defaultCode={`SELECT
  event_date,
  event_name,
  LEAD(event_date) OVER (ORDER BY event_date) AS next_event_date,
  CAST(
    JULIANDAY(LEAD(event_date) OVER (ORDER BY event_date))
    - JULIANDAY(event_date)
  AS INTEGER) AS days_until_next
FROM events
ORDER BY event_date;`}
          setupSql={`CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  event_date TEXT NOT NULL,
  event_name TEXT NOT NULL
);
INSERT INTO events VALUES (1, '2024-01-15', '新年会');
INSERT INTO events VALUES (2, '2024-03-20', '春季セミナー');
INSERT INTO events VALUES (3, '2024-06-10', '夏祭り');
INSERT INTO events VALUES (4, '2024-09-05', '秋のイベント');`}
          expectedOutput={`event_date | event_name    | next_event_date | days_until_next
-----------+---------------+-----------------+----------------
2024-01-15 | 新年会         | 2024-03-20      | 65
2024-03-20 | 春季セミナー    | 2024-06-10      | 82
2024-06-10 | 夏祭り         | 2024-09-05      | 87
2024-09-05 | 秋のイベント    | NULL            | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: デフォルト値付きLAG</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  salary,
  LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary,
  salary - LAG(salary, 1, 0) OVER (ORDER BY salary) AS diff_from_prev
FROM employees
ORDER BY salary;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', 380000);
INSERT INTO employees VALUES (3, '佐藤一郎', 420000);
INSERT INTO employees VALUES (4, '山田二郎', 500000);`}
          expectedOutput={`name     | salary | prev_salary | diff_from_prev
---------+--------+-------------+---------------
田中太郎  | 300000 | 0           | 300000
鈴木花子  | 380000 | 300000      | 80000
佐藤一郎  | 420000 | 380000      | 40000
山田二郎  | 500000 | 420000      | 80000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="lag-lead" />
      </div>
      <LessonNav lessons={lessons} currentId="lag-lead" basePath="/learn/window-functions" />
    </div>
  );
}
