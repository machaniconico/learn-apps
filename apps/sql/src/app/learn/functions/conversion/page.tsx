import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function ConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換関数</h1>
        <p className="text-gray-400">CAST・TYPEOF・型変換パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLではデータ型の変換が必要になる場面がよくあります。
          テキストとして保存された数値を計算に使ったり、
          数値を文字列に変換して連結したりするときに型変換関数を使います。
          SQLiteは動的型付けのため、<code className="text-green-300 bg-gray-800 px-1.5 py-0.5 rounded">TYPEOF</code>で実際の型を確認できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">CAST(x AS type)</code> — 明示的な型変換</li>
          <li><code className="text-green-300">TYPEOF(x)</code> — 値の型を返す（null/integer/real/text/blob）</li>
          <li><code className="text-green-300">INTEGER(x)</code> / <code className="text-green-300">REAL(x)</code> / <code className="text-green-300">TEXT(x)</code> — 型変換の短縮形</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: TYPEOF で型を確認する</h2>
        <SqlEditor
          defaultCode={`SELECT
  TYPEOF(42) AS int_type,
  TYPEOF(3.14) AS real_type,
  TYPEOF('hello') AS text_type,
  TYPEOF(NULL) AS null_type,
  TYPEOF(X'FF') AS blob_type;`}
          expectedOutput={`int_type | real_type | text_type | null_type | blob_type
---------+-----------+-----------+-----------+----------
integer  | real      | text      | null      | blob`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CAST による型変換</h2>
        <SqlEditor
          defaultCode={`SELECT
  price_text,
  TYPEOF(price_text) AS before_type,
  CAST(price_text AS INTEGER) AS price_int,
  TYPEOF(CAST(price_text AS INTEGER)) AS after_type,
  CAST(price_text AS INTEGER) * 1.1 AS with_tax
FROM raw_prices;`}
          setupSql={`CREATE TABLE raw_prices (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  price_text TEXT NOT NULL
);
INSERT INTO raw_prices VALUES (1, '商品A', '1000');
INSERT INTO raw_prices VALUES (2, '商品B', '2500');
INSERT INTO raw_prices VALUES (3, '商品C', '800');`}
          expectedOutput={`price_text | before_type | price_int | after_type | with_tax
-----------+-------------+-----------+------------+---------
1000       | text        | 1000      | integer    | 1100.0
2500       | text        | 2500      | integer    | 2750.0
800        | text        | 800       | integer    | 880.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 数値を文字列に変換して結合</h2>
        <SqlEditor
          defaultCode={`SELECT
  name,
  age,
  '年齢: ' || CAST(age AS TEXT) || '歳' AS age_label,
  CAST(score AS TEXT) || '点' AS score_label,
  ROUND(CAST(score AS REAL) / 100.0 * 100, 1) || '%' AS percentage
FROM students;`}
          setupSql={`CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO students VALUES (1, '田中太郎', 20, 85);
INSERT INTO students VALUES (2, '鈴木花子', 22, 92);
INSERT INTO students VALUES (3, '佐藤一郎', 19, 78);`}
          expectedOutput={`name     | age | age_label | score_label | percentage
---------+-----+-----------+-------------+-----------
田中太郎  | 20  | 年齢: 20歳 | 85点        | 85.0%
鈴木花子  | 22  | 年齢: 22歳 | 92点        | 92.0%
佐藤一郎  | 19  | 年齢: 19歳 | 78点        | 78.0%`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="conversion" basePath="/learn/functions" />
    </div>
  );
}
