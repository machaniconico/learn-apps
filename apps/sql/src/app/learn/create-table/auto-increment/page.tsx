import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function AutoIncrementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">自動採番</h1>
        <p className="text-gray-400">AUTOINCREMENT・SERIALによるIDの自動生成</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteの自動採番</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER PRIMARY KEY</code> を指定すると、
          rowid の別名となり自動的に連番が割り当てられます。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">AUTOINCREMENT</code> キーワードを追加すると、
          削除された番号を再利用しない厳密な自動採番になります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER PRIMARY KEY</code> — rowid の別名、自動で連番</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER PRIMARY KEY AUTOINCREMENT</code> — 単調増加を保証</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">last_insert_rowid()</code> — 最後に挿入したIDを取得</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: INTEGER PRIMARY KEYの自動採番</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL
);

-- idを指定しなくてもNULLを渡すと自動採番
INSERT INTO users (name, email) VALUES ('田中太郎', 'tanaka@example.com');
INSERT INTO users (name, email) VALUES ('佐藤花子', 'sato@example.com');
INSERT INTO users (name, email) VALUES ('鈴木次郎', 'suzuki@example.com');

SELECT id, name, email FROM users;`}
          expectedOutput={`id  name    email
1   田中太郎  tanaka@example.com
2   佐藤花子  sato@example.com
3   鈴木次郎  suzuki@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AUTOINCREMENTと単純なINTEGER PRIMARY KEYの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">INTEGER PRIMARY KEY</code> だけでは、
          行を削除すると削除した番号が再利用される可能性があります。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">AUTOINCREMENT</code> を付けると、
          過去に使用した最大値よりも常に大きい値が割り当てられるため、IDの再利用が防がれます。
          ほとんどのケースでは <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">AUTOINCREMENT</code> なしで十分です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: last_insert_rowid()で挿入IDを取得</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE categories (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE items (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  category_id INTEGER
);

INSERT INTO categories (name) VALUES ('電子機器');
SELECT last_insert_rowid() AS new_category_id;`}
          expectedOutput={`new_category_id
1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: AUTOINCREMENTで単調増加を保証</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE audit_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  action     TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO audit_log (action) VALUES ('ログイン');
INSERT INTO audit_log (action) VALUES ('データ変更');
INSERT INTO audit_log (action) VALUES ('ログアウト');

SELECT id, action, created_at FROM audit_log;`}
          expectedOutput={`id  action   created_at
1   ログイン   2024-01-15 10:30:00
2   データ変更  2024-01-15 10:30:01
3   ログアウト  2024-01-15 10:30:02`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="auto-increment" />
      </div>
      <LessonNav lessons={lessons} currentId="auto-increment" basePath="/learn/create-table" />
    </div>
  );
}
