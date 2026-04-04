import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "normalization")!.lessons;

export default function DenormalizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">正規化 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非正規化</h1>
        <p className="text-gray-400">パフォーマンスのために意図的に正規化を緩和する手法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非正規化とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          非正規化とは、正規化されたテーブル設計を意図的に崩し、冗長なデータを持たせることでクエリのパフォーマンスを向上させる手法です。
          JOINの回数を減らしたり、集計済みの値をカラムに持たせることで、読み取り速度を大幅に改善できます。
          ただし、データの更新時に複数箇所を同期する必要があるためトレードオフがあります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">冗長カラム追加</code> — JOINを避けるため参照先の値をコピー</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">集計カラム</code> — 集計値を事前計算してカラムに保存</li>
          <li><code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">テーブル結合</code> — 頻繁にJOINするテーブルを1つにまとめる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非正規化が有効なケース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          読み取りが書き込みよりも圧倒的に多いシステム（ECサイトの商品一覧、ダッシュボードなど）では非正規化が効果的です。
          一方、書き込みが頻繁な業務システムでは更新コストが増えるため避けるべきです。
          DWH（データウェアハウス）やレポートデータベースでは非正規化が標準的に使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 正規化テーブルでのJOINクエリ</h2>
        <SqlEditor
          defaultCode={`-- 毎回JOINが必要
SELECT o.id, u.name, u.email, o.total
FROM orders o
JOIN users u ON o.user_id = u.id;`}
          setupSql={`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total INTEGER);
INSERT INTO users VALUES (1, '田中太郎', 'tanaka@example.com'), (2, '鈴木花子', 'suzuki@example.com');
INSERT INTO orders VALUES (1, 1, 5000), (2, 1, 12000), (3, 2, 3000);`}
          expectedOutput={`id | name     | email              | total
---+----------+--------------------+-------
1  | 田中太郎  | tanaka@example.com | 5000
2  | 田中太郎  | tanaka@example.com | 12000
3  | 鈴木花子  | suzuki@example.com | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 非正規化テーブル（冗長カラムあり）</h2>
        <SqlEditor
          defaultCode={`-- JOINなしで取得できる（読み取り高速）
SELECT id, user_name, user_email, total FROM orders_denorm;`}
          setupSql={`CREATE TABLE orders_denorm (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  user_name TEXT,
  user_email TEXT,
  total INTEGER
);
INSERT INTO orders_denorm VALUES (1, 1, '田中太郎', 'tanaka@example.com', 5000);
INSERT INTO orders_denorm VALUES (2, 1, '田中太郎', 'tanaka@example.com', 12000);
INSERT INTO orders_denorm VALUES (3, 2, '鈴木花子', 'suzuki@example.com', 3000);`}
          expectedOutput={`id | user_name | user_email         | total
---+-----------+--------------------+-------
1  | 田中太郎  | tanaka@example.com | 5000
2  | 田中太郎  | tanaka@example.com | 12000
3  | 鈴木花子  | suzuki@example.com | 3000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 集計値を事前保存するパターン</h2>
        <SqlEditor
          defaultCode={`-- ユーザーごとの注文合計を事前計算して保存
SELECT id, name, order_count, total_spent FROM users_summary;`}
          setupSql={`CREATE TABLE users_summary (
  id INTEGER PRIMARY KEY,
  name TEXT,
  order_count INTEGER,
  total_spent INTEGER
);
INSERT INTO users_summary VALUES (1, '田中太郎', 2, 17000);
INSERT INTO users_summary VALUES (2, '鈴木花子', 1, 3000);`}
          expectedOutput={`id | name     | order_count | total_spent
---+----------+-------------+------------
1  | 田中太郎  | 2           | 17000
2  | 鈴木花子  | 1           | 3000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="normalization" lessonId="denormalization" />
      </div>
      <LessonNav lessons={lessons} currentId="denormalization" basePath="/learn/normalization" />
    </div>
  );
}
