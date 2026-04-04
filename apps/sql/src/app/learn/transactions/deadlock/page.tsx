import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function DeadlockPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デッドロック</h1>
        <p className="text-gray-400">デッドロックの発生原因と回避策を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デッドロックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デッドロックとは、2つ以上のトランザクションが互いに相手のロックが解放されるのを待ち続けて、
          どちらも進めなくなる状態です。
          たとえば、トランザクションAがテーブル1をロックしてテーブル2を待ち、
          トランザクションBがテーブル2をロックしてテーブル1を待つ状況です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>循環待機が発生するとデッドロックになる</li>
          <li>DBMSが検出して一方のトランザクションをロールバックする</li>
          <li>アプリケーション側でリトライ処理を実装することが重要</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デッドロックの回避策</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デッドロックを防ぐには、複数のリソースをロックする順序を統一することが最も効果的です。
          すべてのトランザクションで同じ順序（例：IDの昇順）でリソースにアクセスすれば、
          循環待機が発生しなくなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><span className="text-blue-300">ロック順序の統一</span> — 常に同じ順番でテーブル/行をロック</li>
          <li><span className="text-blue-300">トランザクションを短く</span> — ロック保持時間を最小限にする</li>
          <li><span className="text-blue-300">SELECT FOR UPDATE</span> — 必要なロックを先に取得する</li>
          <li><span className="text-blue-300">タイムアウト設定</span> — 一定時間でロック待ちをあきらめる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: デッドロックが起きるパターン（概念）</h2>
        <SqlEditor
          defaultCode={`-- セッション1の操作順序（概念的なコメントとして示す）
-- BEGIN;
-- UPDATE accounts SET balance = balance - 1000 WHERE id = 1;  -- id=1をロック
-- UPDATE accounts SET balance = balance + 1000 WHERE id = 2;  -- id=2を待つ→デッドロック

-- セッション2の操作順序（概念的なコメントとして示す）
-- BEGIN;
-- UPDATE accounts SET balance = balance - 500 WHERE id = 2;   -- id=2をロック
-- UPDATE accounts SET balance = balance + 500 WHERE id = 1;   -- id=1を待つ→デッドロック

-- 対策：常にid順（昇順）でアクセスする
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;

SELECT * FROM accounts;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`id | name     | balance
---+----------+--------
1  | 田中太郎  | 9000
2  | 鈴木花子  | 21000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ロック順序の統一による回避</h2>
        <SqlEditor
          defaultCode={`-- 常にid昇順でアクセスすることでデッドロックを防ぐ
-- 振込元と振込先のIDを比較して、小さいIDから先に更新する

-- from_id=2, to_id=1 の場合でも、id=1を先に更新する
BEGIN;

-- 小さいID（1）から先にロック取得
UPDATE accounts SET balance = balance + 500 WHERE id = 1;
UPDATE accounts SET balance = balance - 500 WHERE id = 2;

COMMIT;

SELECT id, name, balance FROM accounts ORDER BY id;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`id | name     | balance
---+----------+--------
1  | 田中太郎  | 10500
2  | 鈴木花子  | 19500`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: タイムアウトによる対策</h2>
        <SqlEditor
          defaultCode={`-- SQLiteではbusy_timeoutでロック待ちタイムアウトを設定できる
PRAGMA busy_timeout = 5000;  -- 5秒待ってからエラー

BEGIN;
UPDATE accounts SET balance = balance - 2000 WHERE id = 1;
COMMIT;

SELECT id, name, balance FROM accounts;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`id | name     | balance
---+----------+--------
1  | 田中太郎  | 8000
2  | 鈴木花子  | 20000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="deadlock" />
      </div>
      <LessonNav lessons={lessons} currentId="deadlock" basePath="/learn/transactions" />
    </div>
  );
}
