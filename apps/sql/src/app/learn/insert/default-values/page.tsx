import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function DefaultValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト値</h1>
        <p className="text-gray-400">DEFAULT句とデフォルト値の活用 — 省略時に自動設定される値</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テーブル定義でDEFAULT句を指定すると、INSERTでそのカラムを省略した場合に
          自動的にデフォルト値が設定されます。
          明示的に <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT</code> キーワードを使って
          デフォルト値を挿入することもできます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT 値</code> — テーブル定義時にデフォルト値を指定</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT DEFAULT VALUES</code> — 全カラムにデフォルト値で挿入</li>
          <li><span className="text-orange-400">CURRENT_TIMESTAMP</span> — 現在日時のデフォルト値によく使う</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の活用場面</h2>
        <p className="text-gray-300 leading-relaxed">
          作成日時（created_at）・更新日時（updated_at）・ステータスフラグ・フラグのデフォルトONなど
          多くの場面でDEFAULTが活躍します。
          アプリケーション側で毎回値を指定しなくてよいため、コードが簡潔になります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: カラムを省略してデフォルト値を使う</h2>
        <SqlEditor
          defaultCode={`-- status と created_at を省略
INSERT INTO orders (id, customer_id, product)
VALUES (1, 1, 'ノートPC');

SELECT * FROM orders;`}
          expectedOutput={`id | customer_id | product  | status  | created_at
---|-------------|----------|---------|--------------------
1  | 1           | ノートPC | pending | 2024-01-01 00:00:00`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: DEFAULT キーワードを明示的に使う</h2>
        <SqlEditor
          defaultCode={`INSERT INTO orders (id, customer_id, product, status)
VALUES (1, 1, 'ノートPC', DEFAULT);

SELECT * FROM orders;`}
          expectedOutput={`id | customer_id | product  | status
---|-------------|----------|-------
1  | 1           | ノートPC | pending`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: INSERT DEFAULT VALUES</h2>
        <SqlEditor
          defaultCode={`-- 全カラムにデフォルト値で行を挿入
INSERT INTO counters DEFAULT VALUES;
INSERT INTO counters DEFAULT VALUES;

SELECT * FROM counters;`}
          expectedOutput={`id | count | created_at
---|-------|--------------------
1  | 0     | 2024-01-01 00:00:00
2  | 0     | 2024-01-01 00:00:00`}
          setupSql={`CREATE TABLE counters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="default-values" />
      </div>
      <LessonNav lessons={lessons} currentId="default-values" basePath="/learn/insert" />
    </div>
  );
}
