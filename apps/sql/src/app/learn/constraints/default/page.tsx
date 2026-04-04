import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function DefaultConstraintPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DEFAULT制約</h1>
        <p className="text-gray-400">デフォルト値の設定と実務での活用パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DEFAULT制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT</code> 制約は、INSERT時にカラムの値を省略した場合に自動的に設定される値を定義します。
          定数（数値・文字列）や <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">CURRENT_TIMESTAMP</code> などの組み込み関数を指定できます。
          NOT NULL制約と組み合わせてよく使われ、値を省略しても安全に挿入できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT 定数値</code> — 固定のデフォルト値</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT CURRENT_TIMESTAMP</code> — 現在日時</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT (式)</code> — 式によるデフォルト値</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 実務でよく使うDEFAULT値の組み合わせ</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE blog_posts (
  id           INTEGER PRIMARY KEY,
  title        TEXT    NOT NULL,
  content      TEXT    NOT NULL DEFAULT '',
  status       TEXT    NOT NULL DEFAULT 'draft',
  view_count   INTEGER NOT NULL DEFAULT 0,
  is_featured  INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blog_posts (id, title, content)
VALUES (1, 'SQLの基礎', 'SQLはデータ操作言語です...');

SELECT id, title, status, view_count, is_featured FROM blog_posts;`}
          expectedOutput={`id  title   status  view_count  is_featured
1   SQLの基礎  draft   0           0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DEFAULT値の明示的な指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          INSERT文でカラムを列挙する際に <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT</code> キーワードを使うと、
          明示的にデフォルト値を設定することができます。
          また、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT INTO テーブル DEFAULT VALUES</code> で
          全カラムにデフォルト値を適用した行を挿入できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: DEFAULTキーワードの明示的な使用</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE counters (
  id    INTEGER PRIMARY KEY,
  name  TEXT    NOT NULL,
  value INTEGER NOT NULL DEFAULT 0
);

INSERT INTO counters (id, name, value) VALUES (1, 'ページビュー', DEFAULT);
INSERT INTO counters (id, name) VALUES (2, 'ログイン回数');

UPDATE counters SET value = value + 1 WHERE id = 1;
UPDATE counters SET value = value + 5 WHERE id = 2;

SELECT id, name, value FROM counters;`}
          expectedOutput={`id  name      value
1   ページビュー  1
2   ログイン回数  5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 監査カラムのDEFAULTパターン</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE documents (
  id          INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  author      TEXT NOT NULL,
  version     INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT CURRENT_DATE,
  is_archived INTEGER NOT NULL DEFAULT 0
);

INSERT INTO documents (id, title, author) VALUES
  (1, '設計書v1', '田中'),
  (2, '手順書',   '佐藤');

INSERT INTO documents (id, title, author, version)
VALUES (3, '設計書v2', '田中', 2);

SELECT id, title, author, version, is_archived FROM documents;`}
          expectedOutput={`id  title   author  version  is_archived
1   設計書v1  田中     1        0
2   手順書    佐藤     1        0
3   設計書v2  田中     2        0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="default" />
      </div>
      <LessonNav lessons={lessons} currentId="default" basePath="/learn/constraints" />
    </div>
  );
}
