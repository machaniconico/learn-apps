import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function DistinctAggPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DISTINCT集約</h1>
        <p className="text-gray-400">集約関数内で DISTINCT を使い、重複を排除した集計を行う方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集約関数内のDISTINCT</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          集約関数の引数に DISTINCT を指定すると、重複する値を除いてから集計します。
          <code className="text-blue-300">COUNT(DISTINCT カラム)</code> はユニークな値の数を返します。
          <code className="text-blue-300">SUM(DISTINCT カラム)</code> はユニークな値だけを合算します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">COUNT(DISTINCT カラム)</code> — ユニークな値の数をカウント</li>
          <li><code className="text-blue-300">SUM(DISTINCT カラム)</code> — 重複を除いた合計</li>
          <li><code className="text-blue-300">AVG(DISTINCT カラム)</code> — 重複を除いた平均</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">COUNT(*) vs COUNT(DISTINCT)</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">COUNT(*)</code> は全行数を返し、<code className="text-blue-300">COUNT(カラム)</code> はNULL以外の行数を返し、
          <code className="text-blue-300">COUNT(DISTINCT カラム)</code> はユニークな値の数を返します。
          例えば注文テーブルで「何人のユーザーが注文したか」を知るには COUNT(DISTINCT user_id) を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>COUNT(*): 全行数（NULLも含む）</li>
          <li>COUNT(カラム): NULL以外の行数</li>
          <li>COUNT(DISTINCT カラム): ユニークな値の数（NULLを除く）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 注文した顧客のユニーク数</h2>
        <SqlEditor
          defaultCode={`SELECT
  COUNT(*) AS 総注文数,
  COUNT(DISTINCT user_id) AS 注文した顧客数
FROM orders;`}
          setupSql={`CREATE TABLE orders (id INTEGER, user_id INTEGER, product TEXT, amount INTEGER);
INSERT INTO orders VALUES (1, 1, 'りんご', 150);
INSERT INTO orders VALUES (2, 2, 'バナナ', 80);
INSERT INTO orders VALUES (3, 1, '牛乳', 200);
INSERT INTO orders VALUES (4, 3, 'チーズ', 350);
INSERT INTO orders VALUES (5, 2, 'みかん', 100);
INSERT INTO orders VALUES (6, 1, 'バター', 280);`}
          expectedOutput={`総注文数 | 注文した顧客数
--------+------------
6       | 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部署ごとのユニーク役職数</h2>
        <SqlEditor
          defaultCode={`SELECT
  department AS 部署,
  COUNT(*) AS 社員数,
  COUNT(DISTINCT job_title) AS 役職の種類数
FROM employees
GROUP BY department;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, job_title TEXT);
INSERT INTO employees VALUES (1, '田中', '営業', '担当');
INSERT INTO employees VALUES (2, '鈴木', '開発', 'エンジニア');
INSERT INTO employees VALUES (3, '佐藤', '開発', 'エンジニア');
INSERT INTO employees VALUES (4, '山田', '営業', 'マネージャー');
INSERT INTO employees VALUES (5, '高橋', '開発', 'マネージャー');
INSERT INTO employees VALUES (6, '伊藤', '営業', '担当');`}
          expectedOutput={`部署 | 社員数 | 役職の種類数
----+------+-----------
営業  | 3    | 2
開発  | 3    | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: SUM(DISTINCT)で重複を除いた合計</h2>
        <SqlEditor
          defaultCode={`-- 通常のSUMとDISTINCT SUMの比較
SELECT
  SUM(price) AS 通常合計,
  SUM(DISTINCT price) AS 重複除外合計
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, 'みかん', 150);
INSERT INTO products VALUES (4, 'ぶどう', 200);
INSERT INTO products VALUES (5, 'もも', 200);`}
          expectedOutput={`通常合計 | 重複除外合計
--------+-----------
780     | 430`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="distinct-agg" />
      </div>
      <LessonNav lessons={lessons} currentId="distinct-agg" basePath="/learn/aggregation" />
    </div>
  );
}
