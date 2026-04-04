import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function NtilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NTILE</h1>
        <p className="text-gray-400">行をN等分するNTILE関数でデータをグループに分割する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NTILEとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">NTILE(n)</code>は、
          ウィンドウ内の行をn個のバケット（グループ）に均等に分割し、各行にバケット番号（1〜n）を付与します。
          四分位数（4分割）やデシル分析（10分割）など、パーセンタイル系の分析でよく使われます。
          行数がnで割り切れない場合、先頭のバケットが1行多くなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-purple-300">NTILE(4)</code> — 四分位数（Q1/Q2/Q3/Q4）</li>
          <li><code className="text-purple-300">NTILE(10)</code> — デシル分析（上位10%など）</li>
          <li>バケット番号は1から始まる整数</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 成績を四分位数に分割</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  score,
  NTILE(4) OVER (ORDER BY score DESC) AS quartile,
  CASE NTILE(4) OVER (ORDER BY score DESC)
    WHEN 1 THEN '上位25%'
    WHEN 2 THEN '上位50%'
    WHEN 3 THEN '下位50%'
    WHEN 4 THEN '下位25%'
  END AS group_label
FROM students
ORDER BY score DESC;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO students VALUES (1, '田中太郎', 95);
INSERT INTO students VALUES (2, '鈴木花子', 88);
INSERT INTO students VALUES (3, '佐藤一郎', 82);
INSERT INTO students VALUES (4, '山田二郎', 79);
INSERT INTO students VALUES (5, '伊藤花代', 73);
INSERT INTO students VALUES (6, '渡辺次郎', 68);
INSERT INTO students VALUES (7, '加藤三郎', 61);
INSERT INTO students VALUES (8, '中村四郎', 55);`}
          expectedOutput={`name     | score | quartile | group_label
---------+-------+----------+------------
田中太郎  | 95    | 1        | 上位25%
鈴木花子  | 88    | 1        | 上位25%
佐藤一郎  | 82    | 2        | 上位50%
山田二郎  | 79    | 2        | 上位50%
伊藤花代  | 73    | 3        | 下位50%
渡辺次郎  | 68    | 3        | 下位50%
加藤三郎  | 61    | 4        | 下位25%
中村四郎  | 55    | 4        | 下位25%`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 売上上位・下位の分析</h2>
        <SqlEditor
          defaultCode={`SELECT
  product,
  sales,
  NTILE(3) OVER (ORDER BY sales DESC) AS tier,
  CASE NTILE(3) OVER (ORDER BY sales DESC)
    WHEN 1 THEN 'A（高）'
    WHEN 2 THEN 'B（中）'
    WHEN 3 THEN 'C（低）'
  END AS tier_label
FROM product_sales
ORDER BY sales DESC;`}
          setupSql={`CREATE TABLE product_sales (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  sales INTEGER NOT NULL
);
INSERT INTO product_sales VALUES (1, '商品A', 500000);
INSERT INTO product_sales VALUES (2, '商品B', 420000);
INSERT INTO product_sales VALUES (3, '商品C', 380000);
INSERT INTO product_sales VALUES (4, '商品D', 310000);
INSERT INTO product_sales VALUES (5, '商品E', 260000);
INSERT INTO product_sales VALUES (6, '商品F', 150000);`}
          expectedOutput={`product | sales  | tier | tier_label
--------+--------+------+-----------
商品A    | 500000 | 1    | A（高）
商品B    | 420000 | 1    | A（高）
商品C    | 380000 | 2    | B（中）
商品D    | 310000 | 2    | B（中）
商品E    | 260000 | 3    | C（低）
商品F    | 150000 | 3    | C（低）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: グループ別NTILE</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  name,
  salary,
  NTILE(2) OVER (PARTITION BY department ORDER BY salary DESC) AS half
FROM employees
ORDER BY department, half, salary DESC;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部', 400000);
INSERT INTO employees VALUES (2, '鈴木花子', '営業部', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 380000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 520000);
INSERT INTO employees VALUES (5, '伊藤花代', '開発部', 480000);
INSERT INTO employees VALUES (6, '渡辺次郎', '開発部', 500000);`}
          expectedOutput={`department | name     | salary | half
-----------+----------+--------+-----
営業部      | 鈴木花子  | 450000 | 1
営業部      | 田中太郎  | 400000 | 1
営業部      | 佐藤一郎  | 380000 | 2
開発部      | 山田二郎  | 520000 | 1
開発部      | 渡辺次郎  | 500000 | 1
開発部      | 伊藤花代  | 480000 | 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="ntile" />
      </div>
      <LessonNav lessons={lessons} currentId="ntile" basePath="/learn/window-functions" />
    </div>
  );
}
