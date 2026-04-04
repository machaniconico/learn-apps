import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function NullSortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NULLのソート</h1>
        <p className="text-gray-400">NULL値を含むカラムのソート順と NULLS FIRST / NULLS LAST の制御を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLのデフォルトソート順</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULL を含むカラムをソートするとき、NULL がどこに来るかはデータベースによって異なります。
          PostgreSQL では ASC の場合 NULL が最後、DESC の場合 NULL が最初に来ます。
          SQLite では ASC の場合 NULL が最初に来ます。
          明示的に制御するには <code className="text-blue-300">NULLS FIRST</code> または <code className="text-blue-300">NULLS LAST</code> を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ORDER BY カラム ASC NULLS LAST</code> — 昇順、NULLは最後</li>
          <li><code className="text-blue-300">ORDER BY カラム ASC NULLS FIRST</code> — 昇順、NULLは最初</li>
          <li><code className="text-blue-300">ORDER BY カラム DESC NULLS LAST</code> — 降順、NULLは最後</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLを含むソートの代替手法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLS FIRST / NULLS LAST がサポートされていない環境では、COALESCE や CASE 式でNULLを代替値に変換してからソートする方法も有効です。
          例えば NULL を非常に大きい数値や小さい数値に置き換えることで、ソート順を制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">ORDER BY COALESCE(カラム, 999999)</code> — NULLを大きな値として扱う</li>
          <li><code className="text-blue-300">ORDER BY CASE WHEN カラム IS NULL THEN 1 ELSE 0 END, カラム</code></li>
          <li>NULLS FIRST/LAST は PostgreSQL、SQLite 3.30.0+ で使用可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: NULLを含むカラムの基本ソート</h2>
        <SqlEditor
          defaultCode={`-- スコアの昇順（NULLの位置を確認）
SELECT name, score FROM students ORDER BY score ASC;`}
          setupSql={`CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
INSERT INTO students VALUES (1, '田中', 85);
INSERT INTO students VALUES (2, '鈴木', NULL);
INSERT INTO students VALUES (3, '佐藤', 72);
INSERT INTO students VALUES (4, '山田', NULL);
INSERT INTO students VALUES (5, '高橋', 91);`}
          expectedOutput={`name | score
-----+-------
鈴木  | NULL
山田  | NULL
佐藤  | 72
田中  | 85
高橋  | 91`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NULLS LASTでNULLを末尾に</h2>
        <SqlEditor
          defaultCode={`-- スコアの昇順、NULLは最後に表示
SELECT name, score FROM students
ORDER BY score ASC NULLS LAST;`}
          setupSql={`CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
INSERT INTO students VALUES (1, '田中', 85);
INSERT INTO students VALUES (2, '鈴木', NULL);
INSERT INTO students VALUES (3, '佐藤', 72);
INSERT INTO students VALUES (4, '山田', NULL);
INSERT INTO students VALUES (5, '高橋', 91);`}
          expectedOutput={`name | score
-----+-------
佐藤  | 72
田中  | 85
高橋  | 91
鈴木  | NULL
山田  | NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: COALESCEでNULLを代替値に置換してソート</h2>
        <SqlEditor
          defaultCode={`-- NULLを0として昇順ソート（NULLS LASTの代替）
SELECT name, score,
       COALESCE(score, 0) AS sort_score
FROM students
ORDER BY COALESCE(score, 0) ASC;`}
          setupSql={`CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
INSERT INTO students VALUES (1, '田中', 85);
INSERT INTO students VALUES (2, '鈴木', NULL);
INSERT INTO students VALUES (3, '佐藤', 72);
INSERT INTO students VALUES (4, '山田', NULL);
INSERT INTO students VALUES (5, '高橋', 91);`}
          expectedOutput={`name | score | sort_score
-----+-------+-----------
鈴木  | NULL  | 0
山田  | NULL  | 0
佐藤  | 72    | 72
田中  | 85    | 85
高橋  | 91    | 91`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="null-sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="null-sorting" basePath="/learn/sorting" />
    </div>
  );
}
