import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function InPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">IN演算子</h1>
        <p className="text-gray-400">値のリストを使って複数の候補値と照合するフィルタリングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IN演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          IN演算子は、カラムの値が指定したリストの中のいずれかと一致する行を返します。
          複数のOR条件を簡潔に書けます。
          例えば <code className="text-blue-300">WHERE dept = '営業' OR dept = '開発' OR dept = '人事'</code> は
          <code className="text-blue-300">WHERE dept IN ('営業', '開発', '人事')</code> と同じ意味です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE カラム IN (値1, 値2, 値3)</code> — リストのいずれかに一致</li>
          <li><code className="text-blue-300">WHERE カラム NOT IN (値1, 値2)</code> — リストのどれにも一致しない</li>
          <li>サブクエリと組み合わせることも可能: <code className="text-blue-300">IN (SELECT ...)</code></li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOT INの注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NOT IN のリストに NULL が含まれていると、結果が空になることがあります。
          これは SQL の NULL の扱いによるもので、NULL との比較は常に UNKNOWN になるためです。
          NOT IN を使う場合は、リストに NULL が含まれないよう注意してください。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>NOT IN (1, 2, NULL) は常に FALSE になる可能性がある</li>
          <li>NULL を除外するには <code className="text-blue-300">IS NOT NULL</code> と組み合わせる</li>
          <li>サブクエリと NOT IN の組み合わせ時は特に注意</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数の部署を一括指定</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM employees
WHERE department IN ('営業', '開発', '人事');`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '経理', 380000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 290000);
INSERT INTO employees VALUES (6, '伊藤健二', '総務', 310000);`}
          expectedOutput={`id | name     | department | salary
---+----------+------------+--------
1  | 田中太郎  | 営業        | 300000
2  | 鈴木花子  | 開発        | 450000
3  | 佐藤一郎  | 人事        | 320000
5  | 高橋美咲  | 営業        | 290000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NOT INで除外する</h2>
        <SqlEditor
          defaultCode={`-- 経理・総務以外の部署の社員
SELECT * FROM employees
WHERE department NOT IN ('経理', '総務');`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, '田中太郎', '営業', 300000);
INSERT INTO employees VALUES (2, '鈴木花子', '開発', 450000);
INSERT INTO employees VALUES (3, '佐藤一郎', '人事', 320000);
INSERT INTO employees VALUES (4, '山田次郎', '経理', 380000);
INSERT INTO employees VALUES (5, '高橋美咲', '営業', 290000);
INSERT INTO employees VALUES (6, '伊藤健二', '総務', 310000);`}
          expectedOutput={`id | name     | department | salary
---+----------+------------+--------
1  | 田中太郎  | 営業        | 300000
2  | 鈴木花子  | 開発        | 450000
3  | 佐藤一郎  | 人事        | 320000
5  | 高橋美咲  | 営業        | 290000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 数値のINリスト</h2>
        <SqlEditor
          defaultCode={`-- IDが1、3、5の商品を取得
SELECT * FROM products WHERE id IN (1, 3, 5);`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);`}
          expectedOutput={`id | name   | price
---+--------+-------
1  | りんご  | 150
3  | 牛乳    | 200
5  | みかん  | 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="in" />
      </div>
      <LessonNav lessons={lessons} currentId="in" basePath="/learn/filtering" />
    </div>
  );
}
