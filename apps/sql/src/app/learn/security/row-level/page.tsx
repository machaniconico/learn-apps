import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "security")!.lessons;

export default function RowLevelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">セキュリティ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">行レベルセキュリティ</h1>
        <p className="text-gray-400">ユーザーごとにアクセスできる行を制限する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">行レベルセキュリティとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          行レベルセキュリティ（RLS: Row Level Security）とは、テーブルへのアクセス権だけでなく、
          特定の行へのアクセスをユーザーごとに制限する機能です。
          PostgreSQLなどでは CREATE POLICY コマンドで設定できます。
          SQLiteではビューやアプリケーション側のWHERE条件で同等の効果を実現します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE POLICY</code> — アクセスポリシーを定義（PostgreSQL）</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">ビュー + WHERE</code> — SQLiteでRLSを模倣する方法</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">tenant_id</code> — マルチテナントでテナントごとにデータを分離</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ユーザーは自分の注文のみ閲覧可能</h2>
        <SqlEditor
          defaultCode={`-- current_user_id = 1 として自分の注文のみ返すビュー
CREATE VIEW my_orders AS
SELECT id, total, order_date FROM orders WHERE user_id = 1;
SELECT * FROM my_orders;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,3000,'2024-01-12'),(3,1,8000,'2024-01-15'),(4,3,12000,'2024-01-20');`}
          expectedOutput={`id | total | order_date
---+-------+------------
1  | 5000  | 2024-01-10
3  | 8000  | 2024-01-15`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: マルチテナントのデータ分離</h2>
        <SqlEditor
          defaultCode={`-- テナントAのユーザーはテナントAのデータのみ見える
SELECT id, name, email FROM customers WHERE tenant_id = 'tenant_a';`}
          setupSql={`CREATE TABLE customers (
  id INTEGER PRIMARY KEY, tenant_id TEXT, name TEXT, email TEXT
);
INSERT INTO customers VALUES (1,'tenant_a','田中太郎','tanaka@a.com');
INSERT INTO customers VALUES (2,'tenant_a','鈴木花子','suzuki@a.com');
INSERT INTO customers VALUES (3,'tenant_b','佐藤次郎','sato@b.com');
INSERT INTO customers VALUES (4,'tenant_b','山田一郎','yamada@b.com');`}
          expectedOutput={`id | name     | email
---+----------+------------
1  | 田中太郎  | tanaka@a.com
2  | 鈴木花子  | suzuki@a.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 部署ごとのデータアクセス制限</h2>
        <SqlEditor
          defaultCode={`-- 開発部のユーザーは自部署の給与データのみ閲覧可能
SELECT e.name, e.salary
FROM employees e
WHERE e.dept_id = (
  SELECT dept_id FROM employees WHERE id = 1  -- ログインユーザーID=1
);`}
          setupSql={`CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1,'田中',1,500000),(2,'鈴木',1,600000),(3,'佐藤',2,450000),(4,'山田',2,550000);`}
          expectedOutput={`name | salary
-----+-------
田中  | 500000
鈴木  | 600000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="security" lessonId="row-level" />
      </div>
      <LessonNav lessons={lessons} currentId="row-level" basePath="/learn/security" />
    </div>
  );
}
