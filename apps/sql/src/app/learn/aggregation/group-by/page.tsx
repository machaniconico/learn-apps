import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function GroupByPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">GROUP BY</h1>
        <p className="text-gray-400">グループごとに集約する GROUP BY 句の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GROUP BYとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GROUP BY句は、指定したカラムの値が同じ行をひとつのグループにまとめ、グループごとに集約計算を行います。
          例えば「部署ごとの平均給与」や「カテゴリごとの商品数」を求めるときに使います。
          GROUP BYを使うとき、SELECT句には GROUP BY で指定したカラムか集約関数のみ書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">GROUP BY カラム名</code> — そのカラムでグループ化</li>
          <li><code className="text-blue-300">GROUP BY カラム1, カラム2</code> — 複数カラムでグループ化</li>
          <li>SELECT句には GROUP BY カラムか集約関数のみ書ける</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SELECT句で使えるもの</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GROUP BY を使うとき、SELECT句には以下のもののみ書けます。
          GROUP BYで指定したカラム（グループ化キー）と、集約関数（COUNT、SUM、AVG、MIN、MAX）です。
          それ以外のカラムを SELECT に書くとエラーになります（一部のDBでは警告なく動作することもある）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>OK: <code className="text-blue-300">SELECT department, COUNT(*) FROM employees GROUP BY department</code></li>
          <li>NG: <code className="text-blue-300">SELECT department, name, COUNT(*) FROM employees GROUP BY department</code></li>
          <li>nameはGROUP BYにも集約関数にも含まれないためNG</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 部署ごとの社員数</h2>
        <SqlEditor
          defaultCode={`-- 部署ごとの社員数を集計
SELECT department, COUNT(*) AS 社員数
FROM employees
GROUP BY department;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);
INSERT INTO employees VALUES (6, '伊藤健二', '開発', 420000);`}
          expectedOutput={`department | 社員数
-----------+-------
営業        | 2
開発        | 3
人事        | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カテゴリごとの集計</h2>
        <SqlEditor
          defaultCode={`-- カテゴリごとの商品数・平均価格・最高価格
SELECT
  category AS カテゴリ,
  COUNT(*) AS 商品数,
  ROUND(AVG(price), 0) AS 平均価格,
  MAX(price) AS 最高価格
FROM products
GROUP BY category;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');
INSERT INTO products VALUES (6, 'バター', 280, '乳製品');`}
          expectedOutput={`カテゴリ | 商品数 | 平均価格 | 最高価格
--------+------+--------+--------
果物     | 3    | 110    | 150
乳製品   | 3    | 277    | 350`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数カラムでグループ化</h2>
        <SqlEditor
          defaultCode={`-- 部署・役職の組み合わせごとに集計
SELECT
  department AS 部署,
  job_title AS 役職,
  COUNT(*) AS 人数,
  AVG(salary) AS 平均給与
FROM employees
GROUP BY department, job_title
ORDER BY department, job_title;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, job_title TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中', '営業', '担当', 300000);
INSERT INTO employees VALUES (2, '鈴木', '開発', 'エンジニア', 450000);
INSERT INTO employees VALUES (3, '佐藤', '開発', 'エンジニア', 380000);
INSERT INTO employees VALUES (4, '山田', '営業', 'マネージャー', 500000);
INSERT INTO employees VALUES (5, '高橋', '開発', 'マネージャー', 600000);
INSERT INTO employees VALUES (6, '伊藤', '営業', '担当', 310000);`}
          expectedOutput={`部署 | 役職         | 人数 | 平均給与
----+------------+----+--------
営業  | マネージャー | 1  | 500000
営業  | 担当        | 2  | 305000
開発  | エンジニア   | 2  | 415000
開発  | マネージャー | 1  | 600000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="group-by" />
      </div>
      <LessonNav lessons={lessons} currentId="group-by" basePath="/learn/aggregation" />
    </div>
  );
}
