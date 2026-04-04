import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "set-operations")!.lessons;

export default function UnionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">集合演算 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">UNION</h1>
        <p className="text-gray-400">重複を排除して2つのクエリ結果を結合するUNIONを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">UNIONとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300 bg-gray-800 px-1.5 py-0.5 rounded">UNION</code>は2つのSELECT文の結果を縦に結合して、重複行を除いた和集合を返します。
          異なるテーブルの同形式のデータを統合したり、複数の条件を持つデータを1つのリストにまとめるときに使います。
          両方のSELECT文は同じ列数と互換性のあるデータ型を持つ必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>列数と型が一致している必要がある</li>
          <li>列名は最初のSELECT文の列名が使われる</li>
          <li>重複行は自動的に除去される（UNION ALLは除去しない）</li>
          <li>ORDER BYは最後のSELECT文の後に1回だけ書く</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 2つのテーブルのデータを統合</h2>
        <SqlEditor
          defaultCode={`-- 社員と業務委託の全員リスト（重複なし）
SELECT id, name, '正社員' AS type FROM employees
UNION
SELECT id, name, '委託' AS type FROM contractors
ORDER BY name;`}
          setupSql={`CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);
CREATE TABLE contractors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);
INSERT INTO employees VALUES (1, '田中太郎', '営業部');
INSERT INTO employees VALUES (2, '鈴木花子', '開発部');
INSERT INTO contractors VALUES (1, '佐藤一郎', 'ABC株式会社');
INSERT INTO contractors VALUES (2, '山田二郎', 'XYZ会社');`}
          expectedOutput={`id | name     | type
---+----------+------
3  | 山田二郎  | 委託
1  | 佐藤一郎  | 委託
2  | 鈴木花子  | 正社員
1  | 田中太郎  | 正社員`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 条件の異なるデータを1つに統合</h2>
        <SqlEditor
          defaultCode={`-- 在庫切れ商品と高額商品を1つのリストに（UNIONで重複除去）
SELECT product_name, price, '在庫切れ' AS alert
FROM products
WHERE stock = 0

UNION

SELECT product_name, price, '高額商品' AS alert
FROM products
WHERE price >= 10000

ORDER BY price DESC;`}
          setupSql={`CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products VALUES (1, '商品A', 1500, 0);
INSERT INTO products VALUES (2, '商品B', 15000, 5);
INSERT INTO products VALUES (3, '商品C', 800, 0);
INSERT INTO products VALUES (4, '商品D', 12000, 0);
INSERT INTO products VALUES (5, '商品E', 500, 20);`}
          expectedOutput={`product_name | price | alert
-------------+-------+--------
商品B         | 15000 | 高額商品
商品D         | 12000 | 高額商品
商品D         | 12000 | 在庫切れ
商品A         | 1500  | 在庫切れ
商品C         | 800   | 在庫切れ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: UNIONで重複排除の確認</h2>
        <SqlEditor
          defaultCode={`-- 同じ値が含まれる場合、UNIONは重複を除去する
SELECT name FROM team_a
UNION
SELECT name FROM team_b
ORDER BY name;`}
          setupSql={`CREATE TABLE team_a (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE team_b (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO team_a VALUES (1, '田中太郎');
INSERT INTO team_a VALUES (2, '鈴木花子');
INSERT INTO team_a VALUES (3, '佐藤一郎');
INSERT INTO team_b VALUES (1, '鈴木花子');
INSERT INTO team_b VALUES (2, '山田二郎');
INSERT INTO team_b VALUES (3, '佐藤一郎');`}
          expectedOutput={`name
--------
山田二郎
佐藤一郎
鈴木花子
田中太郎`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="set-operations" lessonId="union" />
      </div>
      <LessonNav lessons={lessons} currentId="union" basePath="/learn/set-operations" />
    </div>
  );
}
