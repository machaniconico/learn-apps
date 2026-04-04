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
  { id: "hello-world", title: "Hello World", description: "最初のRubyプログラム", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "ローカル変数・グローバル変数", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "基本的なデータ型", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "Integer・Float・Rational", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列の基本", description: "Stringの作成・操作", category: "basics", order: 5 },
  { id: "boolean", title: "真偽値", description: "true・false・nil", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "定数の定義と命名規則", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "to_i・to_f・to_s", category: "basics", order: 8 },
  { id: "nil-basics", title: "nilの基本", description: "nilの扱いと判定", category: "basics", order: 9 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子", category: "basics", order: 10 },
  { id: "puts-print", title: "出力メソッド", description: "puts・print・p・ppの違い", category: "basics", order: 11 },
  { id: "comments", title: "コメント", description: "単一行・複数行コメント", category: "basics", order: 12 },
];

const controlLessons: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本", category: "control", order: 1 },
  { id: "elsif", title: "elsif", description: "複数条件チェック", category: "control", order: 2 },
  { id: "unless", title: "unless文", description: "否定条件分岐", category: "control", order: 3 },
  { id: "case-when", title: "case-when文", description: "パターンマッチ的分岐", category: "control", order: 4 },
  { id: "while-loop", title: "whileループ", description: "条件付きループ", category: "control", order: 5 },
  { id: "until-loop", title: "untilループ", description: "否定条件ループ", category: "control", order: 6 },
  { id: "for-each", title: "for・eachループ", description: "コレクションの走査", category: "control", order: 7 },
  { id: "times-upto", title: "times・upto・downto", description: "回数指定ループ", category: "control", order: 8 },
  { id: "break-next", title: "break・next", description: "ループ制御", category: "control", order: 9 },
  { id: "ternary", title: "三項演算子", description: "条件式の短縮記法", category: "control", order: 10 },
];

const methodsLessons: Lesson[] = [
  { id: "basics", title: "メソッドの基本", description: "defキーワードでメソッド定義", category: "methods", order: 1 },
  { id: "parameters", title: "引数", description: "メソッドに値を渡す", category: "methods", order: 2 },
  { id: "return-values", title: "戻り値", description: "暗黙的・明示的な戻り値", category: "methods", order: 3 },
  { id: "default-args", title: "デフォルト引数", description: "引数の初期値設定", category: "methods", order: 4 },
  { id: "keyword-args", title: "キーワード引数", description: "名前付き引数", category: "methods", order: 5 },
  { id: "variadic", title: "可変長引数", description: "*argsによる可変長引数", category: "methods", order: 6 },
  { id: "method-types", title: "メソッドの種類", description: "インスタンス・クラス・特異メソッド", category: "methods", order: 7 },
  { id: "block-methods", title: "ブロック付きメソッド", description: "yieldとブロック引数", category: "methods", order: 8 },
];

const arraysLessons: Lesson[] = [
  { id: "basics", title: "配列の基本", description: "配列の作成とアクセス", category: "arrays", order: 1 },
  { id: "operations", title: "要素操作", description: "追加・削除・更新", category: "arrays", order: 2 },
  { id: "iteration", title: "イテレーション", description: "each・map・select", category: "arrays", order: 3 },
  { id: "sorting", title: "ソート", description: "sort・sort_by", category: "arrays", order: 4 },
  { id: "transformations", title: "変換メソッド", description: "map・flatten・compact", category: "arrays", order: 5 },
  { id: "multidimensional", title: "多次元配列", description: "配列の中の配列", category: "arrays", order: 6 },
  { id: "array-methods", title: "便利なメソッド", description: "zip・product・combination", category: "arrays", order: 7 },
];

const hashesLessons: Lesson[] = [
  { id: "basics", title: "ハッシュの基本", description: "キーと値のペア", category: "hashes", order: 1 },
  { id: "operations", title: "操作", description: "追加・取得・削除", category: "hashes", order: 2 },
  { id: "iteration", title: "走査", description: "each・map・select", category: "hashes", order: 3 },
  { id: "symbol-keys", title: "シンボルキー", description: "シンボルをキーに使う", category: "hashes", order: 4 },
  { id: "nested", title: "ネストしたハッシュ", description: "ハッシュの中のハッシュ", category: "hashes", order: 5 },
  { id: "default-values", title: "デフォルト値", description: "Hash.newとdefault", category: "hashes", order: 6 },
];

const stringsLessons: Lesson[] = [
  { id: "basics", title: "文字列の基礎", description: "ミュータブルなString", category: "strings", order: 1 },
  { id: "formatting", title: "フォーマット", description: "式展開とformat", category: "strings", order: 2 },
  { id: "methods-overview", title: "文字列メソッド", description: "split・join・gsub等", category: "strings", order: 3 },
  { id: "encoding", title: "エンコーディング", description: "文字エンコーディングの扱い", category: "strings", order: 4 },
  { id: "heredoc", title: "ヒアドキュメント", description: "複数行文字列の記述", category: "strings", order: 5 },
  { id: "frozen", title: "freeze・frozen?", description: "イミュータブル文字列", category: "strings", order: 6 },
];

const symbolsLessons: Lesson[] = [
  { id: "basics", title: "シンボルの基本", description: "コロン付きの識別子", category: "symbols", order: 1 },
  { id: "vs-strings", title: "シンボルと文字列の違い", description: "使い分けとパフォーマンス", category: "symbols", order: 2 },
  { id: "usage", title: "よくある使い方", description: "ハッシュキー・メソッド名", category: "symbols", order: 3 },
  { id: "to-proc", title: "Symbol#to_proc", description: "&:メソッド名パターン", category: "symbols", order: 4 },
  { id: "frozen-symbols", title: "Frozen String Literal", description: "マジックコメントとの関係", category: "symbols", order: 5 },
];

const blocksLessons: Lesson[] = [
  { id: "basics", title: "ブロックの基本", description: "do...end と {}", category: "blocks", order: 1 },
  { id: "yield-basics", title: "yield", description: "ブロックの呼び出し", category: "blocks", order: 2 },
  { id: "proc-basics", title: "Procの基本", description: "Proc.newとproc", category: "blocks", order: 3 },
  { id: "lambda-basics", title: "Lambdaの基本", description: "->記法とlambda", category: "blocks", order: 4 },
  { id: "proc-vs-lambda", title: "ProcとLambdaの違い", description: "引数チェックとreturn", category: "blocks", order: 5 },
  { id: "closures", title: "クロージャ", description: "変数のキャプチャ", category: "blocks", order: 6 },
  { id: "method-objects", title: "Methodオブジェクト", description: "method・unbound_method", category: "blocks", order: 7 },
];

const classesLessons: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードで定義", category: "classes", order: 1 },
  { id: "instance-variables", title: "インスタンス変数", description: "@変数の使い方", category: "classes", order: 2 },
  { id: "accessors", title: "アクセサ", description: "attr_reader・writer・accessor", category: "classes", order: 3 },
  { id: "initialize", title: "コンストラクタ", description: "initializeメソッド", category: "classes", order: 4 },
  { id: "class-methods", title: "クラスメソッド", description: "self.メソッド名", category: "classes", order: 5 },
  { id: "self-keyword", title: "self", description: "selfの参照先", category: "classes", order: 6 },
  { id: "comparison", title: "オブジェクトの比較", description: "==・eql?・equal?", category: "classes", order: 7 },
  { id: "cloning", title: "オブジェクトの複製", description: "dup・clone・freeze", category: "classes", order: 8 },
];

const inheritanceLessons: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "<で親クラスを指定", category: "inheritance", order: 1 },
  { id: "super-keyword", title: "super", description: "親クラスメソッドの呼び出し", category: "inheritance", order: 2 },
  { id: "overriding", title: "メソッドオーバーライド", description: "親メソッドの上書き", category: "inheritance", order: 3 },
  { id: "abstract-pattern", title: "抽象クラスパターン", description: "NotImplementedError", category: "inheritance", order: 4 },
  { id: "basic-object", title: "BasicObject", description: "オブジェクト階層のルート", category: "inheritance", order: 5 },
  { id: "duck-typing", title: "ダックタイピング", description: "型より振る舞いを重視", category: "inheritance", order: 6 },
];

const modulesLessons: Lesson[] = [
  { id: "basics", title: "モジュールの基本", description: "moduleキーワード", category: "modules", order: 1 },
  { id: "mixins", title: "ミックスイン", description: "includeでメソッド追加", category: "modules", order: 2 },
  { id: "namespaces", title: "名前空間", description: "モジュールによる名前空間", category: "modules", order: 3 },
  { id: "include-extend", title: "include・extend・prepend", description: "3つの取り込み方法", category: "modules", order: 4 },
  { id: "comparable", title: "Comparable", description: "比較演算の実装", category: "modules", order: 5 },
  { id: "enumerable", title: "Enumerable", description: "コレクション操作の実装", category: "modules", order: 6 },
];

const exceptionsLessons: Lesson[] = [
  { id: "begin-rescue", title: "begin-rescue", description: "例外のキャッチ", category: "exceptions", order: 1 },
  { id: "raise-errors", title: "raise", description: "例外の発生", category: "exceptions", order: 2 },
  { id: "custom-exceptions", title: "カスタム例外", description: "独自の例外クラス", category: "exceptions", order: 3 },
  { id: "ensure-retry", title: "ensure・retry", description: "後処理と再試行", category: "exceptions", order: 4 },
  { id: "exception-hierarchy", title: "例外の階層", description: "StandardErrorとException", category: "exceptions", order: 5 },
  { id: "best-practices", title: "ベストプラクティス", description: "例外処理の設計指針", category: "exceptions", order: 6 },
];

const ioLessons: Lesson[] = [
  { id: "read-file", title: "ファイル読み込み", description: "File.readとFile.open", category: "io", order: 1 },
  { id: "write-file", title: "ファイル書き込み", description: "File.writeとFile.open", category: "io", order: 2 },
  { id: "csv", title: "CSV処理", description: "CSVライブラリの使い方", category: "io", order: 3 },
  { id: "json", title: "JSON処理", description: "JSONの読み書き", category: "io", order: 4 },
  { id: "yaml", title: "YAML処理", description: "YAMLの読み書き", category: "io", order: 5 },
  { id: "dir-operations", title: "ディレクトリ操作", description: "Dir・FileUtilsの活用", category: "io", order: 6 },
];

const enumerableLessons: Lesson[] = [
  { id: "map-select", title: "map・select・reject", description: "変換とフィルタリング", category: "enumerable", order: 1 },
  { id: "reduce", title: "reduce・inject", description: "集約処理", category: "enumerable", order: 2 },
  { id: "each-with", title: "each_with_object・index", description: "添え字・オブジェクト付き走査", category: "enumerable", order: 3 },
  { id: "group-sort", title: "group_by・sort_by", description: "グルーピングとソート", category: "enumerable", order: 4 },
  { id: "flat-map", title: "flat_map・zip", description: "平坦化と結合", category: "enumerable", order: 5 },
  { id: "lazy", title: "Lazy Enumerator", description: "遅延評価", category: "enumerable", order: 6 },
  { id: "custom-enumerable", title: "カスタムEnumerable", description: "独自コレクションの実装", category: "enumerable", order: 7 },
];

const regexLessons: Lesson[] = [
  { id: "basics", title: "正規表現の基本", description: "/pattern/リテラル", category: "regex", order: 1 },
  { id: "matching", title: "マッチング", description: "=~とmatch", category: "regex", order: 2 },
  { id: "captures", title: "キャプチャ", description: "グループと後方参照", category: "regex", order: 3 },
  { id: "substitution", title: "置換", description: "sub・gsub", category: "regex", order: 4 },
  { id: "named-captures", title: "名前付きキャプチャ", description: "(?<name>pattern)", category: "regex", order: 5 },
  { id: "scan-grep", title: "scan・grep", description: "全マッチの取得", category: "regex", order: 6 },
];

const numbersLessons: Lesson[] = [
  { id: "integers", title: "整数", description: "Integerクラスの特徴", category: "numbers", order: 1 },
  { id: "floats", title: "浮動小数点数", description: "Floatの精度と注意点", category: "numbers", order: 2 },
  { id: "rational-complex", title: "Rational・Complex", description: "有理数・複素数", category: "numbers", order: 3 },
  { id: "math-module", title: "Mathモジュール", description: "数学関数の活用", category: "numbers", order: 4 },
  { id: "random", title: "乱数", description: "Random・rand・SecureRandom", category: "numbers", order: 5 },
];

const metaprogrammingLessons: Lesson[] = [
  { id: "method-missing", title: "method_missing", description: "存在しないメソッドの処理", category: "metaprogramming", order: 1 },
  { id: "define-method", title: "define_method", description: "動的メソッド定義", category: "metaprogramming", order: 2 },
  { id: "open-classes", title: "オープンクラス", description: "既存クラスの拡張", category: "metaprogramming", order: 3 },
  { id: "eval-methods", title: "eval系メソッド", description: "class_eval・instance_eval", category: "metaprogramming", order: 4 },
  { id: "reflection", title: "リフレクション", description: "respond_to?・send・methods", category: "metaprogramming", order: 5 },
  { id: "hooks", title: "フックメソッド", description: "included・inherited・method_added", category: "metaprogramming", order: 6 },
];

const testingLessons: Lesson[] = [
  { id: "minitest-basics", title: "Minitestの基本", description: "テストの書き方と実行", category: "testing", order: 1 },
  { id: "assertions", title: "アサーション", description: "assert系メソッド", category: "testing", order: 2 },
  { id: "rspec-basics", title: "RSpecの基本", description: "describe・it・expect", category: "testing", order: 3 },
  { id: "mocks-stubs", title: "モック・スタブ", description: "テストダブルの活用", category: "testing", order: 4 },
  { id: "tdd", title: "テスト駆動開発", description: "Red→Green→Refactor", category: "testing", order: 5 },
  { id: "coverage", title: "カバレッジ", description: "SimpleCovでカバレッジ計測", category: "testing", order: 6 },
];

const gemsLessons: Lesson[] = [
  { id: "gem-basics", title: "Gemの基本", description: "RubyGemsの仕組み", category: "gems", order: 1 },
  { id: "bundler", title: "Bundler", description: "Gemfileと依存管理", category: "gems", order: 2 },
  { id: "gemfile", title: "Gemfile詳解", description: "グループ・バージョン指定", category: "gems", order: 3 },
  { id: "creating-gems", title: "Gem作成", description: "自分のGemを作る", category: "gems", order: 4 },
  { id: "version-management", title: "バージョン管理", description: "セマンティックバージョニング", category: "gems", order: 5 },
];

const designLessons: Lesson[] = [
  { id: "singleton", title: "シングルトン", description: "Singletonモジュール", category: "design", order: 1 },
  { id: "factory", title: "ファクトリ", description: "オブジェクト生成の抽象化", category: "design", order: 2 },
  { id: "observer", title: "オブザーバー", description: "イベント通知パターン", category: "design", order: 3 },
  { id: "strategy", title: "ストラテジー", description: "アルゴリズムの切り替え", category: "design", order: 4 },
  { id: "decorator", title: "デコレータ", description: "機能の動的追加", category: "design", order: 5 },
  { id: "template-method", title: "テンプレートメソッド", description: "処理の骨格を定義", category: "design", order: 6 },
];

const railsLessons: Lesson[] = [
  { id: "mvc", title: "MVC概要", description: "Model-View-Controller", category: "rails", order: 1 },
  { id: "routing", title: "ルーティング", description: "routes.rbとRESTful", category: "rails", order: 2 },
  { id: "controllers", title: "コントローラ", description: "アクションとフィルタ", category: "rails", order: 3 },
  { id: "models", title: "モデル", description: "Active Recordの基本", category: "rails", order: 4 },
  { id: "views", title: "ビュー", description: "ERBテンプレート", category: "rails", order: 5 },
  { id: "migrations", title: "マイグレーション", description: "データベーススキーマ管理", category: "rails", order: 6 },
  { id: "active-record", title: "Active Record詳解", description: "バリデーション・アソシエーション", category: "rails", order: 7 },
];

const webLessons: Lesson[] = [
  { id: "rack", title: "Rack", description: "RubyのWebサーバーインターフェース", category: "web", order: 1 },
  { id: "sinatra", title: "Sinatra", description: "軽量Webフレームワーク", category: "web", order: 2 },
  { id: "http-basics", title: "HTTP基本", description: "リクエスト・レスポンスの理解", category: "web", order: 3 },
  { id: "api-development", title: "API開発", description: "JSON APIの構築", category: "web", order: 4 },
  { id: "json-handling", title: "JSON処理", description: "パース・生成・バリデーション", category: "web", order: 5 },
  { id: "websocket", title: "WebSocket", description: "リアルタイム通信", category: "web", order: 6 },
];

const concurrencyLessons: Lesson[] = [
  { id: "threads", title: "Thread", description: "スレッドの基本", category: "concurrency", order: 1 },
  { id: "mutex", title: "Mutex", description: "排他制御", category: "concurrency", order: 2 },
  { id: "fibers", title: "Fiber", description: "軽量な協調的並行処理", category: "concurrency", order: 3 },
  { id: "ractors", title: "Ractor", description: "Ruby 3のアクターモデル", category: "concurrency", order: 4 },
  { id: "async", title: "async gem", description: "非同期処理ライブラリ", category: "concurrency", order: 5 },
  { id: "process-fork", title: "プロセスフォーク", description: "fork・Process", category: "concurrency", order: 6 },
];

const algorithmsLessons: Lesson[] = [
  { id: "sorting", title: "ソートアルゴリズム", description: "バブル・クイック・マージ", category: "algorithms", order: 1 },
  { id: "searching", title: "探索アルゴリズム", description: "線形探索・二分探索", category: "algorithms", order: 2 },
  { id: "recursion", title: "再帰", description: "再帰関数の設計", category: "algorithms", order: 3 },
  { id: "stack-queue", title: "スタック・キュー", description: "基本データ構造", category: "algorithms", order: 4 },
  { id: "linked-list", title: "連結リスト", description: "ノードによるリスト構造", category: "algorithms", order: 5 },
  { id: "hash-table", title: "ハッシュテーブル", description: "Hashの内部と自作実装", category: "algorithms", order: 6 },
];

const ecosystemLessons: Lesson[] = [
  { id: "ruby-tools", title: "Rubyツール", description: "irb・ruby・gem", category: "ecosystem", order: 1 },
  { id: "linting", title: "RuboCop", description: "コードスタイルの統一", category: "ecosystem", order: 2 },
  { id: "debugging", title: "デバッグ", description: "debug・pry・byebug", category: "ecosystem", order: 3 },
  { id: "performance", title: "パフォーマンス", description: "プロファイリングと最適化", category: "ecosystem", order: 4 },
  { id: "ci-cd", title: "CI/CD", description: "GitHub Actionsでのテスト・ビルド", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "basics",
    name: "Ruby基礎",
    path: "/basics",
    color: "blue",
    difficulty: "beginner",
    lessons: basicsLessons,
  },
  {
    id: "control",
    name: "制御構文",
    path: "/control",
    color: "cyan",
    difficulty: "beginner",
    lessons: controlLessons,
  },
  {
    id: "methods",
    name: "メソッド",
    path: "/methods",
    color: "teal",
    difficulty: "beginner",
    lessons: methodsLessons,
  },
  {
    id: "arrays",
    name: "配列",
    path: "/arrays",
    color: "green",
    difficulty: "beginner",
    lessons: arraysLessons,
  },
  {
    id: "hashes",
    name: "ハッシュ",
    path: "/hashes",
    color: "red",
    difficulty: "beginner",
    lessons: hashesLessons,
  },
  {
    id: "strings",
    name: "文字列操作",
    path: "/strings",
    color: "purple",
    difficulty: "beginner",
    lessons: stringsLessons,
  },
  {
    id: "symbols",
    name: "シンボル",
    path: "/symbols",
    color: "indigo",
    difficulty: "beginner",
    lessons: symbolsLessons,
  },
  {
    id: "blocks",
    name: "ブロック・Proc・Lambda",
    path: "/blocks",
    color: "pink",
    difficulty: "intermediate",
    lessons: blocksLessons,
  },
  {
    id: "classes",
    name: "クラスとオブジェクト",
    path: "/classes",
    color: "violet",
    difficulty: "intermediate",
    lessons: classesLessons,
  },
  {
    id: "inheritance",
    name: "継承",
    path: "/inheritance",
    color: "orange",
    difficulty: "intermediate",
    lessons: inheritanceLessons,
  },
  {
    id: "modules",
    name: "モジュール",
    path: "/modules",
    color: "cyan",
    difficulty: "intermediate",
    lessons: modulesLessons,
  },
  {
    id: "exceptions",
    name: "例外処理",
    path: "/exceptions",
    color: "orange",
    difficulty: "intermediate",
    lessons: exceptionsLessons,
  },
  {
    id: "io",
    name: "ファイルI/O",
    path: "/io",
    color: "blue",
    difficulty: "intermediate",
    lessons: ioLessons,
  },
  {
    id: "enumerable",
    name: "Enumerable",
    path: "/enumerable",
    color: "teal",
    difficulty: "intermediate",
    lessons: enumerableLessons,
  },
  {
    id: "regex",
    name: "正規表現",
    path: "/regex",
    color: "pink",
    difficulty: "intermediate",
    lessons: regexLessons,
  },
  {
    id: "numbers",
    name: "数値と演算",
    path: "/numbers",
    color: "green",
    difficulty: "beginner",
    lessons: numbersLessons,
  },
  {
    id: "metaprogramming",
    name: "メタプログラミング",
    path: "/metaprogramming",
    color: "violet",
    difficulty: "advanced",
    lessons: metaprogrammingLessons,
  },
  {
    id: "testing",
    name: "テスト",
    path: "/testing",
    color: "indigo",
    difficulty: "intermediate",
    lessons: testingLessons,
  },
  {
    id: "gems",
    name: "Gem・Bundler",
    path: "/gems",
    color: "red",
    difficulty: "intermediate",
    lessons: gemsLessons,
  },
  {
    id: "design",
    name: "設計パターン",
    path: "/design",
    color: "purple",
    difficulty: "advanced",
    lessons: designLessons,
  },
  {
    id: "rails",
    name: "Ruby on Rails入門",
    path: "/rails",
    color: "red",
    difficulty: "intermediate",
    lessons: railsLessons,
  },
  {
    id: "web",
    name: "Web開発基礎",
    path: "/web",
    color: "blue",
    difficulty: "intermediate",
    lessons: webLessons,
  },
  {
    id: "concurrency",
    name: "並行・非同期処理",
    path: "/concurrency",
    color: "teal",
    difficulty: "advanced",
    lessons: concurrencyLessons,
  },
  {
    id: "algorithms",
    name: "アルゴリズム",
    path: "/algorithms",
    color: "indigo",
    difficulty: "advanced",
    lessons: algorithmsLessons,
  },
  {
    id: "ecosystem",
    name: "Rubyエコシステム",
    path: "/ecosystem",
    color: "green",
    difficulty: "advanced",
    lessons: ecosystemLessons,
  },
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
