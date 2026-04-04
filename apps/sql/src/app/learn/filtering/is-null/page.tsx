import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "filtering")!.lessons;

export default function IsNullPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データの絞り込み レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">IS NULL・IS NOT NULL</h1>
        <p className="text-gray-400">NULL値の判定と扱い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLはデータが「存在しない」「不明」「未設定」であることを表す特別な値です。
          0でも空文字列でもなく、「値がない」状態です。
          NULLとの比較には通常の演算子（= や &lt;&gt;）は使えません。必ず <code className="text-blue-300">IS NULL</code> または <code className="text-blue-300">IS NOT NULL</code> を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">WHERE カラム IS NULL</code> — NULLの行を返す</li>
          <li><code className="text-blue-300">WHERE カラム IS NOT NULL</code> — NULLでない行を返す</li>
          <li><code className="text-blue-300">WHERE カラム = NULL</code> — これは常にFALSE（使ってはいけない）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLの扱いに関する注意</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLを含む演算の結果はNULLになります（NULL伝播）。
          例えば <code className="text-blue-300">NULL + 1</code> や <code className="text-blue-300">NULL = NULL</code> はすべてNULLです。
          COALESCE関数を使うと、NULLをデフォルト値に置き換えることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">COALESCE(カラム, デフォルト値)</code> — NULLをデフォルト値に置換</li>
          <li>集約関数（SUM、AVGなど）はNULLを無視して計算する</li>
          <li>ORDER BYではNULLは最後または最初に並ぶ（DBによって異なる）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: NULLの行を検索</h2>
        <SqlEditor
          defaultCode={`-- メールアドレスが未登録のユーザー
SELECT * FROM users WHERE email IS NULL;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 25, 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 30, NULL);
INSERT INTO users VALUES (3, '佐藤一郎', 22, 'sato@example.com');
INSERT INTO users VALUES (4, '山田次郎', 45, NULL);`}
          expectedOutput={`id | name     | age | email
---+----------+-----+-------
2  | 鈴木花子  | 30  | NULL
4  | 山田次郎  | 45  | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NULLでない行を検索</h2>
        <SqlEditor
          defaultCode={`-- メールアドレスが登録済みのユーザー
SELECT * FROM users WHERE email IS NOT NULL;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 25, 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 30, NULL);
INSERT INTO users VALUES (3, '佐藤一郎', 22, 'sato@example.com');
INSERT INTO users VALUES (4, '山田次郎', 45, NULL);`}
          expectedOutput={`id | name     | age | email
---+----------+-----+--------------------
1  | 田中太郎  | 25  | tanaka@example.com
3  | 佐藤一郎  | 22  | sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: COALESCEでNULLをデフォルト値に置換</h2>
        <SqlEditor
          defaultCode={`-- NULLのメールを「未登録」と表示
SELECT name, COALESCE(email, '未登録') AS email
FROM users;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 25, 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 30, NULL);
INSERT INTO users VALUES (3, '佐藤一郎', 22, 'sato@example.com');
INSERT INTO users VALUES (4, '山田次郎', 45, NULL);`}
          expectedOutput={`name     | email
---------+--------------------
田中太郎  | tanaka@example.com
鈴木花子  | 未登録
佐藤一郎  | sato@example.com
山田次郎  | 未登録`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="filtering" lessonId="is-null" />
      </div>
      <LessonNav lessons={lessons} currentId="is-null" basePath="/learn/filtering" />
    </div>
  );
}
