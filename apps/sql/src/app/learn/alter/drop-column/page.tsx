import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function DropColumnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カラム削除</h1>
        <p className="text-gray-400">ALTER TABLE DROP COLUMNで不要なカラムを削除する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ALTER TABLE DROP COLUMN</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLite 3.35.0以降では
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE テーブル名 DROP COLUMN カラム名</code> でカラムを削除できます。
          削除するカラムが他の制約や索引に使われていないことが条件です。
          主キー・外部キー・インデックスで使用中のカラムは直接削除できません。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE t DROP COLUMN col</code> — カラムを削除</li>
          <li>主キー・外部キー参照カラムは削除不可</li>
          <li>削除は不可逆 — バックアップを取ってから実行する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 不要カラムの削除</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  price       REAL NOT NULL,
  old_code    TEXT,      -- 廃止された商品コード
  legacy_id   INTEGER,   -- 旧システムのID
  description TEXT
);

INSERT INTO products VALUES (1, 'ノートPC', 89800, 'A001', 9001, '高性能PC');
INSERT INTO products VALUES (2, 'マウス',    2800, 'B002', 9002, 'ワイヤレス');

-- 不要なカラムを削除
ALTER TABLE products DROP COLUMN old_code;
ALTER TABLE products DROP COLUMN legacy_id;

SELECT id, name, price, description FROM products;`}
          expectedOutput={`id  name    price    description
1   ノートPC  89800.0  高性能PC
2   マウス    2800.0   ワイヤレス`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カラム削除前の確認事項</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カラムを削除する前に、そのカラムが使われていないことを確認します。
          アプリケーションコードやビュー・トリガーで参照されていないか確認が必要です。
          また、削除したデータは復元できないため、必要であれば事前にバックアップテーブルにデータを保存しておきます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 削除前にデータをバックアップ</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  temp_token TEXT,    -- 一時的なデータ
  debug_info TEXT     -- デバッグ用
);

INSERT INTO users VALUES (1, '田中', 'tanaka@example.com', 'tok_abc', 'debug1');
INSERT INTO users VALUES (2, '佐藤', 'sato@example.com',   NULL,      'debug2');

-- 削除前にバックアップ
CREATE TABLE users_backup AS SELECT * FROM users;

-- カラム削除
ALTER TABLE users DROP COLUMN temp_token;
ALTER TABLE users DROP COLUMN debug_info;

SELECT id, name, email FROM users;`}
          expectedOutput={`id  name  email
1   田中   tanaka@example.com
2   佐藤   sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テーブル構造の確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id         INTEGER PRIMARY KEY,
  customer   TEXT NOT NULL,
  total      REAL NOT NULL,
  notes      TEXT,
  internal_flag INTEGER DEFAULT 0
);

INSERT INTO orders VALUES (1, '田中', 15000, 'お急ぎ', 1);
INSERT INTO orders VALUES (2, '佐藤', 8000,  NULL,   0);

-- internal_flagを削除
ALTER TABLE orders DROP COLUMN internal_flag;

-- テーブル構造をSQLで確認
SELECT sql FROM sqlite_master WHERE name = 'orders';`}
          expectedOutput={`sql
CREATE TABLE orders (
  id         INTEGER PRIMARY KEY,
  customer   TEXT NOT NULL,
  total      REAL NOT NULL,
  notes      TEXT
)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="drop-column" />
      </div>
      <LessonNav lessons={lessons} currentId="drop-column" basePath="/learn/alter" />
    </div>
  );
}
