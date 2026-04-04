import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function ViewBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビュー基本</h1>
        <p className="text-gray-400">CREATE VIEWの基本構文とビューの仕組み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビューとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビューは、SELECTクエリに名前を付けて保存した仮想テーブルです。
          実際のデータは持たず、参照時にクエリが実行されます。
          複雑なJOINや集計をビューとして定義することで、
          毎回同じクエリを書く手間を省き、可読性と再利用性を高めます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE VIEW 名前 AS SELECT ...</code> — ビューの作成</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DROP VIEW 名前</code> — ビューの削除</li>
          <li>ビューはSELECT時に毎回クエリが実行される（仮想テーブル）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なビューの作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE employees (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  department TEXT NOT NULL,
  salary     REAL NOT NULL,
  is_active  INTEGER NOT NULL DEFAULT 1
);

INSERT INTO employees VALUES (1, '田中太郎', '開発', 550000, 1);
INSERT INTO employees VALUES (2, '佐藤花子', '営業', 480000, 1);
INSERT INTO employees VALUES (3, '鈴木次郎', '開発', 620000, 1);
INSERT INTO employees VALUES (4, '高橋美咲', '人事', 450000, 0);

-- アクティブ社員のビューを作成
CREATE VIEW active_employees AS
SELECT id, name, department, salary
FROM employees
WHERE is_active = 1;

-- ビューをテーブルのように参照
SELECT * FROM active_employees WHERE department = '開発';`}
          expectedOutput={`id  name    department  salary
1   田中太郎  開発         550000.0
3   鈴木次郎  開発         620000.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビューのメリット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビューを使うことで、複雑なクエリをシンプルな名前で参照できます。
          また、テーブルの一部のカラムだけをビューで公開することで、
          アクセス制御の代わりとして使うこともできます。
          ビューの定義を変更するには、DROP VIEW してから CREATE VIEW しなおします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数テーブルのJOINをビューに</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE departments (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE staff (
  id     INTEGER PRIMARY KEY,
  name   TEXT    NOT NULL,
  dept_id INTEGER NOT NULL,
  salary  REAL    NOT NULL
);

INSERT INTO departments VALUES (1, '開発部'), (2, '営業部');
INSERT INTO staff VALUES (1, '田中', 1, 550000), (2, '佐藤', 2, 480000), (3, '鈴木', 1, 620000);

-- JOINをビューに
CREATE VIEW staff_with_dept AS
SELECT s.id, s.name, d.name AS department, s.salary
FROM staff s
JOIN departments d ON s.dept_id = d.id;

SELECT * FROM staff_with_dept ORDER BY salary DESC;`}
          expectedOutput={`id  name  department  salary
3   鈴木   開発部       620000.0
1   田中   開発部       550000.0
2   佐藤   営業部       480000.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ビューの一覧確認と削除</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);

CREATE VIEW expensive_products AS
SELECT * FROM products WHERE price >= 10000;

CREATE VIEW cheap_products AS
SELECT * FROM products WHERE price < 10000;

-- ビューの一覧を確認
SELECT name FROM sqlite_master WHERE type = 'view';`}
          expectedOutput={`name
expensive_products
cheap_products`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/views" />
    </div>
  );
}
