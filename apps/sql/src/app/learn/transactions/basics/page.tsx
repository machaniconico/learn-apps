import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "transactions")!.lessons;

export default function TransactionsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">トランザクション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トランザクション基本</h1>
        <p className="text-gray-400">BEGIN・COMMIT・ROLLBACKを使ったトランザクションの基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トランザクションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トランザクションとは、一連のデータベース操作をひとまとまりとして扱う仕組みです。
          銀行の振込のように「引き落とし」と「入金」が両方成功するか、両方失敗するかのどちらかにする必要がある場面で使います。
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">BEGIN</code>で開始し、
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">COMMIT</code>で確定、
          <code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">ROLLBACK</code>で取り消します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">BEGIN</code> — トランザクションを開始する</li>
          <li><code className="text-blue-300">COMMIT</code> — 変更を永続化して確定する</li>
          <li><code className="text-blue-300">ROLLBACK</code> — 変更をすべて取り消す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜトランザクションが必要か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のSQL文を実行する途中でエラーが発生した場合、トランザクションなしでは中途半端な状態が残ります。
          トランザクションを使うことで、データの整合性を保ちながら安全に操作を行えます。
          SQLiteではデフォルトで自動コミットモードが有効ですが、明示的に<code className="text-blue-300 bg-gray-800 px-1.5 py-0.5 rounded">BEGIN</code>することで制御できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なトランザクション</h2>
        <SqlEditor
          defaultCode={`BEGIN;

INSERT INTO accounts (id, name, balance) VALUES (1, '田中太郎', 10000);
INSERT INTO accounts (id, name, balance) VALUES (2, '鈴木花子', 20000);

COMMIT;

SELECT * FROM accounts;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);`}
          expectedOutput={`id | name     | balance
---+----------+--------
1  | 田中太郎  | 10000
2  | 鈴木花子  | 20000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ROLLBACKで変更を取り消す</h2>
        <SqlEditor
          defaultCode={`BEGIN;

INSERT INTO accounts (id, name, balance) VALUES (3, '佐藤次郎', 5000);

-- エラーが発生したと想定してROLLBACK
ROLLBACK;

SELECT COUNT(*) AS count FROM accounts;`}
          setupSql={`CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, '田中太郎', 10000);
INSERT INTO accounts VALUES (2, '鈴木花子', 20000);`}
          expectedOutput={`count
-----
2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 残高移動トランザクション</h2>
        <SqlEditor
          defaultCode={`BEGIN;

UPDATE accounts SET balance = balance - 3000 WHERE id = 1;
UPDATE accounts SET balance = balance + 3000 WHERE id = 2;

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
1  | 田中太郎  | 7000
2  | 鈴木花子  | 23000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="transactions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/transactions" />
    </div>
  );
}
