import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function MultipleRowsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数行挿入</h1>
        <p className="text-gray-400">VALUES句で複数行を一括挿入 — 効率的にデータを追加する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数行一括INSERTとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          単一のINSERT文で複数行を一度に挿入できます。
          VALUES句にカンマ区切りで複数の値グループを指定するだけです。
          個別にINSERTを繰り返すより効率が良く、DBへのラウンドトリップ数を減らせます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">VALUES (v1), (v2), (v3)</code> — カンマ区切りで複数セット</li>
          <li><span className="text-orange-400">パフォーマンス</span> — 個別INSERT×Nより高速</li>
          <li><span className="text-orange-400">制限</span> — 一度に挿入できる行数はDB設定に依存</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションとの組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed">
          大量データを挿入する場合はトランザクションでまとめると
          一部失敗時に全体をロールバックできます。
          また自動コミットを無効にすることでディスク書き込みを減らし大幅に高速化できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数行を一括INSERT</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (id, name, price, category)
VALUES
  (1, 'ノートPC', 120000, 'PC周辺機器'),
  (2, 'マウス', 3000, 'PC周辺機器'),
  (3, 'キーボード', 8000, 'PC周辺機器'),
  (4, 'モニター', 45000, 'ディスプレイ');

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | PC周辺機器
2  | マウス     | 3000   | PC周辺機器
3  | キーボード | 8000   | PC周辺機器
4  | モニター   | 45000  | ディスプレイ`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部分カラム指定での複数行INSERT</h2>
        <SqlEditor
          defaultCode={`-- category を省略（NULL になる）
INSERT INTO products (id, name, price)
VALUES
  (1, 'ノートPC', 120000),
  (2, 'マウス', 3000);

SELECT * FROM products;`}
          expectedOutput={`id | name     | price  | category
---|----------|--------|--------
1  | ノートPC | 120000 | NULL
2  | マウス   | 3000   | NULL`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 挿入後に件数確認</h2>
        <SqlEditor
          defaultCode={`INSERT INTO products (id, name, price, category)
VALUES
  (1, 'ノートPC', 120000, 'PC周辺機器'),
  (2, 'マウス', 3000, 'PC周辺機器'),
  (3, 'キーボード', 8000, 'PC周辺機器');

SELECT COUNT(*) AS inserted_count FROM products;`}
          expectedOutput={`inserted_count
--------------
3`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="multiple-rows" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-rows" basePath="/learn/insert" />
    </div>
  );
}
