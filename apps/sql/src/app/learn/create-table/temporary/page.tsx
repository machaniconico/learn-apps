import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "create-table")!.lessons;

export default function TemporaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テーブル作成 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">一時テーブル</h1>
        <p className="text-gray-400">TEMPORARY TABLEの使い方とユースケース</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">一時テーブルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TEMPORARY TABLE</code>（または <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TEMP TABLE</code>）で作成した一時テーブルは、
          セッションが終了すると自動的に削除されます。
          複雑な集計の中間結果を保存したり、バッチ処理の作業領域として使うのに適しています。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TEMPORARY TABLE</code> — セッション限定の一時テーブル</li>
          <li><code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE TEMP TABLE</code> — TEMPORARYの省略形</li>
          <li>セッション終了時に自動削除される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 一時テーブルの作成と使用</h2>
        <SqlEditor
          defaultCode={`-- 永続テーブルのデータ
CREATE TABLE sales (
  id       INTEGER,
  product  TEXT,
  amount   REAL,
  sale_date TEXT
);

INSERT INTO sales VALUES
  (1, 'ノートPC',  89800, '2024-01'),
  (2, 'マウス',    2800,  '2024-01'),
  (3, 'キーボード', 8500,  '2024-01'),
  (4, 'ノートPC',  89800, '2024-02'),
  (5, 'モニター',  45000, '2024-02');

-- 中間集計を一時テーブルに保存
CREATE TEMP TABLE monthly_summary AS
SELECT sale_date, SUM(amount) AS total
FROM sales
GROUP BY sale_date;

SELECT * FROM monthly_summary;`}
          expectedOutput={`sale_date  total
2024-01    101100.0
2024-02    134800.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">一時テーブルの活用シーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          一時テーブルは複雑なデータ変換処理を段階的に行う際に役立ちます。
          大量データのフィルタリング結果を一時保存してから集計する、
          複数回参照するサブクエリ結果をキャッシュするなど、クエリのパフォーマンス改善にも使えます。
          CTE（WITH句）で代替できる場合も多いですが、複数回参照する場合は一時テーブルが有利です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 段階的なデータ処理</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER,
  customer    TEXT,
  total       REAL,
  order_date  TEXT
);

INSERT INTO orders VALUES
  (1, '田中', 15000, '2024-01-10'),
  (2, '佐藤', 8000,  '2024-01-15'),
  (3, '田中', 22000, '2024-02-05'),
  (4, '鈴木', 5000,  '2024-02-10'),
  (5, '佐藤', 31000, '2024-02-20');

-- ステップ1: 高額注文のみ抽出
CREATE TEMP TABLE high_value_orders AS
SELECT * FROM orders WHERE total >= 10000;

-- ステップ2: 顧客ごとに集計
SELECT customer, COUNT(*) AS order_count, SUM(total) AS total_spent
FROM high_value_orders
GROUP BY customer
ORDER BY total_spent DESC;`}
          expectedOutput={`customer  order_count  total_spent
佐藤      1            31000.0
田中      2            37000.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 明示的な一時テーブルの削除</h2>
        <SqlEditor
          defaultCode={`CREATE TEMP TABLE work_data (
  id    INTEGER,
  value TEXT
);

INSERT INTO work_data VALUES (1, 'A'), (2, 'B'), (3, 'C');

SELECT COUNT(*) AS rows_before FROM work_data;

-- 明示的に削除することもできる
DROP TABLE work_data;

SELECT 'work_dataは削除されました' AS result;`}
          expectedOutput={`rows_before
3

result
work_dataは削除されました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="create-table" lessonId="temporary" />
      </div>
      <LessonNav lessons={lessons} currentId="temporary" basePath="/learn/create-table" />
    </div>
  );
}
