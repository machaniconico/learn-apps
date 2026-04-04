import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function DropConstraintPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">制約削除</h1>
        <p className="text-gray-400">既存テーブルから制約を削除するパターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteでの制約削除</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE DROP CONSTRAINT</code> はサポートされていません。
          インデックスとして追加した制約は <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP INDEX</code> で削除できます。
          テーブル定義に組み込まれた制約（NOT NULL, CHECK等）の削除はテーブルの再作成が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP INDEX インデックス名</code> — インデックス制約を削除</li>
          <li>テーブル組み込み制約の削除はテーブル再作成が必要</li>
          <li>MySQL / PostgreSQL: <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE DROP CONSTRAINT 制約名</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: UNIQUE INDEXの削除</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE UNIQUE INDEX idx_users_email ON users(email);

INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '佐藤花子', 'sato@example.com');

-- UNIQUE INDEXを削除（制約を緩和）
DROP INDEX idx_users_email;

-- 制約削除後は重複emailも挿入可能
INSERT INTO users VALUES (3, '鈴木次郎', 'tanaka@example.com');

SELECT id, name, email FROM users;`}
          expectedOutput={`id  name    email
1   田中太郎  tanaka@example.com
2   佐藤花子  sato@example.com
3   鈴木次郎  tanaka@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テーブル再作成で制約を削除</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NOT NULLやCHECKなどテーブル定義に組み込まれた制約を削除するには、
          制約なしの新テーブルを作成してデータを移行します。
          制約削除はデータの品質保証を弱めるため、慎重に判断してください。
          必ずトランザクション内で実行し、移行後に元のテーブルをリネームします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: テーブル再作成でCHECK制約を削除</h2>
        <SqlEditor
          defaultCode={`-- CHECK制約付きテーブル
CREATE TABLE products_old (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL CHECK (price > 0)
);

INSERT INTO products_old VALUES (1, 'ノートPC', 89800);
INSERT INTO products_old VALUES (2, 'マウス',    2800);

-- CHECK制約なしの新テーブルを作成
CREATE TABLE products_new (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO products_new SELECT * FROM products_old;

-- 制約削除後は0以下の価格も挿入可能
INSERT INTO products_new VALUES (3, '無料サンプル', 0);

SELECT id, name, price FROM products_new;`}
          expectedOutput={`id  name      price
1   ノートPC   89800.0
2   マウス     2800.0
3   無料サンプル  0.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: インデックス一覧の確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id       INTEGER PRIMARY KEY,
  customer TEXT NOT NULL,
  status   TEXT NOT NULL
);

CREATE INDEX idx_orders_customer ON orders(customer);
CREATE INDEX idx_orders_status   ON orders(status);

-- インデックス一覧を確認
SELECT name, tbl_name FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'orders';`}
          expectedOutput={`name                  tbl_name
idx_orders_customer   orders
idx_orders_status     orders`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="drop-constraint" />
      </div>
      <LessonNav lessons={lessons} currentId="drop-constraint" basePath="/learn/alter" />
    </div>
  );
}
