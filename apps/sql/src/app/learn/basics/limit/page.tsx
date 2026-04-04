import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function LimitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SQL基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LIMIT・OFFSET</h1>
        <p className="text-gray-400">取得件数を制限し、開始位置を指定してデータを取得する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LIMITとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          LIMIT句は、SELECTクエリが返す行数を制限します。
          大きなテーブルから数件だけ確認したいとき、または一覧ページのように表示件数を制限したいときに使います。
          LIMITに0を指定すると0件、省略するとすべての行が返されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">LIMIT n</code> — 最大n行を返す</li>
          <li><code className="text-blue-300">LIMIT 0</code> — 0行を返す（スキーマ確認に便利）</li>
          <li>ORDER BYと組み合わせて「上位N件」を取得するパターンが多い</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OFFSETとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OFFSET句は、結果の先頭からスキップする行数を指定します。
          LIMITと組み合わせることでページネーション（ページング）を実現できます。
          例えば「11件目から10件を取得」は <code className="text-blue-300">LIMIT 10 OFFSET 10</code> と書きます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">LIMIT n OFFSET m</code> — m行スキップしてn行取得</li>
          <li>ページ番号をpとするとOFFSET = (p-1) × 件数</li>
          <li>大きなOFFSETは処理が遅くなる場合がある</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 最初の3件を取得</h2>
        <SqlEditor
          defaultCode={`SELECT * FROM products LIMIT 3;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);`}
          expectedOutput={`id | name   | price
---+--------+-------
1  | りんご  | 150
2  | バナナ  | 80
3  | 牛乳    | 200`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: OFFSETで開始位置を指定</h2>
        <SqlEditor
          defaultCode={`-- 3件目から2件取得（ページ2）
SELECT * FROM products LIMIT 2 OFFSET 2;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);`}
          expectedOutput={`id | name   | price
---+--------+-------
3  | 牛乳    | 200
4  | チーズ  | 350`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ORDER BYとLIMITで上位N件</h2>
        <SqlEditor
          defaultCode={`-- 価格が高い上位3件
SELECT * FROM products ORDER BY price DESC LIMIT 3;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'りんご', 150);
INSERT INTO products VALUES (2, 'バナナ', 80);
INSERT INTO products VALUES (3, '牛乳', 200);
INSERT INTO products VALUES (4, 'チーズ', 350);
INSERT INTO products VALUES (5, 'みかん', 100);`}
          expectedOutput={`id | name   | price
---+--------+-------
4  | チーズ  | 350
3  | 牛乳    | 200
1  | りんご  | 150`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="limit" />
      </div>
      <LessonNav lessons={lessons} currentId="limit" basePath="/learn/basics" />
    </div>
  );
}
