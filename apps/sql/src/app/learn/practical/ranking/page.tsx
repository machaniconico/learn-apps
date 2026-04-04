import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "practical")!.lessons;

export default function RankingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">実践SQL レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ランキング</h1>
        <p className="text-gray-400">順位付けと上位N件抽出の実践的なパターンを習得する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ランキングクエリの手法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ランキングはウィンドウ関数を使うのが最もシンプルです。
          RANK()は同順位があると次の順位が飛び、DENSE_RANK()は飛ばずに連続します。
          ROW_NUMBER()は同値でも一意の番号を付与します。
          グループ内の上位N件を取得する場合はPARTITION BYと組み合わせます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">RANK()</code> — 同順位で次の順位が飛ぶ（1,1,3）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">DENSE_RANK()</code> — 同順位でも連続（1,1,2）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">NTILE(n)</code> — n等分したグループ番号を付与</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 売上ランキング（RANK vs DENSE_RANK）</h2>
        <SqlEditor
          defaultCode={`SELECT name, sales,
       RANK()       OVER (ORDER BY sales DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY sales DESC) AS dense_rank,
       ROW_NUMBER() OVER (ORDER BY sales DESC) AS row_num
FROM salespeople ORDER BY sales DESC;`}
          setupSql={`CREATE TABLE salespeople (id INTEGER PRIMARY KEY, name TEXT, sales INTEGER);
INSERT INTO salespeople VALUES (1,'田中',850000),(2,'鈴木',720000),(3,'佐藤',850000),(4,'山田',650000),(5,'伊藤',720000);`}
          expectedOutput={`name | sales  | rank | dense_rank | row_num
-----+--------+------+------------+--------
田中  | 850000 | 1    | 1          | 1
佐藤  | 850000 | 1    | 1          | 2
鈴木  | 720000 | 3    | 2          | 3
伊藤  | 720000 | 3    | 2          | 4
山田  | 650000 | 5    | 3          | 5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部署ごとの上位2名を取得</h2>
        <SqlEditor
          defaultCode={`-- 各部署のトップ2を取得（グループ内ランキング）
SELECT dept_id, name, salary, dept_rank
FROM (
  SELECT dept_id, name, salary,
         RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank
  FROM employees
) ranked
WHERE dept_rank <= 2
ORDER BY dept_id, dept_rank;`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1,'田中',1,700000),(2,'鈴木',1,600000),(3,'佐藤',1,550000),(4,'山田',2,650000),(5,'伊藤',2,680000),(6,'渡辺',2,590000);`}
          expectedOutput={`dept_id | name | salary | dept_rank
--------+------+--------+----------
1       | 田中  | 700000 | 1
1       | 鈴木  | 600000 | 2
2       | 伊藤  | 680000 | 1
2       | 山田  | 650000 | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: パーセンタイルランキング</h2>
        <SqlEditor
          defaultCode={`-- 売上の上位25%、50%、75%の区分分け
SELECT name, sales,
       NTILE(4) OVER (ORDER BY sales DESC) AS quartile,
       ROUND(PERCENT_RANK() OVER (ORDER BY sales) * 100, 1) AS percentile
FROM salespeople
ORDER BY sales DESC;`}
          setupSql={`CREATE TABLE salespeople (id INTEGER PRIMARY KEY, name TEXT, sales INTEGER);
INSERT INTO salespeople VALUES (1,'田中',850000),(2,'鈴木',720000),(3,'佐藤',850000),(4,'山田',650000),(5,'伊藤',720000),(6,'高橋',580000),(7,'中村',900000),(8,'小林',610000);`}
          expectedOutput={`name | sales  | quartile | percentile
-----+--------+----------+-----------
中村  | 900000 | 1        | 100.0
田中  | 850000 | 1        | 71.4
佐藤  | 850000 | 2        | 71.4
鈴木  | 720000 | 2        | 42.9
伊藤  | 720000 | 3        | 42.9
山田  | 650000 | 3        | 28.6
小林  | 610000 | 4        | 14.3
高橋  | 580000 | 4        | 0.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="practical" lessonId="ranking" />
      </div>
      <LessonNav lessons={lessons} currentId="ranking" basePath="/learn/practical" />
    </div>
  );
}
