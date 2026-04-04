import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function ModifyColumnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カラム変更</h1>
        <p className="text-gray-400">ALTER TABLE MODIFY / ALTER COLUMNによるカラム定義の変更</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カラム変更の方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE ... RENAME COLUMN</code> でカラム名の変更が可能です。
          データ型の変更などは直接サポートされていないため、
          テーブルの再作成（CREATE新テーブル → データ移行 → DROP旧テーブル → RENAME）が必要です。
          他のDB（MySQL・PostgreSQL）では <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">MODIFY COLUMN</code> や
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER COLUMN</code> が使えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE t RENAME COLUMN 旧名 TO 新名</code> — カラム名変更（SQLite対応）</li>
          <li>データ型変更にはテーブル再作成が必要（SQLite）</li>
          <li>MySQL: <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE t MODIFY COLUMN col 新型</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: RENAME COLUMNでカラム名を変更</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  usr_name TEXT NOT NULL,
  mail     TEXT NOT NULL
);

INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '佐藤花子', 'sato@example.com');

-- カラム名を変更
ALTER TABLE users RENAME COLUMN usr_name TO username;
ALTER TABLE users RENAME COLUMN mail TO email;

SELECT id, username, email FROM users;`}
          expectedOutput={`id  username  email
1   田中太郎   tanaka@example.com
2   佐藤花子   sato@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブル再作成によるカラム型変更</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでカラムのデータ型を変更するには、新しいテーブルを作成してデータを移行する方法が標準的です。
          手順は：①新テーブル作成 → ②データをSELECT+INSERTで移行 → ③元テーブルを削除 → ④新テーブルをリネームです。
          トランザクション内で実行することで、途中でエラーが起きても安全に戻せます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: テーブル再作成によるカラム型変更</h2>
        <SqlEditor
          defaultCode={`-- 元のテーブル（priceがTEXT型になっている問題）
CREATE TABLE products_old (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price TEXT  -- 本来はREALにしたい
);

INSERT INTO products_old VALUES (1, 'ノートPC', '89800');
INSERT INTO products_old VALUES (2, 'マウス',   '2800');

-- 新しいテーブルを正しい型で作成
CREATE TABLE products_new (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL  -- 正しい型
);

-- データを移行（TEXTからREALへ自動変換）
INSERT INTO products_new SELECT id, name, CAST(price AS REAL) FROM products_old;

-- 確認
SELECT id, name, price, TYPEOF(price) AS price_type FROM products_new;`}
          expectedOutput={`id  name    price    price_type
1   ノートPC  89800.0  real
2   マウス    2800.0   real`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: DEFAULT値の追加変更</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE settings (
  id    INTEGER PRIMARY KEY,
  key   TEXT NOT NULL UNIQUE,
  value TEXT
);

INSERT INTO settings (id, key, value) VALUES
  (1, 'theme',    'dark'),
  (2, 'language', 'ja');

-- カラム名を変更
ALTER TABLE settings RENAME COLUMN value TO setting_value;

SELECT id, key, setting_value FROM settings;`}
          expectedOutput={`id  key       setting_value
1   theme     dark
2   language  ja`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="modify-column" />
      </div>
      <LessonNav lessons={lessons} currentId="modify-column" basePath="/learn/alter" />
    </div>
  );
}
