import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "performance")!.lessons;

export default function BatchProcessingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パフォーマンス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バッチ処理</h1>
        <p className="text-gray-400">大量データを効率的に処理するSQL設計パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バッチ処理の最適化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          バッチ処理では大量のデータを一括で処理しますが、1回のSQL文で数百万行を更新・削除すると
          ロックやリソース消費が問題になります。解決策として「チャンク処理」（一定件数ずつ分割）や
          「一括INSERT」（複数行を1文で挿入）などのテクニックがあります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">一括INSERT</code> — VALUES句で複数行を1文で挿入（N回より高速）</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">INSERT SELECT</code> — SELECT結果を直接別テーブルに挿入</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">チャンク更新</code> — LIMIT付きで少量ずつ更新・削除</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 一括INSERTで効率的にデータ投入</h2>
        <SqlEditor
          defaultCode={`-- 1文で複数行を挿入（個別INSERTより高速）
INSERT INTO products (id, name, price, category)
VALUES
  (1, 'ノートPC', 120000, 'PC'),
  (2, 'マウス', 3000, '周辺機器'),
  (3, 'キーボード', 8000, '周辺機器'),
  (4, 'モニター', 45000, 'PC'),
  (5, 'USBハブ', 2500, '周辺機器');
SELECT COUNT(*) AS inserted FROM products;`}
          setupSql={`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);`}
          expectedOutput={`inserted
--------
5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: INSERT SELECTでデータを変換して移行</h2>
        <SqlEditor
          defaultCode={`-- アーカイブ: 古い注文を archive_orders テーブルに移行
INSERT INTO archive_orders
SELECT id, customer_id, total, order_date
FROM orders
WHERE order_date < '2024-01-01';
SELECT COUNT(*) AS archived FROM archive_orders;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
CREATE TABLE archive_orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,1,5000,'2023-06-01'),(2,2,3000,'2023-11-15'),(3,1,8000,'2024-02-10'),(4,3,12000,'2024-03-20');`}
          expectedOutput={`archived
--------
2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 集計テーブルへの一括更新</h2>
        <SqlEditor
          defaultCode={`-- 日次集計テーブルを一括で更新する
INSERT INTO daily_summary (order_date, order_count, total_revenue)
SELECT order_date, COUNT(*) AS order_count, SUM(total) AS total_revenue
FROM orders
GROUP BY order_date;
SELECT * FROM daily_summary ORDER BY order_date;`}
          setupSql={`CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER, order_date TEXT);
CREATE TABLE daily_summary (order_date TEXT PRIMARY KEY, order_count INTEGER, total_revenue INTEGER);
INSERT INTO orders VALUES (1,1,5000,'2024-01-10'),(2,2,3000,'2024-01-10'),(3,1,8000,'2024-01-11'),(4,3,12000,'2024-01-12'),(5,2,4000,'2024-01-12');`}
          expectedOutput={`order_date  | order_count | total_revenue
------------+-------------+--------------
2024-01-10  | 2           | 8000
2024-01-11  | 1           | 8000
2024-01-12  | 2           | 16000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="performance" lessonId="batch-processing" />
      </div>
      <LessonNav lessons={lessons} currentId="batch-processing" basePath="/learn/performance" />
    </div>
  );
}
