import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "cte")!.lessons;

export default function HierarchicalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">共通テーブル式 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">階層データ</h1>
        <p className="text-gray-400">再帰CTEで組織図やカテゴリツリーなどの階層（木構造）データを展開します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">階層データとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          組織図、カテゴリツリー、コメントスレッドなど、親子関係を持つデータを階層データと呼びます。
          テーブルでは<code className="text-violet-300 bg-gray-800 px-1.5 py-0.5 rounded">parent_id</code>カラムで自己参照する「隣接リスト」方式が一般的です。
          再帰CTEを使うことで、任意の深さの階層を効率よく展開できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>アンカー部分でルートノード（親なし）を取得する</li>
          <li>再帰部分で子ノードを順次取得する</li>
          <li>深さ（level）とパスを計算して表示に活用する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 組織図をツリー表示</h2>
        <SqlEditor
          defaultCode={`WITH RECURSIVE org_tree(id, name, parent_id, level, path) AS (
  -- アンカー: ルートノード（parent_idがNULL）
  SELECT id, name, parent_id, 0, name
  FROM employees
  WHERE parent_id IS NULL

  UNION ALL

  -- 再帰: 子ノードを追加
  SELECT
    e.id, e.name, e.parent_id,
    ot.level + 1,
    ot.path || ' > ' || e.name
  FROM employees e
  JOIN org_tree ot ON e.parent_id = ot.id
)
SELECT
  REPEAT('  ', level) || name AS tree_view,
  level,
  path
FROM org_tree
ORDER BY path;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  parent_id INTEGER REFERENCES employees(id)
);
INSERT INTO employees VALUES (1, '山田社長', 'CEO', NULL);
INSERT INTO employees VALUES (2, '田中部長', '営業部長', 1);
INSERT INTO employees VALUES (3, '鈴木部長', '開発部長', 1);
INSERT INTO employees VALUES (4, '佐藤課長', '営業課長', 2);
INSERT INTO employees VALUES (5, '伊藤課長', '開発課長', 3);
INSERT INTO employees VALUES (6, '渡辺主任', '営業主任', 4);`}
          expectedOutput={`tree_view          | level | path
-------------------+-------+--------------------------------
山田社長            | 0     | 山田社長
  田中部長          | 1     | 山田社長 > 田中部長
    佐藤課長        | 2     | 山田社長 > 田中部長 > 佐藤課長
      渡辺主任      | 3     | 山田社長 > 田中部長 > 佐藤課長 > 渡辺主任
  鈴木部長          | 1     | 山田社長 > 鈴木部長
    伊藤課長        | 2     | 山田社長 > 鈴木部長 > 伊藤課長`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カテゴリ階層の展開</h2>
        <SqlEditor
          defaultCode={`WITH RECURSIVE category_tree(id, name, parent_id, level, full_path) AS (
  SELECT id, name, parent_id, 0, name
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT
    c.id, c.name, c.parent_id,
    ct.level + 1,
    ct.full_path || ' / ' || c.name
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT
  id,
  REPEAT('  ', level) || name AS category,
  full_path
FROM category_tree
ORDER BY full_path;`}
          setupSql={`CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);
INSERT INTO categories VALUES (1, '電子機器', NULL);
INSERT INTO categories VALUES (2, 'スマートフォン', 1);
INSERT INTO categories VALUES (3, 'パソコン', 1);
INSERT INTO categories VALUES (4, 'Android', 2);
INSERT INTO categories VALUES (5, 'iPhone', 2);
INSERT INTO categories VALUES (6, 'ノートPC', 3);`}
          expectedOutput={`id | category         | full_path
---+------------------+---------------------------
1  | 電子機器          | 電子機器
2  |   スマートフォン   | 電子機器 / スマートフォン
4  |     Android      | 電子機器 / スマートフォン / Android
5  |     iPhone       | 電子機器 / スマートフォン / iPhone
3  |   パソコン        | 電子機器 / パソコン
6  |     ノートPC      | 電子機器 / パソコン / ノートPC`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 特定ノードの祖先をたどる</h2>
        <SqlEditor
          defaultCode={`-- 渡辺主任（id=6）からルートまでの経路を取得
WITH RECURSIVE ancestors(id, name, parent_id, level) AS (
  -- アンカー: 対象ノード
  SELECT id, name, parent_id, 0
  FROM employees
  WHERE id = 6

  UNION ALL

  -- 再帰: 親をたどる
  SELECT e.id, e.name, e.parent_id, a.level + 1
  FROM employees e
  JOIN ancestors a ON e.id = a.parent_id
)
SELECT level, name FROM ancestors ORDER BY level DESC;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  parent_id INTEGER REFERENCES employees(id)
);
INSERT INTO employees VALUES (1, '山田社長', 'CEO', NULL);
INSERT INTO employees VALUES (2, '田中部長', '営業部長', 1);
INSERT INTO employees VALUES (4, '佐藤課長', '営業課長', 2);
INSERT INTO employees VALUES (6, '渡辺主任', '営業主任', 4);`}
          expectedOutput={`level | name
------+--------
3     | 山田社長
2     | 田中部長
1     | 佐藤課長
0     | 渡辺主任`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="cte" lessonId="hierarchical" />
      </div>
      <LessonNav lessons={lessons} currentId="hierarchical" basePath="/learn/cte" />
    </div>
  );
}
