import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "set-operations")!.lessons;

export default function IntersectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">集合演算 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">INTERSECT</h1>
        <p className="text-gray-400">2つのクエリ結果の共通部分（積集合）を返すINTERSECTを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">INTERSECTとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300 bg-gray-800 px-1.5 py-0.5 rounded">INTERSECT</code>は2つのSELECT文の結果に共通して存在する行だけを返します（積集合）。
          「AとBの両方に含まれるデータ」を取得したいときに使います。
          INTERSECTは重複を自動的に除去します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>両方のクエリに存在する行のみ返す</li>
          <li>INを使ったサブクエリでも同様の結果を得られる</li>
          <li>全列の値が一致している行が対象</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 両チームに所属するメンバー</h2>
        <SqlEditor
          defaultCode={`-- チームAとチームBの両方に所属するメンバー
SELECT name FROM team_a
INTERSECT
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
山田二郎
鈴木花子`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数月に購入したリピーター</h2>
        <SqlEditor
          defaultCode={`-- 1月と2月の両方に注文したユーザー
SELECT DISTINCT user_id FROM orders WHERE order_month = '2024-01'
INTERSECT
SELECT DISTINCT user_id FROM orders WHERE order_month = '2024-02'
ORDER BY user_id;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  order_month TEXT NOT NULL
);
INSERT INTO orders VALUES (1, 1, '商品A', '2024-01');
INSERT INTO orders VALUES (2, 2, '商品B', '2024-01');
INSERT INTO orders VALUES (3, 3, '商品C', '2024-01');
INSERT INTO orders VALUES (4, 1, '商品D', '2024-02');
INSERT INTO orders VALUES (5, 3, '商品E', '2024-02');
INSERT INTO orders VALUES (6, 4, '商品F', '2024-02');`}
          expectedOutput={`user_id
-------
1
3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: INサブクエリと同等の処理</h2>
        <SqlEditor
          defaultCode={`-- INTERSECTと同等のINサブクエリ
-- どちらも「両方のカテゴリで売れた商品」を取得する

-- INTERSECT版
SELECT product_name FROM sales WHERE category = '食品'
INTERSECT
SELECT product_name FROM sales WHERE category = '有機';`}
          setupSql={`CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  amount INTEGER NOT NULL
);
INSERT INTO sales VALUES (1, 'トマト', '食品', 500);
INSERT INTO sales VALUES (2, 'トマト', '有機', 800);
INSERT INTO sales VALUES (3, 'りんご', '食品', 300);
INSERT INTO sales VALUES (4, 'にんじん', '有機', 400);
INSERT INTO sales VALUES (5, 'レタス', '食品', 200);
INSERT INTO sales VALUES (6, 'レタス', '有機', 350);`}
          expectedOutput={`product_name
------------
トマト
レタス`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="set-operations" lessonId="intersect" />
      </div>
      <LessonNav lessons={lessons} currentId="intersect" basePath="/learn/set-operations" />
    </div>
  );
}
