import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "update")!.lessons;

export default function BatchUpdatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">データ更新 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バッチ更新</h1>
        <p className="text-gray-400">大量データの効率的な更新 — パフォーマンスを考慮した一括更新</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バッチ更新とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          大量のレコードを効率的に更新する手法です。
          単純に全件UPDATEするだけでなく、トランザクション管理・インデックスの活用・
          分割処理などを組み合わせることでパフォーマンスを最適化します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-yellow-400">トランザクション</span> — 複数UPDATEをまとめてコミット</li>
          <li><span className="text-yellow-400">CASE式</span> — 1回のスキャンで複数条件を処理</li>
          <li><span className="text-yellow-400">WHERE条件</span> — インデックスを活用して対象を絞る</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">大量更新のベストプラクティス</h2>
        <p className="text-gray-300 leading-relaxed">
          何百万行もある場合は一度に全件更新するとロックが長時間かかります。
          IDの範囲で分割して少しずつ更新する「チャンク更新」が有効です。
          更新前にEXPLAINで実行計画を確認し、インデックスが使われているか確認しましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: CASEで一括更新（1回スキャン）</h2>
        <SqlEditor
          defaultCode={`-- 複数の条件を1つのUPDATEで処理
UPDATE products
SET
  discount_rate = CASE
    WHEN price >= 100000 THEN 0.10
    WHEN price >= 10000  THEN 0.05
    WHEN price >= 5000   THEN 0.03
    ELSE 0.00
  END,
  sale_price = price * (1 - CASE
    WHEN price >= 100000 THEN 0.10
    WHEN price >= 10000  THEN 0.05
    WHEN price >= 5000   THEN 0.03
    ELSE 0.00
  END);

SELECT name, price, discount_rate, sale_price FROM products;`}
          expectedOutput={`name       | price  | discount_rate | sale_price
-----------|--------|---------------|----------
ノートPC   | 120000 | 0.10          | 108000
マウス     | 3000   | 0.00          | 3000
キーボード | 8000   | 0.05          | 7600
モニター   | 45000  | 0.05          | 42750`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT, discount_rate REAL DEFAULT 0, sale_price INTEGER);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器', 0, 0), (2, 'マウス', 3000, 'PC周辺機器', 0, 0), (3, 'キーボード', 8000, 'PC周辺機器', 0, 0), (4, 'モニター', 45000, 'ディスプレイ', 0, 0);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: チャンク更新（ID範囲で分割）</h2>
        <SqlEditor
          defaultCode={`-- 大量データを分割して処理するパターン
UPDATE products SET category = 'アーカイブ'
WHERE id BETWEEN 1 AND 2;

UPDATE products SET category = 'アーカイブ'
WHERE id BETWEEN 3 AND 4;

SELECT * FROM products;`}
          expectedOutput={`id | name       | price  | category
---|------------|--------|----------
1  | ノートPC   | 120000 | アーカイブ
2  | マウス     | 3000   | アーカイブ
3  | キーボード | 8000   | アーカイブ
4  | モニター   | 45000  | アーカイブ`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器'), (4, 'モニター', 45000, 'ディスプレイ');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 一時テーブルを使った安全なバッチ更新</h2>
        <SqlEditor
          defaultCode={`-- 更新前に変更内容を一時テーブルで確認
CREATE TEMP TABLE updates AS
SELECT id, price * 1.1 AS new_price
FROM products
WHERE category = 'PC周辺機器';

-- 確認
SELECT * FROM updates;`}
          expectedOutput={`id | new_price
---|----------
1  | 132000
2  | 3300
3  | 8800`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'ノートPC', 120000, 'PC周辺機器'), (2, 'マウス', 3000, 'PC周辺機器'), (3, 'キーボード', 8000, 'PC周辺機器'), (4, 'モニター', 45000, 'ディスプレイ');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="update" lessonId="batch-update" />
      </div>
      <LessonNav lessons={lessons} currentId="batch-update" basePath="/learn/update" />
    </div>
  );
}
