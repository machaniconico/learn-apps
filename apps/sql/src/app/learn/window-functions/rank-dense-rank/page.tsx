import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function RankDenseRankPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">RANK・DENSE_RANK</h1>
        <p className="text-gray-400">同率順位を扱うRANKとDENSE_RANKの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RANK vs DENSE_RANK vs ROW_NUMBER</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          3つの順位関数はいずれも順位を付けますが、同率（タイ）の扱いが異なります。
          スポーツの順位表や売上ランキングなど、同点がある場面での使い分けが重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><span className="text-purple-300">ROW_NUMBER</span> — 同率でも必ず1,2,3（重複なし）</li>
          <li><span className="text-purple-300">RANK</span> — 同率は同じ順位、次は飛び番（1,1,3,4）</li>
          <li><span className="text-purple-300">DENSE_RANK</span> — 同率は同じ順位、次は連続番（1,1,2,3）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 3つの順位関数を比較する</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num,
  RANK()       OVER (ORDER BY score DESC) AS rank_val,
  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank_val
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
INSERT INTO students VALUES (4, '山田二郎', 92);
INSERT INTO students VALUES (5, '伊藤花代', 85);
INSERT INTO students VALUES (6, '渡辺次郎', 70);`}
          expectedOutput={`name     | score | row_num | rank_val | dense_rank_val
---------+-------+---------+----------+---------------
鈴木花子  | 92    | 1       | 1        | 1
山田二郎  | 92    | 2       | 1        | 1
田中太郎  | 85    | 3       | 3        | 2
伊藤花代  | 85    | 4       | 3        | 2
佐藤一郎  | 78    | 5       | 5        | 3
渡辺次郎  | 70    | 6       | 6        | 4`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部門別ランキング</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  name,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees
ORDER BY department, dept_rank;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', 520000);
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 400000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '営業部', 450000);
INSERT INTO employees VALUES (6, '渡辺次郎', '開発部', 520000);`}
          expectedOutput={`department | name     | salary | dept_rank
-----------+----------+--------+-----------
営業部      | 伊藤花代  | 450000 | 1
営業部      | 田中太郎  | 400000 | 2
営業部      | 佐藤一郎  | 400000 | 2
開発部      | 鈴木花子  | 520000 | 1
開発部      | 渡辺次郎  | 520000 | 1
開発部      | 山田二郎  | 480000 | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 上位N位を取得する</h2>
        <SqlEditor
          defaultCode={`-- 各部門の上位2名を取得（RANK使用、同率で2位が複数の場合も取得）
SELECT department, name, salary, dept_rank
FROM (
  SELECT
    department,
    name,
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
  FROM employees
)
WHERE dept_rank <= 2
ORDER BY department, dept_rank;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発部', 520000);
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 450000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '営業部', 380000);
INSERT INTO employees VALUES (6, '渡辺次郎', '開発部', 520000);`}
          expectedOutput={`department | name     | salary | dept_rank
-----------+----------+--------+-----------
営業部      | 佐藤一郎  | 450000 | 1
営業部      | 田中太郎  | 400000 | 2
開発部      | 鈴木花子  | 520000 | 1
開発部      | 渡辺次郎  | 520000 | 1
開発部      | 山田二郎  | 480000 | 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="rank-dense-rank" />
      </div>
      <LessonNav lessons={lessons} currentId="rank-dense-rank" basePath="/learn/window-functions" />
    </div>
  );
}
