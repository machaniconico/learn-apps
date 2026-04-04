import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function JsonFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">SQL関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSON関数</h1>
        <p className="text-gray-400">json_extract・json_array・json_objectなどのJSON操作関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SQLiteのJSON関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SQLite 3.38以降、JSON1拡張が標準で組み込まれています。
          テキスト列にJSON形式で保存したデータを、SQLから直接操作できます。
          NoSQL的なスキーマ柔軟性とSQLの結合・集計を組み合わせた使い方が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-green-300">json_extract(json, path)</code> — JSONからパスで値を取得</li>
          <li><code className="text-green-300">json_object(key, val, ...)</code> — JSONオブジェクトを作成</li>
          <li><code className="text-green-300">json_array(val, ...)</code> — JSON配列を作成</li>
          <li><code className="text-green-300">json_each(json)</code> — JSON配列を行に展開</li>
          <li><code className="text-green-300">json_type(json, path)</code> — パスの値の型を返す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: json_extractで値を取り出す</h2>
        <SqlEditor
          defaultCode={`SELECT
  id,
  json_extract(profile, '$.name') AS name,
  json_extract(profile, '$.age') AS age,
  json_extract(profile, '$.address.city') AS city
FROM users;`}
          setupSql={`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  profile TEXT NOT NULL
);
INSERT INTO users VALUES (1, '{"name":"田中太郎","age":30,"address":{"city":"東京","zip":"100-0001"}}');
INSERT INTO users VALUES (2, '{"name":"鈴木花子","age":25,"address":{"city":"大阪","zip":"530-0001"}}');
INSERT INTO users VALUES (3, '{"name":"佐藤一郎","age":35,"address":{"city":"名古屋","zip":"460-0001"}}');`}
          expectedOutput={`id | name     | age | city
---+----------+-----+------
1  | 田中太郎  | 30  | 東京
2  | 鈴木花子  | 25  | 大阪
3  | 佐藤一郎  | 35  | 名古屋`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: json_objectでJSONを生成する</h2>
        <SqlEditor
          defaultCode={`SELECT
  id,
  name,
  json_object(
    'id', id,
    'name', name,
    'price', price,
    'in_stock', CASE WHEN stock > 0 THEN 1 ELSE 0 END
  ) AS product_json
FROM products;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products VALUES (1, '商品A', 1000, 50);
INSERT INTO products VALUES (2, '商品B', 2000, 0);
INSERT INTO products VALUES (3, '商品C', 1500, 10);`}
          expectedOutput={`id | name | product_json
---+------+--------------------------------------------------
1  | 商品A | {"id":1,"name":"商品A","price":1000,"in_stock":1}
2  | 商品B | {"id":2,"name":"商品B","price":2000,"in_stock":0}
3  | 商品C | {"id":3,"name":"商品C","price":1500,"in_stock":1}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: json_eachでJSON配列を展開</h2>
        <SqlEditor
          defaultCode={`SELECT
  o.id AS order_id,
  item.value AS item_name
FROM orders o,
  json_each(o.items) AS item;`}
          setupSql={`CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer TEXT NOT NULL,
  items TEXT NOT NULL
);
INSERT INTO orders VALUES (1, '田中太郎', '["商品A","商品B","商品C"]');
INSERT INTO orders VALUES (2, '鈴木花子', '["商品B"]');
INSERT INTO orders VALUES (3, '佐藤一郎', '["商品A","商品D"]');`}
          expectedOutput={`order_id | item_name
---------+----------
1        | 商品A
1        | 商品B
1        | 商品C
2        | 商品B
3        | 商品A
3        | 商品D`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="json-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="json-functions" basePath="/learn/functions" />
    </div>
  );
}
