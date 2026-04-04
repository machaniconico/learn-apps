import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function RecursiveCTEPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰CTE</h1>
        <p className="text-gray-400">WITH RECURSIVEを使って繰り返し処理や階層データを扱う方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰CTEの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300 bg-gray-800 px-1.5 py-0.5 rounded">WITH RECURSIVE</code>を使うと、
          CTEが自分自身を参照する再帰クエリを書けます。
          アンカー部分（初期値）と再帰部分（繰り返し条件）を
          <code className="text-violet-300 bg-gray-800 px-1.5 py-0.5 rounded">UNION ALL</code>で結合して定義します。
          終了条件がなければ無限ループになるため注意が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>アンカー部分: 再帰の開始点となる初期クエリ</li>
          <li>再帰部分: 前の結果を参照してさらに行を生成するクエリ</li>
          <li>UNION ALLで両方を結合する</li>
          <li>WHERE句などで終了条件を必ず指定する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 連番を生成する</h2>
        <SqlEditor
          defaultCode={`WITH RECURSIVE counter(n) AS (
  -- アンカー部分（初期値）
  SELECT 1
  UNION ALL
  -- 再帰部分（前の結果+1）
  SELECT n + 1
  FROM counter
  WHERE n < 10  -- 終了条件
)
SELECT n FROM counter;`}
          expectedOutput={`n
--
1
2
3
4
5
6
7
8
9
10`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: フィボナッチ数列の生成</h2>
        <SqlEditor
          defaultCode={`WITH RECURSIVE fibonacci(n, a, b) AS (
  -- アンカー: F(1)=1, F(2)=1
  SELECT 1, 0, 1
  UNION ALL
  -- 再帰: 次の数 = 前の2つの和
  SELECT n + 1, b, a + b
  FROM fibonacci
  WHERE n < 10
)
SELECT n AS position, b AS fibonacci_value
FROM fibonacci;`}
          expectedOutput={`position | fibonacci_value
---------+---------------
1        | 1
2        | 1
3        | 2
4        | 3
5        | 5
6        | 8
7        | 13
8        | 21
9        | 34
10       | 55`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 日付範囲の生成</h2>
        <SqlEditor
          defaultCode={`WITH RECURSIVE date_range(dt) AS (
  SELECT DATE('2024-01-01')
  UNION ALL
  SELECT DATE(dt, '+1 day')
  FROM date_range
  WHERE dt < DATE('2024-01-07')
)
SELECT
  dt AS date,
  STRFTIME('%w', dt) AS weekday_num,
  CASE STRFTIME('%w', dt)
    WHEN '0' THEN '日'
    WHEN '1' THEN '月'
    WHEN '2' THEN '火'
    WHEN '3' THEN '水'
    WHEN '4' THEN '木'
    WHEN '5' THEN '金'
    WHEN '6' THEN '土'
  END AS weekday
FROM date_range;`}
          expectedOutput={`date       | weekday_num | weekday
-----------+-------------+--------
2024-01-01 | 1           | 月
2024-01-02 | 2           | 火
2024-01-03 | 3           | 水
2024-01-04 | 4           | 木
2024-01-05 | 5           | 金
2024-01-06 | 6           | 土
2024-01-07 | 0           | 日`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="recursive-cte" />
      </div>
      <LessonNav lessons={lessons} currentId="recursive-cte" basePath="/learn/cte" />
    </div>
  );
}
