import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "constraints")!.lessons;

export default function CompositeKeysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">制約 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複合キー</h1>
        <p className="text-gray-400">複数カラムで構成する主キーと一意制約</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複合キーとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複合キーは、2つ以上のカラムを組み合わせてテーブルの行を一意に識別する仕組みです。
          単一カラムでは重複が発生するが、組み合わせれば一意になる場合に使います。
          例えば「学生ID + 科目ID」で受講登録テーブルの主キーとするケースが典型的です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">PRIMARY KEY (col1, col2)</code> — 複合主キー</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE (col1, col2)</code> — 複合ユニーク制約</li>
          <li>中間テーブル（多対多の関連テーブル）でよく使用される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 多対多の中間テーブルでの複合主キー</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE students (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE courses (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE enrollments (
  student_id INTEGER NOT NULL,
  course_id  INTEGER NOT NULL,
  grade      TEXT,
  PRIMARY KEY (student_id, course_id)
);

INSERT INTO students VALUES (1, '田中'), (2, '佐藤'), (3, '鈴木');
INSERT INTO courses  VALUES (10, '数学'), (11, '英語'), (12, 'SQL');

INSERT INTO enrollments VALUES (1, 10, 'A'), (1, 12, 'B');
INSERT INTO enrollments VALUES (2, 11, 'A'), (2, 12, 'A');

SELECT s.name AS student, c.name AS course, e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses  c ON e.course_id  = c.id
ORDER BY s.name, c.name;`}
          expectedOutput={`student  course  grade
佐藤     SQL     A
佐藤     英語    A
田中     SQL     B
田中     数学    A`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複合ユニーク制約</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          サロゲートキー（自動採番のid）を主キーとして使いつつ、
          ビジネスルール上の一意性を <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">UNIQUE (col1, col2)</code> で保証するパターンもよく使われます。
          「同じユーザーが同じ日に同じ操作を重複して記録できない」などの制約をDB側で保証できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複合ユニーク制約で重複を防ぐ</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE user_reactions (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  post_id    INTEGER NOT NULL,
  reaction   TEXT    NOT NULL DEFAULT 'like',
  created_at TEXT    DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, post_id)  -- 1ユーザーは1投稿に1回だけリアクション可能
);

INSERT INTO user_reactions (id, user_id, post_id) VALUES (1, 101, 501);
INSERT INTO user_reactions (id, user_id, post_id) VALUES (2, 102, 501);
INSERT INTO user_reactions (id, user_id, post_id) VALUES (3, 101, 502);

-- (101, 501) は既に存在するためエラー（コメントを外すと確認）
-- INSERT INTO user_reactions (id, user_id, post_id) VALUES (4, 101, 501);

SELECT id, user_id, post_id, reaction FROM user_reactions;`}
          expectedOutput={`id  user_id  post_id  reaction
1   101      501      like
2   102      501      like
3   101      502      like`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複合キーの照合と検索</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE inventory (
  warehouse_id INTEGER NOT NULL,
  product_id   INTEGER NOT NULL,
  quantity     INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (warehouse_id, product_id)
);

INSERT INTO inventory VALUES
  (1, 101, 50), (1, 102, 30), (1, 103, 0),
  (2, 101, 20), (2, 103, 15);

-- 倉庫1の在庫を確認
SELECT warehouse_id, product_id, quantity
FROM inventory
WHERE warehouse_id = 1 AND quantity > 0;`}
          expectedOutput={`warehouse_id  product_id  quantity
1             101         50
1             102         30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="constraints" lessonId="composite-keys" />
      </div>
      <LessonNav lessons={lessons} currentId="composite-keys" basePath="/learn/constraints" />
    </div>
  );
}
