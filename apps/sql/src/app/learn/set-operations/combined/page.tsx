import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "set-operations")!.lessons;

export default function CombinedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">集合演算 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">集合演算の組み合わせ</h1>
        <p className="text-gray-400">UNION・INTERSECT・EXCEPTを組み合わせた複合的な集合演算を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">集合演算の優先順位</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数の集合演算を組み合わせる場合、優先順位に注意が必要です。
          SQL標準ではINTERSECTの優先順位がUNION・EXCEPTより高いですが、
          DBMSによって動作が異なる場合があります。
          括弧（サブクエリ）を使って実行順序を明示的に制御することを推奨します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>INTERSECT は UNION・EXCEPT より優先度が高い</li>
          <li>同じ優先度の演算子は左から右に評価される</li>
          <li>括弧でグループ化して順序を明示すると安全</li>
          <li>CTEと組み合わせると可読性が上がる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: UNIONとEXCEPTの組み合わせ</h2>
        <SqlEditor
          defaultCode={`-- チームAまたはBに所属するが、チームCには所属しないメンバー
SELECT name FROM team_a
UNION
SELECT name FROM team_b

EXCEPT

SELECT name FROM team_c
ORDER BY name;`}
          setupSql={`CREATE TABLE team_a (name TEXT NOT NULL);
CREATE TABLE team_b (name TEXT NOT NULL);
CREATE TABLE team_c (name TEXT NOT NULL);
INSERT INTO team_a VALUES ('田中太郎'), ('鈴木花子'), ('佐藤一郎');
INSERT INTO team_b VALUES ('鈴木花子'), ('山田二郎'), ('伊藤花代');
INSERT INTO team_c VALUES ('佐藤一郎'), ('伊藤花代');`}
          expectedOutput={`name
--------
山田二郎
鈴木花子
田中太郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: CTEを使って集合演算を整理する</h2>
        <SqlEditor
          defaultCode={`WITH
-- 1月か2月に購入したユーザー
jan_or_feb AS (
  SELECT DISTINCT user_id FROM orders WHERE order_month IN ('2024-01', '2024-02')
),
-- 3月にも購入したユーザー
mar_buyers AS (
  SELECT DISTINCT user_id FROM orders WHERE order_month = '2024-03'
)
-- 1月か2月に購入したが3月には買わなかったユーザー
SELECT user_id FROM jan_or_feb
EXCEPT
SELECT user_id FROM mar_buyers
ORDER BY user_id;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_month TEXT NOT NULL
);
INSERT INTO orders VALUES (1, 1, '2024-01');
INSERT INTO orders VALUES (2, 2, '2024-01');
INSERT INTO orders VALUES (3, 3, '2024-02');
INSERT INTO orders VALUES (4, 1, '2024-03');
INSERT INTO orders VALUES (5, 4, '2024-03');`}
          expectedOutput={`user_id
-------
2
3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 対称差（どちらか一方にしかない要素）</h2>
        <SqlEditor
          defaultCode={`-- 対称差: AにあってBにない OR BにあってAにない
-- (A EXCEPT B) UNION (B EXCEPT A)
SELECT name, 'Aのみ' AS belongs_to FROM team_a
EXCEPT SELECT name, 'Aのみ' FROM (SELECT name FROM team_b)

UNION

SELECT name, 'Bのみ' AS belongs_to FROM team_b
EXCEPT SELECT name, 'Bのみ' FROM (SELECT name FROM team_a)

ORDER BY name;`}
          setupSql={`CREATE TABLE team_a (name TEXT NOT NULL);
CREATE TABLE team_b (name TEXT NOT NULL);
INSERT INTO team_a VALUES ('田中太郎'), ('鈴木花子'), ('佐藤一郎');
INSERT INTO team_b VALUES ('鈴木花子'), ('山田二郎'), ('伊藤花代');`}
          expectedOutput={`name     | belongs_to
---------+-----------
伊藤花代  | Bのみ
佐藤一郎  | Aのみ
山田二郎  | Bのみ
田中太郎  | Aのみ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="set-operations" lessonId="combined" />
      </div>
      <LessonNav lessons={lessons} currentId="combined" basePath="/learn/set-operations" />
    </div>
  );
}
