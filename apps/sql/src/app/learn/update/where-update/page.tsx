import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function WhereUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件付き更新</h1>
        <p className="text-gray-400">WHERE句で対象行を限定 — 特定の条件に一致する行だけを更新する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WHERE句でターゲットを絞る</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          UPDATEにWHERE句を組み合わせることで、更新対象を特定の行に限定できます。
          複雑な条件（AND/OR/IN/BETWEEN）もWHEREに使えます。
          更新前に同じWHERE条件でSELECTを実行して対象行を確認しましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-yellow-400">単純条件</span> — WHERE id = 1</li>
          <li><span className="text-yellow-400">範囲条件</span> — WHERE price BETWEEN 1000 AND 10000</li>
          <li><span className="text-yellow-400">複合条件</span> — WHERE category = 'X' AND price &gt; 5000</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">安全なUPDATEの手順</h2>
        <p className="text-gray-300 leading-relaxed">
          1. SELECT ... WHERE [条件] で対象行を確認<br />
          2. BEGIN; でトランザクション開始<br />
          3. UPDATE ... WHERE [条件] を実行<br />
          4. SELECT で更新結果を確認<br />
          5. 問題なければ COMMIT; 、問題あれば ROLLBACK;
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: INを使った複数行の一括更新</h2>
        <SqlEditor
          defaultCode={`UPDATE products
SET category = '入力デバイス'
WHERE id IN (2, 3);

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
2  | マウス     | 3000   | 入力デバイス
3  | キーボード | 8000   | 入力デバイス`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 範囲条件での更新</h2>
        <SqlEditor
          defaultCode={`-- 5000円以下の商品を割引
UPDATE products
SET price = price * 0.9
WHERE price <= 5000;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
2  | マウス     | 2700   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複合条件での更新</h2>
        <SqlEditor
          defaultCode={`-- PC周辺機器かつ1万円以上の商品を値下げ
UPDATE products
SET price = price - 5000
WHERE category = 'PC周辺機器' AND price >= 10000;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 115000 | PC周辺機器
2  | マウス     | 3000   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="where-update" />
      </div>
      <LessonNav lessons={lessons} currentId="where-update" basePath="/learn/update" />
    </div>
  );
}
