import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "stored-procedures")!.lessons;

export default function TriggersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ストアドプロシージャ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トリガー</h1>
        <p className="text-gray-400">BEFORE/AFTERトリガーでデータ変更を自動的に処理する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トリガーとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トリガーとは、テーブルに対するINSERT・UPDATE・DELETE操作を検知して自動的に実行されるプロシージャです。
          BEFOREトリガーは操作の前に実行されバリデーションや値の変換に使い、
          AFTERトリガーは操作の後に実行され監査ログの記録や関連テーブルの更新に使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">BEFORE INSERT/UPDATE/DELETE</code> — 操作前に実行</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">AFTER INSERT/UPDATE/DELETE</code> — 操作後に実行</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NEW / OLD</code> — 新旧のレコード値を参照</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: AFTER INSERTで在庫を自動減算</h2>
        <SqlEditor
          defaultCode={`-- 注文挿入時に在庫を自動更新するトリガー
CREATE TRIGGER after_order_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products SET stock = stock - NEW.quantity WHERE id = NEW.product_id;
END;

INSERT INTO order_items VALUES (1, 101, 3);
SELECT id, name, stock FROM products WHERE id = 101;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, stock INTEGER);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO products VALUES (101, 'ノートPC', 10), (102, 'マウス', 50);`}
          expectedOutput={`id  | name    | stock
----+---------+-------
101 | ノートPC | 7`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: AFTER UPDATEで変更履歴を自動記録</h2>
        <SqlEditor
          defaultCode={`-- 給与変更時に監査ログを自動挿入するトリガー
CREATE TRIGGER after_salary_update
AFTER UPDATE OF salary ON employees
FOR EACH ROW
BEGIN
  INSERT INTO salary_history (emp_id, old_salary, new_salary, changed_at)
  VALUES (OLD.id, OLD.salary, NEW.salary, CURRENT_TIMESTAMP);
END;

UPDATE employees SET salary = 650000 WHERE id = 1;
SELECT * FROM salary_history;`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER);
CREATE TABLE salary_history (id INTEGER PRIMARY KEY AUTOINCREMENT, emp_id INTEGER, old_salary INTEGER, new_salary INTEGER, changed_at TEXT);
INSERT INTO employees VALUES (1,'田中太郎',600000),(2,'鈴木花子',500000);`}
          expectedOutput={`id | emp_id | old_salary | new_salary | changed_at
---+--------+------------+------------+-------------------
1  | 1      | 600000     | 650000     | 2024-01-01 00:00:00`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: BEFORE INSERTでデータをバリデーション</h2>
        <SqlEditor
          defaultCode={`-- 価格が0以下の商品の挿入を拒否するトリガー
CREATE TRIGGER before_product_insert
BEFORE INSERT ON products
FOR EACH ROW
WHEN NEW.price <= 0
BEGIN
  SELECT RAISE(ABORT, '価格は0より大きい値を指定してください');
END;

-- 正常な挿入
INSERT INTO products VALUES (1, 'ノートPC', 120000);
SELECT * FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);`}
          expectedOutput={`id | name    | price
---+---------+-------
1  | ノートPC | 120000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stored-procedures" lessonId="triggers" />
      </div>
      <LessonNav lessons={lessons} currentId="triggers" basePath="/learn/stored-procedures" />
    </div>
  );
}
