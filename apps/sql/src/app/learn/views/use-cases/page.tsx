import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SqlEditor } from "@/components/sql-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "views")!.lessons;

export default function UseCasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">ビュー レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビューの活用</h1>
        <p className="text-gray-400">実務でのビュー活用パターンとベストプラクティス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビューの実務活用シーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビューは実務でさまざまな場面で活用できます。
          <span className="text-cyan-400">セキュリティ</span>：機密カラムを除いたビューを公開することでアクセス制御の代替になります。
          <span className="text-cyan-400">複雑なクエリの簡素化</span>：JOINや集計を毎回書かずに済みます。
          <span className="text-cyan-400">データの抽象化</span>：テーブル構造が変わってもビューの定義を変更すればアプリへの影響を最小化できます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-cyan-400">セキュリティ</span> — 機密カラムを除いたビューを公開</li>
          <li><span className="text-cyan-400">クエリ再利用</span> — 複雑なJOIN・集計を名前付きで保存</li>
          <li><span className="text-cyan-400">互換性維持</span> — テーブル変更時の移行レイヤー</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: セキュリティのためのビュー（機密情報の隠蔽）</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE users (
  id           INTEGER PRIMARY KEY,
  username     TEXT NOT NULL,
  email        TEXT NOT NULL,
  password_hash TEXT NOT NULL,  -- 機密情報
  salary       REAL NOT NULL,   -- 機密情報
  department   TEXT NOT NULL
);

INSERT INTO users VALUES
  (1, 'tanaka', 'tanaka@example.com', 'hashed_pw_1', 550000, '開発'),
  (2, 'sato',   'sato@example.com',   'hashed_pw_2', 480000, '営業');

-- 機密カラムを除いた公開ビュー
CREATE VIEW public_users AS
SELECT id, username, department FROM users;

-- このビューからはpassword_hashもsalaryも見えない
SELECT * FROM public_users;`}
          expectedOutput={`id  username  department
1   tanaka    開発
2   sato      営業`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">レポートビューのパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ダッシュボードやレポートで使う集計クエリをビューとして定義しておくと、
          アプリケーション側からはシンプルなSELECTで必要なデータを取得できます。
          ビジネスロジック（売上計算・在庫判定など）をSQLに集約できる点もメリットです。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ダッシュボード用レポートビュー</h2>
        <SqlEditor
          defaultCode={`CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer    TEXT NOT NULL,
  product     TEXT NOT NULL,
  amount      REAL NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  order_date  TEXT NOT NULL
);

INSERT INTO orders VALUES
  (1, '田中', 'ノートPC', 89800, 'delivered', '2024-01-10'),
  (2, '佐藤', 'マウス',    2800, 'shipped',   '2024-01-15'),
  (3, '田中', 'デスク',   45000, 'pending',   '2024-02-01'),
  (4, '鈴木', 'ノートPC', 89800, 'delivered', '2024-02-05'),
  (5, '佐藤', 'チェア',   38000, 'delivered', '2024-02-10');

CREATE VIEW dashboard_stats AS
SELECT
  COUNT(*)                                         AS total_orders,
  SUM(CASE WHEN status = 'delivered' THEN 1 END)  AS delivered_count,
  SUM(CASE WHEN status = 'pending'   THEN 1 END)  AS pending_count,
  SUM(amount)                                      AS total_revenue,
  ROUND(AVG(amount), 0)                            AS avg_order_value
FROM orders;

SELECT * FROM dashboard_stats;`}
          expectedOutput={`total_orders  delivered_count  pending_count  total_revenue  avg_order_value
5             3                1              265400.0       53080.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: テーブル変更時の互換性維持</h2>
        <SqlEditor
          defaultCode={`-- 旧テーブル構造をシミュレート
CREATE TABLE products_v2 (
  product_id   INTEGER PRIMARY KEY,  -- idから変更
  product_name TEXT NOT NULL,         -- nameから変更
  unit_price   REAL NOT NULL,         -- priceから変更
  category     TEXT NOT NULL
);

INSERT INTO products_v2 VALUES (1, 'ノートPC', 89800, '電子機器');
INSERT INTO products_v2 VALUES (2, 'マウス',    2800, '電子機器');
INSERT INTO products_v2 VALUES (3, 'デスク',   45000, '家具');

-- 旧インターフェースを維持するビュー（後方互換性）
CREATE VIEW products AS
SELECT
  product_id   AS id,
  product_name AS name,
  unit_price   AS price,
  category
FROM products_v2;

-- 古いクエリがそのまま動作する
SELECT id, name, price FROM products WHERE category = '電子機器';`}
          expectedOutput={`id  name    price
1   ノートPC  89800.0
2   マウス    2800.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="views" lessonId="use-cases" />
      </div>
      <LessonNav lessons={lessons} currentId="use-cases" basePath="/learn/views" />
    </div>
  );
}
