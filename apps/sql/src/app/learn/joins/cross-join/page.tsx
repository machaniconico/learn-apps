import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "joins")!.lessons;

export default function CrossJoinPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">テーブル結合 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CROSS JOIN</h1>
        <p className="text-gray-400">直積結合 — 2つのテーブルのすべての組み合わせを生成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CROSS JOINとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CROSS JOINは2つのテーブルのすべての行の組み合わせ（デカルト積）を返します。
          ON句による結合条件を指定しません。
          Aテーブルに3行、Bテーブルに4行あれば結果は3×4＝12行になります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-purple-400">CROSS JOIN</span> — 条件なしで全組み合わせを生成</li>
          <li><span className="text-purple-400">行数</span> — A行数 × B行数になる</li>
          <li><span className="text-purple-400">用途</span> — カレンダー生成、商品×サイズの組み合わせ表など</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">注意点</h2>
        <p className="text-gray-300 leading-relaxed">
          大きなテーブル同士をCROSS JOINすると行数が爆発的に増えパフォーマンスに影響します。
          意図せずCROSS JOINになる（WHERE句でON条件を書き忘れる）ケースに注意しましょう。
          用途を明確にした上で使用してください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 色とサイズの全組み合わせ</h2>
        <SqlEditor
          defaultCode={`SELECT colors.name AS color, sizes.label AS size
FROM colors
CROSS JOIN sizes;`}
          expectedOutput={`color  | size
-------|-----
赤     | S
赤     | M
赤     | L
青     | S
青     | M
青     | L
白     | S
白     | M
白     | L`}
          setupSql={`CREATE TABLE colors (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE sizes (id INTEGER PRIMARY KEY, label TEXT);
INSERT INTO colors VALUES (1, '赤'), (2, '青'), (3, '白');
INSERT INTO sizes VALUES (1, 'S'), (2, 'M'), (3, 'L');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: WHEREで絞り込む</h2>
        <SqlEditor
          defaultCode={`-- CROSS JOIN後にWHEREで特定の組み合わせを除外
SELECT c.name AS color, s.label AS size
FROM colors AS c
CROSS JOIN sizes AS s
WHERE NOT (c.name = '赤' AND s.label = 'L');`}
          expectedOutput={`color  | size
-------|-----
赤     | S
赤     | M
青     | S
青     | M
青     | L
白     | S
白     | M
白     | L`}
          setupSql={`CREATE TABLE colors (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE sizes (id INTEGER PRIMARY KEY, label TEXT);
INSERT INTO colors VALUES (1, '赤'), (2, '青'), (3, '白');
INSERT INTO sizes VALUES (1, 'S'), (2, 'M'), (3, 'L');`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 日付と時間枠の組み合わせ生成</h2>
        <SqlEditor
          defaultCode={`SELECT d.day, t.slot
FROM days AS d
CROSS JOIN timeslots AS t
ORDER BY d.day, t.slot;`}
          expectedOutput={`day   | slot
------|------
月曜  | 午前
月曜  | 午後
火曜  | 午前
火曜  | 午後
水曜  | 午前
水曜  | 午後`}
          setupSql={`CREATE TABLE days (id INTEGER PRIMARY KEY, day TEXT);
CREATE TABLE timeslots (id INTEGER PRIMARY KEY, slot TEXT);
INSERT INTO days VALUES (1, '月曜'), (2, '火曜'), (3, '水曜');
INSERT INTO timeslots VALUES (1, '午前'), (2, '午後');`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="joins" lessonId="cross-join" />
      </div>
      <LessonNav lessons={lessons} currentId="cross-join" basePath="/learn/joins" />
    </div>
  );
}
