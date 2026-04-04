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

// 1. basics - Dart基礎
const BASICS_LESSONS: Lesson[] = [
  { id: "hello-world", title: "Hello, World!", description: "Dartで最初のプログラムを作成し、main関数とprint関数で文字を出力する方法を学びます。", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "varキーワードを使った変数宣言と代入の基本、型推論の仕組みを学びます。", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "Dartの基本的なデータ型（int、double、String、bool、List、Map、null）を学びます。", category: "basics", order: 3 },
  { id: "strings-basics", title: "文字列基礎", description: "シングルクォートとダブルクォート、文字列リテラルと基本操作を学びます。", category: "basics", order: 4 },
  { id: "numeric-types", title: "数値型", description: "int型とdouble型の特徴、数値演算とMathクラスの基本を学びます。", category: "basics", order: 5 },
  { id: "boolean", title: "論理型", description: "bool型の値（true/false）と論理演算子（&&、||、!）の使い方を学びます。", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "constとfinalを使った定数の定義方法と両者の違いを学びます。", category: "basics", order: 7 },
  { id: "type-inference", title: "型推論", description: "varキーワードによる型推論の仕組みと、明示的な型宣言の書き方を学びます。", category: "basics", order: 8 },
  { id: "operators", title: "演算子", description: "算術・比較・代入・論理・ビット演算子など、Dartで使える各種演算子を学びます。", category: "basics", order: 9 },
  { id: "input-output", title: "入出力", description: "print・stdout・stdin・stderrを使った基本的な入出力の方法を学びます。", category: "basics", order: 10 },
  { id: "comments", title: "コメント", description: "一行コメント、ブロックコメント、ドキュメントコメント（///）の書き方を学びます。", category: "basics", order: 11 },
  { id: "null-basics", title: "nullの基本", description: "Dartにおけるnullの概念と、Null Safetyが導入された背景を学びます。", category: "basics", order: 12 },
];

// 2. control - 制御構文
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本であるif-else文の構文と使い方を学びます。", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件を扱うelse ifチェーンの書き方と活用方法を学びます。", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値による多分岐処理を行うswitch文の使い方を学びます。", category: "control", order: 3 },
  { id: "switch-expression", title: "switch式", description: "Dart 3で強化されたswitch式の構文と、従来のswitch文との違いを学びます。", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "カウンタを使った繰り返し処理のforループを学びます。", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileループの使い方を学びます。", category: "control", order: 6 },
  { id: "do-while", title: "do-whileループ", description: "少なくとも一度は実行されるdo-whileループの構文を学びます。", category: "control", order: 7 },
  { id: "for-in", title: "for-inループ", description: "コレクションを簡単に反復処理するfor-inループの使い方を学びます。", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループを中断するbreakとスキップするcontinueの使い方を学びます。", category: "control", order: 9 },
  { id: "ternary", title: "三項演算子", description: "条件式を短く書ける三項演算子とNull合体演算子（??）を学びます。", category: "control", order: 10 },
];

// 3. functions - 関数
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "Dartでの関数定義と呼び出しの基本、戻り値の型宣言を学びます。", category: "functions", order: 1 },
  { id: "parameters", title: "パラメータ", description: "関数に引数を渡す方法と位置パラメータの使い方を学びます。", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "関数から値を返すreturn文と戻り値の型宣言を学びます。", category: "functions", order: 3 },
  { id: "optional-params", title: "省略可能パラメータ", description: "[]で囲む省略可能な位置パラメータの定義とデフォルト値の設定を学びます。", category: "functions", order: 4 },
  { id: "named-params", title: "名前付きパラメータ", description: "{}で囲む名前付きパラメータとrequiredキーワードの使い方を学びます。", category: "functions", order: 5 },
  { id: "arrow-functions", title: "アロー関数", description: "=>構文を使った簡潔なアロー関数の書き方と適切な使いどころを学びます。", category: "functions", order: 6 },
  { id: "higher-order", title: "高階関数", description: "関数を引数に渡したり戻り値として返したりする高階関数の概念を学びます。", category: "functions", order: 7 },
  { id: "generators", title: "ジェネレータ", description: "sync*とasync*を使った同期・非同期ジェネレータ関数の作り方を学びます。", category: "functions", order: 8 },
];

// 4. classes - クラス基礎
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったクラスの定義とインスタンスの生成方法を学びます。", category: "classes", order: 1 },
  { id: "constructors", title: "コンストラクタ", description: "デフォルトコンストラクタと名前付きコンストラクタの定義方法を学びます。", category: "classes", order: 2 },
  { id: "properties", title: "プロパティ", description: "クラスのフィールド宣言、initializing formal（this.x構文）を学びます。", category: "classes", order: 3 },
  { id: "access-control", title: "アクセス制御", description: "アンダースコアプレフィックスによるライブラリプライベートメンバーの定義を学びます。", category: "classes", order: 4 },
  { id: "getters-setters", title: "ゲッター・セッター", description: "getとsetキーワードを使ったゲッター・セッターの定義と活用方法を学びます。", category: "classes", order: 5 },
  { id: "static-members", title: "静的メンバー", description: "staticキーワードを使ったクラスメソッドとクラス変数を学びます。", category: "classes", order: 6 },
  { id: "enums", title: "列挙型（enum）", description: "enumの定義と活用方法、Dart 2.17以降の拡張enumを学びます。", category: "classes", order: 7 },
  { id: "factory-constructors", title: "ファクトリコンストラクタ", description: "factoryキーワードを使ったファクトリコンストラクタの定義と使い方を学びます。", category: "classes", order: 8 },
];

// 5. inheritance - 継承・Mixin
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "extendsキーワードを使ったクラスの継承の基本とsuperの使い方を学びます。", category: "inheritance", order: 1 },
  { id: "method-overriding", title: "メソッドのオーバーライド", description: "@overrideアノテーションを使って親クラスのメソッドを子クラスで上書きする方法を学びます。", category: "inheritance", order: 2 },
  { id: "abstract-classes", title: "抽象クラス", description: "abstractクラスと抽象メソッドを使ったインターフェース設計を学びます。", category: "inheritance", order: 3 },
  { id: "interfaces", title: "インターフェース", description: "implementsキーワードを使った暗黙的インターフェースの実装方法を学びます。", category: "inheritance", order: 4 },
  { id: "mixins", title: "Mixin", description: "withキーワードとmixinを使ったコードの再利用と多重継承的な設計を学びます。", category: "inheritance", order: 5 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "継承とインターフェースを活用したポリモーフィズムの実践的な使い方を学びます。", category: "inheritance", order: 6 },
  { id: "extensions", title: "拡張メソッド", description: "extensionキーワードを使って既存クラスにメソッドを追加する方法を学びます。", category: "inheritance", order: 7 },
];

// 6. types - 型システム
const TYPES_LESSONS: Lesson[] = [
  { id: "type-declarations", title: "型宣言", description: "Dartの静的型システムと明示的な型宣言の書き方を学びます。", category: "types", order: 1 },
  { id: "generics-basics", title: "ジェネリクス基礎", description: "型パラメータを使ったジェネリクスの基本概念とList<T>の使い方を学びます。", category: "types", order: 2 },
  { id: "typedef", title: "typedef", description: "typedefを使って関数型や複雑な型に別名を付ける方法を学びます。", category: "types", order: 3 },
  { id: "type-check", title: "型チェック", description: "isとis!演算子を使った実行時の型チェックの方法を学びます。", category: "types", order: 4 },
  { id: "type-cast", title: "型キャスト", description: "as演算子を使った明示的な型キャストと安全なキャスト方法を学びます。", category: "types", order: 5 },
  { id: "null-safety-types", title: "Null Safety型", description: "nullable型（T?）とnon-nullable型の違いと型システムの整合性を学びます。", category: "types", order: 6 },
  { id: "pattern-types", title: "パターン型", description: "Dart 3で導入されたパターンマッチングと型の絞り込みを学びます。", category: "types", order: 7 },
];

// 7. collections - コレクション
const COLLECTIONS_LESSONS: Lesson[] = [
  { id: "list-basics", title: "リスト", description: "Listの作成・追加・削除・アクセスなどの基本操作を学びます。", category: "collections", order: 1 },
  { id: "set-basics", title: "セット", description: "重複を許さないSetの特徴と基本的な操作方法を学びます。", category: "collections", order: 2 },
  { id: "map-basics", title: "マップ", description: "キーと値のペアを扱うMapの作成と操作方法を学びます。", category: "collections", order: 3 },
  { id: "iterable", title: "イテラブル", description: "Iterableインターフェースと繰り返し処理の抽象化を学びます。", category: "collections", order: 4 },
  { id: "spread-operator", title: "スプレッド演算子", description: "...と...?を使ったコレクションのスプレッドとnullスプレッドを学びます。", category: "collections", order: 5 },
  { id: "collection-operations", title: "コレクション操作", description: "コレクションリテラル内のif・forを使った条件付き要素追加を学びます。", category: "collections", order: 6 },
  { id: "sorting", title: "ソート", description: "sortメソッドとComparatorを使ったリストのソート方法を学びます。", category: "collections", order: 7 },
  { id: "where-map-reduce", title: "where・map・reduce", description: "Iterableのwhere・map・reduceメソッドを使った関数型コレクション操作を学びます。", category: "collections", order: 8 },
];

// 8. strings - 文字列操作
const STRINGS_LESSONS: Lesson[] = [
  { id: "string-basics", title: "文字列基礎", description: "Stringクラスの基本と文字列の不変性、生文字列（r''）の使い方を学びます。", category: "strings", order: 1 },
  { id: "interpolation", title: "文字列補間", description: "$変数と${式}を使ったDart固有の文字列補間の書き方を学びます。", category: "strings", order: 2 },
  { id: "string-methods", title: "文字列メソッド", description: "contains・split・trim・replaceAll・substringなど主要なStringメソッドを学びます。", category: "strings", order: 3 },
  { id: "regex-basics", title: "正規表現基礎", description: "RegExpクラスを使った基本的なパターンマッチングの方法を学びます。", category: "strings", order: 4 },
  { id: "string-buffer", title: "StringBuffer", description: "StringBufferを使った効率的な文字列構築とwriteメソッドを学びます。", category: "strings", order: 5 },
  { id: "unicode", title: "Unicode", description: "DartのUnicodeサポートとRunes・graphemeClustersを使った文字列処理を学びます。", category: "strings", order: 6 },
];

// 9. null-safety - Null Safety
const NULL_SAFETY_LESSONS: Lesson[] = [
  { id: "null-safety-basics", title: "Null Safetyの基本", description: "Dart 2.12で導入されたNull Safetyの概念とその恩恵を学びます。", category: "null-safety", order: 1 },
  { id: "nullable-types", title: "Nullable型", description: "T?構文でnullを許容する型を宣言する方法と使い方を学びます。", category: "null-safety", order: 2 },
  { id: "assertion-operator", title: "Nullアサーション演算子", description: "!演算子を使ってnullableな値をnon-nullableとして扱う方法と注意点を学びます。", category: "null-safety", order: 3 },
  { id: "conditional-access", title: "条件付きアクセス", description: "?.演算子を使ってnullの場合にアクセスをスキップする方法を学びます。", category: "null-safety", order: 4 },
  { id: "null-coalescing", title: "Null合体演算子", description: "??と??=を使ったnullのフォールバック値の設定方法を学びます。", category: "null-safety", order: 5 },
  { id: "late-modifier", title: "lateモディファイア", description: "lateキーワードを使った遅延初期化と循環参照の解決方法を学びます。", category: "null-safety", order: 6 },
];

// 10. async - 非同期処理
const ASYNC_LESSONS: Lesson[] = [
  { id: "future-basics", title: "Future基礎", description: "非同期処理の結果を表すFutureの基本概念とthen・catchErrorを学びます。", category: "async", order: 1 },
  { id: "async-await", title: "async/await", description: "asyncとawaitキーワードを使った非同期処理の同期的な記述方法を学びます。", category: "async", order: 2 },
  { id: "stream-basics", title: "Stream基礎", description: "時系列データを扱うStreamの基本概念とlistenメソッドを学びます。", category: "async", order: 3 },
  { id: "stream-controller", title: "StreamController", description: "StreamControllerを使ってカスタムStreamを作成する方法を学びます。", category: "async", order: 4 },
  { id: "error-handling", title: "非同期エラー処理", description: "FutureとStreamでのエラーハンドリングのベストプラクティスを学びます。", category: "async", order: 5 },
  { id: "parallel", title: "並列処理", description: "Future.wait・Future.anyを使った複数のFutureの並列実行を学びます。", category: "async", order: 6 },
  { id: "completer", title: "Completer", description: "Completerを使ってFutureを手動で完了させる方法と適切なユースケースを学びます。", category: "async", order: 7 },
  { id: "isolate-basics", title: "Isolate入門", description: "Dartの並行処理の仕組みであるIsolateの基本概念とcompute関数を学びます。", category: "async", order: 8 },
];

// 11. error - エラー処理
const ERROR_LESSONS: Lesson[] = [
  { id: "try-catch", title: "try-catch文", description: "try・catch・onキーワードを使った例外処理の基本を学びます。", category: "error", order: 1 },
  { id: "exception-class", title: "例外クラス", description: "DartのException・Errorクラス階層と組み込みの例外クラスを学びます。", category: "error", order: 2 },
  { id: "custom-exceptions", title: "カスタム例外", description: "Exceptionを実装したカスタム例外クラスの定義と使い方を学びます。", category: "error", order: 3 },
  { id: "error-vs-exception", title: "ErrorとException", description: "回復不可能なErrorと回復可能なExceptionの違いと使い分けを学びます。", category: "error", order: 4 },
  { id: "finally", title: "finally節", description: "例外の有無にかかわらず実行されるfinally節の使い方を学びます。", category: "error", order: 5 },
  { id: "stack-trace", title: "スタックトレース", description: "StackTraceオブジェクトを使ったエラーの原因追跡とデバッグ方法を学びます。", category: "error", order: 6 },
];

// 12. fileio - ファイル・I/O
const FILEIO_LESSONS: Lesson[] = [
  { id: "file-read-write", title: "ファイルの読み書き", description: "dart:ioのFileクラスを使ったファイルの読み込みと書き込みを学びます。", category: "fileio", order: 1 },
  { id: "path-operations", title: "パス操作", description: "pathパッケージを使ったファイルパスの構築と操作方法を学びます。", category: "fileio", order: 2 },
  { id: "directories", title: "ディレクトリ操作", description: "Directoryクラスを使ったディレクトリの作成・一覧取得・削除を学びます。", category: "fileio", order: 3 },
  { id: "json-handling", title: "JSON処理", description: "dart:convertのjsonEncode・jsonDecodeを使ったJSON操作を学びます。", category: "fileio", order: 4 },
  { id: "http-basics", title: "HTTP通信", description: "httpパッケージを使ったHTTP GETとPOSTリクエストの基本を学びます。", category: "fileio", order: 5 },
  { id: "process", title: "プロセス実行", description: "Processクラスを使ってシェルコマンドや外部プロセスを実行する方法を学びます。", category: "fileio", order: 6 },
];

// 13. patterns - パターンマッチ
const PATTERNS_LESSONS: Lesson[] = [
  { id: "switch-expressions", title: "switch式の応用", description: "Dart 3のswitch式を使った値を返すパターンマッチングを学びます。", category: "patterns", order: 1 },
  { id: "pattern-basics", title: "パターンの基本", description: "定数パターン・変数パターン・ワイルドカードパターンの基本を学びます。", category: "patterns", order: 2 },
  { id: "guard-clauses", title: "ガード節", description: "whenキーワードを使ったパターンへの条件（ガード）の追加方法を学びます。", category: "patterns", order: 3 },
  { id: "destructuring", title: "分解代入", description: "リスト・マップ・オブジェクトパターンを使った分解代入の方法を学びます。", category: "patterns", order: 4 },
  { id: "record-patterns", title: "レコードパターン", description: "レコード型と組み合わせたパターンマッチングの実践的な使い方を学びます。", category: "patterns", order: 5 },
  { id: "sealed-classes", title: "sealedクラスとパターン", description: "sealedクラスとswitch式を組み合わせた網羅的なパターンマッチングを学びます。", category: "patterns", order: 6 },
];

// 14. functional - 関数型プログラミング
const FUNCTIONAL_LESSONS: Lesson[] = [
  { id: "closures", title: "クロージャ", description: "外側のスコープの変数を捕捉するクロージャの概念と実装方法を学びます。", category: "functional", order: 1 },
  { id: "function-objects", title: "関数オブジェクト", description: "関数を変数に代入したり引数として渡せるファーストクラス関数を学びます。", category: "functional", order: 2 },
  { id: "map-where-reduce", title: "map・where・reduce", description: "コレクションの変換・フィルタ・集約を行う関数型メソッドを学びます。", category: "functional", order: 3 },
  { id: "fold-operations", title: "fold操作", description: "foldメソッドを使ったコレクションの汎用的な集約パターンを学びます。", category: "functional", order: 4 },
  { id: "currying", title: "カリー化", description: "複数引数の関数を一引数関数の連鎖に変換するカリー化の実装を学びます。", category: "functional", order: 5 },
  { id: "function-composition", title: "関数合成", description: "複数の関数を組み合わせて新たな関数を作る関数合成のパターンを学びます。", category: "functional", order: 6 },
];

// 15. generics - ジェネリクス
const GENERICS_LESSONS: Lesson[] = [
  { id: "generics-basics", title: "ジェネリクスの基本", description: "型パラメータを使ったジェネリクスの概念と型安全なコードの書き方を学びます。", category: "generics", order: 1 },
  { id: "generic-classes", title: "ジェネリッククラス", description: "型パラメータを持つジェネリッククラスの定義と活用方法を学びます。", category: "generics", order: 2 },
  { id: "generic-functions", title: "ジェネリック関数", description: "型パラメータを持つジェネリック関数の定義と型推論の仕組みを学びます。", category: "generics", order: 3 },
  { id: "constraints", title: "型制約", description: "extendsキーワードを使ってジェネリクスの型パラメータに制約を設ける方法を学びます。", category: "generics", order: 4 },
  { id: "covariance", title: "共変性", description: "Dartのジェネリクスにおける共変性とout修飾子の概念を学びます。", category: "generics", order: 5 },
  { id: "practical-patterns", title: "実践的パターン", description: "Repositoryパターンなどジェネリクスを活用した実践的な設計パターンを学びます。", category: "generics", order: 6 },
];

// 16. packages - パッケージ管理
const PACKAGES_LESSONS: Lesson[] = [
  { id: "import-export", title: "import・export", description: "importとexportキーワードを使ったライブラリの読み込みと公開の基本を学びます。", category: "packages", order: 1 },
  { id: "package-management", title: "パッケージ管理", description: "pubツールを使ったパッケージの追加・更新・削除の方法を学びます。", category: "packages", order: 2 },
  { id: "pubspec-yaml", title: "pubspec.yaml", description: "プロジェクトのメタデータと依存関係を定義するpubspec.yamlの書き方を学びます。", category: "packages", order: 3 },
  { id: "pub-dev", title: "pub.dev", description: "Dartの公式パッケージリポジトリpub.devの使い方と信頼できるパッケージの選び方を学びます。", category: "packages", order: 4 },
  { id: "creating-packages", title: "パッケージの作成", description: "再利用可能なDartパッケージを作成して公開するための基本手順を学びます。", category: "packages", order: 5 },
  { id: "part-directive", title: "partディレクティブ", description: "partとpart ofを使ってライブラリを複数ファイルに分割する方法を学びます。", category: "packages", order: 6 },
];

// 17. testing - テスト
const TESTING_LESSONS: Lesson[] = [
  { id: "test-basics", title: "テストの基本", description: "testパッケージを使ったユニットテストの書き方とtestとexpectの使い方を学びます。", category: "testing", order: 1 },
  { id: "group-matchers", title: "グループとマッチャー", description: "groupで関連テストをまとめ、豊富なMatcherを使ったアサーションを学びます。", category: "testing", order: 2 },
  { id: "mocking", title: "モック", description: "mockitoパッケージを使った依存関係のモックとスタブの作り方を学びます。", category: "testing", order: 3 },
  { id: "async-testing", title: "非同期テスト", description: "FutureとStreamを含む非同期コードのテスト方法とexpectsLaterを学びます。", category: "testing", order: 4 },
  { id: "widget-test-overview", title: "ウィジェットテスト概要", description: "FlutterのウィジェットテストとDartの単体テストの関係を概観します。", category: "testing", order: 5 },
  { id: "tdd", title: "テスト駆動開発", description: "テストファーストで開発するTDDのサイクルとDartでの実践方法を学びます。", category: "testing", order: 6 },
];

// 18. oop-advanced - OOP応用
const OOP_ADVANCED_LESSONS: Lesson[] = [
  { id: "design-patterns", title: "デザインパターン概要", description: "GoFのデザインパターンの分類とDartでの活用シーンを概観します。", category: "oop-advanced", order: 1 },
  { id: "singleton", title: "シングルトン", description: "ファクトリコンストラクタを使ってDartでシングルトンパターンを実装する方法を学びます。", category: "oop-advanced", order: 2 },
  { id: "factory-pattern", title: "ファクトリパターン", description: "オブジェクト生成を抽象化するファクトリパターンのDartでの実装を学びます。", category: "oop-advanced", order: 3 },
  { id: "observer", title: "オブザーバーパターン", description: "StreamとStreamControllerを使ったオブザーバーパターンの実装を学びます。", category: "oop-advanced", order: 4 },
  { id: "strategy", title: "ストラテジーパターン", description: "アルゴリズムを交換可能にするストラテジーパターンのDartでの実装を学びます。", category: "oop-advanced", order: 5 },
  { id: "dependency-injection", title: "依存性注入", description: "コンストラクタインジェクションによる依存性注入の実践と利点を学びます。", category: "oop-advanced", order: 6 },
];

// 19. dart3 - Dart 3新機能
const DART3_LESSONS: Lesson[] = [
  { id: "records", title: "レコード型", description: "Dart 3で導入された不変な匿名複合値型であるRecordの定義と使い方を学びます。", category: "dart3", order: 1 },
  { id: "patterns-advanced", title: "パターン（応用）", description: "Dart 3の高度なパターンマッチング機能とその実践的な活用方法を学びます。", category: "dart3", order: 2 },
  { id: "sealed-class", title: "sealedクラス", description: "sealedキーワードで継承を同一ライブラリに限定し網羅的な分岐を実現する方法を学びます。", category: "dart3", order: 3 },
  { id: "class-modifiers", title: "クラスモディファイア", description: "base・interface・final・mixinなどDart 3の新しいクラス修飾子を学びます。", category: "dart3", order: 4 },
  { id: "switch-expressions-advanced", title: "switch式（応用）", description: "switch式の高度なパターン、ガード節、複数パターンマッチングを学びます。", category: "dart3", order: 5 },
  { id: "breaking-changes", title: "破壊的変更と移行", description: "Dart 3の破壊的変更点とDart 2からのマイグレーション方法を学びます。", category: "dart3", order: 6 },
];

// 20. regex - 正規表現
const REGEX_LESSONS: Lesson[] = [
  { id: "regex-fundamentals", title: "正規表現の基礎", description: "正規表現のメタ文字・量指定子・文字クラスなど基本構文を学びます。", category: "regex", order: 1 },
  { id: "regexp-class", title: "RegExpクラス", description: "DartのRegExpクラスの作成・コンパイルオプション・Matchオブジェクトを学びます。", category: "regex", order: 2 },
  { id: "pattern-matching", title: "パターンマッチング", description: "hasMatch・firstMatch・allMatchesを使った正規表現によるテキスト検索を学びます。", category: "regex", order: 3 },
  { id: "replacement", title: "置換", description: "replaceFirstとreplaceAllMappedを使った正規表現による文字列置換を学びます。", category: "regex", order: 4 },
  { id: "practical-patterns", title: "実践的なパターン", description: "メールアドレス・URL・電話番号など実用的な正規表現パターンの作成を学びます。", category: "regex", order: 5 },
];

// 21. debug - デバッグ
const DEBUG_LESSONS: Lesson[] = [
  { id: "print-debug", title: "printデバッグ", description: "printとdebugPrintを使った基本的なデバッグ出力の方法を学びます。", category: "debug", order: 1 },
  { id: "devtools", title: "Dart DevTools", description: "Dart DevToolsを使ったメモリ・CPU・ネットワークのプロファイリング方法を学びます。", category: "debug", order: 2 },
  { id: "assertions", title: "アサーション", description: "assertを使った開発時の前提条件チェックと実行時検証を学びます。", category: "debug", order: 3 },
  { id: "logging", title: "ロギング", description: "dart:developerのlogとloggingパッケージを使った構造化ロギングを学びます。", category: "debug", order: 4 },
  { id: "profiling", title: "パフォーマンス計測", description: "StopwatchとDevToolsを使ったDartコードのパフォーマンス計測方法を学びます。", category: "debug", order: 5 },
];

// 22. security - セキュリティ
const SECURITY_LESSONS: Lesson[] = [
  { id: "input-validation", title: "入力バリデーション", description: "ユーザー入力の検証とサニタイズによるインジェクション攻撃への対策を学びます。", category: "security", order: 1 },
  { id: "encryption", title: "暗号化", description: "pointycasleパッケージを使ったデータの暗号化・復号化の基本を学びます。", category: "security", order: 2 },
  { id: "http-security", title: "HTTPセキュリティ", description: "HTTPS通信・証明書の検証・セキュアなHTTPヘッダーの設定方法を学びます。", category: "security", order: 3 },
  { id: "secure-coding", title: "セキュアコーディング", description: "センシティブデータの扱い方とDartでのセキュアコーディングのベストプラクティスを学びます。", category: "security", order: 4 },
  { id: "dependency-management", title: "依存関係の安全管理", description: "pubパッケージの脆弱性確認と依存関係のセキュリティ管理方法を学びます。", category: "security", order: 5 },
];

// 23. flutter-intro - Flutter入門
const FLUTTER_INTRO_LESSONS: Lesson[] = [
  { id: "flutter-overview", title: "Flutterの概要", description: "DartとFlutterの関係、Flutterの特徴であるウィジェットツリーとレンダリングを学びます。", category: "flutter-intro", order: 1 },
  { id: "widget-basics", title: "ウィジェット基礎", description: "Flutterのすべての要素であるウィジェットの概念と基本的な種類を学びます。", category: "flutter-intro", order: 2 },
  { id: "stateless-widget", title: "StatelessWidget", description: "状態を持たないStatelessWidgetの定義とbuildメソッドの実装を学びます。", category: "flutter-intro", order: 3 },
  { id: "stateful-widget", title: "StatefulWidget", description: "状態を管理するStatefulWidgetとStateクラスのライフサイクルを学びます。", category: "flutter-intro", order: 4 },
  { id: "layout", title: "レイアウト", description: "Row・Column・Stack・Expandedを使ったFlutterのレイアウト構築方法を学びます。", category: "flutter-intro", order: 5 },
  { id: "material-design", title: "Material Design", description: "MaterialAppとScaffoldを使ったMaterial Designに沿ったUIの作成を学びます。", category: "flutter-intro", order: 6 },
];

// 24. server - サーバーサイドDart
const SERVER_LESSONS: Lesson[] = [
  { id: "dart-io", title: "dart:io基礎", description: "dart:ioを使ったソケット通信・プロセス管理などサーバーサイドの基本を学びます。", category: "server", order: 1 },
  { id: "http-server", title: "HTTPサーバー", description: "dart:ioのHttpServerクラスを使った基本的なHTTPサーバーの構築を学びます。", category: "server", order: 2 },
  { id: "shelf-framework", title: "Shelfフレームワーク", description: "Dartのサーバーフレームワークshelfを使ったルーティングとミドルウェアを学びます。", category: "server", order: 3 },
  { id: "grpc-overview", title: "gRPC概要", description: "DartでgRPCサービスを定義・実装するための基本的な手順を学びます。", category: "server", order: 4 },
  { id: "cli-development", title: "CLIツール開発", description: "argsパッケージを使ったコマンドライン引数の解析とCLIツールの作成を学びます。", category: "server", order: 5 },
];

// 25. ecosystem - Dartエコシステム
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "dart-sdk", title: "Dart SDK", description: "Dart SDKの構成・dartコマンド・コンパイラとVM・開発ツールの全体像を学びます。", category: "ecosystem", order: 1 },
  { id: "pub-dev-ecosystem", title: "pub.devエコシステム", description: "pub.devの人気パッケージカテゴリと信頼性の高いパッケージの選定基準を学びます。", category: "ecosystem", order: 2 },
  { id: "official-tools", title: "公式ツール", description: "dart fix・dart format・dart analyze・dart docなどDart公式ツール群の使い方を学びます。", category: "ecosystem", order: 3 },
  { id: "community", title: "コミュニティとリソース", description: "Dart公式ドキュメント・DartPad・コミュニティフォーラムなど学習リソースを学びます。", category: "ecosystem", order: 4 },
  { id: "version-management", title: "バージョン管理", description: "Dartのバージョン管理戦略とFVMを使った複数バージョンの切り替え方を学びます。", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "basics",
    name: "Dart基礎",
    path: "basics",
    color: "blue",
    difficulty: "beginner",
    lessons: BASICS_LESSONS,
  },
  {
    id: "control",
    name: "制御構文",
    path: "control",
    color: "green",
    difficulty: "beginner",
    lessons: CONTROL_LESSONS,
  },
  {
    id: "functions",
    name: "関数",
    path: "functions",
    color: "purple",
    difficulty: "beginner",
    lessons: FUNCTIONS_LESSONS,
  },
  {
    id: "classes",
    name: "クラス基礎",
    path: "classes",
    color: "orange",
    difficulty: "intermediate",
    lessons: CLASSES_LESSONS,
  },
  {
    id: "inheritance",
    name: "継承・Mixin",
    path: "inheritance",
    color: "red",
    difficulty: "intermediate",
    lessons: INHERITANCE_LESSONS,
  },
  {
    id: "types",
    name: "型システム",
    path: "types",
    color: "teal",
    difficulty: "intermediate",
    lessons: TYPES_LESSONS,
  },
  {
    id: "collections",
    name: "コレクション",
    path: "collections",
    color: "cyan",
    difficulty: "beginner",
    lessons: COLLECTIONS_LESSONS,
  },
  {
    id: "strings",
    name: "文字列操作",
    path: "strings",
    color: "yellow",
    difficulty: "beginner",
    lessons: STRINGS_LESSONS,
  },
  {
    id: "null-safety",
    name: "Null Safety",
    path: "null-safety",
    color: "indigo",
    difficulty: "intermediate",
    lessons: NULL_SAFETY_LESSONS,
  },
  {
    id: "async",
    name: "非同期処理",
    path: "async",
    color: "violet",
    difficulty: "intermediate",
    lessons: ASYNC_LESSONS,
  },
  {
    id: "error",
    name: "エラー処理",
    path: "error",
    color: "red",
    difficulty: "intermediate",
    lessons: ERROR_LESSONS,
  },
  {
    id: "fileio",
    name: "ファイル・I/O",
    path: "fileio",
    color: "green",
    difficulty: "intermediate",
    lessons: FILEIO_LESSONS,
  },
  {
    id: "patterns",
    name: "パターンマッチ",
    path: "patterns",
    color: "pink",
    difficulty: "intermediate",
    lessons: PATTERNS_LESSONS,
  },
  {
    id: "functional",
    name: "関数型プログラミング",
    path: "functional",
    color: "purple",
    difficulty: "intermediate",
    lessons: FUNCTIONAL_LESSONS,
  },
  {
    id: "generics",
    name: "ジェネリクス",
    path: "generics",
    color: "teal",
    difficulty: "intermediate",
    lessons: GENERICS_LESSONS,
  },
  {
    id: "packages",
    name: "パッケージ管理",
    path: "packages",
    color: "orange",
    difficulty: "beginner",
    lessons: PACKAGES_LESSONS,
  },
  {
    id: "testing",
    name: "テスト",
    path: "testing",
    color: "green",
    difficulty: "intermediate",
    lessons: TESTING_LESSONS,
  },
  {
    id: "oop-advanced",
    name: "OOP応用",
    path: "oop-advanced",
    color: "pink",
    difficulty: "advanced",
    lessons: OOP_ADVANCED_LESSONS,
  },
  {
    id: "dart3",
    name: "Dart 3新機能",
    path: "dart3",
    color: "violet",
    difficulty: "intermediate",
    lessons: DART3_LESSONS,
  },
  {
    id: "regex",
    name: "正規表現",
    path: "regex",
    color: "yellow",
    difficulty: "intermediate",
    lessons: REGEX_LESSONS,
  },
  {
    id: "debug",
    name: "デバッグ",
    path: "debug",
    color: "orange",
    difficulty: "beginner",
    lessons: DEBUG_LESSONS,
  },
  {
    id: "security",
    name: "セキュリティ",
    path: "security",
    color: "red",
    difficulty: "advanced",
    lessons: SECURITY_LESSONS,
  },
  {
    id: "flutter-intro",
    name: "Flutter入門",
    path: "flutter-intro",
    color: "blue",
    difficulty: "advanced",
    lessons: FLUTTER_INTRO_LESSONS,
  },
  {
    id: "server",
    name: "サーバーサイドDart",
    path: "server",
    color: "cyan",
    difficulty: "advanced",
    lessons: SERVER_LESSONS,
  },
  {
    id: "ecosystem",
    name: "Dartエコシステム",
    path: "ecosystem",
    color: "indigo",
    difficulty: "intermediate",
    lessons: ECOSYSTEM_LESSONS,
  },
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
