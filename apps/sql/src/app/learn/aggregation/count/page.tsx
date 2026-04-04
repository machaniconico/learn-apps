import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "aggregation")!.lessons;

export default function CountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">集約関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">COUNT関数</h1>
        <p className="text-gray-400">行数をカウントする COUNT 関数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">COUNT関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          COUNT関数は行数を数える集約関数です。テーブルの総レコード数や、条件に合致する行数を調べるときに使います。
          <code className="text-blue-300">COUNT(*)</code> はNULLを含むすべての行をカウントします。
          <code className="text-blue-300">COUNT(カラム名)</code> はNULLを除いてカウントします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">COUNT(*)</code> — NULLを含む全行数をカウント</li>
          <li><code className="text-blue-300">COUNT(カラム名)</code> — NULLを除いた行数をカウント</li>
          <li><code className="text-blue-300">COUNT(DISTINCT カラム名)</code> — ユニークな値の数をカウント</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">COUNT と NULL の関係</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          COUNT(*) と COUNT(カラム) の違いはNULLの扱いです。
          例えば10行あるテーブルでemailカラムに3件のNULLがある場合、
          COUNT(*) は10、COUNT(email) は7を返します。
          この違いを理解してデータ品質チェックに活用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>NULL件数 = COUNT(*) - COUNT(カラム名)</li>
          <li>WHERE句と組み合わせて条件に合う行数を取得できる</li>
          <li>GROUP BYと組み合わせてグループ別の件数を取得できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 全レコード数をカウント</h2>
        <SqlEditor
          defaultCode={`-- 全ユーザー数を取得
SELECT COUNT(*) AS 総ユーザー数 FROM users;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT, age INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', 25);
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@example.com', 30);
INSERT INTO users VALUES (3, '佐藤一郎', NULL, 22);
INSERT INTO users VALUES (4, '山田次郎', 'yamada@example.com', 45);
INSERT INTO users VALUES (5, '高橋美咲', NULL, 28);`}
          expectedOutput={`総ユーザー数
-----------
5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: COUNT(*) と COUNT(カラム) の違い</h2>
        <SqlEditor
          defaultCode={`SELECT
  COUNT(*) AS 総行数,
  COUNT(email) AS メール登録数,
  COUNT(*) - COUNT(email) AS メール未登録数
FROM users;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT, age INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', 25);
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@example.com', 30);
INSERT INTO users VALUES (3, '佐藤一郎', NULL, 22);
INSERT INTO users VALUES (4, '山田次郎', 'yamada@example.com', 45);
INSERT INTO users VALUES (5, '高橋美咲', NULL, 28);`}
          expectedOutput={`総行数 | メール登録数 | メール未登録数
------+------------+-----------
5     | 3          | 2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: WHERE条件と組み合わせたカウント</h2>
        <SqlEditor
          defaultCode={`-- 30歳以上のユーザー数
SELECT COUNT(*) AS 30歳以上の人数
FROM users
WHERE age >= 30;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, email TEXT, age INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com', 25);
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@example.com', 30);
INSERT INTO users VALUES (3, '佐藤一郎', NULL, 22);
INSERT INTO users VALUES (4, '山田次郎', 'yamada@example.com', 45);
INSERT INTO users VALUES (5, '高橋美咲', NULL, 28);`}
          expectedOutput={`30歳以上の人数
-----------
2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="aggregation" lessonId="count" />
      </div>
      <LessonNav lessons={lessons} currentId="count" basePath="/learn/aggregation" />
    </div>
  );
}
