import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function UniquePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UNIQUE制約</h1>
        <p className="text-gray-400">一意性制約の設定と活用パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">UNIQUE制約とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE</code> 制約は、指定したカラムの値がテーブル内で重複しないことを保証します。
          PRIMARY KEYとの違いは、NULLを許容できる点と、1テーブルに複数設定できる点です。
          メールアドレスやユーザー名など、重複してはいけないが主キーではない値に使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 型 UNIQUE</code> — インライン定義</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE (カラム名)</code> — テーブル制約として定義</li>
          <li>NULLは一意性チェックの対象外（複数NULLを挿入可能）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: メールアドレスのUNIQUE制約</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id       INTEGER PRIMARY KEY,
  username TEXT    NOT NULL UNIQUE,
  email    TEXT    NOT NULL UNIQUE,
  age      INTEGER
);

INSERT INTO users VALUES (1, 'tanaka', 'tanaka@example.com', 28);
INSERT INTO users VALUES (2, 'sato',   'sato@example.com',   35);

-- 重複するemailは挿入できない（コメントを外すとエラー）
-- INSERT INTO users VALUES (3, 'yamada', 'tanaka@example.com', 22);

SELECT id, username, email FROM users;`}
          expectedOutput={`id  username  email
1   tanaka    tanaka@example.com
2   sato      sato@example.com`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複合UNIQUEとNULLの扱い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE (col1, col2)</code> のように複数カラムの組み合わせに一意性を設定することもできます。
          また、SQLiteではUNIQUE制約があるカラムにNULLを複数挿入できます。
          NULLはNULLと等しくないと見なされるため、一意性チェックをパスします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複合UNIQUE制約</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE enrollments (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  course_id  INTEGER NOT NULL,
  enrolled_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (student_id, course_id)  -- 同じ学生が同じコースに重複登録できない
);

INSERT INTO enrollments (id, student_id, course_id) VALUES (1, 101, 201);
INSERT INTO enrollments (id, student_id, course_id) VALUES (2, 101, 202);
INSERT INTO enrollments (id, student_id, course_id) VALUES (3, 102, 201);

-- (101, 201) は既に存在するためエラーになる（コメントを外すと確認できる）
-- INSERT INTO enrollments (id, student_id, course_id) VALUES (4, 101, 201);

SELECT id, student_id, course_id FROM enrollments;`}
          expectedOutput={`id  student_id  course_id
1   101         201
2   101         202
3   102         201`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: NULLはUNIQUE制約をパスする</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE contacts (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  phone TEXT UNIQUE   -- NULL複数可
);

INSERT INTO contacts VALUES (1, '田中', '090-1111-2222');
INSERT INTO contacts VALUES (2, '佐藤', NULL);  -- NULL許容
INSERT INTO contacts VALUES (3, '鈴木', NULL);  -- NULLは重複OK

SELECT id, name, phone FROM contacts;`}
          expectedOutput={`id  name  phone
1   田中   090-1111-2222
2   佐藤   NULL
3   鈴木   NULL`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="unique" />
      </div>
      <LessonNav lessons={lessons} currentId="unique" basePath="/learn/constraints" />
    </div>
  );
}
