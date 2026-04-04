import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function SavepointPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SAVEPOINT</h1>
        <p className="text-gray-400">トランザクション内に中間地点を設け、部分的なロールバックを行います。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SAVEPOINTとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">SAVEPOINT</code>はトランザクション内に中間地点（チェックポイント）を設ける機能です。
          トランザクション全体を取り消すのではなく、特定のSAVEPOINT以降の変更だけを取り消すことができます。
          これにより、複雑な処理の一部だけを安全にリトライできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SAVEPOINT 名前</code> — セーブポイントを設定する</li>
          <li><code className="text-blue-300">ROLLBACK TO SAVEPOINT 名前</code> — そのポイントまで戻る</li>
          <li><code className="text-blue-300">RELEASE SAVEPOINT 名前</code> — セーブポイントを削除する</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SAVEPOINTの使いどころ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          大量のデータを処理するバッチ処理や、複数ステップに分かれる複雑な更新処理で特に有効です。
          途中でエラーが発生した場合、最初からやり直すのではなく、
          直前のSAVEPOINTまで戻って再試行できます。
          ネストしたトランザクションのように扱うこともできます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SAVEPOINTの基本</h2>
        <SqlEditor
          defaultCode={`BEGIN;

INSERT INTO log (action) VALUES ('ステップ1完了');
SAVEPOINT step1;

INSERT INTO log (action) VALUES ('ステップ2完了');
SAVEPOINT step2;

-- ステップ3で問題発生、step2まで戻す
INSERT INTO log (action) VALUES ('ステップ3（失敗）');
ROLLBACK TO SAVEPOINT step2;

INSERT INTO log (action) VALUES ('ステップ3（再試行成功）');
COMMIT;

SELECT * FROM log;`}
          setupSql={`CREATE TABLE log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL
);`}
          expectedOutput={`id | action
---+---------------------
1  | ステップ1完了
2  | ステップ2完了
3  | ステップ3（再試行成功）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数のSAVEPOINT</h2>
        <SqlEditor
          defaultCode={`BEGIN;

INSERT INTO inventory (product_id, quantity) VALUES (1, 100);
SAVEPOINT after_product1;

INSERT INTO inventory (product_id, quantity) VALUES (2, 200);
SAVEPOINT after_product2;

INSERT INTO inventory (product_id, quantity) VALUES (3, 300);

-- product1の状態まで戻す
ROLLBACK TO SAVEPOINT after_product1;

COMMIT;

SELECT * FROM inventory;`}
          setupSql={`CREATE TABLE inventory (
  product_id INTEGER PRIMARY KEY,
  quantity INTEGER NOT NULL
);`}
          expectedOutput={`product_id | quantity
-----------+---------
1          | 100`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: RELEASE SAVEPOINTで解放</h2>
        <SqlEditor
          defaultCode={`BEGIN;

INSERT INTO tasks (name, status) VALUES ('タスクA', '完了');
SAVEPOINT sp1;

INSERT INTO tasks (name, status) VALUES ('タスクB', '完了');
-- sp1はもう不要なので解放
RELEASE SAVEPOINT sp1;

INSERT INTO tasks (name, status) VALUES ('タスクC', '完了');
COMMIT;

SELECT * FROM tasks;`}
          setupSql={`CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL
);`}
          expectedOutput={`id | name   | status
---+--------+-------
1  | タスクA | 完了
2  | タスクB | 完了
3  | タスクC | 完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="savepoint" />
      </div>
      <LessonNav lessons={lessons} currentId="savepoint" basePath="/learn/transactions" />
    </div>
  );
}
