import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "set-operations")!.lessons;

export default function UnionAllPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">集合演算 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UNION ALL</h1>
        <p className="text-gray-400">重複を含む和集合を返すUNION ALLとUNIONとの違いを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">UNION ALLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300 bg-gray-800 px-1.5 py-0.5 rounded">UNION ALL</code>は2つのSELECT文の結果をすべてそのまま結合します。
          UNIONと異なり重複排除の処理を行わないため、パフォーマンスが高く、
          全行を保持したい場合に使います。
          売上データのように同じ内容が複数回登場することがある場合はUNION ALLが適切です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>重複排除しないため、UNIONより高速</li>
          <li>重複を意図的に保持したいときに使う</li>
          <li>全件数を正確に数えたい場合はUNION ALLが正しい</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: UNION vs UNION ALLの比較</h2>
        <SqlEditor
          defaultCode={`-- UNION: 重複排除
SELECT '--- UNION ---' AS result, '' AS dummy WHERE 1=0
UNION ALL SELECT '=== UNION（重複除去）===', '';

SELECT name FROM team_a UNION SELECT name FROM team_b;

-- UNION ALL: 重複保持
SELECT '=== UNION ALL（重複保持）===', '';

SELECT name FROM team_a UNION ALL SELECT name FROM team_b ORDER BY name;`}
          setupSql={`CREATE TABLE team_a (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE team_b (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
INSERT INTO team_a VALUES (1, '田中太郎'), (2, '鈴木花子'), (3, '佐藤一郎');
INSERT INTO team_b VALUES (1, '鈴木花子'), (2, '山田二郎'), (3, '佐藤一郎');`}
          expectedOutput={`name
--------
佐藤一郎
鈴木花子
山田二郎
田中太郎

name
--------
佐藤一郎
佐藤一郎
山田二郎
鈴木花子
鈴木花子
田中太郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数月の売上を全件結合</h2>
        <SqlEditor
          defaultCode={`-- 1月と2月の売上を全件結合（UNION ALLで重複保持）
SELECT '2024-01' AS month, product, amount FROM sales_jan
UNION ALL
SELECT '2024-02' AS month, product, amount FROM sales_feb
ORDER BY month, amount DESC;`}
          setupSql={`CREATE TABLE sales_jan (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  amount INTEGER NOT NULL
);
CREATE TABLE sales_feb (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO sales_jan VALUES (1, '商品A', 50000);
INSERT INTO sales_jan VALUES (2, '商品B', 30000);
INSERT INTO sales_jan VALUES (3, '商品A', 45000);
INSERT INTO sales_feb VALUES (1, '商品A', 60000);
INSERT INTO sales_feb VALUES (2, '商品C', 25000);`}
          expectedOutput={`month   | product | amount
--------+---------+-------
2024-01 | 商品A   | 50000
2024-01 | 商品A   | 45000
2024-01 | 商品B   | 30000
2024-02 | 商品A   | 60000
2024-02 | 商品C   | 25000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: UNION ALLで集計用の全データを準備</h2>
        <SqlEditor
          defaultCode={`-- 複数テーブルのデータを統合して集計
WITH all_transactions AS (
  SELECT 'income' AS type, category, amount FROM income
  UNION ALL
  SELECT 'expense' AS type, category, amount FROM expenses
)
SELECT
  type,
  SUM(amount) AS total,
  COUNT(*) AS count
FROM all_transactions
GROUP BY type;`}
          setupSql={`CREATE TABLE income (
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  amount INTEGER NOT NULL
);
CREATE TABLE expenses (
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO income VALUES (1, '給与', 300000);
INSERT INTO income VALUES (2, '副業', 50000);
INSERT INTO income VALUES (3, '給与', 300000);
INSERT INTO expenses VALUES (1, '家賃', 80000);
INSERT INTO expenses VALUES (2, '食費', 40000);
INSERT INTO expenses VALUES (3, '光熱費', 15000);`}
          expectedOutput={`type    | total  | count
--------+--------+------
expense | 135000 | 3
income  | 650000 | 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="set-operations" lessonId="union-all" />
      </div>
      <LessonNav lessons={lessons} currentId="union-all" basePath="/learn/set-operations" />
    </div>
  );
}
