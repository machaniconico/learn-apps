import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "delete")!.lessons;

export default function DeleteBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">データ削除 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DELETE基本</h1>
        <p className="text-gray-400">DELETE FROM文の基本構文 — テーブルからデータを削除する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DELETE文とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          DELETE FROM文はテーブルから行を削除します。
          WHERE句で削除対象を指定しないと全行が削除されます。
          削除したデータは（トランザクション内でなければ）復元できないため慎重に扱いましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE FROM テーブル WHERE 条件</code> — 基本構文</li>
          <li><span className="text-red-400">WHERE省略は危険</span> — 全行削除になる</li>
          <li><span className="text-red-400">トランザクション</span> — 削除前にBEGINして確認後にCOMMIT</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">削除前の確認手順</h2>
        <p className="text-gray-300 leading-relaxed">
          1. <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT COUNT(*) WHERE [条件]</code> で削除件数を確認<br />
          2. <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT * WHERE [条件] LIMIT 10</code> で削除対象を目視確認<br />
          3. トランザクション内でDELETEを実行<br />
          4. 結果を確認してCOMMITまたはROLLBACK
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: IDで特定の行を削除</h2>
        <SqlEditor
          defaultCode={`DELETE FROM products WHERE id = 2;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 削除前に件数確認</h2>
        <SqlEditor
          defaultCode={`-- 削除前に件数を確認
SELECT COUNT(*) AS will_delete FROM products WHERE price < 5000;

-- 確認後に削除
DELETE FROM products WHERE price < 5000;

SELECT * FROM products;`}
          expectedOutput={`will_delete
-----------
1

id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数条件での削除</h2>
        <SqlEditor
          defaultCode={`DELETE FROM products
WHERE category = 'PC周辺機器' AND price < 10000;

SELECT * FROM products;`}
          expectedOutput={`id | name     | price  | category
---|----------|--------|----------
1  | ノートPC | 120000 | PC周辺機器
4  | モニター | 45000  | ディスプレイ`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器'), (4, 'モニター', 45000, 'ディスプレイ');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delete" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/delete" />
    </div>
  );
}
