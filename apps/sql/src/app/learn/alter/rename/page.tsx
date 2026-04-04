import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "alter")!.lessons;

export default function RenamePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">テーブル変更 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テーブル名変更</h1>
        <p className="text-gray-400">ALTER TABLE RENAMEによるテーブル名とカラム名の変更</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RENAME TO / RENAME COLUMN</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE 旧名 RENAME TO 新名</code> でテーブル名を変更できます。
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE テーブル名 RENAME COLUMN 旧カラム名 TO 新カラム名</code> でカラム名を変更できます。
          データはそのまま保持されます。外部キー参照がある場合は注意が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE 旧名 RENAME TO 新名</code> — テーブル名変更</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">ALTER TABLE t RENAME COLUMN 旧 TO 新</code> — カラム名変更</li>
          <li>データはそのまま保持される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: テーブル名の変更</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE usr (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO usr VALUES (1, '田中太郎');
INSERT INTO usr VALUES (2, '佐藤花子');

-- テーブル名をわかりやすい名前に変更
ALTER TABLE usr RENAME TO users;

SELECT id, name FROM users;`}
          expectedOutput={`id  name
1   田中太郎
2   佐藤花子`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">命名規則の統一</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          開発初期に命名規則が統一されていなかった場合、
          RENAMEを使って後からスネークケースやキャメルケースに統一できます。
          複数テーブルを連続してリネームする際はトランザクションで囲んで一括実行するのが安全です。
          アプリケーション側の参照も同時に更新する必要があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カラム名の変更</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (
  ID        INTEGER PRIMARY KEY,
  prod_name TEXT NOT NULL,
  unitPrice REAL NOT NULL
);

INSERT INTO products VALUES (1, 'ノートPC', 89800);
INSERT INTO products VALUES (2, 'マウス',    2800);

-- カラム名を統一（スネークケースに）
ALTER TABLE products RENAME COLUMN prod_name TO name;
ALTER TABLE products RENAME COLUMN unitPrice TO unit_price;

SELECT ID AS id, name, unit_price FROM products;`}
          expectedOutput={`id  name    unit_price
1   ノートPC  89800.0
2   マウス    2800.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テーブルとカラムを同時にリネーム</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE tbl_emp (
  empId    INTEGER PRIMARY KEY,
  empName  TEXT NOT NULL,
  deptCode TEXT
);

INSERT INTO tbl_emp VALUES (1, '田中太郎', 'DEV');
INSERT INTO tbl_emp VALUES (2, '佐藤花子', 'SALES');

-- テーブル名変更
ALTER TABLE tbl_emp RENAME TO employees;

-- カラム名変更
ALTER TABLE employees RENAME COLUMN empId   TO id;
ALTER TABLE employees RENAME COLUMN empName TO name;
ALTER TABLE employees RENAME COLUMN deptCode TO department;

SELECT id, name, department FROM employees;`}
          expectedOutput={`id  name    department
1   田中太郎  DEV
2   佐藤花子  SALES`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="alter" lessonId="rename" />
      </div>
      <LessonNav lessons={lessons} currentId="rename" basePath="/learn/alter" />
    </div>
  );
}
