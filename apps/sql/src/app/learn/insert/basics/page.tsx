import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function InsertBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">INSERT基本</h1>
        <p className="text-gray-400">INSERT INTO文の基本構文 — テーブルに新しいデータを追加する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INSERT INTO文とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INSERT INTO文はテーブルに新しい行を追加するSQL文です。
          挿入するカラム名と対応する値をVALUES句で指定します。
          カラム名を省略するとテーブル定義の順序ですべてのカラムに値を指定する必要があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT INTO テーブル (カラム) VALUES (値)</code> — 基本構文</li>
          <li><span className="text-orange-400">カラム指定推奨</span> — テーブル変更に強く意図が明確</li>
          <li><span className="text-orange-400">データ型</span> — 文字列はシングルクォート、数値はそのまま</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カラム名省略との違い</h2>
        <p className="text-gray-300 leading-relaxed">
          カラム名を省略する場合は <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT INTO t VALUES (v1, v2, ...)</code> と書きますが、
          テーブルのカラム順序に依存するため危険です。
          カラム名を明示することでカラムの追加・並び替えにも安全に対応できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なINSERT</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (id, name, price, category)
VALUES (1, 'ノートPC', 120000, 'PC周辺機器');

SELECT * FROM products;`}
          expectedOutput={`id | name    | price  | category
---|---------|--------|----------
1  | ノートPC | 120000 | PC周辺機器`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数の行を個別にINSERT</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (id, name, price, category) VALUES (1, 'ノートPC', 120000, 'PC周辺機器');
INSERT INTO products (id, name, price, category) VALUES (2, 'マウス', 3000, 'PC周辺機器');
INSERT INTO products (id, name, price, category) VALUES (3, 'キーボード', 8000, 'PC周辺機器');

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
2  | マウス     | 3000   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NULL値のINSERT</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (id, name, price, category)
VALUES (1, '新商品', 5000, NULL);

SELECT * FROM products;`}
          expectedOutput={`id | name   | price | category
---|--------|-------|--------
1  | 新商品 | 5000  | NULL`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/insert" />
    </div>
  );
}
