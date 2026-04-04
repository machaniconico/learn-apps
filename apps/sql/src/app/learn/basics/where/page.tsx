import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function WherePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WHERE句</h1>
        <p className="text-gray-400">条件を指定してデータを絞り込む方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WHERE句とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WHERE句は、取得するレコードを条件でフィルタリングするために使います。
          テーブル全体ではなく、特定の条件に合致する行だけを取得したい場合に使用します。
          例えば「年齢が20歳以上」「名前が田中」などの条件を指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE 条件式</code> — 条件に合う行だけを返す</li>
          <li><code className="text-blue-300">= </code> — 等しい（等号）</li>
          <li><code className="text-blue-300">&gt;, &lt;, &gt;=, &lt;=</code> — 大小比較</li>
          <li><code className="text-blue-300">&lt;&gt; または !=</code> — 等しくない</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列条件の指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列（テキスト）を条件に使う場合は、値をシングルクォート <code className="text-blue-300">'</code> で囲みます。
          数値の場合はそのまま記述します。NULL値の比較には <code className="text-blue-300">IS NULL</code> を使います（= NULL は使えません）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE name = '田中'</code> — 文字列は引用符で囲む</li>
          <li><code className="text-blue-300">WHERE age = 25</code> — 数値はそのまま</li>
          <li><code className="text-blue-300">WHERE email IS NULL</code> — NULLの確認はIS NULLを使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 数値条件でフィルタリング</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees WHERE age >= 30;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');
INSERT INTO employees VALUES (5, '高橋美咲', 30, '営業');`}
          expectedOutput={`id | name     | age | department
---+----------+-----+-----------
2  | 鈴木花子  | 32  | 開発
4  | 山田次郎  | 45  | 開発
5  | 高橋美咲  | 30  | 営業`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 文字列条件でフィルタリング</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees WHERE department = '開発';`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');`}
          expectedOutput={`id | name     | age | department
---+----------+-----+-----------
2  | 鈴木花子  | 32  | 開発
4  | 山田次郎  | 45  | 開発`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 不等号を使った条件</h2>
        <SqlEditor
          defaultCode={`SELECT name, age FROM employees WHERE age <> 25;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT);
INSERT INTO employees VALUES (1, '田中太郎', 25, '営業');
INSERT INTO employees VALUES (2, '鈴木花子', 32, '開発');
INSERT INTO employees VALUES (3, '佐藤一郎', 28, '人事');
INSERT INTO employees VALUES (4, '山田次郎', 45, '開発');`}
          expectedOutput={`name     | age
---------+-----
鈴木花子  | 32
佐藤一郎  | 28
山田次郎  | 45`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="where" />
      </div>
      <LessonNav lessons={lessons} currentId="where" basePath="/learn/basics" />
    </div>
  );
}
