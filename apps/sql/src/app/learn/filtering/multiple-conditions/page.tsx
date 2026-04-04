import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function MultipleConditionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複合条件</h1>
        <p className="text-gray-400">括弧と演算子の優先順位を理解して複雑な条件を正確に指定する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演算子の優先順位</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLの論理演算子には優先順位があります。NOT が最も高く、次に AND、そして OR の順です。
          この優先順位を意識しないと、意図と異なる結果になることがあります。
          括弧を使うことで、評価の順序を明示的に制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>優先順位（高い順）: <code className="text-blue-300">NOT &gt; AND &gt; OR</code></li>
          <li><code className="text-blue-300">A OR B AND C</code> は <code className="text-blue-300">A OR (B AND C)</code> と解釈される</li>
          <li>意図を明確にするために括弧を積極的に使う</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複合条件の設計方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複合条件を書くときは、まず日本語で条件を整理してから SQL に落とし込むと間違いが少なくなります。
          例：「開発部または営業部に所属し、かつ給与が40万円以上の社員」
          → <code className="text-blue-300">WHERE (department = '開発' OR department = '営業') AND salary &gt;= 400000</code>
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>「かつ（AND）」と「または（OR）」を明確に区別する</li>
          <li>ORでまとめる条件は括弧でグループ化する</li>
          <li>条件が複雑になったら IN演算子での置き換えを検討する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 括弧なしと括弧ありの違い</h2>
        <SqlEditor
          defaultCode={`-- 括弧なし: 営業部 OR (開発部かつ給与>=400000)
SELECT name, department, salary FROM employees
WHERE department = '営業' OR department = '開発' AND salary >= 400000;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 350000);
INSERT INTO employees VALUES (4, '山田次郎', '人事', 320000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 380000);`}
          expectedOutput={`name     | department | salary
---------+------------+--------
田中太郎  | 営業        | 300000
鈴木花子  | 開発        | 450000
高橋美咲  | 営業        | 380000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 括弧で優先順位を制御</h2>
        <SqlEditor
          defaultCode={`-- 括弧あり: (営業部 OR 開発部) かつ給与>=400000
SELECT name, department, salary FROM employees
WHERE (department = '営業' OR department = '開発') AND salary >= 400000;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '開発', 350000);
INSERT INTO employees VALUES (4, '山田次郎', '人事', 320000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 420000);`}
          expectedOutput={`name     | department | salary
---------+------------+--------
鈴木花子  | 開発        | 450000
高橋美咲  | 営業        | 420000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数の条件を組み合わせた実践例</h2>
        <SqlEditor
          defaultCode={`-- 果物カテゴリで100円以上、または乳製品で300円以上の商品
SELECT name, category, price FROM products
WHERE (category = '果物' AND price >= 100)
   OR (category = '乳製品' AND price >= 300);`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', '果物', 150);
INSERT INTO products VALUES (2, 'バナナ', '果物', 80);
INSERT INTO products VALUES (3, '牛乳', '乳製品', 200);
INSERT INTO products VALUES (4, 'チーズ', '乳製品', 350);
INSERT INTO products VALUES (5, 'みかん', '果物', 120);
INSERT INTO products VALUES (6, 'バター', '乳製品', 300);`}
          expectedOutput={`name   | category | price
-------+----------+-------
りんご  | 果物      | 150
チーズ  | 乳製品    | 350
みかん  | 果物      | 120
バター  | 乳製品    | 300`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="multiple-conditions" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-conditions" basePath="/learn/filtering" />
    </div>
  );
}
