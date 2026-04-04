import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function NullablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NULL制約</h1>
        <p className="text-gray-400">NULLとNOT NULLの設定方法と使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLは「値が存在しない」または「不明」を表す特殊な状態です。
          0や空文字とは異なります。SQLiteではカラムはデフォルトでNULLを許容します。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">NOT NULL</code> 制約を付けると、そのカラムにNULLを挿入しようとするとエラーになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 型</code> — NULLを許容（デフォルト）</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">カラム名 型 NOT NULL</code> — NULLを禁止</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IS NULL / IS NOT NULL</code> — NULLの判定</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: NOT NULL制約の設定</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE members (
  id       INTEGER NOT NULL,
  username TEXT    NOT NULL,
  email    TEXT    NOT NULL,
  phone    TEXT,            -- NULL許容（任意入力）
  bio      TEXT             -- NULL許容（任意入力）
);

INSERT INTO members (id, username, email) VALUES
  (1, 'tanaka', 'tanaka@example.com'),
  (2, 'sato',   'sato@example.com');

-- phoneはNULLなのでIS NULLで確認できる
SELECT id, username, phone IS NULL AS phone_empty
FROM members;`}
          expectedOutput={`id  username  phone_empty
1   tanaka    1
2   sato      1`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">NULLの扱いの注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          NULLは通常の比較演算子では正しく評価できません。
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">= NULL</code> は常にFALSEになります。
          NULLの判定には必ず <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IS NULL</code> または
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">IS NOT NULL</code> を使います。
          また、NULLを含む演算結果もNULLになります（NULL伝播）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: NULLを含むデータの扱い</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE scores (
  student TEXT    NOT NULL,
  math    INTEGER,          -- NULL許容
  english INTEGER           -- NULL許容
);

INSERT INTO scores VALUES
  ('田中', 85, 90),
  ('佐藤', NULL, 75),
  ('鈴木', 70, NULL),
  ('高橋', NULL, NULL);

-- NULLを含む演算はNULLになる
SELECT student,
       math,
       english,
       math + english AS total  -- NULLがあるとNULL
FROM scores;`}
          expectedOutput={`student  math  english  total
田中      85    90       175
佐藤      NULL  75       NULL
鈴木      70    NULL     NULL
高橋      NULL  NULL     NULL`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: COALESCEでNULLを置換</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE scores (
  student TEXT    NOT NULL,
  math    INTEGER,
  english INTEGER
);

INSERT INTO scores VALUES
  ('田中', 85, 90),
  ('佐藤', NULL, 75),
  ('鈴木', 70, NULL);

-- COALESCEでNULLを0に置換して合計
SELECT student,
       COALESCE(math, 0)    AS math,
       COALESCE(english, 0) AS english,
       COALESCE(math, 0) + COALESCE(english, 0) AS total
FROM scores;`}
          expectedOutput={`student  math  english  total
田中      85    90       175
佐藤      0     75       75
鈴木      70    0        70`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="nullable" />
      </div>
      <LessonNav lessons={lessons} currentId="nullable" basePath="/learn/create-table" />
    </div>
  );
}
