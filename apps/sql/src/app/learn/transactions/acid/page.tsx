import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function AcidPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ACID特性</h1>
        <p className="text-gray-400">トランザクションが保証する4つの特性：原子性・一貫性・独立性・永続性を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ACID特性とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ACIDとはトランザクションが備えるべき4つの特性の頭文字です。
          この特性を満たすことで、データベースの信頼性と整合性が保証されます。
          信頼性の高いシステムを構築するためにACIDを理解することは不可欠です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><span className="text-blue-300">A: Atomicity（原子性）</span> — 全部成功か全部失敗かのどちらか</li>
          <li><span className="text-blue-300">C: Consistency（一貫性）</span> — 制約やルールが常に満たされる</li>
          <li><span className="text-blue-300">I: Isolation（独立性）</span> — 並行トランザクションは互いに影響しない</li>
          <li><span className="text-blue-300">D: Durability（永続性）</span> — COMMITした変更は障害後も消えない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 原子性（Atomicity）のデモ</h2>
        <SqlEditor
          defaultCode={`-- 振込処理：引き落としと入金は必ずセットで成功・失敗する
BEGIN;

UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
-- もし次のUPDATEが失敗したら、ROLLBACKで上のUPDATEも取り消される
UPDATE accounts SET balance = balance + 5000 WHERE id = 2;

COMMIT;

-- 残高の合計は常に一定（30000）
SELECT SUM(balance) AS total FROM accounts;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL CHECK(balance >= 0)
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`total
-----
30000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 一貫性（Consistency）のデモ</h2>
        <SqlEditor
          defaultCode={`-- CHECK制約により負の残高にはできない（一貫性の保証）
BEGIN;

-- これはCHECK制約違反でエラーになる
UPDATE accounts SET balance = balance - 99999 WHERE id = 1;

COMMIT;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL CHECK(balance >= 0)
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`CHECK constraint failed: balance >= 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 永続性（Durability）の概念</h2>
        <SqlEditor
          defaultCode={`-- COMMITした変更はWAL（Write-Ahead Log）に書かれ、障害後も保持される
PRAGMA journal_mode;  -- WALモードの確認

BEGIN;
INSERT INTO transactions_log (description, amount)
VALUES ('送金完了', 5000);
COMMIT;

-- COMMITした後はシステムクラッシュが起きても消えない
SELECT * FROM transactions_log;`}
          setupSql={`CREATE TABLE transactions_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  amount INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);`}
          expectedOutput={`journal_mode
------------
delete

id | description | amount | created_at
---+-------------+--------+-------------------
1  | 送金完了     | 5000   | 2024-01-15 10:00:00`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="acid" />
      </div>
      <LessonNav lessons={lessons} currentId="acid" basePath="/learn/transactions" />
    </div>
  );
}
