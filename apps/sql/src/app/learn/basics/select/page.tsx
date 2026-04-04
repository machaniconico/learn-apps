import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function SelectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SELECT文</h1>
        <p className="text-gray-400">データベースからデータを取得する最も基本的な構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SELECT文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SELECT文はSQLの中で最も頻繁に使われる命令です。データベースのテーブルから特定のカラム（列）を取得するために使います。
          SELECT の後にカラム名を指定し、FROM の後にテーブル名を指定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SELECT カラム名</code> — 取得したいカラムを指定</li>
          <li><code className="text-blue-300">SELECT *</code> — すべてのカラムを取得（アスタリスク）</li>
          <li><code className="text-blue-300">SELECT カラム1, カラム2</code> — 複数カラムをカンマで区切る</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SELECT文の基本構造は <code className="text-blue-300">SELECT カラム名 FROM テーブル名</code> です。
          SQLは大文字・小文字を区別しませんが、キーワードを大文字で書くのが一般的なスタイルです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">SELECT</code> — 取得する列を指定するキーワード</li>
          <li><code className="text-blue-300">FROM</code> — どのテーブルから取得するかを指定</li>
          <li>文末にはセミコロン <code className="text-blue-300">;</code> を付ける（多くの場合省略可）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: すべてのカラムを取得</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM users;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 25, 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 30, 'suzuki@example.com');
INSERT INTO users VALUES (3, '佐藤一郎', 22, 'sato@example.com');`}
          expectedOutput={`id | name     | age | email
---+----------+-----+--------------------
1  | 田中太郎  | 25  | tanaka@example.com
2  | 鈴木花子  | 30  | suzuki@example.com
3  | 佐藤一郎  | 22  | sato@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 特定のカラムだけを取得</h2>
        <SqlEditor
          defaultCode={`SELECT name, age FROM users;`}
          setupSql={`CREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);
INSERT INTO users VALUES (1, '田中太郎', 25, 'tanaka@example.com');
INSERT INTO users VALUES (2, '鈴木花子', 30, 'suzuki@example.com');
INSERT INTO users VALUES (3, '佐藤一郎', 22, 'sato@example.com');`}
          expectedOutput={`name     | age
---------+-----
田中太郎  | 25
鈴木花子  | 30
佐藤一郎  | 22`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 固定値やリテラルを取得</h2>
        <SqlEditor
          defaultCode={`SELECT 'こんにちは' AS message, 42 AS number;`}
          expectedOutput={`message      | number
-------------+--------
こんにちは    | 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="select" />
      </div>
      <LessonNav lessons={lessons} currentId="select" basePath="/learn/basics" />
    </div>
  );
}
