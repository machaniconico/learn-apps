import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "indexes")!.lessons;

export default function UniqueIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">インデックス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ユニークインデックス</h1>
        <p className="text-gray-400">一意性を保証するインデックスの作成と活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CREATE UNIQUE INDEX</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE UNIQUE INDEX</code> は、
          通常のインデックスによる検索高速化に加えて、カラム値の一意性を保証します。
          テーブル定義の <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE</code> 制約と同等の効果を持ちますが、
          テーブル作成後でも追加できる点が便利です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE UNIQUE INDEX 名前 ON テーブル(カラム)</code> — 基本構文</li>
          <li>重複値の挿入をエラーで防ぐ</li>
          <li>NULL値は一意性チェックの対象外（複数NULL可）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: メールアドレスのユニークインデックス</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  email    TEXT NOT NULL
);

CREATE UNIQUE INDEX idx_users_email    ON users(email);
CREATE UNIQUE INDEX idx_users_username ON users(username);

INSERT INTO users VALUES (1, 'tanaka', 'tanaka@example.com');
INSERT INTO users VALUES (2, 'sato',   'sato@example.com');

-- 重複emailはエラー（コメントを外すと確認）
-- INSERT INTO users VALUES (3, 'yamada', 'tanaka@example.com');

SELECT id, username, email FROM users;`}
          expectedOutput={`id  username  email
1   tanaka    tanaka@example.com
2   sato      sato@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">部分インデックス（WHERE句付き）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE INDEX ... WHERE 条件</code> で
          特定の条件を満たす行だけにインデックスを作成できます。
          例えば「アクティブなユーザーのみ」「削除されていない注文のみ」など、
          実際に検索対象となる行に絞ってインデックスを作ることでサイズを削減できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 部分ユニークインデックス</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE accounts (
  id         INTEGER PRIMARY KEY,
  username   TEXT NOT NULL,
  email      TEXT NOT NULL,
  is_deleted INTEGER NOT NULL DEFAULT 0
);

-- 削除されていないユーザーのemailのみ一意性を保証
CREATE UNIQUE INDEX idx_active_email
ON accounts(email)
WHERE is_deleted = 0;

INSERT INTO accounts VALUES (1, 'tanaka', 'tanaka@example.com', 0);
INSERT INTO accounts VALUES (2, 'sato',   'sato@example.com',   0);

-- 論理削除されたユーザーと同じemailは挿入可能
INSERT INTO accounts VALUES (3, 'yamada', 'tanaka@example.com', 1);

SELECT id, username, email, is_deleted FROM accounts;`}
          expectedOutput={`id  username  email               is_deleted
1   tanaka    tanaka@example.com  0
2   sato      sato@example.com    0
3   yamada    tanaka@example.com  1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複合ユニークインデックス</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE product_variants (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  color      TEXT    NOT NULL,
  size       TEXT    NOT NULL
);

-- 同じ商品の色+サイズの組み合わせは一意
CREATE UNIQUE INDEX idx_variant_unique
ON product_variants(product_id, color, size);

INSERT INTO product_variants VALUES (1, 101, '赤', 'S');
INSERT INTO product_variants VALUES (2, 101, '赤', 'M');
INSERT INTO product_variants VALUES (3, 101, '青', 'S');

-- (101, '赤', 'S') は重複のためエラー（コメントを外すと確認）
-- INSERT INTO product_variants VALUES (4, 101, '赤', 'S');

SELECT id, product_id, color, size FROM product_variants;`}
          expectedOutput={`id  product_id  color  size
1   101         赤     S
2   101         赤     M
3   101         青     S`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="indexes" lessonId="unique-index" />
      </div>
      <LessonNav lessons={lessons} currentId="unique-index" basePath="/learn/indexes" />
    </div>
  );
}
