import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "er-diagram")!.lessons;

export default function DesignPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ER設計 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設計パターン</h1>
        <p className="text-gray-400">実務でよく使うDB設計パターンを習得する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よく使うDB設計パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実務のDB設計では繰り返し登場するパターンがあります。
          階層構造（ツリー）の表現、ポリモーフィック関連、履歴管理パターンなどを理解しておくと
          様々な要件に対応できるようになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">自己参照</code> — 親子関係・ツリー構造の表現</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">履歴テーブル</code> — 変更履歴を別テーブルで管理</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">ステータス管理</code> — ワークフローの状態遷移を表現</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 自己参照による階層構造</h2>
        <SqlEditor
          defaultCode={`-- 組織ツリー: 親部署と子部署の関係
SELECT c.name AS child_dept, p.name AS parent_dept
FROM departments c
LEFT JOIN departments p ON c.parent_id = p.id
ORDER BY p.name, c.name;`}
          setupSql={`CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER,
  FOREIGN KEY (parent_id) REFERENCES departments(id)
);
INSERT INTO departments VALUES (1, '本社', NULL);
INSERT INTO departments VALUES (2, '開発本部', 1);
INSERT INTO departments VALUES (3, '営業本部', 1);
INSERT INTO departments VALUES (4, 'Webチーム', 2);
INSERT INTO departments VALUES (5, 'インフラチーム', 2);`}
          expectedOutput={`child_dept      | parent_dept
----------------+------------
開発本部         | 本社
営業本部         | 本社
Webチーム        | 開発本部
インフラチーム    | 開発本部
本社             | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 履歴管理パターン</h2>
        <SqlEditor
          defaultCode={`-- 価格変更の履歴を確認する
SELECT p.name, ph.price, ph.changed_at
FROM price_history ph
JOIN products p ON ph.product_id = p.id
ORDER BY p.id, ph.changed_at;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE price_history (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  price INTEGER,
  changed_at TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO products VALUES (1,'ノートPC'),(2,'マウス');
INSERT INTO price_history VALUES (1,1,150000,'2023-01-01'),(2,1,130000,'2023-06-01'),(3,1,120000,'2024-01-01'),(4,2,3500,'2023-01-01'),(5,2,3000,'2024-01-01');`}
          expectedOutput={`name    | price  | changed_at
--------+--------+------------
ノートPC | 150000 | 2023-01-01
ノートPC | 130000 | 2023-06-01
ノートPC | 120000 | 2024-01-01
マウス   | 3500   | 2023-01-01
マウス   | 3000   | 2024-01-01`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ステータス管理パターン</h2>
        <SqlEditor
          defaultCode={`-- 注文のステータス推移を確認
SELECT o.id, o.status, COUNT(*) AS count
FROM orders o
GROUP BY o.status
ORDER BY count DESC;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  status TEXT CHECK(status IN ('pending','confirmed','shipped','delivered','cancelled')),
  created_at TEXT
);
INSERT INTO orders VALUES (1,1,'delivered','2024-01-01');
INSERT INTO orders VALUES (2,2,'shipped','2024-01-05');
INSERT INTO orders VALUES (3,1,'confirmed','2024-01-08');
INSERT INTO orders VALUES (4,3,'pending','2024-01-10');
INSERT INTO orders VALUES (5,2,'cancelled','2024-01-03');
INSERT INTO orders VALUES (6,3,'delivered','2023-12-20');`}
          expectedOutput={`id | status    | count
---+-----------+-------
1  | delivered | 2
2  | shipped   | 1
3  | confirmed | 1
4  | pending   | 1
5  | cancelled | 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="er-diagram" lessonId="design-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="design-patterns" basePath="/learn/er-diagram" />
    </div>
  );
}
