import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function SecondNfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">第2正規形</h1>
        <p className="text-gray-400">部分関数従属を排除して更新異常を防ぐ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">第2正規形とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          第2正規形（2NF）は1NFを満たした上で、すべての非キー属性が主キー全体に完全に依存している状態です。
          複合主キーを持つテーブルで、主キーの一部にのみ依存するカラム（部分関数従属）が存在する場合は2NF違反になります。
          2NFに変換することで、データの重複と更新異常を防ぐことができます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">完全関数従属</code> — 非キー属性が主キー全体に依存している</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">部分関数従属</code> — 主キーの一部にのみ依存 → 2NF違反</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">テーブル分割</code> — 部分依存する属性を別テーブルに移す</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">部分関数従属の問題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          注文明細テーブルで主キーが（注文ID, 商品ID）の複合キーとします。
          このとき「商品名」は商品IDだけで決まるため、主キーの一部への依存（部分関数従属）となります。
          同じ商品が複数の注文に登場するたびに商品名が重複し、商品名を変更する際は全行を修正しなければなりません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 2NF違反テーブルの確認</h2>
        <SqlEditor
          defaultCode={`-- product_name は product_id だけに依存 → 2NF違反
SELECT * FROM order_details_bad;`}
          setupSql={`CREATE TABLE order_details_bad (
  order_id INTEGER,
  product_id INTEGER,
  product_name TEXT,
  quantity INTEGER,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_details_bad VALUES (1, 101, 'ノートPC', 1);
INSERT INTO order_details_bad VALUES (1, 102, 'マウス', 2);
INSERT INTO order_details_bad VALUES (2, 101, 'ノートPC', 1);`}
          expectedOutput={`order_id | product_id | product_name | quantity
---------+------------+--------------+---------
1        | 101        | ノートPC      | 1
1        | 102        | マウス        | 2
2        | 101        | ノートPC      | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 2NFに変換したテーブル設計</h2>
        <SqlEditor
          defaultCode={`-- 商品情報を別テーブルに分離
SELECT od.order_id, p.product_name, od.quantity
FROM order_details od
JOIN products p ON od.product_id = p.id;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  product_name TEXT
);
CREATE TABLE order_details (
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO products VALUES (101, 'ノートPC'), (102, 'マウス');
INSERT INTO order_details VALUES (1, 101, 1), (1, 102, 2), (2, 101, 1);`}
          expectedOutput={`order_id | product_name | quantity
---------+--------------+---------
1        | ノートPC      | 1
1        | マウス        | 2
2        | ノートPC      | 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 更新異常がなくなることを確認</h2>
        <SqlEditor
          defaultCode={`-- 商品名変更は products テーブル1行だけ修正すればよい
UPDATE products SET product_name = 'ノートパソコン' WHERE id = 101;
SELECT od.order_id, p.product_name, od.quantity
FROM order_details od
JOIN products p ON od.product_id = p.id;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, product_name TEXT);
CREATE TABLE order_details (order_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (order_id, product_id));
INSERT INTO products VALUES (101, 'ノートPC'), (102, 'マウス');
INSERT INTO order_details VALUES (1, 101, 1), (1, 102, 2), (2, 101, 1);`}
          expectedOutput={`order_id | product_name   | quantity
---------+----------------+---------
1        | ノートパソコン  | 1
1        | マウス          | 2
2        | ノートパソコン  | 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="second-nf" />
      </div>
      <LessonNav lessons={lessons} currentId="second-nf" basePath="/learn/normalization" />
    </div>
  );
}
