import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function AddConstraintPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">制約追加</h1>
        <p className="text-gray-400">既存テーブルへの制約追加パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteでの制約追加</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE ADD CONSTRAINT</code> は直接サポートされていません。
          制約を追加するには、テーブルの再作成（新テーブル作成 → データ移行 → 旧テーブル削除 → リネーム）が必要です。
          ただし、インデックスによる一意性制約（UNIQUE INDEX）は後から追加できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>SQLite: テーブル再作成で制約を追加</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE UNIQUE INDEX</code> でUNIQUE制約相当を追加可能</li>
          <li>MySQL / PostgreSQL: <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE ADD CONSTRAINT</code> が使える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: UNIQUE INDEXで一意制約を追加</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '佐藤花子', 'sato@example.com');

-- UNIQUE INDEXで一意制約を追加
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 重複emailは挿入できない（コメントを外すと確認）
-- INSERT INTO users VALUES (3, '鈴木次郎', 'tanaka@example.com');

SELECT id, name, email FROM users;`}
          expectedOutput={`id  name    email
1   田中太郎  tanaka@example.com
2   佐藤花子  sato@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブル再作成による制約追加</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NOT NULL制約やCHECK制約など、インデックスで代替できない制約は
          テーブルの再作成が必要です。手順は：
          ①制約付きの新テーブルを作成、②既存データを移行（既存データが制約を満たすか確認）、
          ③旧テーブルを削除、④新テーブルをリネームします。
          必ずトランザクション内で実行してください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: テーブル再作成でNOT NULL制約を追加</h2>
        <SqlEditor
          defaultCode={`-- 制約なしの既存テーブル
CREATE TABLE products_old (
  id    INTEGER PRIMARY KEY,
  name  TEXT,
  price REAL
);

INSERT INTO products_old VALUES (1, 'ノートPC', 89800);
INSERT INTO products_old VALUES (2, 'マウス',    2800);

-- NOT NULL制約付きの新テーブルを作成
CREATE TABLE products_new (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL CHECK (price > 0)
);

-- データを移行（NULL行は除外）
INSERT INTO products_new
SELECT * FROM products_old
WHERE name IS NOT NULL AND price IS NOT NULL;

SELECT id, name, price FROM products_new;`}
          expectedOutput={`id  name    price
1   ノートPC  89800.0
2   マウス    2800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複合ユニークインデックスの追加</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE enrollments (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  course_id  INTEGER NOT NULL
);

INSERT INTO enrollments VALUES (1, 101, 201);
INSERT INTO enrollments VALUES (2, 101, 202);
INSERT INTO enrollments VALUES (3, 102, 201);

-- 複合ユニーク制約を後から追加
CREATE UNIQUE INDEX idx_enrollment_unique
ON enrollments(student_id, course_id);

-- (101, 201) は既に存在するためエラー（コメントを外すと確認）
-- INSERT INTO enrollments VALUES (4, 101, 201);

SELECT * FROM enrollments;`}
          expectedOutput={`id  student_id  course_id
1   101         201
2   101         202
3   102         201`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="add-constraint" />
      </div>
      <LessonNav lessons={lessons} currentId="add-constraint" basePath="/learn/alter" />
    </div>
  );
}
