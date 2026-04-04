import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function CreateTableBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CREATE TABLE基本</h1>
        <p className="text-gray-400">テーブル作成の基本構文とカラム定義の方法を学ぶ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CREATE TABLE構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE</code> 文はデータベースに新しいテーブルを作成します。
          テーブル名とカラム名・データ型を指定します。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IF NOT EXISTS</code> を付けると、すでに存在する場合もエラーにならず安全に実行できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE テーブル名 ( ... )</code> — 基本構文</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IF NOT EXISTS</code> — 既存テーブルへの重複作成を防ぐ</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 データ型</code> — 各カラムの定義</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なテーブル作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id      INTEGER,
  name    TEXT,
  email   TEXT,
  age     INTEGER
);`}
          expectedOutput={`テーブル "users" が作成されました`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IF NOT EXISTS の活用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テーブルが既に存在する場合に <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TABLE</code> を実行するとエラーになります。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IF NOT EXISTS</code> を使うと、存在しない場合のみ作成するため、スクリプトを何度実行しても安全です。
          マイグレーションや初期化スクリプトでよく使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: IF NOT EXISTS を使った安全な作成</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE IF NOT EXISTS products (
  id    INTEGER,
  name  TEXT,
  price REAL
);

-- 同じ文をもう一度実行してもエラーにならない
CREATE TABLE IF NOT EXISTS products (
  id    INTEGER,
  name  TEXT,
  price REAL
);

SELECT 'テーブルが存在します' AS status;`}
          expectedOutput={`status
テーブルが存在します`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テーブルの確認</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE IF NOT EXISTS employees (
  id         INTEGER,
  first_name TEXT,
  last_name  TEXT,
  department TEXT,
  salary     REAL
);

-- SQLiteでテーブル一覧を確認
SELECT name FROM sqlite_master WHERE type = 'table';`}
          expectedOutput={`name
employees`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/create-table" />
    </div>
  );
}
