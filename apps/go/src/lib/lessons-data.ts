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

// === 1. Go基礎 ===
const basicsLessons: Lesson[] = [
  { id: "hello-world", title: "Hello World", description: "最初のGoプログラム", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "var・:=による変数宣言", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "基本的なデータ型", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "int・float64・complexなど", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列の基本", description: "stringの作成・操作", category: "basics", order: 5 },
  { id: "boolean", title: "真偽値", description: "bool型とtrue/false", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "constによる定数定義", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "明示的な型変換", category: "basics", order: 8 },
  { id: "zero-values", title: "ゼロ値", description: "各型のゼロ値の仕組み", category: "basics", order: 9 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子", category: "basics", order: 10 },
  { id: "fmt-package", title: "fmtパッケージ", description: "Printf・Sprintf等の出力", category: "basics", order: 11 },
  { id: "comments", title: "コメント", description: "単一行・複数行コメント", category: "basics", order: 12 },
];

// === 2. 制御構文 ===
const controlLessons: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件チェック", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値による多分岐", category: "control", order: 3 },
  { id: "switch-no-condition", title: "条件なしswitch", description: "ifチェーンの代替", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "Goの唯一のループ構文", category: "control", order: 5 },
  { id: "for-range", title: "for range", description: "スライス・マップの走査", category: "control", order: 6 },
  { id: "while-style", title: "whileスタイル", description: "forでwhileを表現", category: "control", order: 7 },
  { id: "infinite-loop", title: "無限ループ", description: "breakで制御", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループ制御", category: "control", order: 9 },
  { id: "labels", title: "ラベル", description: "ネストしたループの制御", category: "control", order: 10 },
];

// === 3. 関数 ===
const functionsLessons: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "funcキーワードで関数定義", category: "functions", order: 1 },
  { id: "parameters", title: "引数", description: "関数に値を渡す", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "単一・複数の戻り値", category: "functions", order: 3 },
  { id: "multiple-returns", title: "複数戻り値", description: "Goの特徴的な複数戻り値", category: "functions", order: 4 },
  { id: "named-returns", title: "名前付き戻り値", description: "戻り値に名前を付ける", category: "functions", order: 5 },
  { id: "variadic", title: "可変長引数", description: "...を使った可変長引数", category: "functions", order: 6 },
  { id: "closures", title: "クロージャ", description: "関数内関数と変数キャプチャ", category: "functions", order: 7 },
  { id: "defer", title: "defer", description: "関数終了時の処理", category: "functions", order: 8 },
];

// === 4. 構造体 ===
const structsLessons: Lesson[] = [
  { id: "basics", title: "構造体の基本", description: "typeとstructで定義", category: "structs", order: 1 },
  { id: "fields", title: "フィールド", description: "フィールドのアクセスと初期化", category: "structs", order: 2 },
  { id: "methods", title: "メソッド", description: "構造体にメソッドを定義", category: "structs", order: 3 },
  { id: "pointer-receivers", title: "ポインタレシーバ", description: "値レシーバとの違い", category: "structs", order: 4 },
  { id: "embedding", title: "埋め込み", description: "構造体の埋め込みによる再利用", category: "structs", order: 5 },
  { id: "tags", title: "タグ", description: "構造体タグの活用", category: "structs", order: 6 },
  { id: "constructor", title: "コンストラクタパターン", description: "New関数による初期化", category: "structs", order: 7 },
  { id: "comparison", title: "比較", description: "構造体の比較と等価性", category: "structs", order: 8 },
];

// === 5. インターフェース ===
const interfacesLessons: Lesson[] = [
  { id: "basics", title: "インターフェースの基本", description: "暗黙的な実装", category: "interfaces", order: 1 },
  { id: "methods", title: "メソッドセット", description: "インターフェースのメソッド定義", category: "interfaces", order: 2 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "インターフェースによる多態性", category: "interfaces", order: 3 },
  { id: "empty-interface", title: "空インターフェース", description: "interface{}とany", category: "interfaces", order: 4 },
  { id: "type-assertion", title: "型アサーション", description: "型の確認と変換", category: "interfaces", order: 5 },
  { id: "type-switch", title: "型switch", description: "複数の型をチェック", category: "interfaces", order: 6 },
  { id: "composition", title: "合成", description: "インターフェースの合成", category: "interfaces", order: 7 },
];

// === 6. ポインタ ===
const pointersLessons: Lesson[] = [
  { id: "basics", title: "ポインタの基本", description: "*と&の使い方", category: "pointers", order: 1 },
  { id: "dereferencing", title: "参照と間接参照", description: "ポインタの値を読み書き", category: "pointers", order: 2 },
  { id: "functions", title: "関数とポインタ", description: "ポインタ引数で値を変更", category: "pointers", order: 3 },
  { id: "structs", title: "構造体とポインタ", description: "構造体ポインタの操作", category: "pointers", order: 4 },
  { id: "nil", title: "nilポインタ", description: "nilの扱いと安全なアクセス", category: "pointers", order: 5 },
  { id: "new-make", title: "newとmake", description: "メモリ割り当ての違い", category: "pointers", order: 6 },
];

// === 7. 配列・スライス ===
const arraysLessons: Lesson[] = [
  { id: "arrays", title: "配列", description: "固定長配列の基本", category: "arrays", order: 1 },
  { id: "slices", title: "スライス", description: "可変長のスライス", category: "arrays", order: 2 },
  { id: "slice-operations", title: "スライス操作", description: "append・copy・部分スライス", category: "arrays", order: 3 },
  { id: "make-slice", title: "makeでスライス作成", description: "長さと容量の指定", category: "arrays", order: 4 },
  { id: "multidimensional", title: "多次元", description: "2次元スライス", category: "arrays", order: 5 },
  { id: "slice-internals", title: "スライスの内部構造", description: "ヘッダとバッキング配列", category: "arrays", order: 6 },
  { id: "sorting", title: "ソート", description: "sort.Sliceを使ったソート", category: "arrays", order: 7 },
  { id: "slice-tricks", title: "スライステクニック", description: "削除・挿入・フィルタ", category: "arrays", order: 8 },
];

// === 8. マップ ===
const mapsLessons: Lesson[] = [
  { id: "basics", title: "マップの基本", description: "キーと値のペア", category: "maps", order: 1 },
  { id: "operations", title: "操作", description: "追加・取得・削除", category: "maps", order: 2 },
  { id: "iteration", title: "走査", description: "for rangeでマップを走査", category: "maps", order: 3 },
  { id: "check-existence", title: "存在チェック", description: "ok idiomによる存在確認", category: "maps", order: 4 },
  { id: "nested", title: "ネストしたマップ", description: "マップの中のマップ", category: "maps", order: 5 },
  { id: "sync-map", title: "sync.Map", description: "並行安全なマップ", category: "maps", order: 6 },
];

// === 9. 文字列操作 ===
const stringsLessons: Lesson[] = [
  { id: "basics", title: "文字列の基礎", description: "イミュータブルなstring型", category: "strings", order: 1 },
  { id: "formatting", title: "フォーマット", description: "fmt.Sprintfによるフォーマット", category: "strings", order: 2 },
  { id: "strings-package", title: "stringsパッケージ", description: "Contains・Split・Join等", category: "strings", order: 3 },
  { id: "conversions", title: "変換", description: "文字列と数値の変換", category: "strings", order: 4 },
  { id: "runes", title: "ルーン", description: "Unicodeとrune型", category: "strings", order: 5 },
  { id: "builder", title: "strings.Builder", description: "効率的な文字列結合", category: "strings", order: 6 },
];

// === 10. エラー処理 ===
const errorsLessons: Lesson[] = [
  { id: "basics", title: "エラーの基本", description: "errorインターフェース", category: "errors", order: 1 },
  { id: "handling", title: "エラー処理", description: "if err != nilパターン", category: "errors", order: 2 },
  { id: "custom", title: "カスタムエラー", description: "独自のエラー型定義", category: "errors", order: 3 },
  { id: "wrapping", title: "エラーラッピング", description: "fmt.Errorfと%w", category: "errors", order: 4 },
  { id: "errors-is-as", title: "errors.Is・As", description: "エラーの判定と型変換", category: "errors", order: 5 },
  { id: "panic-recover", title: "panic・recover", description: "パニックと回復", category: "errors", order: 6 },
  { id: "sentinel", title: "センチネルエラー", description: "定義済みエラー変数", category: "errors", order: 7 },
];

// === 11. ゴルーチン ===
const goroutinesLessons: Lesson[] = [
  { id: "basics", title: "ゴルーチンの基本", description: "goキーワードで並行実行", category: "goroutines", order: 1 },
  { id: "waitgroup", title: "WaitGroup", description: "ゴルーチンの完了を待つ", category: "goroutines", order: 2 },
  { id: "mutex", title: "Mutex", description: "排他制御で競合を防ぐ", category: "goroutines", order: 3 },
  { id: "rwmutex", title: "RWMutex", description: "読み書きロック", category: "goroutines", order: 4 },
  { id: "atomic", title: "atomic", description: "アトミック操作", category: "goroutines", order: 5 },
  { id: "race-detection", title: "競合検出", description: "go race detectorの使い方", category: "goroutines", order: 6 },
];

// === 12. チャネル ===
const channelsLessons: Lesson[] = [
  { id: "basics", title: "チャネルの基本", description: "チャネルの作成と送受信", category: "channels", order: 1 },
  { id: "buffered", title: "バッファ付きチャネル", description: "容量指定のチャネル", category: "channels", order: 2 },
  { id: "direction", title: "方向付きチャネル", description: "送信専用・受信専用", category: "channels", order: 3 },
  { id: "select", title: "select文", description: "複数チャネルの待機", category: "channels", order: 4 },
  { id: "timeout", title: "タイムアウト", description: "time.Afterでタイムアウト", category: "channels", order: 5 },
  { id: "close-range", title: "close・range", description: "チャネルのクローズとrange", category: "channels", order: 6 },
  { id: "patterns", title: "チャネルパターン", description: "fan-out・fan-in・pipeline", category: "channels", order: 7 },
];

// === 13. パッケージ・モジュール ===
const packagesLessons: Lesson[] = [
  { id: "basics", title: "パッケージの基本", description: "パッケージの概念とimport", category: "packages", order: 1 },
  { id: "modules", title: "モジュール", description: "go.modとモジュール管理", category: "packages", order: 2 },
  { id: "visibility", title: "可視性", description: "大文字・小文字のエクスポートルール", category: "packages", order: 3 },
  { id: "init", title: "init関数", description: "パッケージの初期化", category: "packages", order: 4 },
  { id: "internal", title: "internalパッケージ", description: "内部パッケージの制限", category: "packages", order: 5 },
  { id: "workspace", title: "ワークスペース", description: "go.workによるマルチモジュール", category: "packages", order: 6 },
];

// === 14. ファイルI/O ===
const ioLessons: Lesson[] = [
  { id: "read-file", title: "ファイル読み込み", description: "os.ReadFileとos.Open", category: "io", order: 1 },
  { id: "write-file", title: "ファイル書き込み", description: "os.WriteFileとos.Create", category: "io", order: 2 },
  { id: "bufio", title: "bufio", description: "バッファ付きI/O", category: "io", order: 3 },
  { id: "filepath", title: "filepath", description: "パス操作ユーティリティ", category: "io", order: 4 },
  { id: "json-file", title: "JSONファイル", description: "JSONの読み書き", category: "io", order: 5 },
  { id: "embed", title: "embed", description: "ファイル埋め込み", category: "io", order: 6 },
];

// === 15. テスト ===
const testingLessons: Lesson[] = [
  { id: "basics", title: "テストの基本", description: "testing.Tでテスト作成", category: "testing", order: 1 },
  { id: "table-driven", title: "テーブル駆動テスト", description: "テストケースのテーブル化", category: "testing", order: 2 },
  { id: "subtests", title: "サブテスト", description: "t.Runでサブテスト", category: "testing", order: 3 },
  { id: "benchmark", title: "ベンチマーク", description: "testing.Bで性能測定", category: "testing", order: 4 },
  { id: "testmain", title: "TestMain", description: "テストのセットアップ・クリーンアップ", category: "testing", order: 5 },
  { id: "coverage", title: "カバレッジ", description: "テストカバレッジの計測", category: "testing", order: 6 },
  { id: "fuzzing", title: "ファジング", description: "Go 1.18のファジングテスト", category: "testing", order: 7 },
];

// === 16. HTTP・Web ===
const httpLessons: Lesson[] = [
  { id: "server", title: "HTTPサーバー", description: "net/httpで簡単なサーバー", category: "http", order: 1 },
  { id: "handlers", title: "ハンドラ", description: "HandlerFuncの使い方", category: "http", order: 2 },
  { id: "mux", title: "マルチプレクサ", description: "http.ServeMuxでルーティング", category: "http", order: 3 },
  { id: "middleware", title: "ミドルウェア", description: "ミドルウェアパターン", category: "http", order: 4 },
  { id: "client", title: "HTTPクライアント", description: "http.Getとhttp.Post", category: "http", order: 5 },
  { id: "json-api", title: "JSON API", description: "JSONレスポンスの返却", category: "http", order: 6 },
  { id: "templates", title: "テンプレート", description: "html/templateでHTML生成", category: "http", order: 7 },
  { id: "rest-patterns", title: "RESTパターン", description: "REST APIの設計", category: "http", order: 8 },
];

// === 17. JSON処理 ===
const jsonLessons: Lesson[] = [
  { id: "marshal", title: "マーシャル", description: "構造体からJSONへ変換", category: "json", order: 1 },
  { id: "unmarshal", title: "アンマーシャル", description: "JSONから構造体へ変換", category: "json", order: 2 },
  { id: "tags", title: "JSONタグ", description: "構造体タグでフィールド名制御", category: "json", order: 3 },
  { id: "streaming", title: "ストリーミング", description: "Encoder・Decoderで大量データ処理", category: "json", order: 4 },
  { id: "custom", title: "カスタム処理", description: "MarshalJSON・UnmarshalJSONの実装", category: "json", order: 5 },
];

// === 18. ジェネリクス ===
const genericsLessons: Lesson[] = [
  { id: "basics", title: "ジェネリクスの基本", description: "型パラメータの導入", category: "generics", order: 1 },
  { id: "constraints", title: "制約", description: "型制約の定義", category: "generics", order: 2 },
  { id: "functions", title: "ジェネリック関数", description: "型パラメータ付き関数", category: "generics", order: 3 },
  { id: "types", title: "ジェネリック型", description: "型パラメータ付き構造体", category: "generics", order: 4 },
  { id: "comparable", title: "comparable制約", description: "比較可能型の制約", category: "generics", order: 5 },
  { id: "slices-maps", title: "slices・mapsパッケージ", description: "標準ライブラリのジェネリック関数", category: "generics", order: 6 },
];

// === 19. コンテキスト ===
const contextLessons: Lesson[] = [
  { id: "basics", title: "コンテキストの基本", description: "context.Background・TODO", category: "context", order: 1 },
  { id: "cancel", title: "キャンセル", description: "WithCancelによるキャンセル伝播", category: "context", order: 2 },
  { id: "timeout", title: "タイムアウト", description: "WithTimeout・WithDeadline", category: "context", order: 3 },
  { id: "values", title: "値の伝搬", description: "WithValueでリクエストスコープの値", category: "context", order: 4 },
  { id: "best-practices", title: "ベストプラクティス", description: "コンテキストの正しい使い方", category: "context", order: 5 },
];

// === 20. データベース ===
const databaseLessons: Lesson[] = [
  { id: "sql-basics", title: "database/sqlの基本", description: "接続とクエリ実行", category: "database", order: 1 },
  { id: "queries", title: "クエリ", description: "SELECT・INSERT・UPDATE・DELETE", category: "database", order: 2 },
  { id: "prepared", title: "プリペアドステートメント", description: "安全なクエリ実行", category: "database", order: 3 },
  { id: "transactions", title: "トランザクション", description: "Tx.Begin・Commit・Rollback", category: "database", order: 4 },
  { id: "scanning", title: "スキャン", description: "行データの読み取り", category: "database", order: 5 },
  { id: "sqlx", title: "sqlxの紹介", description: "拡張ライブラリの活用", category: "database", order: 6 },
];

// === 21. CLIアプリ ===
const cliLessons: Lesson[] = [
  { id: "flag", title: "flagパッケージ", description: "コマンドラインフラグの解析", category: "cli", order: 1 },
  { id: "os-args", title: "os.Args", description: "引数の直接取得", category: "cli", order: 2 },
  { id: "cobra", title: "Cobraの紹介", description: "CLIフレームワーク", category: "cli", order: 3 },
  { id: "stdin-stdout", title: "標準入出力", description: "os.StdinとbufioでCLI操作", category: "cli", order: 4 },
  { id: "exit", title: "終了コード", description: "os.Exitとエラー時の終了", category: "cli", order: 5 },
];

// === 22. 並行パターン ===
const concurrencyLessons: Lesson[] = [
  { id: "worker-pool", title: "ワーカープール", description: "ゴルーチンプール", category: "concurrency", order: 1 },
  { id: "fan-out-in", title: "fan-out/fan-in", description: "並行分散と集約", category: "concurrency", order: 2 },
  { id: "pipeline", title: "パイプライン", description: "チャネルによるパイプライン", category: "concurrency", order: 3 },
  { id: "rate-limiting", title: "レートリミット", description: "time.Tickerで制御", category: "concurrency", order: 4 },
  { id: "errgroup", title: "errgroup", description: "golang.org/x/sync/errgroup", category: "concurrency", order: 5 },
  { id: "semaphore", title: "セマフォ", description: "チャネルでセマフォ実装", category: "concurrency", order: 6 },
];

// === 23. 設計パターン ===
const designLessons: Lesson[] = [
  { id: "singleton", title: "シングルトン", description: "sync.Onceによる単一インスタンス", category: "design", order: 1 },
  { id: "factory", title: "ファクトリ", description: "インターフェースとコンストラクタ", category: "design", order: 2 },
  { id: "observer", title: "オブザーバー", description: "チャネルによるイベント通知", category: "design", order: 3 },
  { id: "strategy", title: "ストラテジー", description: "インターフェースによる戦略切り替え", category: "design", order: 4 },
  { id: "decorator", title: "デコレータ", description: "関数ラッピングによる機能拡張", category: "design", order: 5 },
  { id: "repository", title: "リポジトリ", description: "データアクセスの抽象化", category: "design", order: 6 },
];

// === 24. アルゴリズム ===
const algorithmsLessons: Lesson[] = [
  { id: "sorting", title: "ソートアルゴリズム", description: "バブル・クイック・マージ", category: "algorithms", order: 1 },
  { id: "searching", title: "探索アルゴリズム", description: "線形探索・二分探索", category: "algorithms", order: 2 },
  { id: "recursion", title: "再帰", description: "再帰関数の設計", category: "algorithms", order: 3 },
  { id: "stack-queue", title: "スタック・キュー", description: "基本データ構造", category: "algorithms", order: 4 },
  { id: "linked-list", title: "連結リスト", description: "ポインタによるリスト構造", category: "algorithms", order: 5 },
  { id: "hash-table", title: "ハッシュテーブル", description: "mapの内部と自作実装", category: "algorithms", order: 6 },
];

// === 25. Goエコシステム ===
const ecosystemLessons: Lesson[] = [
  { id: "go-tools", title: "Goツール", description: "go build・run・vet・fmt", category: "ecosystem", order: 1 },
  { id: "linting", title: "リンター", description: "golangci-lintの活用", category: "ecosystem", order: 2 },
  { id: "docker", title: "Docker", description: "GoアプリのDockerイメージ", category: "ecosystem", order: 3 },
  { id: "ci-cd", title: "CI/CD", description: "GitHub Actionsでのテスト・ビルド", category: "ecosystem", order: 4 },
  { id: "community", title: "コミュニティ", description: "Goのバージョン管理と情報源", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "Go基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: basicsLessons },
  { id: "control", name: "制御構文", path: "/learn/control", color: "cyan", difficulty: "beginner", lessons: controlLessons },
  { id: "functions", name: "関数", path: "/learn/functions", color: "teal", difficulty: "beginner", lessons: functionsLessons },
  { id: "structs", name: "構造体", path: "/learn/structs", color: "indigo", difficulty: "intermediate", lessons: structsLessons },
  { id: "interfaces", name: "インターフェース", path: "/learn/interfaces", color: "violet", difficulty: "intermediate", lessons: interfacesLessons },
  { id: "pointers", name: "ポインタ", path: "/learn/pointers", color: "pink", difficulty: "intermediate", lessons: pointersLessons },
  { id: "arrays", name: "配列・スライス", path: "/learn/arrays", color: "green", difficulty: "beginner", lessons: arraysLessons },
  { id: "maps", name: "マップ", path: "/learn/maps", color: "red", difficulty: "beginner", lessons: mapsLessons },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "purple", difficulty: "beginner", lessons: stringsLessons },
  { id: "errors", name: "エラー処理", path: "/learn/errors", color: "orange", difficulty: "intermediate", lessons: errorsLessons },
  { id: "goroutines", name: "ゴルーチン", path: "/learn/goroutines", color: "cyan", difficulty: "intermediate", lessons: goroutinesLessons },
  { id: "channels", name: "チャネル", path: "/learn/channels", color: "teal", difficulty: "intermediate", lessons: channelsLessons },
  { id: "packages", name: "パッケージ・モジュール", path: "/learn/packages", color: "green", difficulty: "beginner", lessons: packagesLessons },
  { id: "io", name: "ファイルI/O", path: "/learn/io", color: "blue", difficulty: "intermediate", lessons: ioLessons },
  { id: "testing", name: "テスト", path: "/learn/testing", color: "indigo", difficulty: "intermediate", lessons: testingLessons },
  { id: "http", name: "HTTP・Web", path: "/learn/http", color: "violet", difficulty: "intermediate", lessons: httpLessons },
  { id: "json", name: "JSON処理", path: "/learn/json", color: "pink", difficulty: "intermediate", lessons: jsonLessons },
  { id: "generics", name: "ジェネリクス", path: "/learn/generics", color: "red", difficulty: "advanced", lessons: genericsLessons },
  { id: "context", name: "コンテキスト", path: "/learn/context", color: "orange", difficulty: "advanced", lessons: contextLessons },
  { id: "database", name: "データベース", path: "/learn/database", color: "cyan", difficulty: "advanced", lessons: databaseLessons },
  { id: "cli", name: "CLIアプリ", path: "/learn/cli", color: "teal", difficulty: "intermediate", lessons: cliLessons },
  { id: "concurrency", name: "並行パターン", path: "/learn/concurrency", color: "purple", difficulty: "advanced", lessons: concurrencyLessons },
  { id: "design", name: "設計パターン", path: "/learn/design", color: "violet", difficulty: "advanced", lessons: designLessons },
  { id: "algorithms", name: "アルゴリズム", path: "/learn/algorithms", color: "indigo", difficulty: "advanced", lessons: algorithmsLessons },
  { id: "ecosystem", name: "Goエコシステム", path: "/learn/ecosystem", color: "green", difficulty: "advanced", lessons: ecosystemLessons },
];

export function getAllLessons(categoryId: string): Lesson[] {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.lessons : [];
}

export function getDifficultyLabel(d: Difficulty): string {
  return d === "beginner" ? "初級" : d === "intermediate" ? "中級" : "上級";
}
