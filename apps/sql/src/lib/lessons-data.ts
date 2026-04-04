export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  path: string;
  color: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

const basicsLessons: Lesson[] = [
  { id: "select", title: "SELECT文", description: "データを取得する基本構文", category: "basics", order: 1 },
  { id: "from", title: "FROM句", description: "テーブルの指定方法", category: "basics", order: 2 },
  { id: "where", title: "WHERE句", description: "条件を指定してデータを絞り込む", category: "basics", order: 3 },
  { id: "and-or", title: "AND・OR演算子", description: "複数条件の組み合わせ", category: "basics", order: 4 },
  { id: "distinct", title: "DISTINCT", description: "重複行を除外して取得", category: "basics", order: 5 },
  { id: "limit", title: "LIMIT・OFFSET", description: "取得件数と開始位置の制御", category: "basics", order: 6 },
  { id: "aliases", title: "エイリアス", description: "AS句によるカラム・テーブル別名", category: "basics", order: 7 },
  { id: "comments", title: "コメント", description: "--と/* */によるコメント記法", category: "basics", order: 8 },
];

const filteringLessons: Lesson[] = [
  { id: "comparison", title: "比較演算子", description: "=・<>・<・>・<=・>=の使い方", category: "filtering", order: 1 },
  { id: "like", title: "LIKE演算子", description: "%と_によるパターンマッチ", category: "filtering", order: 2 },
  { id: "in", title: "IN演算子", description: "値リストによるフィルタリング", category: "filtering", order: 3 },
  { id: "between", title: "BETWEEN演算子", description: "範囲指定による絞り込み", category: "filtering", order: 4 },
  { id: "is-null", title: "IS NULL・IS NOT NULL", description: "NULL値の判定方法", category: "filtering", order: 5 },
  { id: "not", title: "NOT演算子", description: "条件の否定", category: "filtering", order: 6 },
  { id: "multiple-conditions", title: "複合条件", description: "括弧と演算子の優先順位", category: "filtering", order: 7 },
];

const sortingLessons: Lesson[] = [
  { id: "order-by", title: "ORDER BY", description: "結果の並び替え基本", category: "sorting", order: 1 },
  { id: "asc-desc", title: "ASC・DESC", description: "昇順・降順の指定", category: "sorting", order: 2 },
  { id: "multiple-sort", title: "複数カラムソート", description: "優先順位付きの並び替え", category: "sorting", order: 3 },
  { id: "limit-offset", title: "ページネーション", description: "LIMIT+OFFSETでページ分割", category: "sorting", order: 4 },
  { id: "top-n", title: "上位N件取得", description: "ランキング・Top-Nクエリ", category: "sorting", order: 5 },
  { id: "null-sorting", title: "NULLのソート", description: "NULLS FIRST/LASTの制御", category: "sorting", order: 6 },
];

const aggregationLessons: Lesson[] = [
  { id: "count", title: "COUNT関数", description: "行数のカウント", category: "aggregation", order: 1 },
  { id: "sum-avg", title: "SUM・AVG関数", description: "合計と平均の計算", category: "aggregation", order: 2 },
  { id: "min-max", title: "MIN・MAX関数", description: "最小値と最大値の取得", category: "aggregation", order: 3 },
  { id: "group-by", title: "GROUP BY", description: "グループごとの集約", category: "aggregation", order: 4 },
  { id: "having", title: "HAVING句", description: "グループへの条件指定", category: "aggregation", order: 5 },
  { id: "distinct-agg", title: "DISTINCT集約", description: "重複排除した集約関数", category: "aggregation", order: 6 },
  { id: "nested-agg", title: "集約のネスト", description: "集約関数の組み合わせパターン", category: "aggregation", order: 7 },
];

const joinsLessons: Lesson[] = [
  { id: "inner-join", title: "INNER JOIN", description: "内部結合の基本", category: "joins", order: 1 },
  { id: "left-join", title: "LEFT JOIN", description: "左外部結合", category: "joins", order: 2 },
  { id: "right-join", title: "RIGHT JOIN", description: "右外部結合", category: "joins", order: 3 },
  { id: "full-join", title: "FULL OUTER JOIN", description: "完全外部結合", category: "joins", order: 4 },
  { id: "cross-join", title: "CROSS JOIN", description: "直積結合", category: "joins", order: 5 },
  { id: "self-join", title: "自己結合", description: "同じテーブルを結合する", category: "joins", order: 6 },
  { id: "multiple-joins", title: "複数テーブル結合", description: "3つ以上のテーブルを結合", category: "joins", order: 7 },
  { id: "join-conditions", title: "結合条件の応用", description: "ON句の複雑な条件指定", category: "joins", order: 8 },
];

const subqueriesLessons: Lesson[] = [
  { id: "scalar", title: "スカラーサブクエリ", description: "単一値を返すサブクエリ", category: "subqueries", order: 1 },
  { id: "inline-view", title: "インラインビュー", description: "FROM句でのサブクエリ", category: "subqueries", order: 2 },
  { id: "in-subquery", title: "INサブクエリ", description: "WHERE IN (SELECT ...)", category: "subqueries", order: 3 },
  { id: "exists", title: "EXISTS", description: "存在チェックサブクエリ", category: "subqueries", order: 4 },
  { id: "correlated", title: "相関サブクエリ", description: "外部クエリを参照するサブクエリ", category: "subqueries", order: 5 },
  { id: "any-all", title: "ANY・ALL", description: "比較演算子とサブクエリの組み合わせ", category: "subqueries", order: 6 },
  { id: "subquery-comparison", title: "サブクエリ vs JOIN", description: "サブクエリとJOINの使い分け", category: "subqueries", order: 7 },
];

const insertLessons: Lesson[] = [
  { id: "basics", title: "INSERT基本", description: "INSERT INTO文の基本構文", category: "insert", order: 1 },
  { id: "multiple-rows", title: "複数行挿入", description: "VALUES句で複数行を一括挿入", category: "insert", order: 2 },
  { id: "insert-select", title: "INSERT SELECT", description: "SELECT結果をテーブルに挿入", category: "insert", order: 3 },
  { id: "default-values", title: "デフォルト値", description: "DEFAULT句とデフォルト値の活用", category: "insert", order: 4 },
  { id: "returning", title: "RETURNING句", description: "挿入した行を返す", category: "insert", order: 5 },
  { id: "upsert", title: "UPSERT", description: "ON CONFLICT DO UPDATEによる更新挿入", category: "insert", order: 6 },
];

const updateLessons: Lesson[] = [
  { id: "basics", title: "UPDATE基本", description: "UPDATE SET文の基本構文", category: "update", order: 1 },
  { id: "where-update", title: "条件付き更新", description: "WHERE句で対象行を限定", category: "update", order: 2 },
  { id: "case-update", title: "CASE式更新", description: "条件分岐による値の更新", category: "update", order: 3 },
  { id: "join-update", title: "JOIN更新", description: "他テーブルを参照して更新", category: "update", order: 4 },
  { id: "subquery-update", title: "サブクエリ更新", description: "サブクエリの結果で更新", category: "update", order: 5 },
  { id: "batch-update", title: "バッチ更新", description: "大量データの効率的な更新", category: "update", order: 6 },
];

const deleteLessons: Lesson[] = [
  { id: "basics", title: "DELETE基本", description: "DELETE FROM文の基本構文", category: "delete", order: 1 },
  { id: "where-delete", title: "条件付き削除", description: "WHERE句で対象行を限定", category: "delete", order: 2 },
  { id: "join-delete", title: "JOIN削除", description: "他テーブルを参照して削除", category: "delete", order: 3 },
  { id: "truncate", title: "TRUNCATE", description: "テーブルの全行を高速削除", category: "delete", order: 4 },
  { id: "soft-delete", title: "論理削除", description: "フラグによる論理削除パターン", category: "delete", order: 5 },
];

const createTableLessons: Lesson[] = [
  { id: "basics", title: "CREATE TABLE基本", description: "テーブル作成の基本構文", category: "create-table", order: 1 },
  { id: "data-types", title: "データ型", description: "INTEGER・TEXT・REAL・BLOB等", category: "create-table", order: 2 },
  { id: "nullable", title: "NULL制約", description: "NULLとNOT NULLの設定", category: "create-table", order: 3 },
  { id: "default-values", title: "デフォルト値", description: "DEFAULT句の指定方法", category: "create-table", order: 4 },
  { id: "auto-increment", title: "自動採番", description: "AUTOINCREMENT・SERIAL", category: "create-table", order: 5 },
  { id: "temporary", title: "一時テーブル", description: "TEMPORARY TABLEの使い方", category: "create-table", order: 6 },
  { id: "create-as-select", title: "CREATE AS SELECT", description: "クエリ結果からテーブル作成", category: "create-table", order: 7 },
];

const constraintsLessons: Lesson[] = [
  { id: "primary-key", title: "主キー", description: "PRIMARY KEY制約の設定", category: "constraints", order: 1 },
  { id: "foreign-key", title: "外部キー", description: "FOREIGN KEY制約とリレーション", category: "constraints", order: 2 },
  { id: "unique", title: "UNIQUE制約", description: "一意性制約の設定", category: "constraints", order: 3 },
  { id: "not-null", title: "NOT NULL制約", description: "必須カラムの設定", category: "constraints", order: 4 },
  { id: "check", title: "CHECK制約", description: "値の範囲や条件の制限", category: "constraints", order: 5 },
  { id: "default", title: "DEFAULT制約", description: "デフォルト値の設定", category: "constraints", order: 6 },
  { id: "composite-keys", title: "複合キー", description: "複数カラムで構成するキー", category: "constraints", order: 7 },
];

const alterLessons: Lesson[] = [
  { id: "add-column", title: "カラム追加", description: "ALTER TABLE ADD COLUMN", category: "alter", order: 1 },
  { id: "modify-column", title: "カラム変更", description: "ALTER TABLE MODIFY/ALTER COLUMN", category: "alter", order: 2 },
  { id: "drop-column", title: "カラム削除", description: "ALTER TABLE DROP COLUMN", category: "alter", order: 3 },
  { id: "rename", title: "テーブル名変更", description: "ALTER TABLE RENAME", category: "alter", order: 4 },
  { id: "add-constraint", title: "制約追加", description: "既存テーブルに制約を追加", category: "alter", order: 5 },
  { id: "drop-constraint", title: "制約削除", description: "既存テーブルから制約を削除", category: "alter", order: 6 },
];

const indexesLessons: Lesson[] = [
  { id: "basics", title: "インデックス基本", description: "CREATE INDEXの基本構文", category: "indexes", order: 1 },
  { id: "unique-index", title: "ユニークインデックス", description: "一意性を保証するインデックス", category: "indexes", order: 2 },
  { id: "composite-index", title: "複合インデックス", description: "複数カラムのインデックス", category: "indexes", order: 3 },
  { id: "covering-index", title: "カバリングインデックス", description: "クエリを完全にカバーするインデックス", category: "indexes", order: 4 },
  { id: "index-strategy", title: "インデックス戦略", description: "効果的なインデックス設計", category: "indexes", order: 5 },
  { id: "analyze", title: "ANALYZE・統計情報", description: "テーブル統計の更新と活用", category: "indexes", order: 6 },
];

const viewsLessons: Lesson[] = [
  { id: "basics", title: "ビュー基本", description: "CREATE VIEWの基本構文", category: "views", order: 1 },
  { id: "create-view", title: "ビューの作成", description: "複雑なクエリをビューに保存", category: "views", order: 2 },
  { id: "updatable-views", title: "更新可能ビュー", description: "INSERT/UPDATE/DELETEが可能なビュー", category: "views", order: 3 },
  { id: "materialized", title: "マテリアライズドビュー", description: "結果を実体化するビュー", category: "views", order: 4 },
  { id: "with-check", title: "WITH CHECK OPTION", description: "ビュー条件の整合性チェック", category: "views", order: 5 },
  { id: "use-cases", title: "ビューの活用", description: "実務でのビュー活用パターン", category: "views", order: 6 },
];

const transactionsLessons: Lesson[] = [
  { id: "basics", title: "トランザクション基本", description: "BEGIN・COMMIT・ROLLBACKの基本", category: "transactions", order: 1 },
  { id: "commit-rollback", title: "COMMIT・ROLLBACK", description: "変更の確定と取り消し", category: "transactions", order: 2 },
  { id: "savepoint", title: "SAVEPOINT", description: "トランザクション内の中間地点", category: "transactions", order: 3 },
  { id: "isolation-levels", title: "分離レベル", description: "READ COMMITTED等の分離レベル", category: "transactions", order: 4 },
  { id: "deadlock", title: "デッドロック", description: "デッドロックの原因と回避策", category: "transactions", order: 5 },
  { id: "acid", title: "ACID特性", description: "原子性・一貫性・独立性・永続性", category: "transactions", order: 6 },
];

const functionsLessons: Lesson[] = [
  { id: "string-functions", title: "文字列関数", description: "LENGTH・UPPER・LOWER・SUBSTR等", category: "functions", order: 1 },
  { id: "numeric-functions", title: "数値関数", description: "ROUND・ABS・CEIL・FLOOR等", category: "functions", order: 2 },
  { id: "date-functions", title: "日付関数", description: "DATE・TIME・DATETIME・STRFTIME等", category: "functions", order: 3 },
  { id: "conversion", title: "型変換関数", description: "CAST・TYPEOF・変換パターン", category: "functions", order: 4 },
  { id: "coalesce-nullif", title: "COALESCE・NULLIF", description: "NULL処理関数の活用", category: "functions", order: 5 },
  { id: "case-expression", title: "CASE式", description: "条件分岐による値の変換", category: "functions", order: 6 },
  { id: "aggregate-review", title: "集約関数まとめ", description: "集約関数の応用パターン", category: "functions", order: 7 },
  { id: "json-functions", title: "JSON関数", description: "json_extract・json_array等のJSON操作", category: "functions", order: 8 },
];

const windowFunctionsLessons: Lesson[] = [
  { id: "row-number", title: "ROW_NUMBER", description: "行番号の付与", category: "window-functions", order: 1 },
  { id: "rank-dense-rank", title: "RANK・DENSE_RANK", description: "順位付け関数", category: "window-functions", order: 2 },
  { id: "ntile", title: "NTILE", description: "グループ分割関数", category: "window-functions", order: 3 },
  { id: "lag-lead", title: "LAG・LEAD", description: "前後の行を参照する関数", category: "window-functions", order: 4 },
  { id: "first-last", title: "FIRST_VALUE・LAST_VALUE", description: "ウィンドウ内の先頭・末尾の値", category: "window-functions", order: 5 },
  { id: "sum-over", title: "SUM() OVER", description: "累積合計・移動合計", category: "window-functions", order: 6 },
  { id: "partition-by", title: "PARTITION BY", description: "パーティション分割の応用", category: "window-functions", order: 7 },
  { id: "frame-clause", title: "フレーム句", description: "ROWS/RANGE BETWEENの使い方", category: "window-functions", order: 8 },
];

const cteLessons: Lesson[] = [
  { id: "basics", title: "CTE基本", description: "WITH句の基本構文", category: "cte", order: 1 },
  { id: "multiple-cte", title: "複数CTE", description: "WITH句で複数のCTEを定義", category: "cte", order: 2 },
  { id: "recursive-cte", title: "再帰CTE", description: "WITH RECURSIVEによる再帰クエリ", category: "cte", order: 3 },
  { id: "hierarchical", title: "階層データ", description: "再帰CTEで木構造を展開", category: "cte", order: 4 },
  { id: "cte-crud", title: "CTEと更新系", description: "CTEをINSERT/UPDATE/DELETEと組み合わせ", category: "cte", order: 5 },
  { id: "vs-subquery", title: "CTE vs サブクエリ", description: "CTEとサブクエリの使い分け", category: "cte", order: 6 },
];

const setOperationsLessons: Lesson[] = [
  { id: "union", title: "UNION", description: "重複排除した和集合", category: "set-operations", order: 1 },
  { id: "union-all", title: "UNION ALL", description: "重複を含む和集合", category: "set-operations", order: 2 },
  { id: "intersect", title: "INTERSECT", description: "積集合（共通部分）", category: "set-operations", order: 3 },
  { id: "except", title: "EXCEPT", description: "差集合（差分）", category: "set-operations", order: 4 },
  { id: "combined", title: "集合演算の組み合わせ", description: "複数の集合演算を組み合わせる", category: "set-operations", order: 5 },
];

const normalizationLessons: Lesson[] = [
  { id: "first-nf", title: "第1正規形", description: "繰り返しグループの排除", category: "normalization", order: 1 },
  { id: "second-nf", title: "第2正規形", description: "部分関数従属の排除", category: "normalization", order: 2 },
  { id: "third-nf", title: "第3正規形", description: "推移的関数従属の排除", category: "normalization", order: 3 },
  { id: "bcnf", title: "ボイスコッド正規形", description: "BCNFへの分解", category: "normalization", order: 4 },
  { id: "denormalization", title: "非正規化", description: "パフォーマンスのための非正規化", category: "normalization", order: 5 },
  { id: "design-practice", title: "設計演習", description: "正規化の実践トレーニング", category: "normalization", order: 6 },
];

const erDiagramLessons: Lesson[] = [
  { id: "entities", title: "エンティティ", description: "エンティティの識別と定義", category: "er-diagram", order: 1 },
  { id: "relationships", title: "リレーションシップ", description: "エンティティ間の関連", category: "er-diagram", order: 2 },
  { id: "cardinality", title: "カーディナリティ", description: "1対1・1対多・多対多の関係", category: "er-diagram", order: 3 },
  { id: "er-to-table", title: "ER図→テーブル変換", description: "ER図からDDLを生成する", category: "er-diagram", order: 4 },
  { id: "design-patterns", title: "設計パターン", description: "よく使うDB設計パターン", category: "er-diagram", order: 5 },
  { id: "case-study", title: "ケーススタディ", description: "ECサイトのDB設計を実践", category: "er-diagram", order: 6 },
];

const performanceLessons: Lesson[] = [
  { id: "explain", title: "EXPLAIN", description: "実行計画の読み方", category: "performance", order: 1 },
  { id: "query-optimization", title: "クエリ最適化", description: "効率的なクエリの書き方", category: "performance", order: 2 },
  { id: "index-tuning", title: "インデックスチューニング", description: "インデックスによる高速化", category: "performance", order: 3 },
  { id: "join-optimization", title: "JOIN最適化", description: "結合クエリのパフォーマンス改善", category: "performance", order: 4 },
  { id: "subquery-optimization", title: "サブクエリ最適化", description: "サブクエリの効率的な書き方", category: "performance", order: 5 },
  { id: "batch-processing", title: "バッチ処理", description: "大量データの効率的な処理", category: "performance", order: 6 },
  { id: "monitoring", title: "モニタリング", description: "スロークエリの検出と対策", category: "performance", order: 7 },
];

const securityLessons: Lesson[] = [
  { id: "grant-revoke", title: "GRANT・REVOKE", description: "権限の付与と取り消し", category: "security", order: 1 },
  { id: "roles", title: "ロール管理", description: "ロールベースのアクセス制御", category: "security", order: 2 },
  { id: "sql-injection", title: "SQLインジェクション", description: "攻撃の仕組みと脅威", category: "security", order: 3 },
  { id: "parameterized", title: "パラメータ化クエリ", description: "プリペアドステートメントの使い方", category: "security", order: 4 },
  { id: "row-level", title: "行レベルセキュリティ", description: "行単位のアクセス制御", category: "security", order: 5 },
  { id: "audit", title: "監査ログ", description: "データベース操作の記録と追跡", category: "security", order: 6 },
];

const storedProceduresLessons: Lesson[] = [
  { id: "basics", title: "ストアドプロシージャ基本", description: "CREATE PROCEDUREの基本構文", category: "stored-procedures", order: 1 },
  { id: "parameters", title: "パラメータ", description: "IN・OUT・INOUTパラメータ", category: "stored-procedures", order: 2 },
  { id: "variables", title: "変数と制御", description: "DECLARE・SET・変数の活用", category: "stored-procedures", order: 3 },
  { id: "control-flow", title: "制御構文", description: "IF・CASE・WHILE・LOOPの使い方", category: "stored-procedures", order: 4 },
  { id: "cursors", title: "カーソル", description: "行単位でのデータ処理", category: "stored-procedures", order: 5 },
  { id: "triggers", title: "トリガー", description: "BEFORE/AFTERトリガーの作成", category: "stored-procedures", order: 6 },
];

const practicalLessons: Lesson[] = [
  { id: "reporting", title: "レポートクエリ", description: "売上集計・月次レポートの作成", category: "practical", order: 1 },
  { id: "pivot", title: "ピボット", description: "行列変換（クロス集計）", category: "practical", order: 2 },
  { id: "ranking", title: "ランキング", description: "順位付けと上位N件抽出", category: "practical", order: 3 },
  { id: "gaps-islands", title: "ギャップ＆アイランド", description: "連続値の欠損と連続区間の検出", category: "practical", order: 4 },
  { id: "running-totals", title: "累計・移動平均", description: "時系列データの集計パターン", category: "practical", order: 5 },
  { id: "data-cleaning", title: "データクレンジング", description: "不整合データの検出と修正", category: "practical", order: 6 },
];

export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "SQL基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: basicsLessons },
  { id: "filtering", name: "データの絞り込み", path: "/learn/filtering", color: "cyan", difficulty: "beginner", lessons: filteringLessons },
  { id: "sorting", name: "ソートと制限", path: "/learn/sorting", color: "teal", difficulty: "beginner", lessons: sortingLessons },
  { id: "aggregation", name: "集約関数", path: "/learn/aggregation", color: "green", difficulty: "beginner", lessons: aggregationLessons },
  { id: "joins", name: "テーブル結合", path: "/learn/joins", color: "purple", difficulty: "beginner", lessons: joinsLessons },
  { id: "subqueries", name: "サブクエリ", path: "/learn/subqueries", color: "violet", difficulty: "intermediate", lessons: subqueriesLessons },
  { id: "insert", name: "データ挿入", path: "/learn/insert", color: "orange", difficulty: "beginner", lessons: insertLessons },
  { id: "update", name: "データ更新", path: "/learn/update", color: "yellow", difficulty: "beginner", lessons: updateLessons },
  { id: "delete", name: "データ削除", path: "/learn/delete", color: "red", difficulty: "beginner", lessons: deleteLessons },
  { id: "create-table", name: "テーブル作成", path: "/learn/create-table", color: "indigo", difficulty: "intermediate", lessons: createTableLessons },
  { id: "constraints", name: "制約", path: "/learn/constraints", color: "pink", difficulty: "intermediate", lessons: constraintsLessons },
  { id: "alter", name: "テーブル変更", path: "/learn/alter", color: "orange", difficulty: "intermediate", lessons: alterLessons },
  { id: "indexes", name: "インデックス", path: "/learn/indexes", color: "teal", difficulty: "intermediate", lessons: indexesLessons },
  { id: "views", name: "ビュー", path: "/learn/views", color: "cyan", difficulty: "intermediate", lessons: viewsLessons },
  { id: "transactions", name: "トランザクション", path: "/learn/transactions", color: "blue", difficulty: "intermediate", lessons: transactionsLessons },
  { id: "functions", name: "SQL関数", path: "/learn/functions", color: "green", difficulty: "intermediate", lessons: functionsLessons },
  { id: "window-functions", name: "ウィンドウ関数", path: "/learn/window-functions", color: "purple", difficulty: "advanced", lessons: windowFunctionsLessons },
  { id: "cte", name: "共通テーブル式", path: "/learn/cte", color: "violet", difficulty: "advanced", lessons: cteLessons },
  { id: "set-operations", name: "集合演算", path: "/learn/set-operations", color: "indigo", difficulty: "intermediate", lessons: setOperationsLessons },
  { id: "normalization", name: "正規化", path: "/learn/normalization", color: "pink", difficulty: "advanced", lessons: normalizationLessons },
  { id: "er-diagram", name: "ER設計", path: "/learn/er-diagram", color: "red", difficulty: "advanced", lessons: erDiagramLessons },
  { id: "performance", name: "パフォーマンス", path: "/learn/performance", color: "orange", difficulty: "advanced", lessons: performanceLessons },
  { id: "security", name: "セキュリティ", path: "/learn/security", color: "yellow", difficulty: "advanced", lessons: securityLessons },
  { id: "stored-procedures", name: "ストアドプロシージャ", path: "/learn/stored-procedures", color: "teal", difficulty: "advanced", lessons: storedProceduresLessons },
  { id: "practical", name: "実践SQL", path: "/learn/practical", color: "blue", difficulty: "advanced", lessons: practicalLessons },
];

export function getAllLessons(): Lesson[] {
  return CATEGORIES.flatMap((category) => category.lessons);
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner":
      return "初級";
    case "intermediate":
      return "中級";
    case "advanced":
      return "上級";
  }
}
