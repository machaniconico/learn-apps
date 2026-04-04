import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function ForeignKeyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">外部キー</h1>
        <p className="text-gray-400">FOREIGN KEY制約とテーブル間のリレーション</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FOREIGN KEY制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">FOREIGN KEY</code> 制約は、あるテーブルのカラムが別のテーブルの主キーを参照することを定義します。
          参照整合性を保証し、存在しない値の参照を防ぎます。
          SQLiteではFOREIGN KEY制約は定義できますが、有効化するには <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">PRAGMA foreign_keys = ON;</code> が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">FOREIGN KEY (col) REFERENCES 参照テーブル(col)</code> — 基本構文</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ON DELETE CASCADE</code> — 親削除時に子も削除</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ON DELETE SET NULL</code> — 親削除時にNULLを設定</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 外部キーの定義</h2>
        <SqlEditor
          defaultCode={`PRAGMA foreign_keys = ON;

CREATE TABLE departments (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);

CREATE TABLE employees (
  id            INTEGER PRIMARY KEY,
  name          TEXT    NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO departments VALUES (1, '開発部'), (2, '営業部');
INSERT INTO employees VALUES (1, '田中太郎', 1);
INSERT INTO employees VALUES (2, '佐藤花子', 2);
INSERT INTO employees VALUES (3, '鈴木次郎', 1);

SELECT e.name, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id;`}
          expectedOutput={`name    department
田中太郎  開発部
佐藤花子  営業部
鈴木次郎  開発部`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスケード操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ON DELETE CASCADE</code> を設定すると、
          親テーブルの行が削除されたとき、それを参照している子テーブルの行も自動的に削除されます。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">ON UPDATE CASCADE</code> では親の主キー更新時に子の外部キーも追従します。
          データの整合性を自動的に維持できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ON DELETE CASCADEの動作</h2>
        <SqlEditor
          defaultCode={`PRAGMA foreign_keys = ON;

CREATE TABLE categories (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);

CREATE TABLE items (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO categories VALUES (1, '電子機器'), (2, '家具');
INSERT INTO items VALUES (1, 'ノートPC', 1), (2, 'マウス', 1), (3, 'デスク', 2);

-- カテゴリを削除するとアイテムも削除される
DELETE FROM categories WHERE id = 1;

SELECT * FROM items;`}
          expectedOutput={`id  name  category_id
3   デスク  2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ON DELETE SET NULLの動作</h2>
        <SqlEditor
          defaultCode={`PRAGMA foreign_keys = ON;

CREATE TABLE managers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE staff (
  id         INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE SET NULL
);

INSERT INTO managers VALUES (1, '部長A'), (2, '部長B');
INSERT INTO staff VALUES (1, '田中', 1), (2, '佐藤', 1), (3, '鈴木', 2);

DELETE FROM managers WHERE id = 1;

SELECT id, name, manager_id FROM staff;`}
          expectedOutput={`id  name  manager_id
1   田中   NULL
2   佐藤   NULL
3   鈴木   2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="foreign-key" />
      </div>
      <LessonNav lessons={lessons} currentId="foreign-key" basePath="/learn/constraints" />
    </div>
  );
}
