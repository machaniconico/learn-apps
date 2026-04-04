import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "set-operations")!.lessons;

export default function ExceptPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">集合演算 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">EXCEPT</h1>
        <p className="text-gray-400">1つ目のクエリから2つ目のクエリの結果を除いた差集合を返すEXCEPTを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">EXCEPTとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300 bg-gray-800 px-1.5 py-0.5 rounded">EXCEPT</code>は1つ目のSELECT文の結果から、
          2つ目のSELECT文の結果に含まれる行を除いた差集合を返します。
          「AにあってBにない」データを取得したいときに使います。
          NOT INサブクエリで同様の結果を得られますが、EXCEPTの方が意図が明確です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>1つ目の結果から2つ目に含まれる行を引く（差集合）</li>
          <li>順序に依存する（A EXCEPT B と B EXCEPT A は異なる）</li>
          <li>NOT IN / NOT EXISTSサブクエリの代替として使える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: チームAにいてチームBにいないメンバー</h2>
        <SqlEditor
          defaultCode={`-- チームAにいるがチームBにはいないメンバー
SELECT name FROM team_a
EXCEPT
SELECT name FROM team_b
ORDER BY name;`}
          setupSql={`CREATE TABLE team_a (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE team_b (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
INSERT INTO team_a VALUES (1, '田中太郎');
INSERT INTO team_a VALUES (2, '鈴木花子');
INSERT INTO team_a VALUES (3, '佐藤一郎');
INSERT INTO team_a VALUES (4, '山田二郎');
INSERT INTO team_b VALUES (1, '鈴木花子');
INSERT INTO team_b VALUES (2, '山田二郎');
INSERT INTO team_b VALUES (3, '伊藤花代');`}
          expectedOutput={`name
--------
佐藤一郎
田中太郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 未注文のユーザーを特定する</h2>
        <SqlEditor
          defaultCode={`-- 登録しているが1度も注文していないユーザー
SELECT id, name FROM users
EXCEPT
SELECT DISTINCT u.id, u.name
FROM users u
JOIN orders o ON u.id = o.user_id
ORDER BY id;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL
);
INSERT INTO users VALUES (1, '田中太郎');
INSERT INTO users VALUES (2, '鈴木花子');
INSERT INTO users VALUES (3, '佐藤一郎');
INSERT INTO users VALUES (4, '山田二郎');
INSERT INTO orders VALUES (1, 1, '商品A');
INSERT INTO orders VALUES (2, 3, '商品B');`}
          expectedOutput={`id | name
---+--------
2  | 鈴木花子
4  | 山田二郎`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 先月から今月で離脱したユーザー</h2>
        <SqlEditor
          defaultCode={`-- 先月は購入したが今月は購入していないユーザー（離脱ユーザー）
SELECT DISTINCT user_id FROM orders WHERE order_month = '2024-02'
EXCEPT
SELECT DISTINCT user_id FROM orders WHERE order_month = '2024-03'
ORDER BY user_id;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  order_month TEXT NOT NULL
);
INSERT INTO orders VALUES (1, 1, '商品A', '2024-02');
INSERT INTO orders VALUES (2, 2, '商品B', '2024-02');
INSERT INTO orders VALUES (3, 3, '商品C', '2024-02');
INSERT INTO orders VALUES (4, 1, '商品D', '2024-03');
INSERT INTO orders VALUES (5, 4, '商品E', '2024-03');`}
          expectedOutput={`user_id
-------
2
3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="set-operations" lessonId="except" />
      </div>
      <LessonNav lessons={lessons} currentId="except" basePath="/learn/set-operations" />
    </div>
  );
}
