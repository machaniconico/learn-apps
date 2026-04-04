import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function NotNullPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NOT NULL制約</h1>
        <p className="text-gray-400">必須カラムの設定とNULL禁止の活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOT NULL制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT NULL</code> 制約を設定すると、そのカラムにNULLを挿入・更新しようとするとエラーになります。
          必ず値が必要なカラム（名前、メールアドレス、価格など）に設定して、
          データの品質を保証します。
          SQLiteではデフォルトでNULLが許容されるため、必要なカラムには明示的にNOT NULLを付けます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 型 NOT NULL</code> — NULL禁止</li>
          <li>INSERT時・UPDATE時の両方でチェックされる</li>
          <li>DEFAULT値と組み合わせると省略時に自動設定される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: NOT NULL制約の基本</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT    NOT NULL,
  price    REAL    NOT NULL,
  category TEXT             -- NULL許容
);

INSERT INTO products VALUES (1, 'ノートPC', 89800, '電子機器');
INSERT INTO products VALUES (2, 'マウス',    2800, NULL);  -- categoryはOK

-- nameをNULLにしようとするとエラー（コメントを外すと確認）
-- INSERT INTO products VALUES (3, NULL, 5000, '電子機器');

SELECT id, name, price, category FROM products;`}
          expectedOutput={`id  name    price    category
1   ノートPC  89800.0  電子機器
2   マウス    2800.0   NULL`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NOT NULLとDEFAULTの組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT NULL</code> と
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">DEFAULT</code> を組み合わせると、
          値を省略してもデフォルト値が設定されるため、NOT NULL違反が発生しません。
          ステータスや数量など「省略時は特定の値にしたいが、NULLは許可しない」場合に有効です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NOT NULL + DEFAULTの組み合わせ</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE tasks (
  id         INTEGER PRIMARY KEY,
  title      TEXT    NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'pending',
  priority   INTEGER NOT NULL DEFAULT 2,
  created_at TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (id, title) VALUES (1, 'レポート作成');
INSERT INTO tasks (id, title, status, priority)
VALUES (2, 'バグ修正', 'in_progress', 1);

SELECT id, title, status, priority FROM tasks;`}
          expectedOutput={`id  title    status       priority
1   レポート作成  pending     2
2   バグ修正    in_progress  1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: UPDATE時のNOT NULL違反</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE inventory (
  id       INTEGER PRIMARY KEY,
  item     TEXT    NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0
);

INSERT INTO inventory VALUES (1, 'ペン', 100);
INSERT INTO inventory VALUES (2, 'ノート', 50);

-- 正常な更新
UPDATE inventory SET quantity = 80 WHERE id = 1;

-- quantityをNULLにしようとするとエラー（コメントを外すと確認）
-- UPDATE inventory SET quantity = NULL WHERE id = 1;

SELECT id, item, quantity FROM inventory;`}
          expectedOutput={`id  item  quantity
1   ペン   80
2   ノート  50`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="not-null" />
      </div>
      <LessonNav lessons={lessons} currentId="not-null" basePath="/learn/constraints" />
    </div>
  );
}
