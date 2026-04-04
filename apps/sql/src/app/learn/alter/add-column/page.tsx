import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function AddColumnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カラム追加</h1>
        <p className="text-gray-400">ALTER TABLE ADD COLUMNで既存テーブルにカラムを追加する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ALTER TABLE ADD COLUMN</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          既存テーブルに新しいカラムを追加するには
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE テーブル名 ADD COLUMN カラム定義</code> を使います。
          追加したカラムの既存行の値はNULL（またはDEFAULT値）になります。
          SQLiteではカラムの追加は可能ですが、削除や変更には制限があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE t ADD COLUMN col 型</code> — 基本構文</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ADD COLUMN col 型 DEFAULT 値</code> — デフォルト値付き追加</li>
          <li>追加したカラムは最後尾に追加される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 既存テーブルへのカラム追加</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '佐藤花子', 'sato@example.com');

-- カラムを追加
ALTER TABLE users ADD COLUMN age INTEGER;
ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP;

SELECT id, name, email, age, created_at FROM users;`}
          expectedOutput={`id  name    email               age   created_at
1   田中太郎  tanaka@example.com  NULL  2024-01-15 10:30:00
2   佐藤花子  sato@example.com    NULL  2024-01-15 10:30:00`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">追加後のデータ更新</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カラム追加後は、既存行の新カラム値はNULLになっています。
          必要であれば <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">UPDATE</code> 文で値を設定します。
          DEFAULT値を設定しておくと、新しいINSERT時には自動的に値が入ります。
          既存行も含めてデフォルト値を設定したい場合はUPDATE文で一括更新します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カラム追加後に既存データを更新</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO products VALUES (1, 'ノートPC', 89800);
INSERT INTO products VALUES (2, 'マウス',    2800);
INSERT INTO products VALUES (3, 'キーボード', 8500);

ALTER TABLE products ADD COLUMN tax_rate REAL DEFAULT 0.10;
ALTER TABLE products ADD COLUMN in_stock INTEGER DEFAULT 1;

-- 既存データのin_stockを更新
UPDATE products SET in_stock = 0 WHERE id = 2;

SELECT id, name, price, tax_rate, in_stock FROM products;`}
          expectedOutput={`id  name      price    tax_rate  in_stock
1   ノートPC   89800.0  0.1       1
2   マウス     2800.0   0.1       0
3   キーボード  8500.0   0.1       1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NOT NULL制約付きカラムの追加</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE articles (
  id    INTEGER PRIMARY KEY,
  title TEXT NOT NULL
);

INSERT INTO articles VALUES (1, 'SQLの基礎');
INSERT INTO articles VALUES (2, 'インデックス入門');

-- NOT NULLカラムはDEFAULT値が必要（既存行があるため）
ALTER TABLE articles ADD COLUMN status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE articles ADD COLUMN version INTEGER NOT NULL DEFAULT 1;

SELECT id, title, status, version FROM articles;`}
          expectedOutput={`id  title       status  version
1   SQLの基礎    draft   1
2   インデックス入門  draft   1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="add-column" />
      </div>
      <LessonNav lessons={lessons} currentId="add-column" basePath="/learn/alter" />
    </div>
  );
}
