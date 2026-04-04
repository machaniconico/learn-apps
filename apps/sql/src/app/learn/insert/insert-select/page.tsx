import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function InsertSelectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">INSERT SELECT</h1>
        <p className="text-gray-400">SELECT結果をテーブルに挿入 — クエリ結果をそのままINSERTする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INSERT SELECTとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INSERT SELECTはVALUES句の代わりにSELECT文を使い、クエリ結果を別テーブルに挿入します。
          テーブル間のデータコピー、集計結果の保存、アーカイブ処理などで活躍します。
          SELECTが返すカラム数と型がINSERT先のカラムと一致している必要があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT INTO t (cols) SELECT ... FROM ...</code> — 基本構文</li>
          <li><span className="text-orange-400">大量データ</span> — バッチ処理でのデータ移動に最適</li>
          <li><span className="text-orange-400">WHERE・JOIN</span> — SELECTに通常の絞り込みが使える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CREATE TABLE AS SELECT</h2>
        <p className="text-gray-300 leading-relaxed">
          テーブルが存在しない場合は <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE new_table AS SELECT ...</code>
          でテーブル作成と同時にデータを挿入できます。
          テスト用テーブルや一時集計テーブルの作成に便利です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 別テーブルからデータをコピー</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products_backup (id, name, price, category)
SELECT id, name, price, category
FROM products;

SELECT * FROM products_backup;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
2  | マウス     | 3000   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
CREATE TABLE products_backup (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 条件付きでコピー</h2>
        <SqlEditor
          defaultCode={`-- 高額商品だけをプレミアムテーブルに移す
INSERT INTO premium_products (id, name, price)
SELECT id, name, price
FROM products
WHERE price >= 10000;

SELECT * FROM premium_products;`}
          expectedOutput={`id | name     | price
---|----------|--------
1  | ノートPC | 120000
4  | モニター | 45000`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
CREATE TABLE premium_products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器'), (4, 'モニター', 45000, 'ディスプレイ');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 集計結果をサマリテーブルに挿入</h2>
        <SqlEditor
          defaultCode={`INSERT INTO dept_summary (dept, emp_count, avg_salary)
SELECT dept, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept;

SELECT * FROM dept_summary;`}
          expectedOutput={`dept | emp_count | avg_salary
-----|-----------|----------
営業 | 2         | 400000
開発 | 2         | 385000`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, dept TEXT);
CREATE TABLE dept_summary (dept TEXT, emp_count INTEGER, avg_salary REAL);
INSERT INTO employees VALUES (1, '田中太郎', 450000, '営業'), (2, '鈴木花子', 350000, '営業'), (3, '佐藤次郎', 380000, '開発'), (4, '高橋一郎', 390000, '開発');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="insert-select" />
      </div>
      <LessonNav lessons={lessons} currentId="insert-select" basePath="/learn/insert" />
    </div>
  );
}
