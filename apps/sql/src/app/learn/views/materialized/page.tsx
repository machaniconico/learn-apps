import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function MaterializedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マテリアライズドビュー</h1>
        <p className="text-gray-400">結果を実体化するビューとSQLiteでの代替パターン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マテリアライズドビューとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常のビューはアクセスのたびにクエリを実行しますが、
          マテリアライズドビューはクエリ結果を物理的に保存します。
          読み取りが高速ですが、ベーステーブルが更新されてもビューは自動更新されません（手動でリフレッシュが必要）。
          SQLiteにはマテリアライズドビューがないため、通常テーブルとINSERT/TRUNCATEで代替します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>PostgreSQL: <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">CREATE MATERIALIZED VIEW</code></li>
          <li>SQLite代替: テーブル + 定期的な <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">DELETE + INSERT</code></li>
          <li>重い集計を事前計算して読み取りを高速化</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: SQLiteでのマテリアライズドビュー代替</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE sales (
  id        INTEGER PRIMARY KEY,
  product   TEXT NOT NULL,
  category  TEXT NOT NULL,
  amount    REAL NOT NULL,
  sale_date TEXT NOT NULL
);

INSERT INTO sales VALUES
  (1, 'ノートPC',  '電子機器', 89800, '2024-01'),
  (2, 'マウス',    '電子機器',  2800, '2024-01'),
  (3, 'デスク',    '家具',     45000, '2024-01'),
  (4, 'ノートPC',  '電子機器', 89800, '2024-02'),
  (5, 'チェア',    '家具',     38000, '2024-02');

-- マテリアライズドビュー代替テーブル
CREATE TABLE sales_summary_mat (
  category  TEXT,
  sale_date TEXT,
  total     REAL,
  PRIMARY KEY (category, sale_date)
);

-- リフレッシュ（DELETE + INSERT）
DELETE FROM sales_summary_mat;
INSERT INTO sales_summary_mat
SELECT category, sale_date, SUM(amount)
FROM sales GROUP BY category, sale_date;

SELECT * FROM sales_summary_mat ORDER BY sale_date, category;`}
          expectedOutput={`category  sale_date  total
家具       2024-01    45000.0
電子機器   2024-01    92600.0
家具       2024-02    38000.0
電子機器   2024-02    89800.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マテリアライズドビューの更新戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マテリアライズドビューのリフレッシュ戦略には2種類あります。
          <span className="text-cyan-400">完全リフレッシュ</span>は全データを削除して再作成するシンプルな方法です。
          <span className="text-cyan-400">増分リフレッシュ</span>は変更分のみを更新する効率的な方法ですが、実装が複雑です。
          バッチ処理や定期ジョブでリフレッシュするのが一般的な運用です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 差分更新（増分リフレッシュ）</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE events (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  event_type TEXT    NOT NULL,
  created_at TEXT    NOT NULL
);

CREATE TABLE user_stats_mat (
  user_id     INTEGER PRIMARY KEY,
  event_count INTEGER NOT NULL DEFAULT 0,
  last_seen   TEXT
);

INSERT INTO events VALUES
  (1, 101, 'login',  '2024-01-10'),
  (2, 101, 'view',   '2024-01-10'),
  (3, 102, 'login',  '2024-01-11'),
  (4, 101, 'logout', '2024-01-11');

-- 完全リフレッシュ
DELETE FROM user_stats_mat;
INSERT INTO user_stats_mat
SELECT user_id, COUNT(*), MAX(created_at)
FROM events GROUP BY user_id;

SELECT user_id, event_count, last_seen FROM user_stats_mat;`}
          expectedOutput={`user_id  event_count  last_seen
101      3            2024-01-11
102      1            2024-01-11`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: トリガーを使った自動更新</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE page_views (
  id      INTEGER PRIMARY KEY,
  page    TEXT NOT NULL,
  viewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE page_view_counts (
  page  TEXT PRIMARY KEY,
  cnt   INTEGER NOT NULL DEFAULT 0
);

-- INSERTトリガーで自動更新
CREATE TRIGGER update_view_counts
AFTER INSERT ON page_views
BEGIN
  INSERT INTO page_view_counts (page, cnt) VALUES (NEW.page, 1)
  ON CONFLICT(page) DO UPDATE SET cnt = cnt + 1;
END;

INSERT INTO page_views (id, page) VALUES (1, '/home');
INSERT INTO page_views (id, page) VALUES (2, '/about');
INSERT INTO page_views (id, page) VALUES (3, '/home');
INSERT INTO page_views (id, page) VALUES (4, '/home');

SELECT page, cnt FROM page_view_counts ORDER BY cnt DESC;`}
          expectedOutput={`page    cnt
/home   3
/about  1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="materialized" />
      </div>
      <LessonNav lessons={lessons} currentId="materialized" basePath="/learn/views" />
    </div>
  );
}
