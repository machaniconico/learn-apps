import { SqlEditor } from "@/components/sql-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: ECサイト売上分析 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-900 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">初級</span>
          <h2 className="text-xl font-bold text-white">ECサイト売上分析</h2>
        </div>
        <p className="text-gray-400 mb-4">JOIN・集約・GROUP BY を組み合わせて、ECサイトの売上データを多角的に分析しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>customers・orders・order_items・products テーブルを JOIN する</li>
          <li>カテゴリ別・月別の売上合計を GROUP BY で集計する</li>
          <li>HAVING で売上上位カテゴリをフィルタリングする</li>
          <li>顧客ごとの購入回数と合計金額を集計する</li>
        </ul>
        <SqlEditor
          defaultCode={`-- ECサイトのサンプルテーブル構成:
-- customers(id, name, email, created_at)
-- orders(id, customer_id, ordered_at, status)
-- order_items(id, order_id, product_id, quantity, price)
-- products(id, name, category, base_price)

-- TODO 1: カテゴリ別の売上合計と件数を求める
-- (category, total_sales, order_count を出力、売上の多い順)
SELECT
  -- ここにクエリを書く
  'カテゴリ別集計' AS task;

-- TODO 2: 月別売上推移を求める
-- (year, month, monthly_sales を出力)
SELECT
  -- ここにクエリを書く
  '月別集計' AS task;

-- TODO 3: 上位5名の優良顧客を抽出する
-- (name, order_count, total_spent を出力、合計金額の多い順)
SELECT
  -- ここにクエリを書く
  '顧客ランキング' AS task;`}
        />
      </div>

      {/* プロジェクト2: 従業員管理レポート */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-yellow-900 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">中級</span>
          <h2 className="text-xl font-bold text-white">従業員管理レポート</h2>
        </div>
        <p className="text-gray-400 mb-4">サブクエリとウィンドウ関数を使って、部門別・給与ランク別の従業員レポートを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>相関サブクエリで部門平均給与より高い従業員を抽出する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1 rounded">RANK()</code> / <code className="text-purple-400 bg-gray-800 px-1 rounded">DENSE_RANK()</code> で給与ランクを付ける</li>
          <li><code className="text-purple-400 bg-gray-800 px-1 rounded">LAG()</code> / <code className="text-purple-400 bg-gray-800 px-1 rounded">LEAD()</code> で前後の従業員との給与差を計算する</li>
          <li>部門ごとの給与パーセンタイルを求める</li>
        </ul>
        <SqlEditor
          defaultCode={`-- 従業員テーブル構成:
-- departments(id, name, budget)
-- employees(id, name, department_id, salary, hire_date, manager_id)

-- TODO 1: 部門平均より高い給与の従業員を相関サブクエリで抽出する
-- (name, department_name, salary, dept_avg_salary を出力)
SELECT
  -- ここにクエリを書く
  '部門平均超え' AS task;

-- TODO 2: 部門内給与ランクをRANK()ウィンドウ関数で付ける
-- (name, department_name, salary, salary_rank を出力)
SELECT
  -- ここにクエリを書く
  '給与ランク' AS task;

-- TODO 3: 入社順で前の従業員との給与差をLAG()で計算する
-- (name, hire_date, salary, prev_salary, salary_diff を出力)
SELECT
  -- ここにクエリを書く
  '給与差分' AS task;`}
        />
      </div>

      {/* プロジェクト3: 在庫管理クエリ */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-900 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">在庫管理クエリ</h2>
        </div>
        <p className="text-gray-400 mb-4">CTEとCASE式を活用して、在庫状況の分析と発注提案クエリを構築しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>CTE (<code className="text-purple-400 bg-gray-800 px-1 rounded">WITH</code>) で中間集計を段階的に定義する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1 rounded">CASE</code> 式で在庫状態（過剰・適正・不足・切れ）を分類する</li>
          <li>再帰CTE で部品の部品表（BOM）を展開する</li>
          <li>発注が必要な商品リストと発注数量を算出する</li>
        </ul>
        <SqlEditor
          defaultCode={`-- 在庫テーブル構成:
-- products(id, name, category, unit_price)
-- inventory(id, product_id, quantity, min_stock, max_stock, reorder_point)
-- stock_movements(id, product_id, movement_type, quantity, moved_at)

-- TODO 1: CTEを使って在庫状態を4段階分類するクエリを書く
-- 在庫状態: 'over'(max超), 'normal'(適正), 'low'(reorder以下), 'out'(0以下)
-- (name, category, quantity, stock_status を出力)
WITH inventory_status AS (
  -- ここにCTEを書く
  SELECT 1 AS placeholder
)
SELECT * FROM inventory_status;

-- TODO 2: 直近30日の在庫移動から消費速度を計算し、発注提案を生成する
-- (name, daily_consumption, days_until_stockout, suggested_order_qty を出力)
WITH daily_consumption AS (
  -- ここにCTEを書く
  SELECT 1 AS placeholder
)
SELECT * FROM daily_consumption;`}
        />
      </div>

      {/* プロジェクト4: アクセスログ分析 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-red-900 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-full">上級</span>
          <h2 className="text-xl font-bold text-white">アクセスログ分析</h2>
        </div>
        <p className="text-gray-400 mb-4">日付関数・集計・パフォーマンスを意識して、Webサイトのアクセスログを分析するクエリを書きましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-5">
          <li>日付関数（<code className="text-purple-400 bg-gray-800 px-1 rounded">DATE_TRUNC</code>, <code className="text-purple-400 bg-gray-800 px-1 rounded">EXTRACT</code>）で時間帯・曜日別集計を行う</li>
          <li>セッション分析でページビューとユニーク訪問者を集計する</li>
          <li>直帰率・平均セッション時間・コンバージョン率を計算する</li>
          <li>インデックスを意識したクエリ最適化のコメントを追加する</li>
        </ul>
        <SqlEditor
          defaultCode={`-- アクセスログテーブル構成:
-- access_logs(id, session_id, user_id, page_url, accessed_at, response_time_ms)
-- sessions(id, user_id, started_at, ended_at, is_converted)
-- pages(id, url, title, category)

-- TODO 1: 時間帯別（0〜23時）のアクセス数と平均レスポンス時間を集計する
-- (hour, access_count, avg_response_ms を出力、時間順)
SELECT
  -- EXTRACT(HOUR FROM accessed_at) を使う
  -- ここにクエリを書く
  'アクセス時間帯' AS task;

-- TODO 2: ページカテゴリ別の直帰率を計算する
-- 直帰率 = セッション内アクセスが1ページのみのセッション数 / 総セッション数
-- (category, total_sessions, bounce_sessions, bounce_rate を出力)
WITH session_page_counts AS (
  -- ここにCTEを書く
  SELECT 1 AS placeholder
)
SELECT * FROM session_page_counts;

-- TODO 3: 週次のコンバージョン率推移を出力する
-- (week_start, total_sessions, converted_sessions, conversion_rate を出力)
SELECT
  -- DATE_TRUNC('week', started_at) を使う
  -- ここにクエリを書く
  'コンバージョン率' AS task;`}
        />
      </div>
    </div>
  );
}
