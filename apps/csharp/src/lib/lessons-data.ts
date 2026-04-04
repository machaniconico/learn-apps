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

// ── Basics (12) ─────────────────────────────────────────────────────────────────
const BASICS_LESSONS: Lesson[] = [
  { id: "hello-world", title: "Hello World", description: "最初のC#プログラムを作成して実行する", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "変数の宣言と値の代入の基本", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "C#の基本的なデータ型の概要", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "int・double・decimal など数値型の使い分け", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列の基本", description: "stringの作成・結合・基本操作", category: "basics", order: 5 },
  { id: "boolean", title: "真偽値", description: "bool型とtrue/falseの使い方", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "constとreadonlyによる定数の定義", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "暗黙的・明示的な型変換とConvertクラス", category: "basics", order: 8 },
  { id: "var-inference", title: "var推論", description: "varキーワードによる暗黙的型付け", category: "basics", order: 9 },
  { id: "nullable", title: "Nullable型", description: "null許容型とnull合体演算子の使い方", category: "basics", order: 10 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子を使いこなす", category: "basics", order: 11 },
  { id: "comments", title: "コメント", description: "単一行・複数行・XMLドキュメントコメント", category: "basics", order: 12 },
];

// ── Control (10) ────────────────────────────────────────────────────────────────
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件に応じて処理を分岐させる基本構文", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件を順番にチェックする方法", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値に基づく多分岐処理のswitch構文", category: "control", order: 3 },
  { id: "switch-patterns", title: "switchパターン", description: "C#のパターンマッチングを使ったswitch式", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "カウンタベースの繰り返し処理", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileの使い方", category: "control", order: 6 },
  { id: "do-while", title: "do-whileループ", description: "最低1回は実行するdo-while構文", category: "control", order: 7 },
  { id: "foreach", title: "foreachループ", description: "コレクションの要素を順番に処理する", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループを中断・スキップする制御文", category: "control", order: 9 },
  { id: "ternary", title: "三項演算子", description: "条件式を使った簡潔な分岐の書き方", category: "control", order: 10 },
];

// ── Methods (8) ─────────────────────────────────────────────────────────────────
const METHODS_LESSONS: Lesson[] = [
  { id: "basics", title: "メソッドの基本", description: "メソッドの定義と呼び出し方", category: "methods", order: 1 },
  { id: "parameters", title: "引数", description: "メソッドに値を渡す方法", category: "methods", order: 2 },
  { id: "return-values", title: "戻り値", description: "メソッドから値を返す方法", category: "methods", order: 3 },
  { id: "ref-out-in", title: "ref・out・in", description: "参照渡しと出力パラメータの使い方", category: "methods", order: 4 },
  { id: "overloading", title: "オーバーロード", description: "同名メソッドの異なるシグネチャ定義", category: "methods", order: 5 },
  { id: "expression-body", title: "式本体メソッド", description: "=>を使った簡潔なメソッド定義", category: "methods", order: 6 },
  { id: "tuple-return", title: "タプル戻り値", description: "複数の値をタプルで返すメソッド", category: "methods", order: 7 },
  { id: "recursion", title: "再帰", description: "自分自身を呼び出す再帰メソッドの設計", category: "methods", order: 8 },
];

// ── Arrays (8) ──────────────────────────────────────────────────────────────────
const ARRAYS_LESSONS: Lesson[] = [
  { id: "basics", title: "配列の基本", description: "配列の宣言・初期化・アクセスの基礎", category: "arrays", order: 1 },
  { id: "multidimensional", title: "多次元配列", description: "2次元配列とジャグ配列の使い方", category: "arrays", order: 2 },
  { id: "list-generic", title: "List<T>", description: "動的サイズのジェネリックリストの使い方", category: "arrays", order: 3 },
  { id: "array-methods", title: "配列メソッド", description: "Sort・Reverse・Find などの配列操作", category: "arrays", order: 4 },
  { id: "span", title: "Span<T>", description: "メモリ効率の良いSpan型による配列操作", category: "arrays", order: 5 },
  { id: "array-segment", title: "ArraySegment", description: "配列の一部を効率的に参照する方法", category: "arrays", order: 6 },
  { id: "stack-queue", title: "Stack・Queue", description: "後入れ先出しと先入れ先出しのデータ構造", category: "arrays", order: 7 },
  { id: "linked-list", title: "LinkedList", description: "双方向連結リストの使い方", category: "arrays", order: 8 },
];

// ── Collections (6) ─────────────────────────────────────────────────────────────
const COLLECTIONS_LESSONS: Lesson[] = [
  { id: "dictionary", title: "Dictionary<TKey,TValue>", description: "キーと値のペアでデータを管理する辞書", category: "collections", order: 1 },
  { id: "hashset", title: "HashSet<T>", description: "重複なしの高速コレクション", category: "collections", order: 2 },
  { id: "sorted-collections", title: "Sorted系コレクション", description: "SortedList・SortedDictionary・SortedSetの使い分け", category: "collections", order: 3 },
  { id: "concurrent", title: "並行コレクション", description: "ConcurrentDictionary等のスレッドセーフなコレクション", category: "collections", order: 4 },
  { id: "immutable", title: "Immutableコレクション", description: "変更不可能なコレクションとその利点", category: "collections", order: 5 },
  { id: "comparison", title: "コレクション比較", description: "各コレクションの特徴と選び方ガイド", category: "collections", order: 6 },
];

// ── Strings (6) ─────────────────────────────────────────────────────────────────
const STRINGS_LESSONS: Lesson[] = [
  { id: "methods", title: "文字列メソッド", description: "Trim・Split・Replace など主要メソッドの使い方", category: "strings", order: 1 },
  { id: "string-builder", title: "StringBuilder", description: "大量の文字列連結を効率的に行う方法", category: "strings", order: 2 },
  { id: "interpolation", title: "文字列補間", description: "$\"...{式}...\" による文字列の埋め込み", category: "strings", order: 3 },
  { id: "regex", title: "正規表現", description: "Regexクラスを使ったパターンマッチング", category: "strings", order: 4 },
  { id: "span-char", title: "ReadOnlySpan<char>", description: "文字列のメモリ効率的な部分参照", category: "strings", order: 5 },
  { id: "comparison", title: "文字列比較", description: "等価比較・大小比較・カルチャ対応の比較", category: "strings", order: 6 },
];

// ── Classes (8) ─────────────────────────────────────────────────────────────────
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったオブジェクトの設計図", category: "classes", order: 1 },
  { id: "properties", title: "プロパティ", description: "get・setアクセサーによるデータのカプセル化", category: "classes", order: 2 },
  { id: "constructors", title: "コンストラクタ", description: "オブジェクト初期化のためのコンストラクタ定義", category: "classes", order: 3 },
  { id: "static-members", title: "静的メンバー", description: "staticフィールド・メソッド・クラスの使い方", category: "classes", order: 4 },
  { id: "records", title: "レコード型", description: "record宣言によるイミュータブルなデータ型", category: "classes", order: 5 },
  { id: "structs", title: "構造体", description: "structによる値型の定義と使いどころ", category: "classes", order: 6 },
  { id: "enums", title: "列挙型", description: "enumで定数の集合を型安全に定義する", category: "classes", order: 7 },
  { id: "access-modifiers", title: "アクセス修飾子", description: "public・private・protected・internalの使い分け", category: "classes", order: 8 },
];

// ── Inheritance (8) ─────────────────────────────────────────────────────────────
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "親クラスを引き継ぐ子クラスの定義方法", category: "inheritance", order: 1 },
  { id: "virtual-override", title: "virtual・override", description: "仮想メソッドとオーバーライドの仕組み", category: "inheritance", order: 2 },
  { id: "abstract-classes", title: "抽象クラス", description: "abstractキーワードを使った抽象クラスの定義", category: "inheritance", order: 3 },
  { id: "interfaces", title: "インターフェース", description: "interfaceによる契約の定義と実装", category: "inheritance", order: 4 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "多態性を活かしたオブジェクト指向設計", category: "inheritance", order: 5 },
  { id: "sealed", title: "sealedクラス", description: "継承を禁止するsealedキーワードの使い方", category: "inheritance", order: 6 },
  { id: "multiple-impl", title: "複数インターフェース実装", description: "複数のインターフェースを同時に実装する方法", category: "inheritance", order: 7 },
  { id: "default-impl", title: "デフォルト実装", description: "インターフェースのデフォルトメソッド実装", category: "inheritance", order: 8 },
];

// ── Generics (6) ────────────────────────────────────────────────────────────────
const GENERICS_LESSONS: Lesson[] = [
  { id: "basics", title: "ジェネリクスの基本", description: "型パラメータを使った汎用的なクラス・メソッド", category: "generics", order: 1 },
  { id: "constraints", title: "型制約", description: "whereキーワードによるジェネリック型の制約", category: "generics", order: 2 },
  { id: "generic-methods", title: "ジェネリックメソッド", description: "メソッドレベルでの型パラメータの活用", category: "generics", order: 3 },
  { id: "generic-interfaces", title: "ジェネリックインターフェース", description: "IComparable<T>やIEnumerable<T>の実装", category: "generics", order: 4 },
  { id: "covariance", title: "共変性・反変性", description: "in・outキーワードによる型の変性", category: "generics", order: 5 },
  { id: "patterns", title: "ジェネリックパターン", description: "ジェネリクスを活用した実用的な設計パターン", category: "generics", order: 6 },
];

// ── LINQ (8) ────────────────────────────────────────────────────────────────────
const LINQ_LESSONS: Lesson[] = [
  { id: "basics", title: "LINQの基本", description: "Language Integrated Queryの基本概念と使い方", category: "linq", order: 1 },
  { id: "where-select", title: "Where・Select", description: "フィルタリングとプロジェクションの基本操作", category: "linq", order: 2 },
  { id: "orderby-groupby", title: "OrderBy・GroupBy", description: "ソートとグループ化のLINQ操作", category: "linq", order: 3 },
  { id: "join", title: "Join", description: "複数のデータソースを結合するJoin操作", category: "linq", order: 4 },
  { id: "aggregation", title: "集計操作", description: "Sum・Average・Count・Max・Min などの集計", category: "linq", order: 5 },
  { id: "query-syntax", title: "クエリ構文", description: "from...where...select形式のクエリ構文", category: "linq", order: 6 },
  { id: "deferred-execution", title: "遅延実行", description: "LINQの遅延実行の仕組みと注意点", category: "linq", order: 7 },
  { id: "performance", title: "パフォーマンス", description: "LINQのパフォーマンス最適化テクニック", category: "linq", order: 8 },
];

// ── Async (6) ───────────────────────────────────────────────────────────────────
const ASYNC_LESSONS: Lesson[] = [
  { id: "basics", title: "非同期処理の基本", description: "async/awaitの基本概念と使い方", category: "async", order: 1 },
  { id: "task", title: "Task", description: "Taskクラスを使った非同期操作の管理", category: "async", order: 2 },
  { id: "task-generic", title: "Task<T>", description: "戻り値を持つ非同期メソッドの実装", category: "async", order: 3 },
  { id: "parallel", title: "並列処理", description: "Task.WhenAllとParallelによる並列実行", category: "async", order: 4 },
  { id: "cancellation", title: "キャンセル", description: "CancellationTokenによる非同期処理のキャンセル", category: "async", order: 5 },
  { id: "async-streams", title: "非同期ストリーム", description: "IAsyncEnumerable<T>による非同期データストリーム", category: "async", order: 6 },
];

// ── Delegates (6) ───────────────────────────────────────────────────────────────
const DELEGATES_LESSONS: Lesson[] = [
  { id: "basics", title: "デリゲートの基本", description: "メソッド参照を保持するデリゲートの仕組み", category: "delegates", order: 1 },
  { id: "action-func", title: "Action・Func", description: "汎用デリゲートAction<T>とFunc<T>の使い方", category: "delegates", order: 2 },
  { id: "lambda", title: "ラムダ式", description: "=> を使った無名メソッドの簡潔な書き方", category: "delegates", order: 3 },
  { id: "events", title: "イベント", description: "eventキーワードによるイベント駆動プログラミング", category: "delegates", order: 4 },
  { id: "event-handler", title: "EventHandler", description: "EventHandler<T>を使った標準的なイベント実装", category: "delegates", order: 5 },
  { id: "observer", title: "Observerパターン", description: "IObservable<T>/IObserver<T>による監視パターン", category: "delegates", order: 6 },
];

// ── ASP.NET Core (8) ────────────────────────────────────────────────────────────
const ASPNET_LESSONS: Lesson[] = [
  { id: "overview", title: "ASP.NET Core概要", description: "ASP.NET Coreの全体像とプロジェクト構成", category: "aspnet", order: 1 },
  { id: "middleware", title: "ミドルウェア", description: "リクエストパイプラインとミドルウェアの仕組み", category: "aspnet", order: 2 },
  { id: "routing", title: "ルーティング", description: "URLルーティングの設定と属性ルーティング", category: "aspnet", order: 3 },
  { id: "dependency-injection", title: "依存性注入", description: "DIコンテナを使ったサービスの登録と注入", category: "aspnet", order: 4 },
  { id: "configuration", title: "設定管理", description: "appsettings.jsonと設定オプションパターン", category: "aspnet", order: 5 },
  { id: "logging", title: "ログ", description: "ILoggerを使った構造化ログの実装", category: "aspnet", order: 6 },
  { id: "environments", title: "環境", description: "Development・Staging・Productionの環境設定", category: "aspnet", order: 7 },
  { id: "deployment", title: "デプロイ", description: "ASP.NET Coreアプリのデプロイ方法", category: "aspnet", order: 8 },
];

// ── Web API (8) ─────────────────────────────────────────────────────────────────
const WEBAPI_LESSONS: Lesson[] = [
  { id: "basics", title: "Web APIの基本", description: "RESTful APIの基本概念とプロジェクト作成", category: "webapi", order: 1 },
  { id: "controllers", title: "コントローラー", description: "ApiControllerの実装とアクションメソッド", category: "webapi", order: 2 },
  { id: "model-binding", title: "モデルバインディング", description: "リクエストデータのモデルへの自動バインド", category: "webapi", order: 3 },
  { id: "validation", title: "バリデーション", description: "DataAnnotationsとFluentValidationによる入力検証", category: "webapi", order: 4 },
  { id: "filters", title: "フィルター", description: "アクションフィルターと例外フィルターの活用", category: "webapi", order: 5 },
  { id: "cors", title: "CORS", description: "クロスオリジンリソース共有の設定方法", category: "webapi", order: 6 },
  { id: "authentication", title: "認証", description: "JWT認証とAuthorize属性によるアクセス制御", category: "webapi", order: 7 },
  { id: "swagger", title: "Swagger", description: "Swashbuckleを使ったAPI仕様書の自動生成", category: "webapi", order: 8 },
];

// ── Blazor (7) ──────────────────────────────────────────────────────────────────
const BLAZOR_LESSONS: Lesson[] = [
  { id: "overview", title: "Blazor概要", description: "Blazor WebAssemblyとServerの違いと特徴", category: "blazor", order: 1 },
  { id: "components", title: "コンポーネント", description: "Razorコンポーネントの作成と使い方", category: "blazor", order: 2 },
  { id: "data-binding", title: "データバインディング", description: "@bindを使った双方向データバインディング", category: "blazor", order: 3 },
  { id: "event-handling", title: "イベント処理", description: "@onclickなどのイベントハンドラーの実装", category: "blazor", order: 4 },
  { id: "routing", title: "ルーティング", description: "@pageディレクティブによるページルーティング", category: "blazor", order: 5 },
  { id: "state-management", title: "状態管理", description: "カスケーディングパラメータとステート管理", category: "blazor", order: 6 },
  { id: "js-interop", title: "JS連携", description: "IJSRuntimeを使ったJavaScriptとの相互運用", category: "blazor", order: 7 },
];

// ── EF Core (8) ─────────────────────────────────────────────────────────────────
const EFCORE_LESSONS: Lesson[] = [
  { id: "overview", title: "EF Core概要", description: "Entity Framework Coreの基本概念とセットアップ", category: "efcore", order: 1 },
  { id: "dbcontext", title: "DbContext", description: "データベースコンテキストの定義と設定", category: "efcore", order: 2 },
  { id: "model-definition", title: "モデル定義", description: "エンティティクラスとFluent APIによるモデル設定", category: "efcore", order: 3 },
  { id: "migrations", title: "マイグレーション", description: "データベースのバージョン管理とマイグレーション", category: "efcore", order: 4 },
  { id: "crud", title: "CRUD操作", description: "作成・読取・更新・削除の基本操作", category: "efcore", order: 5 },
  { id: "relationships", title: "リレーションシップ", description: "1対1・1対多・多対多のリレーション設定", category: "efcore", order: 6 },
  { id: "query-optimization", title: "クエリ最適化", description: "Eager Loading・Lazy Loadingとパフォーマンス最適化", category: "efcore", order: 7 },
  { id: "transactions", title: "トランザクション", description: "トランザクション管理と同時実行制御", category: "efcore", order: 8 },
];

// ── Database (6) ────────────────────────────────────────────────────────────────
const DATABASE_LESSONS: Lesson[] = [
  { id: "ado-net", title: "ADO.NET", description: "ADO.NETを使った低レベルなデータベースアクセス", category: "database", order: 1 },
  { id: "sql-basics", title: "SQL基礎", description: "C#から実行するSQL文の基本", category: "database", order: 2 },
  { id: "connection-management", title: "接続管理", description: "コネクションプーリングと接続文字列の管理", category: "database", order: 3 },
  { id: "dapper", title: "Dapper", description: "軽量ORMのDapperを使ったデータアクセス", category: "database", order: 4 },
  { id: "repository-pattern", title: "Repositoryパターン", description: "データアクセスを抽象化するRepositoryパターン", category: "database", order: 5 },
  { id: "database-design", title: "データベース設計", description: "正規化・インデックス・パフォーマンスの基礎", category: "database", order: 6 },
];

// ── xUnit (6) ───────────────────────────────────────────────────────────────────
const XUNIT_LESSONS: Lesson[] = [
  { id: "basics", title: "xUnitの基本", description: "xUnitテストフレームワークの導入と基本", category: "xunit", order: 1 },
  { id: "fact-theory", title: "Fact・Theory", description: "[Fact]と[Theory]属性によるテスト定義", category: "xunit", order: 2 },
  { id: "assertions", title: "アサーション", description: "Assert.Equal・Assert.Throwsなどの検証メソッド", category: "xunit", order: 3 },
  { id: "mocking", title: "モック", description: "Moqライブラリを使った依存性のモック", category: "xunit", order: 4 },
  { id: "test-design", title: "テスト設計", description: "AAA パターンとテストの構造化", category: "xunit", order: 5 },
  { id: "ci-integration", title: "CI統合", description: "テストをCI/CDパイプラインに組み込む方法", category: "xunit", order: 6 },
];

// ── Debug (5) ───────────────────────────────────────────────────────────────────
const DEBUG_LESSONS: Lesson[] = [
  { id: "debugger-basics", title: "デバッガの基本", description: "Visual Studioデバッガの基本操作", category: "debug", order: 1 },
  { id: "breakpoints", title: "ブレークポイント", description: "条件付きブレークポイントとトレースポイント", category: "debug", order: 2 },
  { id: "logging", title: "ログ出力", description: "ILoggerとSerilogを使ったログ出力", category: "debug", order: 3 },
  { id: "exception-analysis", title: "例外解析", description: "例外の発生原因を効率的に特定する方法", category: "debug", order: 4 },
  { id: "performance-analysis", title: "パフォーマンス解析", description: "プロファイラーとBenchmarkDotNetの活用", category: "debug", order: 5 },
];

// ── Exceptions (5) ──────────────────────────────────────────────────────────────
const EXCEPTIONS_LESSONS: Lesson[] = [
  { id: "try-catch-finally", title: "try-catch-finally", description: "例外処理の基本構文と使い方", category: "exceptions", order: 1 },
  { id: "custom-exceptions", title: "カスタム例外", description: "独自の例外クラスの作成方法", category: "exceptions", order: 2 },
  { id: "exception-filters", title: "例外フィルター", description: "when節を使った例外の条件付きキャッチ", category: "exceptions", order: 3 },
  { id: "exception-design", title: "例外設計", description: "例外を使った適切なエラーハンドリング設計", category: "exceptions", order: 4 },
  { id: "global-handling", title: "グローバルハンドリング", description: "アプリケーション全体の例外処理戦略", category: "exceptions", order: 5 },
];

// ── File I/O (6) ────────────────────────────────────────────────────────────────
const FILEIO_LESSONS: Lesson[] = [
  { id: "file-directory", title: "File・Directory", description: "ファイルとディレクトリの基本操作", category: "fileio", order: 1 },
  { id: "stream-reader-writer", title: "StreamReader・Writer", description: "テキストファイルの読み書き", category: "fileio", order: 2 },
  { id: "json-processing", title: "JSON処理", description: "System.Text.JsonによるJSONシリアライズ", category: "fileio", order: 3 },
  { id: "xml-processing", title: "XML処理", description: "XDocument・XElementによるXML操作", category: "fileio", order: 4 },
  { id: "csv-processing", title: "CSV処理", description: "CSVファイルの読み書きと解析", category: "fileio", order: 5 },
  { id: "async-io", title: "非同期I/O", description: "async/awaitを使った非同期ファイル操作", category: "fileio", order: 6 },
];

// ── Patterns (5) ────────────────────────────────────────────────────────────────
const PATTERNS_LESSONS: Lesson[] = [
  { id: "is-as-operators", title: "is・as演算子", description: "型チェックと安全なキャストの方法", category: "patterns", order: 1 },
  { id: "switch-patterns", title: "switchパターン", description: "switch式でのパターンマッチング活用", category: "patterns", order: 2 },
  { id: "property-patterns", title: "プロパティパターン", description: "オブジェクトのプロパティに対するパターンマッチング", category: "patterns", order: 3 },
  { id: "tuple-patterns", title: "タプルパターン", description: "複数の値の組み合わせによるパターンマッチング", category: "patterns", order: 4 },
  { id: "list-patterns", title: "リストパターン", description: "配列・リストの要素に対するパターンマッチング", category: "patterns", order: 5 },
];

// ── Design Patterns (6) ────────────────────────────────────────────────────────
const DESIGN_LESSONS: Lesson[] = [
  { id: "singleton", title: "Singletonパターン", description: "インスタンスを1つに制限するSingletonの実装", category: "design", order: 1 },
  { id: "factory", title: "Factoryパターン", description: "オブジェクト生成を抽象化するFactoryの実装", category: "design", order: 2 },
  { id: "observer", title: "Observerパターン", description: "イベント通知のためのObserverパターン", category: "design", order: 3 },
  { id: "strategy", title: "Strategyパターン", description: "アルゴリズムの切り替えを可能にするStrategy", category: "design", order: 4 },
  { id: "decorator", title: "Decoratorパターン", description: "機能を動的に追加するDecoratorの実装", category: "design", order: 5 },
  { id: "di-pattern", title: "DIパターン", description: "依存性注入パターンによる疎結合設計", category: "design", order: 6 },
];

// ── Algorithm (6) ───────────────────────────────────────────────────────────────
const ALGORITHM_LESSONS: Lesson[] = [
  { id: "sorting", title: "ソートアルゴリズム", description: "バブル・マージ・クイックソートの仕組みと実装", category: "algorithm", order: 1 },
  { id: "searching", title: "探索アルゴリズム", description: "線形探索・二分探索の実装と使いどころ", category: "algorithm", order: 2 },
  { id: "stack-queue-usage", title: "スタック・キュー活用", description: "スタックとキューを使ったアルゴリズム", category: "algorithm", order: 3 },
  { id: "recursive-algorithms", title: "再帰アルゴリズム", description: "再帰を使った分割統治法の実装", category: "algorithm", order: 4 },
  { id: "dynamic-programming", title: "動的計画法", description: "メモ化と表を使った動的計画法の基礎", category: "algorithm", order: 5 },
  { id: "graph", title: "グラフ", description: "グラフの表現と基本的な探索アルゴリズム", category: "algorithm", order: 6 },
];

// ── .NET Ecosystem (5) ──────────────────────────────────────────────────────────
const DOTNET_LESSONS: Lesson[] = [
  { id: "overview", title: ".NET概要", description: ".NETプラットフォームの全体像とバージョン", category: "dotnet", order: 1 },
  { id: "nuget", title: "NuGet", description: "NuGetパッケージマネージャーの使い方", category: "dotnet", order: 2 },
  { id: "cli-tools", title: "CLI ツール", description: "dotnet CLIコマンドの使い方", category: "dotnet", order: 3 },
  { id: "project-structure", title: "プロジェクト構成", description: ".csproj・sln・ディレクトリ構成のベストプラクティス", category: "dotnet", order: 4 },
  { id: "latest-features", title: "最新機能", description: "C#と.NETの最新バージョンの注目機能", category: "dotnet", order: 5 },
];

// ── Category definitions ───────────────────────────────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "C#基礎", path: "/learn/basics", color: "purple", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "blue", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "methods", name: "メソッド", path: "/learn/methods", color: "teal", difficulty: "beginner", lessons: METHODS_LESSONS },
  { id: "arrays", name: "配列・リスト", path: "/learn/arrays", color: "orange", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "collections", name: "コレクション", path: "/learn/collections", color: "yellow", difficulty: "intermediate", lessons: COLLECTIONS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "cyan", difficulty: "intermediate", lessons: STRINGS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "green", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・インターフェース", path: "/learn/inheritance", color: "indigo", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "generics", name: "ジェネリクス", path: "/learn/generics", color: "violet", difficulty: "intermediate", lessons: GENERICS_LESSONS },
  { id: "linq", name: "LINQ", path: "/learn/linq", color: "pink", difficulty: "intermediate", lessons: LINQ_LESSONS },
  { id: "async", name: "非同期処理", path: "/learn/async", color: "red", difficulty: "advanced", lessons: ASYNC_LESSONS },
  { id: "delegates", name: "デリゲート・イベント", path: "/learn/delegates", color: "orange", difficulty: "intermediate", lessons: DELEGATES_LESSONS },
  { id: "aspnet", name: "ASP.NET Core基礎", path: "/learn/aspnet", color: "blue", difficulty: "advanced", lessons: ASPNET_LESSONS },
  { id: "webapi", name: "Web API", path: "/learn/webapi", color: "cyan", difficulty: "advanced", lessons: WEBAPI_LESSONS },
  { id: "blazor", name: "Blazor", path: "/learn/blazor", color: "purple", difficulty: "advanced", lessons: BLAZOR_LESSONS },
  { id: "efcore", name: "Entity Framework Core", path: "/learn/efcore", color: "green", difficulty: "advanced", lessons: EFCORE_LESSONS },
  { id: "database", name: "データベース", path: "/learn/database", color: "teal", difficulty: "intermediate", lessons: DATABASE_LESSONS },
  { id: "xunit", name: "xUnit", path: "/learn/xunit", color: "yellow", difficulty: "intermediate", lessons: XUNIT_LESSONS },
  { id: "debug", name: "デバッグ", path: "/learn/debug", color: "red", difficulty: "beginner", lessons: DEBUG_LESSONS },
  { id: "exceptions", name: "例外処理", path: "/learn/exceptions", color: "orange", difficulty: "intermediate", lessons: EXCEPTIONS_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "indigo", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "patterns", name: "パターンマッチング", path: "/learn/patterns", color: "violet", difficulty: "advanced", lessons: PATTERNS_LESSONS },
  { id: "design", name: "デザインパターン", path: "/learn/design", color: "pink", difficulty: "advanced", lessons: DESIGN_LESSONS },
  { id: "algorithm", name: "アルゴリズム", path: "/learn/algorithm", color: "cyan", difficulty: "intermediate", lessons: ALGORITHM_LESSONS },
  { id: "dotnet", name: ".NETエコシステム", path: "/learn/dotnet", color: "blue", difficulty: "beginner", lessons: DOTNET_LESSONS },
];

// ── Utility functions ──────────────────────────────────────────────────────────
export function getCategoryInfo(categoryId: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.id === categoryId);
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

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner":
      return "green";
    case "intermediate":
      return "blue";
    case "advanced":
      return "red";
  }
}

export function getAllLessons(categoryId: string): Lesson[] {
  switch (categoryId) {
    case "basics":
      return BASICS_LESSONS;
    case "control":
      return CONTROL_LESSONS;
    case "methods":
      return METHODS_LESSONS;
    case "arrays":
      return ARRAYS_LESSONS;
    case "collections":
      return COLLECTIONS_LESSONS;
    case "strings":
      return STRINGS_LESSONS;
    case "classes":
      return CLASSES_LESSONS;
    case "inheritance":
      return INHERITANCE_LESSONS;
    case "generics":
      return GENERICS_LESSONS;
    case "linq":
      return LINQ_LESSONS;
    case "async":
      return ASYNC_LESSONS;
    case "delegates":
      return DELEGATES_LESSONS;
    case "aspnet":
      return ASPNET_LESSONS;
    case "webapi":
      return WEBAPI_LESSONS;
    case "blazor":
      return BLAZOR_LESSONS;
    case "efcore":
      return EFCORE_LESSONS;
    case "database":
      return DATABASE_LESSONS;
    case "xunit":
      return XUNIT_LESSONS;
    case "debug":
      return DEBUG_LESSONS;
    case "exceptions":
      return EXCEPTIONS_LESSONS;
    case "fileio":
      return FILEIO_LESSONS;
    case "patterns":
      return PATTERNS_LESSONS;
    case "design":
      return DESIGN_LESSONS;
    case "algorithm":
      return ALGORITHM_LESSONS;
    case "dotnet":
      return DOTNET_LESSONS;
    default:
      return [];
  }
}

export function getLessonByPath(categoryId: string, lessonId: string): Lesson | undefined {
  const lessons = getAllLessons(categoryId);
  return lessons.find((l) => l.id === lessonId);
}
