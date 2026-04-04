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
  { id: "hello-world", title: "Hello World", description: "最初のJavaプログラムを作成して実行する", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "変数の宣言と値の代入の基本", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "Javaの基本的なデータ型（プリミティブ型）", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "int・long・double・floatなど数値型の使い分け", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列の基本", description: "Stringクラスの作成・結合・基本操作", category: "basics", order: 5 },
  { id: "boolean", title: "真偽値", description: "boolean型とtrue/falseの使い方", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "finalキーワードによる定数の定義", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "暗黙的・明示的な型変換（キャスト）", category: "basics", order: 8 },
  { id: "var-inference", title: "var推論", description: "Java 10のvarキーワードによるローカル変数型推論", category: "basics", order: 9 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子を使いこなす", category: "basics", order: 10 },
  { id: "input-output", title: "入出力", description: "System.out.printlnとScannerを使った標準入出力", category: "basics", order: 11 },
  { id: "comments", title: "コメント", description: "単一行・複数行・Javadocコメントの書き方", category: "basics", order: 12 },
];

// ── Control (10) ────────────────────────────────────────────────────────────────
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件に応じて処理を分岐させる基本構文", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件を順番にチェックする方法", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値に基づく多分岐処理のswitch構文", category: "control", order: 3 },
  { id: "switch-expression", title: "switch式", description: "Java 14のswitch式とアロー構文", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "カウンタベースの繰り返し処理", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileの使い方", category: "control", order: 6 },
  { id: "do-while", title: "do-whileループ", description: "最低1回は実行するdo-while構文", category: "control", order: 7 },
  { id: "enhanced-for", title: "拡張forループ", description: "配列やコレクションを順番に処理するfor-each", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループを中断・スキップする制御文", category: "control", order: 9 },
  { id: "ternary", title: "三項演算子", description: "条件式を使った簡潔な分岐の書き方", category: "control", order: 10 },
];

// ── Methods (8) ─────────────────────────────────────────────────────────────────
const METHODS_LESSONS: Lesson[] = [
  { id: "basics", title: "メソッドの基本", description: "メソッドの定義と呼び出し方", category: "methods", order: 1 },
  { id: "parameters", title: "引数", description: "メソッドに値を渡す方法", category: "methods", order: 2 },
  { id: "return-values", title: "戻り値", description: "メソッドから値を返す方法", category: "methods", order: 3 },
  { id: "overloading", title: "オーバーロード", description: "同名メソッドの異なるシグネチャ定義", category: "methods", order: 4 },
  { id: "varargs", title: "可変長引数", description: "可変長引数（varargs）の使い方", category: "methods", order: 5 },
  { id: "static-methods", title: "staticメソッド", description: "クラスに属するstaticメソッドの定義", category: "methods", order: 6 },
  { id: "recursion", title: "再帰", description: "自分自身を呼び出す再帰メソッドの設計", category: "methods", order: 7 },
  { id: "scope", title: "スコープ", description: "変数のスコープとライフタイム", category: "methods", order: 8 },
];

// ── Classes (8) ─────────────────────────────────────────────────────────────────
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったオブジェクトの設計図", category: "classes", order: 1 },
  { id: "constructors", title: "コンストラクタ", description: "オブジェクト初期化のためのコンストラクタ定義", category: "classes", order: 2 },
  { id: "access-modifiers", title: "アクセス修飾子", description: "public・private・protected・デフォルトの使い分け", category: "classes", order: 3 },
  { id: "getters-setters", title: "getter・setter", description: "フィールドへのアクセスメソッドの定義", category: "classes", order: 4 },
  { id: "static-members", title: "静的メンバ", description: "staticフィールド・メソッドの使い方", category: "classes", order: 5 },
  { id: "this-keyword", title: "thisキーワード", description: "現在のインスタンスを参照するthis", category: "classes", order: 6 },
  { id: "inner-classes", title: "内部クラス", description: "内部クラス・静的ネストクラス・ローカルクラス", category: "classes", order: 7 },
  { id: "records", title: "Record", description: "Java 16のRecordクラスによる不変データクラス", category: "classes", order: 8 },
];

// ── Inheritance & Interfaces (8) ────────────────────────────────────────────────
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "extendsキーワードによるクラスの継承", category: "inheritance", order: 1 },
  { id: "method-overriding", title: "メソッドオーバーライド", description: "@Overrideアノテーションとメソッドの上書き", category: "inheritance", order: 2 },
  { id: "abstract-classes", title: "抽象クラス", description: "abstractクラスとメソッドの定義", category: "inheritance", order: 3 },
  { id: "interfaces", title: "インターフェース", description: "implementsによるインターフェースの実装", category: "inheritance", order: 4 },
  { id: "default-methods", title: "デフォルトメソッド", description: "インターフェースのdefaultメソッド", category: "inheritance", order: 5 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "多態性を使ったプログラミング", category: "inheritance", order: 6 },
  { id: "sealed-classes", title: "Sealedクラス", description: "Java 17のsealedクラスによる継承制限", category: "inheritance", order: 7 },
  { id: "instanceof-pattern", title: "instanceof", description: "型判定とパターンマッチング（Java 16+）", category: "inheritance", order: 8 },
];

// ── Generics (6) ────────────────────────────────────────────────────────────────
const GENERICS_LESSONS: Lesson[] = [
  { id: "basics", title: "ジェネリクスの基本", description: "型パラメータを使った汎用クラスの定義", category: "generics", order: 1 },
  { id: "generic-methods", title: "ジェネリックメソッド", description: "型パラメータを持つメソッドの定義", category: "generics", order: 2 },
  { id: "bounded-types", title: "境界型", description: "extends・superによる型パラメータの制約", category: "generics", order: 3 },
  { id: "wildcards", title: "ワイルドカード", description: "?・extends・superワイルドカードの使い方", category: "generics", order: 4 },
  { id: "type-erasure", title: "型消去", description: "Javaジェネリクスの型消去メカニズム", category: "generics", order: 5 },
  { id: "generic-patterns", title: "ジェネリクスパターン", description: "実践的なジェネリクスの設計パターン", category: "generics", order: 6 },
];

// ── Arrays & Lists (8) ──────────────────────────────────────────────────────────
const ARRAYS_LESSONS: Lesson[] = [
  { id: "array-basics", title: "配列の基本", description: "配列の宣言・初期化・アクセス", category: "arrays", order: 1 },
  { id: "array-operations", title: "配列の操作", description: "配列のコピー・ソート・検索", category: "arrays", order: 2 },
  { id: "multidimensional", title: "多次元配列", description: "2次元配列とジャグ配列", category: "arrays", order: 3 },
  { id: "arraylist", title: "ArrayList", description: "動的配列ArrayListの使い方", category: "arrays", order: 4 },
  { id: "linkedlist", title: "LinkedList", description: "連結リストLinkedListの使い方", category: "arrays", order: 5 },
  { id: "list-operations", title: "Listの操作", description: "sort・subList・Collectionsユーティリティ", category: "arrays", order: 6 },
  { id: "arrays-class", title: "Arraysクラス", description: "Arrays.sort・fill・copyOfなどのユーティリティ", category: "arrays", order: 7 },
  { id: "list-of", title: "List.of・copyOf", description: "不変リストの作成（Java 9+）", category: "arrays", order: 8 },
];

// ── Collections (6) ─────────────────────────────────────────────────────────────
const COLLECTIONS_LESSONS: Lesson[] = [
  { id: "hashmap", title: "HashMap", description: "キーと値のペアで管理するハッシュマップ", category: "collections", order: 1 },
  { id: "treemap", title: "TreeMap", description: "キーでソートされた順序付きマップ", category: "collections", order: 2 },
  { id: "hashset", title: "HashSet", description: "重複なしの集合HashSetの使い方", category: "collections", order: 3 },
  { id: "queue-deque", title: "Queue・Deque", description: "キューと両端キューの使い方", category: "collections", order: 4 },
  { id: "stack", title: "Stack・ArrayDeque", description: "スタック操作とArrayDequeでの実装", category: "collections", order: 5 },
  { id: "collections-utility", title: "Collectionsクラス", description: "sort・unmodifiable・synchronizedなどのユーティリティ", category: "collections", order: 6 },
];

// ── Strings (6) ─────────────────────────────────────────────────────────────────
const STRINGS_LESSONS: Lesson[] = [
  { id: "string-basics", title: "Stringの基本", description: "Stringの不変性と基本操作", category: "strings", order: 1 },
  { id: "string-methods", title: "文字列メソッド", description: "substring・indexOf・replaceなどの操作", category: "strings", order: 2 },
  { id: "string-builder", title: "StringBuilder", description: "可変文字列StringBuilderの使い方", category: "strings", order: 3 },
  { id: "string-formatting", title: "文字列フォーマット", description: "String.formatとテキストブロック", category: "strings", order: 4 },
  { id: "regex", title: "正規表現", description: "PatternとMatcherによる正規表現", category: "strings", order: 5 },
  { id: "string-comparison", title: "文字列比較", description: "equalsとcompareTo・==の違い", category: "strings", order: 6 },
];

// ── Lambda (6) ──────────────────────────────────────────────────────────────────
const LAMBDA_LESSONS: Lesson[] = [
  { id: "basics", title: "ラムダ式の基本", description: "ラムダ式の構文と基本的な使い方", category: "lambda", order: 1 },
  { id: "functional-interfaces", title: "関数型インターフェース", description: "Predicate・Function・Consumerなどの標準IF", category: "lambda", order: 2 },
  { id: "method-references", title: "メソッド参照", description: "::を使ったメソッド参照の使い方", category: "lambda", order: 3 },
  { id: "comparator", title: "Comparator", description: "ラムダ式を使ったソートとComparator", category: "lambda", order: 4 },
  { id: "closure", title: "クロージャ", description: "ラムダ式と実質的final変数のキャプチャ", category: "lambda", order: 5 },
  { id: "custom-functional", title: "カスタム関数型IF", description: "独自の関数型インターフェースの作成", category: "lambda", order: 6 },
];

// ── Stream API (8) ──────────────────────────────────────────────────────────────
const STREAM_LESSONS: Lesson[] = [
  { id: "basics", title: "Streamの基本", description: "Streamの作成と基本的な操作", category: "stream", order: 1 },
  { id: "filter-map", title: "filter・map", description: "フィルタリングと変換操作", category: "stream", order: 2 },
  { id: "reduce", title: "reduce", description: "集約操作reduceの使い方", category: "stream", order: 3 },
  { id: "collectors", title: "Collectors", description: "toList・groupingBy・joiningなどのコレクタ", category: "stream", order: 4 },
  { id: "flatmap", title: "flatMap", description: "ネストされたストリームのフラット化", category: "stream", order: 5 },
  { id: "sorted-distinct", title: "sorted・distinct", description: "ソートと重複除去", category: "stream", order: 6 },
  { id: "parallel-stream", title: "並列Stream", description: "parallelStreamによる並列処理", category: "stream", order: 7 },
  { id: "optional-stream", title: "StreamとOptional", description: "StreamでのOptionalの活用", category: "stream", order: 8 },
];

// ── Optional (5) ────────────────────────────────────────────────────────────────
const OPTIONAL_LESSONS: Lesson[] = [
  { id: "basics", title: "Optionalの基本", description: "Optional.of・empty・ofNullableの使い方", category: "optional", order: 1 },
  { id: "get-values", title: "値の取得", description: "get・orElse・orElseGetによる値の取得", category: "optional", order: 2 },
  { id: "map-flatmap", title: "map・flatMap", description: "Optionalの変換操作", category: "optional", order: 3 },
  { id: "ifpresent", title: "ifPresent", description: "値が存在する場合の処理", category: "optional", order: 4 },
  { id: "best-practices", title: "ベストプラクティス", description: "Optionalの正しい使い方とアンチパターン", category: "optional", order: 5 },
];

// ── Spring Boot (8) ─────────────────────────────────────────────────────────────
const SPRING_BOOT_LESSONS: Lesson[] = [
  { id: "introduction", title: "Spring Boot入門", description: "Spring Bootの概要とプロジェクト作成", category: "spring-boot", order: 1 },
  { id: "annotations", title: "アノテーション", description: "@SpringBootApplication・@Component・@Autowiredの基本", category: "spring-boot", order: 2 },
  { id: "rest-controller", title: "RESTコントローラ", description: "@RestControllerでREST APIを作成", category: "spring-boot", order: 3 },
  { id: "request-mapping", title: "リクエストマッピング", description: "@GetMapping・@PostMappingなどのHTTPマッピング", category: "spring-boot", order: 4 },
  { id: "dependency-injection", title: "DI", description: "依存性注入の仕組みと使い方", category: "spring-boot", order: 5 },
  { id: "configuration", title: "設定", description: "application.propertiesとプロファイル", category: "spring-boot", order: 6 },
  { id: "validation", title: "バリデーション", description: "@Valid・Bean Validationによる入力検証", category: "spring-boot", order: 7 },
  { id: "error-handling", title: "エラーハンドリング", description: "@ExceptionHandlerによるエラー処理", category: "spring-boot", order: 8 },
];

// ── Spring MVC (8) ──────────────────────────────────────────────────────────────
const SPRING_MVC_LESSONS: Lesson[] = [
  { id: "architecture", title: "MVCアーキテクチャ", description: "Spring MVCのリクエスト処理フロー", category: "spring-mvc", order: 1 },
  { id: "controllers", title: "コントローラ", description: "@Controllerとビューの返却", category: "spring-mvc", order: 2 },
  { id: "thymeleaf", title: "Thymeleaf", description: "Thymeleafテンプレートエンジンの使い方", category: "spring-mvc", order: 3 },
  { id: "form-handling", title: "フォーム処理", description: "フォームデータの受け取りとバインディング", category: "spring-mvc", order: 4 },
  { id: "session-cookie", title: "セッション・Cookie", description: "セッション管理とCookieの扱い", category: "spring-mvc", order: 5 },
  { id: "interceptor", title: "インターセプタ", description: "HandlerInterceptorによる前後処理", category: "spring-mvc", order: 6 },
  { id: "file-upload", title: "ファイルアップロード", description: "MultipartFileによるファイルアップロード", category: "spring-mvc", order: 7 },
  { id: "security-basics", title: "セキュリティ基礎", description: "Spring Securityの基本設定", category: "spring-mvc", order: 8 },
];

// ── JPA & Database (8) ──────────────────────────────────────────────────────────
const JPA_LESSONS: Lesson[] = [
  { id: "introduction", title: "JPA入門", description: "JPAの概要とエンティティの基本", category: "jpa", order: 1 },
  { id: "entity", title: "エンティティ", description: "@Entityと@Id・@Columnのマッピング", category: "jpa", order: 2 },
  { id: "repository", title: "リポジトリ", description: "JpaRepositoryによるCRUD操作", category: "jpa", order: 3 },
  { id: "query-methods", title: "クエリメソッド", description: "メソッド名からの自動クエリ生成", category: "jpa", order: 4 },
  { id: "jpql", title: "JPQL", description: "@QueryによるJPQLカスタムクエリ", category: "jpa", order: 5 },
  { id: "relationships", title: "リレーション", description: "@OneToMany・@ManyToOneなどの関連マッピング", category: "jpa", order: 6 },
  { id: "transactions", title: "トランザクション", description: "@Transactionalによるトランザクション管理", category: "jpa", order: 7 },
  { id: "h2-database", title: "H2データベース", description: "組み込みH2データベースでの開発・テスト", category: "jpa", order: 8 },
];

// ── JUnit (6) ───────────────────────────────────────────────────────────────────
const JUNIT_LESSONS: Lesson[] = [
  { id: "basics", title: "JUnit 5の基本", description: "@Testアノテーションとテストメソッドの作成", category: "junit", order: 1 },
  { id: "assertions", title: "アサーション", description: "assertEquals・assertTrue・assertThrowsの使い方", category: "junit", order: 2 },
  { id: "lifecycle", title: "ライフサイクル", description: "@BeforeEach・@AfterEach・@BeforeAllの使い方", category: "junit", order: 3 },
  { id: "parameterized", title: "パラメータ化テスト", description: "@ParameterizedTestによるデータ駆動テスト", category: "junit", order: 4 },
  { id: "mockito", title: "Mockito", description: "Mockitoを使ったモックテスト", category: "junit", order: 5 },
  { id: "test-patterns", title: "テストパターン", description: "Arrange-Act-Assert・テスト設計のベストプラクティス", category: "junit", order: 6 },
];

// ── Debug (5) ───────────────────────────────────────────────────────────────────
const DEBUG_LESSONS: Lesson[] = [
  { id: "println-debug", title: "printlnデバッグ", description: "System.out.printlnによる基本的なデバッグ", category: "debug", order: 1 },
  { id: "ide-debugger", title: "IDEデバッガ", description: "ブレークポイント・ステップ実行・変数監視", category: "debug", order: 2 },
  { id: "stack-trace", title: "スタックトレース", description: "例外のスタックトレースの読み方", category: "debug", order: 3 },
  { id: "logging", title: "ロギング", description: "SLF4J・Logbackによるログ出力", category: "debug", order: 4 },
  { id: "common-errors", title: "よくあるエラー", description: "NullPointerException・ClassCastExceptionなどの対処法", category: "debug", order: 5 },
];

// ── Exceptions (6) ──────────────────────────────────────────────────────────────
const EXCEPTIONS_LESSONS: Lesson[] = [
  { id: "try-catch", title: "try-catch", description: "例外処理の基本構文と使い方", category: "exceptions", order: 1 },
  { id: "finally", title: "finally", description: "finallyブロックとtry-with-resources", category: "exceptions", order: 2 },
  { id: "throw-throws", title: "throw・throws", description: "例外を投げる方法と宣言", category: "exceptions", order: 3 },
  { id: "checked-unchecked", title: "検査例外・非検査例外", description: "CheckedとUncheckedException の違い", category: "exceptions", order: 4 },
  { id: "custom-exceptions", title: "カスタム例外", description: "独自の例外クラスの作成方法", category: "exceptions", order: 5 },
  { id: "exception-best-practices", title: "ベストプラクティス", description: "例外処理の設計指針とアンチパターン", category: "exceptions", order: 6 },
];

// ── File I/O (6) ────────────────────────────────────────────────────────────────
const FILEIO_LESSONS: Lesson[] = [
  { id: "file-read", title: "ファイル読み込み", description: "BufferedReaderとFiles.readStringによる読み込み", category: "fileio", order: 1 },
  { id: "file-write", title: "ファイル書き込み", description: "BufferedWriterとFiles.writeStringによる書き込み", category: "fileio", order: 2 },
  { id: "nio-files", title: "NIO Files", description: "java.nio.file.Filesの便利メソッド", category: "fileio", order: 3 },
  { id: "path", title: "Path", description: "Pathクラスによるファイルパスの操作", category: "fileio", order: 4 },
  { id: "serialization", title: "シリアライゼーション", description: "オブジェクトの直列化と復元", category: "fileio", order: 5 },
  { id: "json-processing", title: "JSON処理", description: "JacksonやGsonによるJSONの読み書き", category: "fileio", order: 6 },
];

// ── Threads (6) ─────────────────────────────────────────────────────────────────
const THREADS_LESSONS: Lesson[] = [
  { id: "basics", title: "スレッドの基本", description: "ThreadクラスとRunnableインターフェース", category: "threads", order: 1 },
  { id: "synchronized", title: "synchronized", description: "synchronizedキーワードによる排他制御", category: "threads", order: 2 },
  { id: "executor-service", title: "ExecutorService", description: "スレッドプールによるタスク実行", category: "threads", order: 3 },
  { id: "future-callable", title: "Future・Callable", description: "非同期タスクの結果を取得する", category: "threads", order: 4 },
  { id: "completable-future", title: "CompletableFuture", description: "非同期パイプラインの構築", category: "threads", order: 5 },
  { id: "concurrent-collections", title: "並行コレクション", description: "ConcurrentHashMap・BlockingQueueなど", category: "threads", order: 6 },
];

// ── Build Tools (5) ─────────────────────────────────────────────────────────────
const BUILD_LESSONS: Lesson[] = [
  { id: "maven-basics", title: "Maven基礎", description: "pom.xmlとMavenのプロジェクト構成", category: "build", order: 1 },
  { id: "maven-lifecycle", title: "Mavenライフサイクル", description: "compile・test・packageなどのフェーズ", category: "build", order: 2 },
  { id: "gradle-basics", title: "Gradle基礎", description: "build.gradleとGradleの基本", category: "build", order: 3 },
  { id: "dependencies", title: "依存関係管理", description: "ライブラリの追加とバージョン管理", category: "build", order: 4 },
  { id: "jar-packaging", title: "JARパッケージング", description: "実行可能JARの作成と配布", category: "build", order: 5 },
];

// ── Packages & Modules (5) ──────────────────────────────────────────────────────
const PACKAGES_LESSONS: Lesson[] = [
  { id: "package-basics", title: "パッケージの基本", description: "packageキーワードとディレクトリ構造", category: "packages", order: 1 },
  { id: "import", title: "import文", description: "他パッケージのクラスを使う方法", category: "packages", order: 2 },
  { id: "access-control", title: "アクセス制御", description: "パッケージレベルのアクセス制御", category: "packages", order: 3 },
  { id: "modules", title: "モジュール", description: "Java 9のモジュールシステム（JPMS）", category: "packages", order: 4 },
  { id: "classpath", title: "クラスパス", description: "クラスパスとクラスローディングの仕組み", category: "packages", order: 5 },
];

// ── Design Patterns (6) ─────────────────────────────────────────────────────────
const DESIGN_LESSONS: Lesson[] = [
  { id: "singleton", title: "Singletonパターン", description: "インスタンスを1つに制限するSingletonの実装", category: "design", order: 1 },
  { id: "factory", title: "Factoryパターン", description: "オブジェクト生成を抽象化するFactoryの実装", category: "design", order: 2 },
  { id: "observer", title: "Observerパターン", description: "イベント通知のためのObserverパターン", category: "design", order: 3 },
  { id: "strategy", title: "Strategyパターン", description: "アルゴリズムの切り替えを可能にするStrategy", category: "design", order: 4 },
  { id: "builder", title: "Builderパターン", description: "複雑なオブジェクト生成をステップで構築", category: "design", order: 5 },
  { id: "decorator", title: "Decoratorパターン", description: "機能を動的に追加するDecoratorの実装", category: "design", order: 6 },
];

// ── Algorithms & DS (6) ─────────────────────────────────────────────────────────
const ALGO_LESSONS: Lesson[] = [
  { id: "sorting", title: "ソートアルゴリズム", description: "バブル・マージ・クイックソートの仕組みと実装", category: "algo", order: 1 },
  { id: "searching", title: "探索アルゴリズム", description: "線形探索・二分探索の実装と使いどころ", category: "algo", order: 2 },
  { id: "stack-queue-usage", title: "スタック・キュー活用", description: "スタックとキューを使ったアルゴリズム", category: "algo", order: 3 },
  { id: "recursive-algorithms", title: "再帰アルゴリズム", description: "再帰を使った分割統治法の実装", category: "algo", order: 4 },
  { id: "dynamic-programming", title: "動的計画法", description: "メモ化と表を使った動的計画法の基礎", category: "algo", order: 5 },
  { id: "graph", title: "グラフ", description: "グラフの表現と基本的な探索アルゴリズム", category: "algo", order: 6 },
];

// ── Java Ecosystem (5) ──────────────────────────────────────────────────────────
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "java-versions", title: "Javaバージョン", description: "Java 8/11/17/21の主要な新機能", category: "ecosystem", order: 1 },
  { id: "jvm", title: "JVM", description: "Java仮想マシンの仕組みとメモリモデル", category: "ecosystem", order: 2 },
  { id: "garbage-collection", title: "ガベージコレクション", description: "GCの仕組みと主要なGCアルゴリズム", category: "ecosystem", order: 3 },
  { id: "popular-libraries", title: "主要ライブラリ", description: "Lombok・MapStruct・Apache Commonsなど", category: "ecosystem", order: 4 },
  { id: "best-practices", title: "ベストプラクティス", description: "Effective Javaの主要原則とコーディング規約", category: "ecosystem", order: 5 },
  { id: "annotations", title: "アノテーション", description: "標準アノテーション、カスタムアノテーション定義、メタアノテーション、リフレクション処理", category: "ecosystem", order: 6 },
];

// ── Category definitions ───────────────────────────────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "Java基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "cyan", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "methods", name: "メソッド", path: "/learn/methods", color: "teal", difficulty: "beginner", lessons: METHODS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "indigo", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・インターフェース", path: "/learn/inheritance", color: "violet", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "generics", name: "ジェネリクス", path: "/learn/generics", color: "pink", difficulty: "advanced", lessons: GENERICS_LESSONS },
  { id: "arrays", name: "配列・リスト", path: "/learn/arrays", color: "green", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "collections", name: "コレクション", path: "/learn/collections", color: "red", difficulty: "intermediate", lessons: COLLECTIONS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "purple", difficulty: "intermediate", lessons: STRINGS_LESSONS },
  { id: "lambda", name: "ラムダ式", path: "/learn/lambda", color: "orange", difficulty: "intermediate", lessons: LAMBDA_LESSONS },
  { id: "stream", name: "Stream API", path: "/learn/stream", color: "cyan", difficulty: "intermediate", lessons: STREAM_LESSONS },
  { id: "optional", name: "Optional", path: "/learn/optional", color: "yellow", difficulty: "intermediate", lessons: OPTIONAL_LESSONS },
  { id: "spring-boot", name: "Spring Boot", path: "/learn/spring-boot", color: "green", difficulty: "intermediate", lessons: SPRING_BOOT_LESSONS },
  { id: "spring-mvc", name: "Spring MVC", path: "/learn/spring-mvc", color: "teal", difficulty: "intermediate", lessons: SPRING_MVC_LESSONS },
  { id: "jpa", name: "JPA・データベース", path: "/learn/jpa", color: "blue", difficulty: "intermediate", lessons: JPA_LESSONS },
  { id: "junit", name: "JUnit", path: "/learn/junit", color: "orange", difficulty: "intermediate", lessons: JUNIT_LESSONS },
  { id: "debug", name: "デバッグ", path: "/learn/debug", color: "red", difficulty: "beginner", lessons: DEBUG_LESSONS },
  { id: "exceptions", name: "例外処理", path: "/learn/exceptions", color: "red", difficulty: "intermediate", lessons: EXCEPTIONS_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "indigo", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "threads", name: "マルチスレッド", path: "/learn/threads", color: "violet", difficulty: "advanced", lessons: THREADS_LESSONS },
  { id: "build", name: "Maven・Gradle", path: "/learn/build", color: "pink", difficulty: "beginner", lessons: BUILD_LESSONS },
  { id: "packages", name: "パッケージ・モジュール", path: "/learn/packages", color: "yellow", difficulty: "beginner", lessons: PACKAGES_LESSONS },
  { id: "design", name: "デザインパターン", path: "/learn/design", color: "violet", difficulty: "advanced", lessons: DESIGN_LESSONS },
  { id: "algo", name: "アルゴリズム", path: "/learn/algo", color: "cyan", difficulty: "intermediate", lessons: ALGO_LESSONS },
  { id: "ecosystem", name: "Javaエコシステム", path: "/learn/ecosystem", color: "blue", difficulty: "beginner", lessons: ECOSYSTEM_LESSONS },
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
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.lessons : [];
}

export function getLessonByPath(categoryId: string, lessonId: string): Lesson | undefined {
  const lessons = getAllLessons(categoryId);
  return lessons.find((l) => l.id === lessonId);
}
