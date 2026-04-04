import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function CursorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カーソル</h1>
        <p className="text-gray-400">結果セットを1行ずつ処理するカーソルの概念を理解する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カーソルとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カーソルとは、SELECTの結果セットを1行ずつ逐次処理するための仕組みです。
          通常のSQLは集合演算ですが、カーソルを使うと各行に対して個別の処理ができます。
          ただしパフォーマンスが悪いため、可能な限りSQLの集合演算で代替することが推奨されます。
          SQLiteではカーソルはサポートされていませんが、再帰CTEやウィンドウ関数で同等の処理が可能です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">DECLARE cursor CURSOR FOR SELECT</code> — カーソルを定義</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">OPEN / FETCH / CLOSE</code> — カーソルの操作</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT FOUND handler</code> — 最終行に達した時の処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 行番号付き処理をROW_NUMBERで代替</h2>
        <SqlEditor
          defaultCode={`-- カーソルで1行ずつ処理する代わりにROW_NUMBERを活用
SELECT ROW_NUMBER() OVER (ORDER BY total DESC) AS row_num,
       id, customer_id, total
FROM orders
ORDER BY total DESC;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,12000,'2024-01-20'),(3,3,3000,'2024-02-01'),(4,1,8000,'2024-02-10'),(5,2,15000,'2024-03-01');`}
          expectedOutput={`row_num | id | customer_id | total
--------+----+-------------+-------
1       | 5  | 2           | 15000
2       | 2  | 2           | 12000
3       | 4  | 1           | 8000
4       | 1  | 1           | 5000
5       | 3  | 3           | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 累積処理をウィンドウ関数で代替</h2>
        <SqlEditor
          defaultCode={`-- カーソルで累積合計を計算する代わりにウィンドウ関数を使用
SELECT id, customer_id, total, order_date,
       SUM(total) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM orders
ORDER BY order_date;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,12000,'2024-01-20'),(3,3,3000,'2024-02-01'),(4,1,8000,'2024-02-10'),(5,2,15000,'2024-03-01');`}
          expectedOutput={`id | customer_id | total | order_date | running_total
---+-------------+-------+------------+--------------
1  | 1           | 5000  | 2024-01-10 | 5000
2  | 2           | 12000 | 2024-01-20 | 17000
3  | 3           | 3000  | 2024-02-01 | 20000
4  | 1           | 8000  | 2024-02-10 | 28000
5  | 2           | 15000 | 2024-03-01 | 43000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 部署ごとの給与ランキング</h2>
        <SqlEditor
          defaultCode={`-- カーソルで部署ごとにループする代わりにPARTITION BYを使用
SELECT name, dept_id, salary,
       RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank
FROM employees
ORDER BY dept_id, dept_rank;`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1,'田中',1,600000),(2,'鈴木',1,500000),(3,'佐藤',1,700000),(4,'山田',2,450000),(5,'伊藤',2,550000),(6,'渡辺',2,480000);`}
          expectedOutput={`name | dept_id | salary | dept_rank
-----+---------+--------+----------
佐藤  | 1       | 700000 | 1
田中  | 1       | 600000 | 2
鈴木  | 1       | 500000 | 3
伊藤  | 2       | 550000 | 1
渡辺  | 2       | 480000 | 2
山田  | 2       | 450000 | 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="cursors" />
      </div>
      <LessonNav lessons={lessons} currentId="cursors" basePath="/learn/stored-procedures" />
    </div>
  );
}
