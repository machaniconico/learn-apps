import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function GapsIslandsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ギャップ＆アイランド</h1>
        <p className="text-gray-400">連続した値の欠損（ギャップ）と連続区間（アイランド）を検出する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ギャップ＆アイランドとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ギャップ（Gap）とは連続するはずのデータの欠けた部分、アイランド（Island）とは連続している区間のことです。
          たとえば「連続ログイン日数の計算」「欠品期間の検出」「連続した注文番号の確認」などに応用できます。
          ウィンドウ関数と行番号の差分を使う技法が定番のアプローチです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">LAG/LEAD</code> — 前後の値との差分でギャップを検出</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ROW_NUMBER差分</code> — 連続区間を識別するグループ番号を生成</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">MIN/MAX + GROUP BY</code> — 各アイランドの開始・終了を取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 欠番（ギャップ）を検出する</h2>
        <SqlEditor
          defaultCode={`-- 注文IDの欠番を検出
SELECT prev_id + 1 AS gap_start, id - 1 AS gap_end
FROM (
  SELECT id, LAG(id) OVER (ORDER BY id) AS prev_id
  FROM orders
) t
WHERE id - prev_id > 1;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO orders VALUES (1,1,5000),(2,1,3000),(5,2,8000),(6,2,12000),(10,3,4000),(11,3,7000);`}
          expectedOutput={`gap_start | gap_end
----------+--------
3         | 4
7         | 9`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 連続ログイン区間（アイランド）を検出</h2>
        <SqlEditor
          defaultCode={`-- 連続ログイン区間を特定
WITH numbered AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn,
         DATE(login_date, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) || ' days') AS grp
  FROM logins
),
islands AS (
  SELECT user_id, MIN(login_date) AS start_date, MAX(login_date) AS end_date,
         COUNT(*) AS consecutive_days
  FROM numbered GROUP BY user_id, grp
)
SELECT * FROM islands ORDER BY user_id, start_date;`}
          setupSql={`CREATE TABLE logins (user_id INTEGER, login_date TEXT, PRIMARY KEY (user_id, login_date));
INSERT INTO logins VALUES (1,'2024-01-01'),(1,'2024-01-02'),(1,'2024-01-03'),(1,'2024-01-05'),(1,'2024-01-06'),(2,'2024-01-01'),(2,'2024-01-02'),(2,'2024-01-04');`}
          expectedOutput={`user_id | start_date | end_date   | consecutive_days
--------+------------+------------+-----------------
1       | 2024-01-01 | 2024-01-03 | 3
1       | 2024-01-05 | 2024-01-06 | 2
2       | 2024-01-01 | 2024-01-02 | 2
2       | 2024-01-04 | 2024-01-04 | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 在庫ゼロ期間を検出</h2>
        <SqlEditor
          defaultCode={`-- 在庫が0になっていた期間を検出
SELECT product_id,
       MIN(check_date) AS out_of_stock_start,
       MAX(check_date) AS out_of_stock_end,
       COUNT(*) AS days_out
FROM (
  SELECT product_id, check_date,
         DATE(check_date, '-' || ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY check_date) || ' days') AS grp
  FROM stock_checks
  WHERE stock = 0
) t
GROUP BY product_id, grp
ORDER BY product_id, out_of_stock_start;`}
          setupSql={`CREATE TABLE stock_checks (product_id INTEGER, check_date TEXT, stock INTEGER, PRIMARY KEY (product_id, check_date));
INSERT INTO stock_checks VALUES (1,'2024-01-01',10),(1,'2024-01-02',0),(1,'2024-01-03',0),(1,'2024-01-04',5),(1,'2024-01-05',0),(2,'2024-01-01',0),(2,'2024-01-02',0),(2,'2024-01-03',3);`}
          expectedOutput={`product_id | out_of_stock_start | out_of_stock_end | days_out
-----------+--------------------+------------------+---------
1          | 2024-01-02         | 2024-01-03       | 2
1          | 2024-01-05         | 2024-01-05       | 1
2          | 2024-01-01         | 2024-01-02       | 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="gaps-islands" />
      </div>
      <LessonNav lessons={lessons} currentId="gaps-islands" basePath="/learn/practical" />
    </div>
  );
}
