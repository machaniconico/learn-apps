import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function CoalesceNullifPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">COALESCE・NULLIF</h1>
        <p className="text-gray-400">NULL値を扱うための重要な関数COALESCEとNULLIFを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">COALESCEとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300 bg-gray-800 px-1.5 py-0.5 rounded">COALESCE(val1, val2, ...)</code>は
          引数のうち最初のNULLでない値を返します。
          NULLのデフォルト値を設定したり、複数の候補から最初の有効な値を取り出す際に使います。
          実務でNULL処理を書く場面で最も頻繁に登場する関数のひとつです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">COALESCE(x, 'デフォルト')</code> — xがNULLなら代替値を返す</li>
          <li><code className="text-green-300">COALESCE(a, b, c)</code> — 最初のNULLでない値を返す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLIFとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300 bg-gray-800 px-1.5 py-0.5 rounded">NULLIF(val1, val2)</code>は
          val1とval2が等しければNULLを返し、異なれば val1をそのまま返します。
          ゼロ除算の防止や、特定の値をNULLに変換したいときに便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">NULLIF(x, 0)</code> — xが0ならNULLを返す（ゼロ除算防止）</li>
          <li><code className="text-green-300">NULLIF(x, '')</code> — 空文字列をNULLに変換する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: COALESCEでNULLをデフォルト値に置換</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  phone,
  COALESCE(phone, '未登録') AS phone_display,
  email,
  COALESCE(email, phone, '連絡先なし') AS contact
FROM customers;`}
          setupSql={`CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT
);
INSERT INTO customers VALUES (1, '田中太郎', '090-1234-5678', 'tanaka@example.com');
INSERT INTO customers VALUES (2, '鈴木花子', NULL, 'suzuki@example.com');
INSERT INTO customers VALUES (3, '佐藤一郎', '080-9876-5432', NULL);
INSERT INTO customers VALUES (4, '山田二郎', NULL, NULL);`}
          expectedOutput={`name     | phone          | phone_display  | email              | contact
---------+----------------+----------------+--------------------+--------------------
田中太郎  | 090-1234-5678  | 090-1234-5678  | tanaka@example.com | tanaka@example.com
鈴木花子  | NULL           | 未登録          | suzuki@example.com | suzuki@example.com
佐藤一郎  | 080-9876-5432  | 080-9876-5432  | NULL               | 080-9876-5432
山田二郎  | NULL           | 未登録          | NULL               | 連絡先なし`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NULLIFでゼロ除算を防ぐ</h2>
        <SqlEditor
          defaultCode={`SELECT
  department,
  total_sales,
  total_cost,
  total_sales - total_cost AS profit,
  ROUND(
    CAST(total_sales - total_cost AS REAL) / NULLIF(total_sales, 0) * 100,
    1
  ) AS profit_rate
FROM dept_sales;`}
          setupSql={`CREATE TABLE dept_sales (
  id INTEGER PRIMARY KEY,
  department TEXT NOT NULL,
  total_sales INTEGER NOT NULL,
  total_cost INTEGER NOT NULL
);
INSERT INTO dept_sales VALUES (1, '営業部', 1000000, 600000);
INSERT INTO dept_sales VALUES (2, '開発部', 0, 500000);
INSERT INTO dept_sales VALUES (3, '広報部', 300000, 200000);`}
          expectedOutput={`department | total_sales | total_cost | profit   | profit_rate
-----------+-------------+------------+----------+------------
営業部      | 1000000     | 600000     | 400000   | 40.0
開発部      | 0           | 500000     | -500000  | NULL
広報部      | 300000      | 200000     | 100000   | 33.3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: COALESCEとNULLIFの組み合わせ</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  nickname,
  -- 空文字列もNULLとして扱い、デフォルト値を設定
  COALESCE(NULLIF(nickname, ''), name) AS display_name
FROM users;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT
);
INSERT INTO users VALUES (1, '田中太郎', 'タナカ');
INSERT INTO users VALUES (2, '鈴木花子', '');
INSERT INTO users VALUES (3, '佐藤一郎', NULL);`}
          expectedOutput={`name     | nickname | display_name
---------+----------+-------------
田中太郎  | タナカ    | タナカ
鈴木花子  |          | 鈴木花子
佐藤一郎  | NULL     | 佐藤一郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="coalesce-nullif" />
      </div>
      <LessonNav lessons={lessons} currentId="coalesce-nullif" basePath="/learn/functions" />
    </div>
  );
}
