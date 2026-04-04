import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function CaseExpressionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CASE式</h1>
        <p className="text-gray-400">条件分岐で値を変換するCASE式の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CASE式とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CASE式はSQLにおける条件分岐の仕組みです。プログラミング言語のif-elseやswitch文に相当します。
          SELECT句・WHERE句・ORDER BY句・GROUP BY句など、ほぼあらゆる場所で使えます。
          2つの書き方があり、単純CASE式と検索CASE式があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><span className="text-green-300">単純CASE式</span> — 値の一致を検査する（switch文的）</li>
          <li><span className="text-green-300">検索CASE式</span> — 任意の条件式を評価する（if-else的）</li>
          <li>必ず<code className="text-green-300">END</code>で閉じる</li>
          <li><code className="text-green-300">ELSE</code>を省略するとNULLが返る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単純CASE式</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  status_code,
  CASE status_code
    WHEN 1 THEN '受付中'
    WHEN 2 THEN '処理中'
    WHEN 3 THEN '発送済み'
    WHEN 4 THEN '完了'
    ELSE '不明'
  END AS status_label
FROM orders;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  status_code INTEGER NOT NULL
);
INSERT INTO orders VALUES (1, '注文001', 1);
INSERT INTO orders VALUES (2, '注文002', 3);
INSERT INTO orders VALUES (3, '注文003', 4);
INSERT INTO orders VALUES (4, '注文004', 2);
INSERT INTO orders VALUES (5, '注文005', 9);`}
          expectedOutput={`name   | status_code | status_label
-------+-------------+--------------
注文001 | 1           | 受付中
注文002 | 3           | 発送済み
注文003 | 4           | 完了
注文004 | 2           | 処理中
注文005 | 9           | 不明`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 検索CASE式</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  score,
  CASE
    WHEN score >= 90 THEN 'S'
    WHEN score >= 80 THEN 'A'
    WHEN score >= 70 THEN 'B'
    WHEN score >= 60 THEN 'C'
    ELSE 'D'
  END AS grade
FROM students;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO students VALUES (1, '田中太郎', 92);
INSERT INTO students VALUES (2, '鈴木花子', 85);
INSERT INTO students VALUES (3, '佐藤一郎', 73);
INSERT INTO students VALUES (4, '山田花代', 61);
INSERT INTO students VALUES (5, '伊藤健二', 45);`}
          expectedOutput={`name     | score | grade
---------+-------+------
田中太郎  | 92    | S
鈴木花子  | 85    | A
佐藤一郎  | 73    | B
山田花代  | 61    | C
伊藤健二  | 45    | D`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: CASE式で集計する</h2>
        <SqlEditor
          defaultCode={`-- CASE式とSUM/COUNTを組み合わせてピボット集計
SELECT
  department,
  COUNT(*) AS total,
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count,
  ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  gender TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 'M', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '営業部', 'F', 380000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発部', 'M', 500000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 'M', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '開発部', 'F', 520000);
INSERT INTO employees VALUES (6, '渡辺次郎', '人事部', 'M', 350000);`}
          expectedOutput={`department | total | male_count | female_count | avg_salary
-----------+-------+------------+--------------+-----------
営業部      | 2     | 1          | 1            | 390000
開発部      | 3     | 2          | 1            | 500000
人事部      | 1     | 1          | 0            | 350000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="case-expression" />
      </div>
      <LessonNav lessons={lessons} currentId="case-expression" basePath="/learn/functions" />
    </div>
  );
}
