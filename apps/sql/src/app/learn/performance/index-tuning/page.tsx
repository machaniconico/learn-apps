import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function IndexTuningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インデックスチューニング</h1>
        <p className="text-gray-400">適切なインデックスを設計してクエリを高速化する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インデックスチューニングの考え方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インデックスはデータ検索を高速化する一方で、INSERT/UPDATE/DELETEのオーバーヘッドが増えます。
          チューニングでは「よく使うWHERE条件」「JOINのキー」「ORDER BYのカラム」に対してインデックスを検討します。
          複合インデックスでは左端のカラムから順に有効になるため、カラムの順序が重要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">単一インデックス</code> — 1つのカラムに対するインデックス</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">複合インデックス</code> — 複数カラムの組み合わせ（左端から有効）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">カバリングインデックス</code> — クエリに必要な全カラムをインデックスに含める</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単一インデックスの効果確認</h2>
        <SqlEditor
          defaultCode={`CREATE INDEX idx_users_email ON users(email);
-- インデックス作成後はメールアドレス検索が高速になる
SELECT id, name FROM users WHERE email = 'tanaka@example.com';`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at TEXT);
INSERT INTO users VALUES (1,'田中太郎','tanaka@example.com','2024-01-01');
INSERT INTO users VALUES (2,'鈴木花子','suzuki@example.com','2024-01-05');
INSERT INTO users VALUES (3,'佐藤次郎','sato@example.com','2024-01-10');`}
          expectedOutput={`id | name
---+------
1  | 田中太郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複合インデックスの活用</h2>
        <SqlEditor
          defaultCode={`-- (status, created_at) の複合インデックスを作成
CREATE INDEX idx_orders_status_date ON orders(status, created_at);
-- 左端の status から使われる
SELECT id, total FROM orders
WHERE status = 'shipped' AND created_at >= '2024-01-01';`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, status TEXT, total INTEGER, created_at TEXT);
INSERT INTO orders VALUES (1,1,'delivered',5000,'2024-01-10');
INSERT INTO orders VALUES (2,2,'shipped',8000,'2024-01-15');
INSERT INTO orders VALUES (3,1,'shipped',3000,'2024-02-01');
INSERT INTO orders VALUES (4,3,'pending',12000,'2024-02-10');`}
          expectedOutput={`id | total
---+-------
2  | 8000
3  | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カバリングインデックスでテーブルアクセスを排除</h2>
        <SqlEditor
          defaultCode={`-- name と salary を含むカバリングインデックス
CREATE INDEX idx_emp_dept_name_salary ON employees(dept_id, name, salary);
-- このクエリはテーブル本体にアクセスせずインデックスだけで完結
SELECT name, salary FROM employees WHERE dept_id = 1;`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1,'田中',1,500000),(2,'鈴木',1,600000),(3,'佐藤',2,450000),(4,'山田',2,550000);`}
          expectedOutput={`name | salary
-----+-------
田中  | 500000
鈴木  | 600000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="index-tuning" />
      </div>
      <LessonNav lessons={lessons} currentId="index-tuning" basePath="/learn/performance" />
    </div>
  );
}
