import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "sorting")!.lessons;

export default function LimitOffsetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートと制限 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ページネーション</h1>
        <p className="text-gray-400">LIMIT と OFFSET を組み合わせてページング処理を実装する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ページネーションの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webアプリでよく見る「前のページ・次のページ」機能はページネーションと呼ばれます。
          SQLでは LIMIT（1ページあたりの件数）と OFFSET（スキップする件数）を組み合わせて実装します。
          ページ番号 p の場合、OFFSET = (p - 1) × LIMIT で計算できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>1ページ目（p=1）: <code className="text-blue-300">LIMIT 10 OFFSET 0</code></li>
          <li>2ページ目（p=2）: <code className="text-blue-300">LIMIT 10 OFFSET 10</code></li>
          <li>3ページ目（p=3）: <code className="text-blue-300">LIMIT 10 OFFSET 20</code></li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">OFFSET使用時の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          OFFSETを使うページネーションは、ページ数が大きくなるほど処理が遅くなります。
          これはOFFSETが「先頭から指定した行数分を読み捨てる」処理をするためです。
          大量データの場合は、最後に取得したIDを使ったカーソルページネーションを検討してください。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ORDER BY と組み合わせることで一貫した結果が得られる</li>
          <li>大きなOFFSETはパフォーマンスが低下する</li>
          <li>カーソルベースのページネーション: <code className="text-blue-300">WHERE id &gt; 最後のID LIMIT n</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 1ページ目（最初の3件）</h2>
        <SqlEditor
          defaultCode={`-- 1ページ目: 価格の安い順で最初の3件
SELECT * FROM products
ORDER BY price ASC
LIMIT 3 OFFSET 0;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'バナナ', 80);
INSERT INTO products VALUES (2, 'みかん', 100);
INSERT INTO products VALUES (3, 'りんご', 150);
INSERT INTO products VALUES (4, 'ぶどう', 180);
INSERT INTO products VALUES (5, '牛乳', 200);
INSERT INTO products VALUES (6, 'バター', 280);
INSERT INTO products VALUES (7, 'チーズ', 350);`}
          expectedOutput={`id | name   | price
---+--------+-------
1  | バナナ  | 80
2  | みかん  | 100
3  | りんご  | 150`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 2ページ目（4件目〜6件目）</h2>
        <SqlEditor
          defaultCode={`-- 2ページ目: 価格の安い順で4件目〜6件目
SELECT * FROM products
ORDER BY price ASC
LIMIT 3 OFFSET 3;`}
          setupSql={`CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'バナナ', 80);
INSERT INTO products VALUES (2, 'みかん', 100);
INSERT INTO products VALUES (3, 'りんご', 150);
INSERT INTO products VALUES (4, 'ぶどう', 180);
INSERT INTO products VALUES (5, '牛乳', 200);
INSERT INTO products VALUES (6, 'バター', 280);
INSERT INTO products VALUES (7, 'チーズ', 350);`}
          expectedOutput={`id | name   | price
---+--------+-------
4  | ぶどう  | 180
5  | 牛乳    | 200
6  | バター  | 280`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 社員一覧のページネーション</h2>
        <SqlEditor
          defaultCode={`-- 名前順で2件ずつ、2ページ目を表示
SELECT id, name, department FROM employees
ORDER BY name ASC
LIMIT 2 OFFSET 2;`}
          setupSql={`CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, '伊藤健二', '人事');
INSERT INTO employees VALUES (2, '佐藤一郎', '開発');
INSERT INTO employees VALUES (3, '鈴木花子', '開発');
INSERT INTO employees VALUES (4, '高橋美咲', '営業');
INSERT INTO employees VALUES (5, '田中太郎', '営業');
INSERT INTO employees VALUES (6, '山田次郎', '開発');`}
          expectedOutput={`id | name     | department
---+----------+-----------
3  | 鈴木花子  | 開発
4  | 高橋美咲  | 営業`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="limit-offset" />
      </div>
      <LessonNav lessons={lessons} currentId="limit-offset" basePath="/learn/sorting" />
    </div>
  );
}
