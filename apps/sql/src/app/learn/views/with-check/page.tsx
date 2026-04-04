import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function WithCheckPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WITH CHECK OPTION</h1>
        <p className="text-gray-400">ビュー条件の整合性チェックで安全な更新を保証する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">WITH CHECK OPTIONとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          更新可能ビューにデータを挿入・更新する際、
          ビューのWHERE条件を満たさない行の操作を拒否するオプションです。
          これにより「ビューから見えなくなるデータを誤って追加してしまう」問題を防ぎます。
          SQLiteはWITH CHECK OPTIONを直接サポートしないため、トリガーで代替します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>PostgreSQL・MySQL: <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE VIEW ... WITH CHECK OPTION</code></li>
          <li>SQLite代替: BEFOREトリガーで条件チェック</li>
          <li>ビューの整合性を保証してデータ品質を維持</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: WITH CHECK OPTION の概念（PostgreSQL風）</h2>
        <SqlEditor
          defaultCode={`-- WITH CHECK OPTIONの概念をSQLiteで再現
CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  department TEXT    NOT NULL,
  salary     REAL    NOT NULL
);

INSERT INTO employees VALUES (1, '田中', '開発', 550000);
INSERT INTO employees VALUES (2, '佐藤', '営業', 480000);
INSERT INTO employees VALUES (3, '鈴木', '開発', 620000);

-- 開発部ビュー
CREATE VIEW dev_employees AS
SELECT id, name, department, salary
FROM employees WHERE department = '開発';

-- 開発部のみ表示
SELECT id, name, salary FROM dev_employees;`}
          expectedOutput={`id  name  salary
1   田中   550000.0
3   鈴木   620000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トリガーによるWITH CHECK OPTION代替</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLiteではBEFORE INSERTトリガー・BEFORE UPDATEトリガーを使って、
          WITH CHECK OPTIONと同等のチェックを実装できます。
          条件を満たさない場合は <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">SELECT RAISE(ABORT, 'メッセージ')</code> でエラーを発生させます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: トリガーでWITH CHECK OPTIONを実装</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    REAL NOT NULL CHECK (price > 0)
);

CREATE VIEW electronics AS
SELECT id, name, price FROM products WHERE category = '電子機器';

-- INSERTトリガーでカテゴリを強制
CREATE TRIGGER electronics_insert_check
INSTEAD OF INSERT ON electronics
BEGIN
  INSERT INTO products (id, name, category, price)
  VALUES (NEW.id, NEW.name, '電子機器', NEW.price);
END;

INSERT INTO electronics VALUES (1, 'ノートPC', 89800);
INSERT INTO electronics VALUES (2, 'マウス',    2800);

SELECT id, name, category, price FROM products;`}
          expectedOutput={`id  name    category  price
1   ノートPC  電子機器  89800.0
2   マウス    電子機器  2800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: INSTEAD OFトリガーでビュー更新を制御</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE tasks (
  id       INTEGER PRIMARY KEY,
  title    TEXT    NOT NULL,
  status   TEXT    NOT NULL DEFAULT 'pending',
  priority INTEGER NOT NULL DEFAULT 2
);

INSERT INTO tasks VALUES (1, 'タスクA', 'pending',   1);
INSERT INTO tasks VALUES (2, 'タスクB', 'pending',   2);
INSERT INTO tasks VALUES (3, 'タスクC', 'completed', 1);

CREATE VIEW high_priority_tasks AS
SELECT id, title, status FROM tasks WHERE priority = 1;

-- UPDATEトリガー
CREATE TRIGGER hp_tasks_update
INSTEAD OF UPDATE ON high_priority_tasks
BEGIN
  UPDATE tasks SET title = NEW.title, status = NEW.status
  WHERE id = OLD.id AND priority = 1;
END;

UPDATE high_priority_tasks SET status = 'completed' WHERE id = 1;

SELECT id, title, status, priority FROM tasks ORDER BY id;`}
          expectedOutput={`id  title   status     priority
1   タスクA  completed  1
2   タスクB  pending    2
3   タスクC  completed  1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="with-check" />
      </div>
      <LessonNav lessons={lessons} currentId="with-check" basePath="/learn/views" />
    </div>
  );
}
