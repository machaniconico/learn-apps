import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function IsolationLevelsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">分離レベル</h1>
        <p className="text-gray-400">トランザクションの分離レベルと、並行処理の問題を理解します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">分離レベルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          分離レベル（Isolation Level）は、複数のトランザクションが同時に実行される際に、
          互いにどの程度影響を受けるかを定義する設定です。
          分離レベルを高くすると整合性が増しますが、パフォーマンスは低下します。
          SQL標準では4つの分離レベルが定義されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">READ UNCOMMITTED</code> — コミットされていない変更も読める（最も緩い）</li>
          <li><code className="text-blue-300">READ COMMITTED</code> — コミット済みの変更のみ読める</li>
          <li><code className="text-blue-300">REPEATABLE READ</code> — 同一トランザクション内では同じ値が読める</li>
          <li><code className="text-blue-300">SERIALIZABLE</code> — 完全に直列化された実行（最も厳しい）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">並行処理で起きる問題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          分離レベルが低いと、以下の問題が起きることがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><span className="text-blue-300">ダーティリード</span> — 他のトランザクションのコミット前のデータを読む</li>
          <li><span className="text-blue-300">ノンリピータブルリード</span> — 同じクエリを2回実行すると結果が変わる</li>
          <li><span className="text-blue-300">ファントムリード</span> — 同じ条件のSELECTで行数が変わる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 分離レベルの確認</h2>
        <SqlEditor
          defaultCode={`-- SQLiteのデフォルト分離レベルはSERIALIZABLE相当
-- PRAGMA isolation_levelで確認
PRAGMA read_uncommitted;`}
          expectedOutput={`read_uncommitted
----------------
0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 読み取り一貫性のデモ</h2>
        <SqlEditor
          defaultCode={`-- トランザクション開始時点のスナップショットを読む
BEGIN;

-- トランザクション開始前のデータを確認
SELECT balance FROM accounts WHERE id = 1;

-- この間に別のセッションがbalanceを変更したとしても
-- REPEATABLE READでは同じ値が読み続けられる

SELECT balance FROM accounts WHERE id = 1;

COMMIT;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, '田中太郎', 50000);
INSERT INTO accounts VALUES (2, '鈴木花子', 30000);`}
          expectedOutput={`balance
-------
50000

balance
-------
50000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 分離レベルと整合性</h2>
        <SqlEditor
          defaultCode={`-- 在庫チェックと更新を安全に行う例
BEGIN;

-- 在庫確認
SELECT quantity FROM stock WHERE product_id = 1;

-- 在庫があれば引き当て
UPDATE stock SET quantity = quantity - 1 WHERE product_id = 1 AND quantity > 0;

-- 更新件数で成功か確認（1なら成功、0なら在庫なし）
SELECT changes() AS updated_rows;

COMMIT;`}
          setupSql={`CREATE TABLE stock (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL
);
INSERT INTO stock VALUES (1, '商品A', 10);
INSERT INTO stock VALUES (2, '商品B', 0);`}
          expectedOutput={`quantity
--------
10

updated_rows
------------
1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="isolation-levels" />
      </div>
      <LessonNav lessons={lessons} currentId="isolation-levels" basePath="/learn/transactions" />
    </div>
  );
}
