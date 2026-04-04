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

// 1. basics - PHP基礎
const BASICS_LESSONS: Lesson[] = [
  { id: "hello-world", title: "Hello, World!", description: "PHPで最初のプログラムを作成し、画面に文字を出力する方法を学びます。", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "$記号を使った変数宣言と代入の基本を学びます。", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "PHPの基本的なデータ型（string、int、float、bool、array、null）を学びます。", category: "basics", order: 3 },
  { id: "strings-basics", title: "文字列基礎", description: "シングルクォートとダブルクォート、文字列の連結と変数展開を学びます。", category: "basics", order: 4 },
  { id: "numeric-types", title: "数値型", description: "int型とfloat型の特徴、数値の操作と変換方法を学びます。", category: "basics", order: 5 },
  { id: "boolean", title: "論理型", description: "bool型の値と論理演算子（&&、||、!）の使い方を学びます。", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "defineとconstを使った定数の定義方法とその違いを学びます。", category: "basics", order: 7 },
  { id: "type-casting", title: "型キャスト", description: "明示的・暗黙的な型変換とsettype関数を学びます。", category: "basics", order: 8 },
  { id: "operators", title: "演算子", description: "算術・比較・代入・論理演算子など、PHPで使える各種演算子を学びます。", category: "basics", order: 9 },
  { id: "input-output", title: "入出力", description: "echo、print、var_dump、print_rを使った出力方法を学びます。", category: "basics", order: 10 },
  { id: "comments", title: "コメント", description: "一行コメント、ブロックコメント、PHPDocの書き方を学びます。", category: "basics", order: 11 },
  { id: "superglobals", title: "スーパーグローバル", description: "$_GET、$_POST、$_SERVERなどスーパーグローバル変数の概要を学びます。", category: "basics", order: 12 },
];

// 2. control - 制御構文
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本であるif-else文の構文と使い方を学びます。", category: "control", order: 1 },
  { id: "else-if", title: "elseif", description: "複数条件を扱うelseifチェーンの書き方と活用方法を学びます。", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値による多分岐処理を行うswitch文の使い方を学びます。", category: "control", order: 3 },
  { id: "match", title: "match式", description: "PHP 8で追加されたmatch式の構文と、switchとの違いを学びます。", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "カウンタを使った繰り返し処理のforループを学びます。", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileループの使い方を学びます。", category: "control", order: 6 },
  { id: "do-while", title: "do-whileループ", description: "少なくとも一度は実行されるdo-whileループの構文を学びます。", category: "control", order: 7 },
  { id: "foreach", title: "foreach", description: "配列やオブジェクトを簡単に反復処理するforeachを学びます。", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループを中断するbreakとスキップするcontinueを学びます。", category: "control", order: 9 },
  { id: "ternary", title: "三項演算子", description: "条件式を短く書ける三項演算子とNull合体演算子を学びます。", category: "control", order: 10 },
];

// 3. functions - 関数
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "functionキーワードを使った関数の定義と呼び出しの基本を学びます。", category: "functions", order: 1 },
  { id: "parameters", title: "パラメータ", description: "関数に引数を渡す方法と型宣言付きパラメータを学びます。", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "関数から値を返すreturn文と戻り値の型宣言を学びます。", category: "functions", order: 3 },
  { id: "default-params", title: "デフォルト引数", description: "引数にデフォルト値を設定して省略可能にする方法を学びます。", category: "functions", order: 4 },
  { id: "variadic", title: "可変長引数", description: "...演算子を使って任意の数の引数を受け取る関数を学びます。", category: "functions", order: 5 },
  { id: "anonymous", title: "無名関数", description: "変数に代入できる無名関数（クロージャ）の基本を学びます。", category: "functions", order: 6 },
  { id: "arrow", title: "アロー関数", description: "fn構文を使った簡潔なアロー関数の書き方を学びます。", category: "functions", order: 7 },
  { id: "scope", title: "スコープ", description: "変数のスコープ、global文、static変数を学びます。", category: "functions", order: 8 },
];

// 4. classes - クラス基礎
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったクラスの定義とインスタンスの生成方法を学びます。", category: "classes", order: 1 },
  { id: "constructors", title: "コンストラクタ", description: "__constructメソッドを使った初期化処理の書き方を学びます。", category: "classes", order: 2 },
  { id: "properties", title: "プロパティ", description: "クラスのプロパティ宣言とコンストラクタプロモーションを学びます。", category: "classes", order: 3 },
  { id: "access-modifiers", title: "アクセス修飾子", description: "public、private、protectedの各アクセス修飾子の使い方を学びます。", category: "classes", order: 4 },
  { id: "static-members", title: "静的メンバー", description: "staticキーワードを使ったクラスメソッドとプロパティを学びます。", category: "classes", order: 5 },
  { id: "magic-methods", title: "マジックメソッド", description: "__toString、__get、__setなどのマジックメソッドを学びます。", category: "classes", order: 6 },
  { id: "cloning", title: "オブジェクトの複製", description: "cloneキーワードと__cloneメソッドによるオブジェクト複製を学びます。", category: "classes", order: 7 },
  { id: "enums", title: "列挙型（Enum）", description: "PHP 8.1で追加されたenumの定義と活用方法を学びます。", category: "classes", order: 8 },
];

// 5. inheritance - 継承・インターフェース
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "extendsキーワードを使ったクラスの継承の基本を学びます。", category: "inheritance", order: 1 },
  { id: "method-overriding", title: "メソッドのオーバーライド", description: "親クラスのメソッドを子クラスで上書きする方法を学びます。", category: "inheritance", order: 2 },
  { id: "abstract-classes", title: "抽象クラス", description: "abstractクラスと抽象メソッドを使った設計パターンを学びます。", category: "inheritance", order: 3 },
  { id: "interfaces", title: "インターフェース", description: "interfaceキーワードを使ったインターフェースの定義と実装を学びます。", category: "inheritance", order: 4 },
  { id: "traits", title: "トレイト", description: "traitを使ったコードの再利用と多重継承的な設計を学びます。", category: "inheritance", order: 5 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "継承とインターフェースを活用した多態性の概念と実践を学びます。", category: "inheritance", order: 6 },
  { id: "final", title: "Final", description: "finalキーワードによる継承・オーバーライドの制限方法を学びます。", category: "inheritance", order: 7 },
  { id: "instanceof", title: "型の判定", description: "instanceof演算子を使った型チェックの方法を学びます。", category: "inheritance", order: 8 },
];

// 6. types - 型システム
const TYPES_LESSONS: Lesson[] = [
  { id: "type-declarations", title: "型宣言", description: "引数・戻り値・プロパティの型宣言の書き方を学びます。", category: "types", order: 1 },
  { id: "union-types", title: "Union型", description: "複数の型を受け付けるUnion型（int|string）の使い方を学びます。", category: "types", order: 2 },
  { id: "intersection-types", title: "Intersection型", description: "複数のインターフェースを同時に満たすIntersection型を学びます。", category: "types", order: 3 },
  { id: "nullable", title: "Nullable型", description: "?を使ったnull許容型の宣言と安全なnullハンドリングを学びます。", category: "types", order: 4 },
  { id: "strict-types", title: "型の厳密化", description: "declare(strict_types=1)による厳密な型チェックを学びます。", category: "types", order: 5 },
  { id: "generics-patterns", title: "ジェネリクスパターン", description: "PHPDocを使った擬似ジェネリクスとテンプレートパターンを学びます。", category: "types", order: 6 },
];

// 7. arrays - 配列
const ARRAYS_LESSONS: Lesson[] = [
  { id: "array-basics", title: "配列の基本", description: "インデックス配列の作成、要素アクセス、追加の基本操作を学びます。", category: "arrays", order: 1 },
  { id: "associative", title: "連想配列", description: "キーと値のペアで構成される連想配列の使い方を学びます。", category: "arrays", order: 2 },
  { id: "multidimensional", title: "多次元配列", description: "配列の中に配列を持つ多次元配列の操作方法を学びます。", category: "arrays", order: 3 },
  { id: "array-operations", title: "配列操作", description: "要素の追加・削除・結合・分割など配列の操作方法を学びます。", category: "arrays", order: 4 },
  { id: "array-functions", title: "配列関数", description: "array_push、array_pop、array_mergeなど主要な配列関数を学びます。", category: "arrays", order: 5 },
  { id: "array-sorting", title: "配列ソート", description: "sort、asort、ksort、usortなど各種ソート関数を学びます。", category: "arrays", order: 6 },
  { id: "array-filtering", title: "配列フィルタ", description: "array_filter、array_unique、array_diffなどフィルタリング関数を学びます。", category: "arrays", order: 7 },
  { id: "spread-operator", title: "スプレッド演算子", description: "...演算子を使った配列の展開とマージを学びます。", category: "arrays", order: 8 },
];

// 8. strings - 文字列操作
const STRINGS_LESSONS: Lesson[] = [
  { id: "string-basics", title: "文字列基礎", description: "文字列の作成、アクセス、長さ取得など基本操作を学びます。", category: "strings", order: 1 },
  { id: "string-functions", title: "文字列関数", description: "str_replace、substr、strposなど主要な文字列関数を学びます。", category: "strings", order: 2 },
  { id: "regex-basics", title: "正規表現基礎", description: "preg_matchとpreg_replaceを使った正規表現の基本を学びます。", category: "strings", order: 3 },
  { id: "heredoc", title: "ヒアドキュメント", description: "HEREDOCとNOWDOC構文による複数行文字列の作成を学びます。", category: "strings", order: 4 },
  { id: "multibyte", title: "マルチバイト文字列", description: "mb_string関数を使った日本語文字列の正しい処理方法を学びます。", category: "strings", order: 5 },
  { id: "formatting", title: "文字列フォーマット", description: "sprintf、number_format、printf関数による書式整形を学びます。", category: "strings", order: 6 },
];

// 9. error - エラー処理
const ERROR_LESSONS: Lesson[] = [
  { id: "try-catch", title: "try-catch", description: "try-catchブロックを使った例外処理の基本を学びます。", category: "error", order: 1 },
  { id: "exception-class", title: "例外クラス", description: "Exceptionクラスの構造と主要なメソッドを学びます。", category: "error", order: 2 },
  { id: "custom-exceptions", title: "カスタム例外", description: "独自の例外クラスを作成してエラーを分類する方法を学びます。", category: "error", order: 3 },
  { id: "error-levels", title: "エラーレベル", description: "E_ERROR、E_WARNING、E_NOTICEなどPHPのエラーレベルを学びます。", category: "error", order: 4 },
  { id: "error-handling", title: "エラーハンドリング", description: "set_error_handlerとset_exception_handlerによるカスタムハンドラを学びます。", category: "error", order: 5 },
  { id: "assertions", title: "アサーション", description: "assert関数を使った事前条件チェックとデバッグ支援を学びます。", category: "error", order: 6 },
];

// 10. fileio - ファイルI/O
const FILEIO_LESSONS: Lesson[] = [
  { id: "read-files", title: "ファイル読み込み", description: "file_get_contents、fread、fgetsを使ったファイル読み込みを学びます。", category: "fileio", order: 1 },
  { id: "write-files", title: "ファイル書き込み", description: "file_put_contents、fwriteを使ったファイル書き込みを学びます。", category: "fileio", order: 2 },
  { id: "csv", title: "CSV操作", description: "fgetcsvとfputcsvを使ったCSVファイルの読み書きを学びます。", category: "fileio", order: 3 },
  { id: "json", title: "JSON操作", description: "json_encodeとjson_decodeを使ったJSONの処理を学びます。", category: "fileio", order: 4 },
  { id: "directories", title: "ディレクトリ操作", description: "mkdir、scandir、glob関数によるディレクトリ操作を学びます。", category: "fileio", order: 5 },
  { id: "streams", title: "ストリーム", description: "PHPストリームの概念とストリームラッパーの使い方を学びます。", category: "fileio", order: 6 },
];

// 11. forms - フォーム・HTTP
const FORMS_LESSONS: Lesson[] = [
  { id: "get-post", title: "GETとPOST", description: "$_GETと$_POSTを使ったフォームデータの受け取り方を学びます。", category: "forms", order: 1 },
  { id: "validation", title: "フォームバリデーション", description: "入力値の検証とサニタイズの方法を学びます。", category: "forms", order: 2 },
  { id: "file-upload", title: "ファイルアップロード", description: "$_FILESを使ったファイルアップロードの処理方法を学びます。", category: "forms", order: 3 },
  { id: "sessions", title: "セッション", description: "session_startと$_SESSIONを使ったセッション管理を学びます。", category: "forms", order: 4 },
  { id: "cookies", title: "クッキー", description: "setcookieと$_COOKIEを使ったクッキーの操作方法を学びます。", category: "forms", order: 5 },
  { id: "headers", title: "HTTPヘッダー", description: "header関数を使ったHTTPヘッダーの送信とリダイレクトを学びます。", category: "forms", order: 6 },
];

// 12. database - データベース
const DATABASE_LESSONS: Lesson[] = [
  { id: "pdo-basics", title: "PDO基礎", description: "PDOクラスを使ったデータベース接続の基本を学びます。", category: "database", order: 1 },
  { id: "crud", title: "CRUD操作", description: "SELECT、INSERT、UPDATE、DELETEの基本的なCRUD操作を学びます。", category: "database", order: 2 },
  { id: "prepared", title: "プリペアドステートメント", description: "プリペアドステートメントを使った安全なSQL実行を学びます。", category: "database", order: 3 },
  { id: "transactions", title: "トランザクション", description: "beginTransaction、commit、rollBackを使ったトランザクション管理を学びます。", category: "database", order: 4 },
  { id: "joins", title: "JOIN", description: "INNER JOIN、LEFT JOINなどテーブル結合の方法を学びます。", category: "database", order: 5 },
  { id: "pagination", title: "ページネーション", description: "LIMITとOFFSETを使ったページネーションの実装を学びます。", category: "database", order: 6 },
  { id: "migrations", title: "マイグレーション", description: "データベーススキーマの管理とマイグレーションの考え方を学びます。", category: "database", order: 7 },
  { id: "query-builder", title: "クエリビルダー", description: "安全で読みやすいクエリビルダーパターンの実装を学びます。", category: "database", order: 8 },
];

// 13. oop-advanced - OOP応用
const OOP_ADVANCED_LESSONS: Lesson[] = [
  { id: "design-basics", title: "デザインパターン基礎", description: "GoFデザインパターンの概要と分類を学びます。", category: "oop-advanced", order: 1 },
  { id: "singleton", title: "シングルトン", description: "インスタンスを1つに制限するシングルトンパターンを学びます。", category: "oop-advanced", order: 2 },
  { id: "factory", title: "ファクトリー", description: "オブジェクト生成をカプセル化するファクトリーパターンを学びます。", category: "oop-advanced", order: 3 },
  { id: "strategy", title: "ストラテジー", description: "アルゴリズムを切り替え可能にするストラテジーパターンを学びます。", category: "oop-advanced", order: 4 },
  { id: "observer", title: "オブザーバー", description: "イベント通知を実現するオブザーバーパターンを学びます。", category: "oop-advanced", order: 5 },
  { id: "dependency-injection", title: "依存性注入", description: "コンストラクタインジェクションとDIコンテナの概念を学びます。", category: "oop-advanced", order: 6 },
];

// 14. namespaces - 名前空間・Composer
const NAMESPACES_LESSONS: Lesson[] = [
  { id: "namespace-basics", title: "名前空間基礎", description: "namespaceキーワードを使った名前空間の定義と活用を学びます。", category: "namespaces", order: 1 },
  { id: "use-statement", title: "use文", description: "use文を使ったクラス・関数のインポートとエイリアスを学びます。", category: "namespaces", order: 2 },
  { id: "autoloading", title: "オートロード", description: "spl_autoload_registerとPSR-4オートロード規約を学びます。", category: "namespaces", order: 3 },
  { id: "composer-basics", title: "Composer基礎", description: "Composerを使ったパッケージ管理の基本を学びます。", category: "namespaces", order: 4 },
  { id: "package-management", title: "パッケージ管理", description: "composer.jsonの設定とパッケージのインストール・更新を学びます。", category: "namespaces", order: 5 },
];

// 15. closures - クロージャ・高階関数
const CLOSURES_LESSONS: Lesson[] = [
  { id: "closure-basics", title: "クロージャ基礎", description: "無名関数（Closure）の定義と基本的な使い方を学びます。", category: "closures", order: 1 },
  { id: "use-keyword", title: "use文（クロージャ）", description: "useキーワードで外側の変数をクロージャに取り込む方法を学びます。", category: "closures", order: 2 },
  { id: "array-map", title: "array_map", description: "array_mapを使った配列の各要素への変換処理を学びます。", category: "closures", order: 3 },
  { id: "array-filter", title: "array_filter", description: "array_filterを使った条件による配列のフィルタリングを学びます。", category: "closures", order: 4 },
  { id: "array-reduce", title: "array_reduce", description: "array_reduceを使った配列の集約処理を学びます。", category: "closures", order: 5 },
  { id: "callbacks", title: "コールバック", description: "コールバック関数とcallable型の活用方法を学びます。", category: "closures", order: 6 },
];

// 16. datetime - 日付・時刻
const DATETIME_LESSONS: Lesson[] = [
  { id: "datetime-basics", title: "DateTime基礎", description: "DateTimeクラスを使った日付・時刻の操作基本を学びます。", category: "datetime", order: 1 },
  { id: "immutable", title: "DateTimeImmutable", description: "不変な日時オブジェクトDateTimeImmutableの使い方を学びます。", category: "datetime", order: 2 },
  { id: "formatting", title: "フォーマット", description: "date関数やformat()メソッドによる日時の書式整形を学びます。", category: "datetime", order: 3 },
  { id: "timezones", title: "タイムゾーン", description: "DateTimeZoneを使ったタイムゾーンの管理と変換を学びます。", category: "datetime", order: 4 },
  { id: "intervals", title: "DateInterval", description: "DateIntervalを使った期間の計算と日付の加減算を学びます。", category: "datetime", order: 5 },
];

// 17. security - セキュリティ
const SECURITY_LESSONS: Lesson[] = [
  { id: "xss", title: "XSS対策", description: "htmlspecialcharsを使ったクロスサイトスクリプティング対策を学びます。", category: "security", order: 1 },
  { id: "sql-injection", title: "SQLインジェクション", description: "プリペアドステートメントによるSQLインジェクション防止を学びます。", category: "security", order: 2 },
  { id: "csrf", title: "CSRF対策", description: "トークンを使ったクロスサイトリクエストフォージェリ対策を学びます。", category: "security", order: 3 },
  { id: "password-hash", title: "パスワードハッシュ", description: "password_hashとpassword_verifyによる安全なパスワード管理を学びます。", category: "security", order: 4 },
  { id: "input-validation", title: "入力検証", description: "filter_input関数と検証パターンによるデータのバリデーションを学びます。", category: "security", order: 5 },
  { id: "secure-headers", title: "セキュアヘッダー", description: "セキュリティ関連のHTTPヘッダー設定とベストプラクティスを学びます。", category: "security", order: 6 },
];

// 18. testing - テスト
const TESTING_LESSONS: Lesson[] = [
  { id: "phpunit-basics", title: "PHPUnit基礎", description: "PHPUnitのインストールとテストクラスの基本的な書き方を学びます。", category: "testing", order: 1 },
  { id: "assertions", title: "アサーション", description: "assertEquals、assertTrueなど主要なアサーションメソッドを学びます。", category: "testing", order: 2 },
  { id: "mocking", title: "モック", description: "モックオブジェクトを使った依存関係のテスト手法を学びます。", category: "testing", order: 3 },
  { id: "data-providers", title: "データプロバイダー", description: "DataProviderを使ったパラメータ化テストの書き方を学びます。", category: "testing", order: 4 },
  { id: "coverage", title: "カバレッジ", description: "コードカバレッジの測定とカバレッジレポートの読み方を学びます。", category: "testing", order: 5 },
  { id: "tdd", title: "TDD", description: "テスト駆動開発（Red-Green-Refactor）のワークフローを学びます。", category: "testing", order: 6 },
];

// 19. api - API開発
const API_LESSONS: Lesson[] = [
  { id: "rest-basics", title: "REST API基礎", description: "RESTの原則とHTTPメソッドの使い分けを学びます。", category: "api", order: 1 },
  { id: "json-response", title: "JSONレスポンス", description: "json_encodeとヘッダー設定によるJSONレスポンスの返し方を学びます。", category: "api", order: 2 },
  { id: "routing", title: "ルーティング", description: "リクエストURIに基づくシンプルなルーティングの実装を学びます。", category: "api", order: 3 },
  { id: "middleware", title: "ミドルウェア", description: "リクエスト処理の前後に挟むミドルウェアパターンを学びます。", category: "api", order: 4 },
  { id: "authentication", title: "認証", description: "JWT・Bearer TokenによるAPI認証の実装パターンを学びます。", category: "api", order: 5 },
  { id: "api-design", title: "API設計", description: "バージョニング、エラーレスポンス、レート制限などAPI設計の原則を学びます。", category: "api", order: 6 },
];

// 20. modern - モダンPHP
const MODERN_LESSONS: Lesson[] = [
  { id: "php8-features", title: "PHP 8.x新機能", description: "Named arguments、Nullsafe operator、Fiberなど最新の機能を学びます。", category: "modern", order: 1 },
  { id: "named-arguments", title: "名前付き引数", description: "引数名を指定して関数を呼び出す名前付き引数の使い方を学びます。", category: "modern", order: 2 },
  { id: "fibers", title: "Fiber", description: "PHP 8.1のFiberを使った軽量な並行処理の基本を学びます。", category: "modern", order: 3 },
  { id: "attributes", title: "Attribute", description: "PHP 8のアトリビュート（#[...]）によるメタデータ付与を学びます。", category: "modern", order: 4 },
  { id: "readonly", title: "Readonly", description: "readonlyプロパティとreadonlyクラスの使い方を学びます。", category: "modern", order: 5 },
  { id: "enum-advanced", title: "列挙型活用", description: "Backed Enum、メソッド追加、インターフェース実装など列挙型の応用を学びます。", category: "modern", order: 6 },
];

// 21. collections - コレクション操作
const COLLECTIONS_LESSONS: Lesson[] = [
  { id: "iterators", title: "イテレータ", description: "Iteratorインターフェースとforeachの連携を学びます。", category: "collections", order: 1 },
  { id: "generators", title: "ジェネレータ", description: "yieldキーワードを使った遅延評価のジェネレータ関数を学びます。", category: "collections", order: 2 },
  { id: "spl-data", title: "SPLデータ構造", description: "SplStack、SplQueue、SplHeapなどSPLデータ構造を学びます。", category: "collections", order: 3 },
  { id: "collection-patterns", title: "コレクションパターン", description: "独自のCollectionクラスを実装するパターンを学びます。", category: "collections", order: 4 },
  { id: "pipeline", title: "パイプライン", description: "配列操作をチェーンするパイプラインパターンを学びます。", category: "collections", order: 5 },
];

// 22. regex - 正規表現
const REGEX_LESSONS: Lesson[] = [
  { id: "regex-fundamentals", title: "正規表現基礎", description: "正規表現の基本構文とメタ文字の使い方を学びます。", category: "regex", order: 1 },
  { id: "pattern-matching", title: "パターンマッチ", description: "preg_matchとpreg_match_allによるパターンマッチングを学びます。", category: "regex", order: 2 },
  { id: "replacement", title: "置換", description: "preg_replaceとpreg_replace_callbackによる置換処理を学びます。", category: "regex", order: 3 },
  { id: "lookahead", title: "先読み・後読み", description: "肯定・否定の先読み・後読みアサーションを学びます。", category: "regex", order: 4 },
  { id: "practical-patterns", title: "実践パターン", description: "メール、URL、電話番号など実用的な正規表現パターンを学びます。", category: "regex", order: 5 },
];

// 23. debug - デバッグ
const DEBUG_LESSONS: Lesson[] = [
  { id: "var-dump", title: "var_dump・print_r", description: "var_dump、print_r、var_exportを使ったデバッグ出力を学びます。", category: "debug", order: 1 },
  { id: "xdebug", title: "Xdebug", description: "Xdebugのインストールとブレークポイントデバッグの方法を学びます。", category: "debug", order: 2 },
  { id: "logging", title: "ログ", description: "error_log関数とPSR-3ロガーインターフェースを学びます。", category: "debug", order: 3 },
  { id: "profiling", title: "プロファイリング", description: "パフォーマンス測定とボトルネックの特定方法を学びます。", category: "debug", order: 4 },
  { id: "error-tracking", title: "エラー追跡", description: "スタックトレースの読み方とエラートラッキングツールを学びます。", category: "debug", order: 5 },
];

// 24. frameworks - フレームワーク入門
const FRAMEWORKS_LESSONS: Lesson[] = [
  { id: "mvc-concept", title: "MVC概念", description: "Model-View-Controllerパターンの概念とPHPでの実装を学びます。", category: "frameworks", order: 1 },
  { id: "laravel-intro", title: "Laravel入門", description: "Laravelの特徴、インストール、基本的なアーキテクチャを学びます。", category: "frameworks", order: 2 },
  { id: "symfony-intro", title: "Symfony入門", description: "Symfonyの特徴、コンポーネント、Bundle構造を学びます。", category: "frameworks", order: 3 },
  { id: "routing-concept", title: "ルーティング概念", description: "フレームワークにおけるルーティングの仕組みと設計を学びます。", category: "frameworks", order: 4 },
  { id: "template-engines", title: "テンプレートエンジン", description: "Blade、Twigなどテンプレートエンジンの概念と基本構文を学びます。", category: "frameworks", order: 5 },
];

// 25. ecosystem - PHPエコシステム
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "php-standards", title: "PHP標準", description: "PSR規約とPHP標準ライブラリの概要を学びます。", category: "ecosystem", order: 1 },
  { id: "php-fig", title: "PHP-FIG・PSR", description: "PHP-FIGとPSR-1、PSR-4、PSR-12などの主要な標準規約を学びます。", category: "ecosystem", order: 2 },
  { id: "php-versions", title: "PHPバージョン", description: "PHP 7.x〜8.xの主要な変更点とバージョンアップの指針を学びます。", category: "ecosystem", order: 3 },
  { id: "cms-frameworks", title: "CMS・フレームワーク比較", description: "WordPress、Laravel、Symfony、CakePHPなどの比較と選定基準を学びます。", category: "ecosystem", order: 4 },
  { id: "community", title: "コミュニティ", description: "PHPカンファレンス、Packagist、PHP Internalsなどコミュニティリソースを学びます。", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "PHP基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "green", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "functions", name: "関数", path: "/learn/functions", color: "purple", difficulty: "beginner", lessons: FUNCTIONS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "orange", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・IF", path: "/learn/inheritance", color: "red", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "types", name: "型システム", path: "/learn/types", color: "teal", difficulty: "intermediate", lessons: TYPES_LESSONS },
  { id: "arrays", name: "配列", path: "/learn/arrays", color: "cyan", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "yellow", difficulty: "beginner", lessons: STRINGS_LESSONS },
  { id: "error", name: "エラー処理", path: "/learn/error", color: "red", difficulty: "intermediate", lessons: ERROR_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "green", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "forms", name: "フォーム・HTTP", path: "/learn/forms", color: "indigo", difficulty: "intermediate", lessons: FORMS_LESSONS },
  { id: "database", name: "データベース", path: "/learn/database", color: "violet", difficulty: "intermediate", lessons: DATABASE_LESSONS },
  { id: "oop-advanced", name: "OOP応用", path: "/learn/oop-advanced", color: "pink", difficulty: "advanced", lessons: OOP_ADVANCED_LESSONS },
  { id: "namespaces", name: "名前空間・Composer", path: "/learn/namespaces", color: "teal", difficulty: "intermediate", lessons: NAMESPACES_LESSONS },
  { id: "closures", name: "クロージャ", path: "/learn/closures", color: "purple", difficulty: "intermediate", lessons: CLOSURES_LESSONS },
  { id: "datetime", name: "日付・時刻", path: "/learn/datetime", color: "orange", difficulty: "beginner", lessons: DATETIME_LESSONS },
  { id: "security", name: "セキュリティ", path: "/learn/security", color: "red", difficulty: "advanced", lessons: SECURITY_LESSONS },
  { id: "testing", name: "テスト", path: "/learn/testing", color: "green", difficulty: "intermediate", lessons: TESTING_LESSONS },
  { id: "api", name: "API開発", path: "/learn/api", color: "blue", difficulty: "advanced", lessons: API_LESSONS },
  { id: "modern", name: "モダンPHP", path: "/learn/modern", color: "violet", difficulty: "intermediate", lessons: MODERN_LESSONS },
  { id: "collections", name: "コレクション操作", path: "/learn/collections", color: "cyan", difficulty: "advanced", lessons: COLLECTIONS_LESSONS },
  { id: "regex", name: "正規表現", path: "/learn/regex", color: "yellow", difficulty: "intermediate", lessons: REGEX_LESSONS },
  { id: "debug", name: "デバッグ", path: "/learn/debug", color: "orange", difficulty: "beginner", lessons: DEBUG_LESSONS },
  { id: "frameworks", name: "フレームワーク入門", path: "/learn/frameworks", color: "pink", difficulty: "advanced", lessons: FRAMEWORKS_LESSONS },
  { id: "ecosystem", name: "PHPエコシステム", path: "/learn/ecosystem", color: "indigo", difficulty: "intermediate", lessons: ECOSYSTEM_LESSONS },
];

export function getAllLessons(categoryId: string): Lesson[] {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  return category ? category.lessons : [];
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner": return "初級";
    case "intermediate": return "中級";
    case "advanced": return "上級";
  }
}
