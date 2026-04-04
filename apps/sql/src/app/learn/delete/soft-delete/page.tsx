import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "delete")!.lessons;

export default function SoftDeletePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">データ削除 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">論理削除</h1>
        <p className="text-gray-400">フラグによる論理削除パターン — データを残しながら「削除済み」にする</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">論理削除とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          論理削除（Soft Delete）はデータを物理的に削除せず、
          削除フラグや削除日時カラムを設定することで「削除済み」として扱うパターンです。
          データの復元、削除履歴の追跡、監査ログが必要な場合に有効です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-red-400">deleted_at</span> — 削除日時をNULLまたは日時で管理</li>
          <li><span className="text-red-400">is_deleted</span> — 0/1のフラグで管理</li>
          <li><span className="text-red-400">WHERE deleted_at IS NULL</span> — 有効なレコードのみ取得</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">論理削除の注意点</h2>
        <p className="text-gray-300 leading-relaxed">
          論理削除を使う場合、全クエリにWHERE deleted_at IS NULLを付け忘れると
          削除済みデータが混入します。
          ビューやアプリケーション層でフィルタを共通化する設計が重要です。
          また削除済みデータが蓄積するため定期的な物理削除も必要になります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 論理削除の実行</h2>
        <SqlEditor
          defaultCode={`-- 削除フラグを立てる（物理削除しない）
UPDATE users
SET deleted_at = CURRENT_TIMESTAMP
WHERE id = 2;

-- 有効なユーザーのみ取得
SELECT id, name, email
FROM users
WHERE deleted_at IS NULL;`}
          expectedOutput={`id | name       | email
---|------------|------------------
1  | 田中太郎   | tanaka@example.com
3  | 佐藤次郎   | sato@example.com`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  deleted_at TEXT DEFAULT NULL
);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', NULL), (2, '鈴木花子', 'suzuki@example.com', NULL), (3, '佐藤次郎', 'sato@example.com', NULL);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 論理削除済みデータの復元</h2>
        <SqlEditor
          defaultCode={`-- 論理削除されたユーザーを確認
SELECT id, name, deleted_at FROM users WHERE deleted_at IS NOT NULL;

-- 復元（削除フラグをリセット）
UPDATE users SET deleted_at = NULL WHERE id = 2;

SELECT id, name FROM users WHERE deleted_at IS NULL;`}
          expectedOutput={`id | name       | deleted_at
---|------------|--------------------
2  | 鈴木花子   | 2024-01-15 10:00:00

id | name
---|--------
1  | 田中太郎
2  | 鈴木花子
3  | 佐藤次郎`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, deleted_at TEXT DEFAULT NULL);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', NULL), (2, '鈴木花子', 'suzuki@example.com', '2024-01-15 10:00:00'), (3, '佐藤次郎', 'sato@example.com', NULL);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ビューで論理削除を透過的に扱う</h2>
        <SqlEditor
          defaultCode={`-- 論理削除フィルタをビューに封じ込める
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE deleted_at IS NULL;

-- ビューを使えばWHERE不要
SELECT * FROM active_users;`}
          expectedOutput={`id | name       | email
---|------------|------------------
1  | 田中太郎   | tanaka@example.com
3  | 佐藤次郎   | sato@example.com`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, deleted_at TEXT DEFAULT NULL);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', NULL), (2, '鈴木花子', 'suzuki@example.com', '2024-01-15 10:00:00'), (3, '佐藤次郎', 'sato@example.com', NULL);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delete" lessonId="soft-delete" />
      </div>
      <LessonNav lessons={lessons} currentId="soft-delete" basePath="/learn/delete" />
    </div>
  );
}
