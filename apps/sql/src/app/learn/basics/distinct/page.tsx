import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function DistinctPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DISTINCT</h1>
        <p className="text-gray-400">重複する行を除外してユニークな値だけを取得する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DISTINCTとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DISTINCTキーワードを使うと、結果セットから重複する行を取り除いてユニークな値だけを返します。
          例えば、商品テーブルに同じカテゴリが複数あるとき、DISTINCTを使えばカテゴリ一覧を重複なしで取得できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SELECT DISTINCT カラム名</code> — 重複を除いた値を返す</li>
          <li>複数カラム指定時は、カラムの組み合わせが重複しないものを返す</li>
          <li>NULL値も1行として扱われる（複数のNULLは1つにまとめられる）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DISTINCTの活用場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DISTINCTはデータの種類や一覧を確認したいときに便利です。
          ただし、大量データに対してDISTINCTを使うとパフォーマンスが低下することがあるため、
          集約関数（GROUP BY）で代替できる場合はそちらを検討しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>カテゴリ一覧、都道府県一覧など種類を確認するとき</li>
          <li>重複データのチェック・クレンジングの確認</li>
          <li><code className="text-blue-300">COUNT(DISTINCT カラム名)</code> — ユニーク件数のカウント</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 重複するカテゴリを除外</h2>
        <SqlEditor
          defaultCode={`SELECT DISTINCT category FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'りんご', 150, '果物');
INSERT INTO products VALUES (2, 'バナナ', 80, '果物');
INSERT INTO products VALUES (3, '牛乳', 200, '乳製品');
INSERT INTO products VALUES (4, 'チーズ', 350, '乳製品');
INSERT INTO products VALUES (5, 'みかん', 100, '果物');
INSERT INTO products VALUES (6, 'バター', 300, '乳製品');`}
          expectedOutput={`category
---------
果物
乳製品`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数カラムの組み合わせで重複除外</h2>
        <SqlEditor
          defaultCode={`SELECT DISTINCT department, job_title FROM employees;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, job_title TEXT);
INSERT INTO employees VALUES (1, '田中', '開発', 'エンジニア');
INSERT INTO employees VALUES (2, '鈴木', '開発', 'エンジニア');
INSERT INTO employees VALUES (3, '佐藤', '開発', 'マネージャー');
INSERT INTO employees VALUES (4, '山田', '営業', '営業担当');
INSERT INTO employees VALUES (5, '高橋', '営業', 'マネージャー');`}
          expectedOutput={`department | job_title
-----------+-----------
開発        | エンジニア
開発        | マネージャー
営業        | 営業担当
営業        | マネージャー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: DISTINCTなしとの比較</h2>
        <SqlEditor
          defaultCode={`-- DISTINCTなし（重複あり）
SELECT department FROM employees;

-- DISTINCTあり（重複なし）
-- SELECT DISTINCT department FROM employees;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, '田中', '開発');
INSERT INTO employees VALUES (2, '鈴木', '開発');
INSERT INTO employees VALUES (3, '佐藤', '営業');
INSERT INTO employees VALUES (4, '山田', '営業');
INSERT INTO employees VALUES (5, '高橋', '人事');`}
          expectedOutput={`department
-----------
開発
開発
営業
営業
人事`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="distinct" />
      </div>
      <LessonNav lessons={lessons} currentId="distinct" basePath="/learn/basics" />
    </div>
  );
}
