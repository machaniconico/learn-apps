import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function DefaultValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト値</h1>
        <p className="text-gray-400">DEFAULT句の指定方法と活用パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DEFAULT句とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT</code> 句を使うと、INSERT時にそのカラムの値を省略した場合に自動で設定される値を定義できます。
          定数値だけでなく、<code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CURRENT_TIMESTAMP</code> などの関数も使えます。
          デフォルト値を設定することで、必須でないカラムを省略したシンプルなINSERTが書けます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT 値</code> — 固定のデフォルト値</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT CURRENT_TIMESTAMP</code> — 現在日時</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT (式)</code> — 式によるデフォルト値</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 固定デフォルト値</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE articles (
  id         INTEGER,
  title      TEXT    NOT NULL,
  status     TEXT    DEFAULT 'draft',
  view_count INTEGER DEFAULT 0,
  is_public  INTEGER DEFAULT 0
);

INSERT INTO articles (id, title) VALUES (1, 'SQLの基礎');
INSERT INTO articles (id, title, status, is_public)
VALUES (2, 'インデックス入門', 'published', 1);

SELECT id, title, status, view_count, is_public FROM articles;`}
          expectedOutput={`id  title         status     view_count  is_public
1   SQLの基礎      draft      0           0
2   インデックス入門  published  0           1`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CURRENT_TIMESTAMPの活用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          作成日時や更新日時を自動記録したい場合は
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT CURRENT_TIMESTAMP</code> が便利です。
          INSERT時に自動でその時刻が記録されます。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CURRENT_DATE</code>（日付のみ）や
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CURRENT_TIME</code>（時刻のみ）も使えます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CURRENT_TIMESTAMPでタイムスタンプ自動記録</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE comments (
  id         INTEGER,
  content    TEXT NOT NULL,
  author     TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (id, content, author)
VALUES (1, 'とても参考になりました！', '田中太郎');

INSERT INTO comments (id, content, author)
VALUES (2, 'わかりやすい説明です', '佐藤花子');

SELECT id, author, content, created_at FROM comments;`}
          expectedOutput={`id  author  content              created_at
1   田中太郎  とても参考になりました！  2024-01-15 10:30:00
2   佐藤花子  わかりやすい説明です     2024-01-15 10:30:01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: DEFAULT VALUESで全カラムをデフォルト値で挿入</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE sessions (
  id         INTEGER,
  token      TEXT    DEFAULT (hex(randomblob(8))),
  created_at TEXT    DEFAULT CURRENT_TIMESTAMP,
  expires_in INTEGER DEFAULT 3600
);

INSERT INTO sessions (id) VALUES (1);
INSERT INTO sessions (id) VALUES (2);

SELECT id, expires_in, created_at FROM sessions;`}
          expectedOutput={`id  expires_in  created_at
1   3600        2024-01-15 10:30:00
2   3600        2024-01-15 10:30:00`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="default-values" />
      </div>
      <LessonNav lessons={lessons} currentId="default-values" basePath="/learn/create-table" />
    </div>
  );
}
