import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function TopNPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">上位N件取得</h1>
        <p className="text-gray-400">ランキングや上位・下位N件を取得するクエリパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Top-Nクエリとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          「売上上位5商品」「最新10件の注文」「給与が最も高い社員3名」などを取得するパターンを
          Top-Nクエリと呼びます。ORDER BY と LIMIT を組み合わせることで簡単に実装できます。
          ランキング表示やダッシュボードのサマリー表示によく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ORDER BY カラム DESC LIMIT N</code> — 上位N件</li>
          <li><code className="text-blue-300">ORDER BY カラム ASC LIMIT N</code> — 下位N件</li>
          <li>同順位を含める場合はウィンドウ関数（RANK）が適切</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">サブカテゴリ内でのTop-N</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          「各カテゴリの上位N件」といったサブグループ内のTop-Nは、基本的なLIMITでは難しく、
          ウィンドウ関数やサブクエリが必要になります。
          ここでは単一グループでのTop-Nパターンを中心に練習しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>全体の上位N件: <code className="text-blue-300">ORDER BY value DESC LIMIT N</code></li>
          <li>グループ内の上位N件は ROW_NUMBER() などのウィンドウ関数を使う</li>
          <li>LIMIT 1 で最大値・最小値の行を取得できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 売上上位3商品</h2>
        <SqlEditor
          defaultCode={`-- 売上金額が高い商品トップ3
SELECT name, sales_amount FROM sales
ORDER BY sales_amount DESC
LIMIT 3;`}
          setupSql={`CREATE TABLE sales (id INTEGER, name TEXT, sales_amount INTEGER);
INSERT INTO sales VALUES (1, 'りんご', 45000);
INSERT INTO sales VALUES (2, 'バナナ', 32000);
INSERT INTO sales VALUES (3, '牛乳', 78000);
INSERT INTO sales VALUES (4, 'チーズ', 25000);
INSERT INTO sales VALUES (5, 'みかん', 56000);
INSERT INTO sales VALUES (6, 'バター', 41000);`}
          expectedOutput={`name   | sales_amount
-------+-------------
牛乳    | 78000
みかん  | 56000
りんご  | 45000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 最安値の商品1件</h2>
        <SqlEditor
          defaultCode={`-- 最も安い商品を1件取得
SELECT name, price FROM products
ORDER BY price ASC
LIMIT 1;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');`}
          expectedOutput={`name   | price
-------+-------
バナナ  | 80`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 条件を絞った上位N件</h2>
        <SqlEditor
          defaultCode={`-- 開発部門の給与上位2名
SELECT name, department, salary FROM employees
WHERE department = '開発'
ORDER BY salary DESC
LIMIT 2;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 380000);
INSERT INTO employees VALUES (4, '山田次郎', '開発', 600000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 420000);`}
          expectedOutput={`name     | department | salary
---------+------------+--------
山田次郎  | 開発        | 600000
鈴木花子  | 開発        | 450000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="top-n" />
      </div>
      <LessonNav lessons={lessons} currentId="top-n" basePath="/learn/sorting" />
    </div>
  );
}
