import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function ControlFlowPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">制御構文</h1>
        <p className="text-gray-400">IF・CASE・WHILE・LOOPでプロシージャに分岐と繰り返しを加える</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">制御構文の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストアドプロシージャでは一般的なプログラミング言語と同様に条件分岐や繰り返しが使えます。
          IFは条件に応じて異なる処理を行い、CASEは多分岐の条件評価に適しています。
          WHILEやLOOPは繰り返し処理に使いますが、SQLではCASE式やウィンドウ関数で多くのケースを置き換えられます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">IF ... THEN ... ELSE</code> — 条件分岐</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CASE WHEN ... THEN</code> — 多分岐（SQL内でも使える）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">WHILE condition DO</code> — 条件が真の間繰り返す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: CASE式で注文ランクを分類</h2>
        <SqlEditor
          defaultCode={`-- IF/CASE 相当: 売上金額でランク分け
SELECT id, customer_id, total,
  CASE
    WHEN total >= 100000 THEN 'プレミアム'
    WHEN total >= 50000  THEN 'ゴールド'
    WHEN total >= 10000  THEN 'シルバー'
    ELSE 'スタンダード'
  END AS rank
FROM orders ORDER BY total DESC;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO orders VALUES (1,1,5000),(2,2,120000),(3,1,15000),(4,3,55000),(5,2,3000),(6,3,95000);`}
          expectedOutput={`id | customer_id | total  | rank
---+-------------+--------+------------
2  | 2           | 120000 | プレミアム
6  | 3           | 95000  | ゴールド
4  | 3           | 55000  | ゴールド
3  | 1           | 15000  | シルバー
1  | 1           | 5000   | スタンダード
5  | 2           | 3000   | スタンダード`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CASE式で動的な値変換</h2>
        <SqlEditor
          defaultCode={`-- ステータスコードを日本語ラベルに変換
SELECT id, status,
  CASE status
    WHEN 'pending'   THEN '保留中'
    WHEN 'confirmed' THEN '確定済み'
    WHEN 'shipped'   THEN '発送済み'
    WHEN 'delivered' THEN '配達完了'
    WHEN 'cancelled' THEN 'キャンセル'
    ELSE '不明'
  END AS status_label
FROM orders;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, status TEXT);
INSERT INTO orders VALUES (1,1,'delivered'),(2,2,'shipped'),(3,1,'confirmed'),(4,3,'pending'),(5,2,'cancelled');`}
          expectedOutput={`id | status    | status_label
---+-----------+------------
1  | delivered | 配達完了
2  | shipped   | 発送済み
3  | confirmed | 確定済み
4  | pending   | 保留中
5  | cancelled | キャンセル`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 再帰CTEでLOOPを模擬</h2>
        <SqlEditor
          defaultCode={`-- WHILE ループ相当: 再帰CTEで1から10の合計を計算
WITH RECURSIVE counter(n, total) AS (
  SELECT 1, 1
  UNION ALL
  SELECT n + 1, total + (n + 1) FROM counter WHERE n < 10
)
SELECT n, total FROM counter ORDER BY n;`}
          setupSql={``}
          expectedOutput={`n  | total
---+------
1  | 1
2  | 3
3  | 6
4  | 10
5  | 15
6  | 21
7  | 28
8  | 36
9  | 45
10 | 55`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="control-flow" />
      </div>
      <LessonNav lessons={lessons} currentId="control-flow" basePath="/learn/stored-procedures" />
    </div>
  );
}
