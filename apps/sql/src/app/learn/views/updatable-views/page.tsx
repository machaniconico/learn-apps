import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function UpdatableViewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">更新可能ビュー</h1>
        <p className="text-gray-400">INSERT・UPDATE・DELETEが可能なビューの条件と使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">更新可能ビューの条件</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteでは、特定の条件を満たすビューに対してINSERT・UPDATE・DELETEが実行できます。
          更新可能ビューの主な条件は：単一テーブルへのSELECT・GROUP BYなし・集約関数なし・DISTINCTなし・JOINなしです。
          これらの条件を満たすビューはテーブルと同様に操作できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>単一テーブルのSELECTのみ — 更新可能</li>
          <li>GROUP BY・集約・DISTINCT・JOIN を含む — 更新不可</li>
          <li>更新はベーステーブルに反映される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 更新可能ビューへのUPDATE</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  department TEXT    NOT NULL,
  salary     REAL    NOT NULL,
  is_active  INTEGER NOT NULL DEFAULT 1
);

INSERT INTO employees VALUES (1, '田中太郎', '開発', 550000, 1);
INSERT INTO employees VALUES (2, '佐藤花子', '営業', 480000, 1);
INSERT INTO employees VALUES (3, '鈴木次郎', '開発', 620000, 1);

-- 単一テーブルの単純なビュー（更新可能）
CREATE VIEW dev_team AS
SELECT id, name, salary FROM employees WHERE department = '開発';

-- ビュー経由でUPDATE
UPDATE dev_team SET salary = salary * 1.1 WHERE id = 1;

SELECT id, name, department, salary FROM employees WHERE department = '開発';`}
          expectedOutput={`id  name    department  salary
1   田中太郎  開発         605000.0
3   鈴木次郎  開発         620000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビュー経由のINSERTとDELETE</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          更新可能ビュー経由でINSERTすると、ベーステーブルに行が挿入されます。
          ただし、ビューの定義にWHERE句がある場合、挿入した行がビューに表示されないことがあります。
          例えば、<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">department = '開発'</code> のビュー経由で営業部の社員を挿入しても、ベーステーブルには入りますがビューには表示されません。
          これを防ぐのが <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">WITH CHECK OPTION</code> です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ビュー経由でのINSERT</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    REAL NOT NULL
);

INSERT INTO products VALUES (1, 'ノートPC', '電子機器', 89800);
INSERT INTO products VALUES (2, 'デスク',   '家具',     45000);

-- 電子機器カテゴリのビュー（更新可能）
CREATE VIEW electronics AS
SELECT id, name, price FROM products WHERE category = '電子機器';

-- ビュー経由でINSERT（categoryを明示する必要あり→ベーステーブルに直接）
INSERT INTO products (id, name, category, price)
VALUES (3, 'マウス', '電子機器', 2800);

SELECT * FROM electronics;`}
          expectedOutput={`id  name    price
1   ノートPC  89800.0
3   マウス    2800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ビュー経由でのDELETE</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE tasks (
  id       INTEGER PRIMARY KEY,
  title    TEXT    NOT NULL,
  status   TEXT    NOT NULL DEFAULT 'pending',
  priority INTEGER NOT NULL DEFAULT 2
);

INSERT INTO tasks VALUES (1, 'タスクA', 'pending',   1);
INSERT INTO tasks VALUES (2, 'タスクB', 'completed', 2);
INSERT INTO tasks VALUES (3, 'タスクC', 'pending',   3);
INSERT INTO tasks VALUES (4, 'タスクD', 'completed', 1);

CREATE VIEW pending_tasks AS
SELECT id, title, priority FROM tasks WHERE status = 'pending';

-- ビュー経由でDELETE（ベーステーブルから削除される）
DELETE FROM pending_tasks WHERE priority = 3;

SELECT id, title, status FROM tasks;`}
          expectedOutput={`id  title   status
1   タスクA  pending
2   タスクB  completed
4   タスクD  completed`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="updatable-views" />
      </div>
      <LessonNav lessons={lessons} currentId="updatable-views" basePath="/learn/views" />
    </div>
  );
}
