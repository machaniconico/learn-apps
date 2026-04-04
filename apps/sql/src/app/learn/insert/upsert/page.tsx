import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "insert")!.lessons;

export default function UpsertPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">データ挿入 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UPSERT</h1>
        <p className="text-gray-400">ON CONFLICT DO UPDATE — 存在すれば更新、なければ挿入する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">UPSERTとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          UPSERT（Update + Insert）は行が存在しなければINSERT、存在すればUPDATEを行う操作です。
          SQLiteとPostgreSQLでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT ... ON CONFLICT DO UPDATE</code> で実現します。
          MySQLでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT ... ON DUPLICATE KEY UPDATE</code> です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ON CONFLICT DO UPDATE SET</code> — 衝突時に更新</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ON CONFLICT DO NOTHING</code> — 衝突時は無視（スキップ）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">EXCLUDED</code> — 挿入しようとした値を参照する特殊テーブル</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">使用場面</h2>
        <p className="text-gray-300 leading-relaxed">
          設定テーブルの更新、集計テーブルへの増分反映、
          重複を許さないデータの取り込みなど広く活用されます。
          アプリ側でSELECT→分岐→INSERT/UPDATEと書く必要がなくなります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ON CONFLICT DO UPDATE（UPSERT）</h2>
        <SqlEditor
          defaultCode={`-- 同じIDが存在する場合は price と category を更新
INSERT INTO products (id, name, price, category)
VALUES (1, 'ノートPC Pro', 150000, 'プレミアム')
ON CONFLICT(id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category;

SELECT * FROM products;`}
          expectedOutput={`id | name         | price  | category
---|--------------|--------|----------
1  | ノートPC Pro | 150000 | プレミアム
2  | マウス       | 3000   | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ON CONFLICT DO NOTHING（スキップ）</h2>
        <SqlEditor
          defaultCode={`-- 重複の場合はエラーを出さずスキップ
INSERT INTO products (id, name, price, category)
VALUES (1, '重複テスト', 0, 'テスト')
ON CONFLICT(id) DO NOTHING;

SELECT * FROM products WHERE id = 1;`}
          expectedOutput={`id | name     | price  | category
---|----------|--------|----------
1  | ノートPC | 120000 | PC周辺機器`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カウンターのインクリメント</h2>
        <SqlEditor
          defaultCode={`-- ページビューカウンターをUPSERTで更新
INSERT INTO page_views (page, views)
VALUES ('top', 1), ('about', 1), ('top', 1)
ON CONFLICT(page) DO UPDATE SET
  views = page_views.views + EXCLUDED.views;

SELECT * FROM page_views ORDER BY views DESC;`}
          expectedOutput={`page  | views
------|------
top   | 2
about | 1`}
          setupSql={`CREATE TABLE page_views (
  page TEXT PRIMARY KEY,
  views INTEGER DEFAULT 0
);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="insert" lessonId="upsert" />
      </div>
      <LessonNav lessons={lessons} currentId="upsert" basePath="/learn/insert" />
    </div>
  );
}
