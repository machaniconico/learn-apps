import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function SelfJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">自己結合</h1>
        <p className="text-gray-400">同じテーブルを2回使って結合する — 階層構造や比較に活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自己結合とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          自己結合（Self Join）は同じテーブルを2回参照して結合する手法です。
          必ずエイリアスを付けて2つのテーブルを区別します。
          社員と上司のような階層関係や、同じテーブル内での行比較に使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">エイリアス必須</span> — 同じテーブルに2つの別名を付ける</li>
          <li><span className="text-purple-400">階層構造</span> — 社員テーブルの manager_id → id への自己参照</li>
          <li><span className="text-purple-400">比較</span> — 同テーブル内の行同士を比較する</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自己参照テーブルの構造</h2>
        <p className="text-gray-300 leading-relaxed">
          社員テーブルでは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">manager_id</code> が
          同じテーブルの <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">id</code> を参照します。
          これを自己結合で引けば、社員名と上司名を1行に並べて取得できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 社員と上司の名前を取得</h2>
        <SqlEditor
          defaultCode={`SELECT e.name AS employee, m.name AS manager
FROM employees AS e
LEFT JOIN employees AS m ON e.manager_id = m.id;`}
          expectedOutput={`employee   | manager
-----------|---------
山田部長   | NULL
鈴木課長   | 山田部長
田中担当   | 鈴木課長
佐藤担当   | 鈴木課長`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  manager_id INTEGER
);
INSERT INTO employees VALUES
  (1, '山田部長', NULL),
  (2, '鈴木課長', 1),
  (3, '田中担当', 2),
  (4, '佐藤担当', 2);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 同じ部署の同僚を表示</h2>
        <SqlEditor
          defaultCode={`SELECT a.name AS employee, b.name AS colleague
FROM employees AS a
JOIN employees AS b ON a.manager_id = b.manager_id AND a.id <> b.id;`}
          expectedOutput={`employee   | colleague
-----------|----------
田中担当   | 佐藤担当
佐藤担当   | 田中担当`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  manager_id INTEGER
);
INSERT INTO employees VALUES
  (1, '山田部長', NULL),
  (2, '鈴木課長', 1),
  (3, '田中担当', 2),
  (4, '佐藤担当', 2);`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 価格が上の商品との比較</h2>
        <SqlEditor
          defaultCode={`SELECT a.name AS product, b.name AS more_expensive
FROM products AS a
JOIN products AS b ON b.price > a.price
ORDER BY a.price, b.price;`}
          expectedOutput={`product    | more_expensive
-----------|---------------
マウス     | キーボード
マウス     | ノートPC
キーボード | ノートPC`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price INTEGER
);
INSERT INTO products VALUES
  (1, 'マウス', 3000),
  (2, 'キーボード', 8000),
  (3, 'ノートPC', 120000);`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="self-join" />
      </div>
      <LessonNav lessons={lessons} currentId="self-join" basePath="/learn/joins" />
    </div>
  );
}
