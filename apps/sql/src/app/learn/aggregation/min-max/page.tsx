import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function MinMaxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">MIN・MAX関数</h1>
        <p className="text-gray-400">最小値と最大値を取得する集約関数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MIN・MAX関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MIN関数は指定したカラムの最小値を、MAX関数は最大値を返します。
          数値だけでなく、文字列（辞書順）や日付（時系列順）にも使えます。
          NULLは無視されます。対象行が0件の場合はNULLを返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">MIN(カラム名)</code> — 最小値を返す</li>
          <li><code className="text-blue-300">MAX(カラム名)</code> — 最大値を返す</li>
          <li>数値・文字列・日付すべてに使用可能（NULLは除外）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">MIN・MAXの活用場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MIN・MAXは様々な場面で活用できます。
          最低価格・最高価格の取得、最古・最新の日付の確認、最低スコア・最高スコアの取得など。
          GROUP BYと組み合わせることで「グループごとの最小・最大値」も取得できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>価格範囲の確認: <code className="text-blue-300">MIN(price) AS 最安値, MAX(price) AS 最高値</code></li>
          <li>日付範囲: <code className="text-blue-300">MIN(created_at) AS 最初の登録, MAX(created_at) AS 最後の登録</code></li>
          <li>GROUP BYと組み合わせてグループ内の最大・最小値を取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 商品の最安値・最高値</h2>
        <SqlEditor
          defaultCode={`SELECT
  MIN(price) AS 最安値,
  MAX(price) AS 最高値,
  MAX(price) - MIN(price) AS 価格差
FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');`}
          expectedOutput={`最安値 | 最高値 | 価格差
------+------+------
80    | 350  | 270`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 給与の最小・最大・範囲</h2>
        <SqlEditor
          defaultCode={`SELECT
  MIN(salary) AS 最低給与,
  MAX(salary) AS 最高給与,
  ROUND(AVG(salary), 0) AS 平均給与
FROM employees;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);`}
          expectedOutput={`最低給与  | 最高給与  | 平均給与
--------+--------+--------
300000  | 600000 | 410000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 文字列カラムへのMIN・MAX適用</h2>
        <SqlEditor
          defaultCode={`-- 辞書順で最初・最後の名前
SELECT
  MIN(name) AS 辞書順最初,
  MAX(name) AS 辞書順最後
FROM employees;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);`}
          expectedOutput={`辞書順最初 | 辞書順最後
---------+---------
佐藤一郎   | 山田次郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="min-max" />
      </div>
      <LessonNav lessons={lessons} currentId="min-max" basePath="/learn/aggregation" />
    </div>
  );
}
