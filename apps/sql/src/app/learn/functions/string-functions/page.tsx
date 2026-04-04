import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function StringFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列関数</h1>
        <p className="text-gray-400">LENGTH・UPPER・LOWER・SUBSTR・REPLACEなど文字列操作関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主な文字列関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLには文字列を操作するための組み込み関数が多数用意されています。
          データのクリーニング、表示形式の変換、部分文字列の抽出などに活用できます。
          SQLiteの文字列関数はほとんどの場面で必要な機能をカバーしています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">LENGTH(str)</code> — 文字列の長さを返す</li>
          <li><code className="text-green-300">UPPER(str)</code> / <code className="text-green-300">LOWER(str)</code> — 大文字/小文字に変換</li>
          <li><code className="text-green-300">SUBSTR(str, start, len)</code> — 部分文字列を抽出</li>
          <li><code className="text-green-300">REPLACE(str, old, new)</code> — 文字列を置換する</li>
          <li><code className="text-green-300">TRIM(str)</code> — 前後の空白を除去する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: LENGTH・UPPER・LOWER</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  LENGTH(name) AS name_length,
  UPPER(email) AS email_upper,
  LOWER(name) AS name_lower
FROM users;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);
INSERT INTO users VALUES (1, '田中太郎', 'Tanaka@Example.com');
INSERT INTO users VALUES (2, '鈴木花子', 'SUZUKI@EXAMPLE.COM');
INSERT INTO users VALUES (3, 'John Smith', 'john@example.com');`}
          expectedOutput={`name       | name_length | email_upper         | name_lower
-----------+-------------+---------------------+-----------
田中太郎    | 4           | TANAKA@EXAMPLE.COM  | 田中太郎
鈴木花子    | 4           | SUZUKI@EXAMPLE.COM  | 鈴木花子
John Smith | 10          | JOHN@EXAMPLE.COM    | john smith`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: SUBSTR・INSTR</h2>
        <SqlEditor
          defaultCode={`SELECT
  email,
  INSTR(email, '@') AS at_position,
  SUBSTR(email, 1, INSTR(email, '@') - 1) AS username,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM users;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 'suzuki@mycompany.jp');
INSERT INTO users VALUES (3, '佐藤一郎', 'sato@gmail.com');`}
          expectedOutput={`email                | at_position | username | domain
---------------------+-------------+----------+--------------
tanaka@example.com   | 7           | tanaka   | example.com
suzuki@mycompany.jp  | 7           | suzuki   | mycompany.jp
sato@gmail.com       | 5           | sato     | gmail.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: REPLACE・TRIM・LTRIM・RTRIM</h2>
        <SqlEditor
          defaultCode={`SELECT
  raw_text,
  TRIM(raw_text) AS trimmed,
  REPLACE(TRIM(raw_text), ' ', '_') AS underscored
FROM raw_data;`}
          setupSql={`CREATE TABLE raw_data (
  id INTEGER PRIMARY KEY,
  raw_text TEXT
);
INSERT INTO raw_data VALUES (1, '  hello world  ');
INSERT INTO raw_data VALUES (2, '  SQL 基礎  ');
INSERT INTO raw_data VALUES (3, ' データ処理 ');`}
          expectedOutput={`raw_text           | trimmed      | underscored
-------------------+--------------+-------------
  hello world      | hello world  | hello_world
  SQL 基礎         | SQL 基礎     | SQL_基礎
 データ処理        | データ処理    | データ処理`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="string-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="string-functions" basePath="/learn/functions" />
    </div>
  );
}
