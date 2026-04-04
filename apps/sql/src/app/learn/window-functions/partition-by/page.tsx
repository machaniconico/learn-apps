import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "window-functions")!.lessons;

export default function PartitionByPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">ウィンドウ関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">PARTITION BY</h1>
        <p className="text-gray-400">PARTITION BYでウィンドウをグループに分割する応用パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PARTITION BYの役割</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded">PARTITION BY</code>はウィンドウ関数のOVER句内で使い、
          計算対象の行をグループに分割します。
          GROUP BYはグループを1行に集約しますが、PARTITION BYは行を集約せずにグループごとに計算します。
          各グループ内で独立した順位付けや累積計算が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>PARTITION BYを省略すると全行が1つのウィンドウになる</li>
          <li>複数カラムで分割可能: <code className="text-purple-300">PARTITION BY dept, year</code></li>
          <li>PARTITION BYとORDER BYを組み合わせてグループ内ランキングを実現</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部門別の順位付けと全体順位の比較</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  department,
  salary,
  RANK() OVER (ORDER BY salary DESC) AS overall_rank,
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
INSERT INTO employees VALUES (3, '佐藤一郎', '営業部', 450000);
INSERT INTO employees VALUES (4, '山田二郎', '開発部', 480000);
INSERT INTO employees VALUES (5, '伊藤花代', '人事部', 360000);
INSERT INTO employees VALUES (6, '渡辺次郎', '開発部', 500000);`}
          expectedOutput={`name     | department | salary | overall_rank | dept_rank
---------+------------+--------+--------------+-----------
佐藤一郎  | 営業部      | 450000 | 4            | 1
田中太郎  | 営業部      | 400000 | 5            | 2
鈴木花子  | 開発部      | 520000 | 1            | 1
渡辺次郎  | 開発部      | 500000 | 2            | 2
山田二郎  | 開発部      | 480000 | 3            | 3
伊藤花代  | 人事部      | 360000 | 6            | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部門別累積合計と部門内シェア</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  name,
  sales,
  SUM(sales) OVER (PARTITION BY department ORDER BY sales DESC) AS dept_cumulative,
  SUM(sales) OVER (PARTITION BY department) AS dept_total,
  ROUND(
    sales * 100.0 / SUM(sales) OVER (PARTITION BY department),
    1
  ) AS dept_share
FROM sales_data
ORDER BY department, sales DESC;`}
          setupSql={`CREATE TABLE sales_data (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  sales INTEGER NOT NULL
);
INSERT INTO sales_data VALUES (1, '田中太郎', '東日本', 500000);
INSERT INTO sales_data VALUES (2, '鈴木花子', '東日本', 300000);
INSERT INTO sales_data VALUES (3, '佐藤一郎', '東日本', 200000);
INSERT INTO sales_data VALUES (4, '山田二郎', '西日本', 450000);
INSERT INTO sales_data VALUES (5, '伊藤花代', '西日本', 380000);`}
          expectedOutput={`department | name     | sales  | dept_cumulative | dept_total | dept_share
-----------+----------+--------+-----------------+------------+-----------
東日本      | 田中太郎  | 500000 | 500000          | 1000000    | 50.0
東日本      | 鈴木花子  | 300000 | 800000          | 1000000    | 30.0
東日本      | 佐藤一郎  | 200000 | 1000000         | 1000000    | 20.0
西日本      | 山田二郎  | 450000 | 450000          | 830000     | 54.2
西日本      | 伊藤花代  | 380000 | 830000          | 830000     | 45.8`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数カラムによるパーティション</h2>
        <SqlEditor
          defaultCode={`SELECT
  year,
  quarter,
  region,
  revenue,
  SUM(revenue) OVER (PARTITION BY year, region) AS year_region_total,
  RANK() OVER (PARTITION BY year ORDER BY revenue DESC) AS year_rank
FROM quarterly_revenue
ORDER BY year, region, quarter;`}
          setupSql={`CREATE TABLE quarterly_revenue (
  id INTEGER PRIMARY KEY,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL,
  region TEXT NOT NULL,
  revenue INTEGER NOT NULL
);
INSERT INTO quarterly_revenue VALUES (1, 2024, 1, '東京', 200000);
INSERT INTO quarterly_revenue VALUES (2, 2024, 2, '東京', 250000);
INSERT INTO quarterly_revenue VALUES (3, 2024, 1, '大阪', 180000);
INSERT INTO quarterly_revenue VALUES (4, 2024, 2, '大阪', 220000);`}
          expectedOutput={`year | quarter | region | revenue | year_region_total | year_rank
-----+---------+--------+---------+-------------------+----------
2024 | 1       | 大阪    | 180000  | 400000            | 4
2024 | 2       | 大阪    | 220000  | 400000            | 2
2024 | 1       | 東京    | 200000  | 450000            | 3
2024 | 2       | 東京    | 250000  | 450000            | 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="window-functions" lessonId="partition-by" />
      </div>
      <LessonNav lessons={lessons} currentId="partition-by" basePath="/learn/window-functions" />
    </div>
  );
}
