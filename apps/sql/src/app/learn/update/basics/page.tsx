import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function UpdateBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UPDATE基本</h1>
        <p className="text-gray-400">UPDATE SET文の基本構文 — テーブルのデータを更新する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">UPDATE文とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          UPDATE文はテーブルの既存行のカラム値を変更します。
          SET句で更新するカラムと新しい値を指定します。
          WHERE句を省略するとテーブルの全行が更新されるため注意が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE テーブル SET カラム = 値</code> — 基本構文</li>
          <li><span className="text-yellow-400">複数カラム</span> — SET col1 = v1, col2 = v2 でカンマ区切り</li>
          <li><span className="text-yellow-400">WHERE必須</span> — 省略すると全行が更新される</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">更新前の確認</h2>
        <p className="text-gray-300 leading-relaxed">
          本番環境でUPDATEを実行する前に、同じWHERE条件でSELECTを実行して
          対象行を確認する習慣をつけましょう。
          トランザクション内でUPDATEを行い、結果を確認してからCOMMITするのがより安全です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単一カラムの更新</h2>
        <SqlEditor
          defaultCode={`UPDATE products SET price = 130000 WHERE id = 1;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 130000 | PC周辺機器
2  | マウス     | 3000   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数カラムを同時に更新</h2>
        <SqlEditor
          defaultCode={`UPDATE products
SET price = 3500, category = '入力デバイス'
WHERE id = 2;

SELECT * FROM products WHERE id = 2;`}
          expectedOutput={`id | name   | price | category
---|--------|-------|----------
2  | マウス | 3500  | 入力デバイス`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 現在値を使った計算更新</h2>
        <SqlEditor
          defaultCode={`-- 全商品の価格を10%値上げ
UPDATE products SET price = price * 1.1;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 132000 | PC周辺機器
2  | マウス     | 3300   | PC周辺機器
3  | キーボード | 8800   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/update" />
    </div>
  );
}
