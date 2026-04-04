import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function CommitRollbackPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">COMMIT・ROLLBACK</h1>
        <p className="text-gray-400">変更の確定と取り消しの動作を詳しく理解します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">COMMITの動作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">COMMIT</code>を実行すると、
          トランザクション内で行ったすべての変更がデータベースに永続的に書き込まれます。
          COMMITが完了した後は、他のセッションからも変更が見えるようになり、
          システム障害が発生しても変更は保存されたままになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変更がディスクに永続化される</li>
          <li>ロックが解放される</li>
          <li>他のセッションから変更が見えるようになる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ROLLBACKの動作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">ROLLBACK</code>を実行すると、
          トランザクション開始後に行ったすべての変更が取り消され、データはトランザクション開始前の状態に戻ります。
          エラーが発生したときや、処理を中断したいときに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>BEGIN以降の変更がすべて取り消される</li>
          <li>データはBEFORE状態に戻る</li>
          <li>ロックが解放される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: COMMITで変更を確定する</h2>
        <SqlEditor
          defaultCode={`BEGIN;
UPDATE orders SET status = '発送済み' WHERE id = 1;
UPDATE orders SET status = '発送済み' WHERE id = 2;
COMMIT;

SELECT id, status FROM orders;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '未処理'
);
INSERT INTO orders VALUES (1, '商品A', '未処理');
INSERT INTO orders VALUES (2, '商品B', '未処理');
INSERT INTO orders VALUES (3, '商品C', '未処理');`}
          expectedOutput={`id | status
---+--------
1  | 発送済み
2  | 発送済み
3  | 未処理`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ROLLBACKで変更を取り消す</h2>
        <SqlEditor
          defaultCode={`BEGIN;
DELETE FROM orders WHERE status = '未処理';

-- 削除件数を確認（3件削除されている）
SELECT COUNT(*) AS remaining FROM orders;

-- やはり取り消す
ROLLBACK;

-- ROLLBACKで元に戻った
SELECT COUNT(*) AS remaining FROM orders;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO orders VALUES (1, '商品A', '発送済み');
INSERT INTO orders VALUES (2, '商品B', '未処理');
INSERT INTO orders VALUES (3, '商品C', '未処理');`}
          expectedOutput={`remaining
---------
0

remaining
---------
3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 自動コミット（個別SQL）</h2>
        <SqlEditor
          defaultCode={`-- BEGINなしのINSERTは自動的にCOMMITされる
INSERT INTO products (id, name, price) VALUES (4, '商品D', 800);

-- すぐに他のセッションから見える（自動コミット）
SELECT * FROM products;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL
);
INSERT INTO products VALUES (1, '商品A', 1000);
INSERT INTO products VALUES (2, '商品B', 2000);
INSERT INTO products VALUES (3, '商品C', 1500);`}
          expectedOutput={`id | name | price
---+------+-------
1  | 商品A | 1000
2  | 商品B | 2000
3  | 商品C | 1500
4  | 商品D | 800`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="commit-rollback" />
      </div>
      <LessonNav lessons={lessons} currentId="commit-rollback" basePath="/learn/transactions" />
    </div>
  );
}
