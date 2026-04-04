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
  { id: "hello-world", title: "Hello World", description: "最初のSwiftプログラム", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "varによる変数宣言", category: "basics", order: 2 },
  { id: "constants", title: "定数", description: "letによる定数宣言", category: "basics", order: 3 },
  { id: "data-types", title: "データ型", description: "Int・Double・String・Bool・Character", category: "basics", order: 4 },
  { id: "type-annotations", title: "型アノテーション", description: "コロンによる明示的型宣言", category: "basics", order: 5 },
  { id: "operators", title: "演算子", description: "算術・比較・論理・範囲演算子", category: "basics", order: 6 },
  { id: "comments", title: "コメント", description: "//・/* */・///ドキュメントコメント", category: "basics", order: 7 },
  { id: "print-function", title: "print関数", description: "print()・文字列補間・separator・terminator", category: "basics", order: 8 },
  { id: "boolean", title: "真偽値", description: "true/false・Bool型・論理演算子", category: "basics", order: 9 },
  { id: "numeric-types", title: "数値型", description: "Int・Double・Float・型変換", category: "basics", order: 10 },
  { id: "type-conversion", title: "型変換", description: "Int()・Double()・String()・明示的キャスト", category: "basics", order: 11 },
  { id: "string-basics", title: "文字列の基本", description: "Stringリテラル・連結・isEmpty", category: "basics", order: 12 },
];

const controlLessons: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件のチェーン", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値による多分岐", category: "control", order: 3 },
  { id: "for-in", title: "for-inループ", description: "コレクションの反復処理", category: "control", order: 4 },
  { id: "while-loop", title: "whileループ", description: "条件付き繰り返し", category: "control", order: 5 },
  { id: "repeat-while", title: "repeat-while", description: "後判定ループ", category: "control", order: 6 },
  { id: "guard", title: "guard文", description: "早期リターンパターン", category: "control", order: 7 },
  { id: "break-continue", title: "break・continue", description: "ループ制御", category: "control", order: 8 },
  { id: "labeled-statements", title: "ラベル付き文", description: "ネストしたループの制御", category: "control", order: 9 },
  { id: "where-clause", title: "where句", description: "条件付きパターンマッチ", category: "control", order: 10 },
];

const functionsLessons: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "funcキーワードで関数を定義", category: "functions", order: 1 },
  { id: "parameters", title: "引数", description: "引数ラベルとパラメータ名", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "->で戻り値の型を指定", category: "functions", order: 3 },
  { id: "default-args", title: "デフォルト引数", description: "引数のデフォルト値", category: "functions", order: 4 },
  { id: "variadic", title: "可変長引数", description: "...を使った可変長引数", category: "functions", order: 5 },
  { id: "inout", title: "inout引数", description: "参照渡しで値を変更", category: "functions", order: 6 },
  { id: "function-types", title: "関数型", description: "関数を変数として扱う", category: "functions", order: 7 },
  { id: "nested-functions", title: "ネスト関数", description: "関数内に関数を定義", category: "functions", order: 8 },
];

const collectionsLessons: Lesson[] = [
  { id: "arrays", title: "配列", description: "Array型の作成と操作", category: "collections", order: 1 },
  { id: "dictionaries", title: "辞書", description: "Dictionary型のキーと値", category: "collections", order: 2 },
  { id: "sets", title: "セット", description: "Set型と集合演算", category: "collections", order: 3 },
  { id: "iteration", title: "反復処理", description: "for-inによるコレクション走査", category: "collections", order: 4 },
  { id: "transformations", title: "変換", description: "map・flatMap・compactMap", category: "collections", order: 5 },
  { id: "sorting", title: "ソート", description: "sorted・sort・カスタム比較", category: "collections", order: 6 },
  { id: "filtering", title: "フィルタリング", description: "filter・reduce・contains", category: "collections", order: 7 },
];

const stringsLessons: Lesson[] = [
  { id: "basics", title: "文字列の基本", description: "String型の作成と操作", category: "strings", order: 1 },
  { id: "interpolation", title: "文字列補間", description: "\\()で値を埋め込む", category: "strings", order: 2 },
  { id: "methods", title: "文字列メソッド", description: "uppercased・lowercased・hasPrefix等", category: "strings", order: 3 },
  { id: "substrings", title: "部分文字列", description: "Substring型とインデックス操作", category: "strings", order: 4 },
  { id: "unicode", title: "Unicode", description: "Unicode対応とCharacter操作", category: "strings", order: 5 },
  { id: "multiline", title: "複数行文字列", description: "\"\"\"による複数行リテラル", category: "strings", order: 6 },
];

const optionalsLessons: Lesson[] = [
  { id: "basics", title: "Optionalの基本", description: "nilの安全な扱い", category: "optionals", order: 1 },
  { id: "unwrapping", title: "アンラップ", description: "if letによる安全なアンラップ", category: "optionals", order: 2 },
  { id: "optional-chaining", title: "オプショナルチェーン", description: "?.による連鎖アクセス", category: "optionals", order: 3 },
  { id: "nil-coalescing", title: "Nil合体演算子", description: "??によるデフォルト値", category: "optionals", order: 4 },
  { id: "guard-let", title: "guard let", description: "早期リターンとアンラップ", category: "optionals", order: 5 },
  { id: "force-unwrap", title: "強制アンラップ", description: "!演算子とリスク", category: "optionals", order: 6 },
  { id: "implicitly-unwrapped", title: "暗黙的アンラップ", description: "!付きOptional型", category: "optionals", order: 7 },
];

const closuresLessons: Lesson[] = [
  { id: "basics", title: "クロージャの基本", description: "{}と->による無名関数", category: "closures", order: 1 },
  { id: "trailing-syntax", title: "末尾クロージャ構文", description: "引数後ろのクロージャ省略", category: "closures", order: 2 },
  { id: "capture-lists", title: "キャプチャリスト", description: "変数のキャプチャ方法", category: "closures", order: 3 },
  { id: "escaping", title: "エスケープクロージャ", description: "@escapingとライフタイム", category: "closures", order: 4 },
  { id: "autoclosure", title: "オートクロージャ", description: "@autoclosureによる遅延評価", category: "closures", order: 5 },
  { id: "higher-order", title: "高階関数", description: "map・filter・reduceの活用", category: "closures", order: 6 },
  { id: "shorthand", title: "省略記法", description: "$0・$1による引数省略", category: "closures", order: 7 },
];

const structsLessons: Lesson[] = [
  { id: "basics", title: "構造体の基本", description: "structキーワードで定義", category: "structs", order: 1 },
  { id: "properties", title: "プロパティ", description: "ストアドプロパティの定義", category: "structs", order: 2 },
  { id: "methods", title: "メソッド", description: "構造体に関数を追加", category: "structs", order: 3 },
  { id: "initializers", title: "イニシャライザ", description: "initによる初期化", category: "structs", order: 4 },
  { id: "memberwise-init", title: "メンバーワイズイニシャライザ", description: "自動生成される初期化", category: "structs", order: 5 },
  { id: "mutating", title: "mutatingメソッド", description: "構造体の値を変更するメソッド", category: "structs", order: 6 },
  { id: "computed-properties", title: "算出プロパティ", description: "get・setによる計算値", category: "structs", order: 7 },
  { id: "property-observers", title: "プロパティオブザーバ", description: "willSet・didSetの使い方", category: "structs", order: 8 },
];

const classesLessons: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードで定義", category: "classes", order: 1 },
  { id: "inheritance", title: "継承", description: "親クラスを:で指定", category: "classes", order: 2 },
  { id: "overriding", title: "オーバーライド", description: "overrideキーワードの使い方", category: "classes", order: 3 },
  { id: "initializers", title: "イニシャライザ", description: "指定・コンビニエンスイニシャライザ", category: "classes", order: 4 },
  { id: "deinit", title: "デイニシャライザ", description: "deinitによるリソース解放", category: "classes", order: 5 },
  { id: "reference-types", title: "参照型", description: "値型との違いと注意点", category: "classes", order: 6 },
  { id: "type-casting", title: "型キャスト", description: "is・as・as?・as!の使い方", category: "classes", order: 7 },
];

const enumsLessons: Lesson[] = [
  { id: "basics", title: "列挙型の基本", description: "enumキーワードで定義", category: "enums", order: 1 },
  { id: "raw-values", title: "raw値", description: "rawValueによる値の紐付け", category: "enums", order: 2 },
  { id: "associated-values", title: "関連値", description: "ケースに付加するデータ", category: "enums", order: 3 },
  { id: "methods", title: "メソッド", description: "列挙型にメソッドを追加", category: "enums", order: 4 },
  { id: "pattern-matching", title: "パターンマッチング", description: "switchによるケース分岐", category: "enums", order: 5 },
  { id: "recursive", title: "再帰的列挙型", description: "indirectによる再帰構造", category: "enums", order: 6 },
  { id: "codable", title: "Codable対応", description: "列挙型のエンコード・デコード", category: "enums", order: 7 },
];

const protocolsLessons: Lesson[] = [
  { id: "basics", title: "プロトコルの基本", description: "protocolキーワードで定義", category: "protocols", order: 1 },
  { id: "conformance", title: "プロトコル準拠", description: "型がプロトコルを採用する", category: "protocols", order: 2 },
  { id: "protocol-extensions", title: "プロトコル拡張", description: "デフォルト実装の追加", category: "protocols", order: 3 },
  { id: "delegation", title: "デリゲートパターン", description: "delegateによる委譲", category: "protocols", order: 4 },
  { id: "associated-types", title: "関連型", description: "associatedtypeの定義と利用", category: "protocols", order: 5 },
  { id: "existential", title: "存在型", description: "anyキーワードと存在型", category: "protocols", order: 6 },
];

const extensionsLessons: Lesson[] = [
  { id: "basics", title: "拡張の基本", description: "extensionキーワードで機能追加", category: "extensions", order: 1 },
  { id: "computed-properties", title: "算出プロパティの追加", description: "既存型にプロパティを追加", category: "extensions", order: 2 },
  { id: "methods", title: "メソッドの追加", description: "既存型にメソッドを追加", category: "extensions", order: 3 },
  { id: "initializers", title: "イニシャライザの追加", description: "既存型に初期化処理を追加", category: "extensions", order: 4 },
  { id: "protocol-conformance", title: "プロトコル準拠の追加", description: "extensionでプロトコルを採用", category: "extensions", order: 5 },
  { id: "conditional", title: "条件付き拡張", description: "whereによる条件付き拡張", category: "extensions", order: 6 },
];

const genericsLessons: Lesson[] = [
  { id: "basics", title: "ジェネリクスの基本", description: "型パラメータ<T>の使い方", category: "generics", order: 1 },
  { id: "functions", title: "ジェネリック関数", description: "型に依存しない汎用関数", category: "generics", order: 2 },
  { id: "types", title: "ジェネリック型", description: "汎用的なカスタム型の定義", category: "generics", order: 3 },
  { id: "constraints", title: "型制約", description: "プロトコルによる型パラメータ制約", category: "generics", order: 4 },
  { id: "associated-types", title: "関連型との組み合わせ", description: "プロトコルとジェネリクス", category: "generics", order: 5 },
  { id: "where-clause", title: "where句", description: "複雑な型制約の表現", category: "generics", order: 6 },
];

const errorHandlingLessons: Lesson[] = [
  { id: "throwing", title: "エラーのスロー", description: "throwsとthrowキーワード", category: "error-handling", order: 1 },
  { id: "do-catch", title: "do-catch", description: "エラーのキャッチ処理", category: "error-handling", order: 2 },
  { id: "try-variants", title: "tryのバリアント", description: "try・try?・try!の違い", category: "error-handling", order: 3 },
  { id: "custom-errors", title: "カスタムエラー", description: "Errorプロトコルの実装", category: "error-handling", order: 4 },
  { id: "result-type", title: "Result型", description: "Result<Success,Failure>の活用", category: "error-handling", order: 5 },
  { id: "error-propagation", title: "エラーの伝播", description: "rethrowsによるエラー転送", category: "error-handling", order: 6 },
];

const concurrencyLessons: Lesson[] = [
  { id: "async-await", title: "async/await", description: "非同期関数の定義と呼び出し", category: "concurrency", order: 1 },
  { id: "tasks", title: "Task", description: "非同期タスクの作成と管理", category: "concurrency", order: 2 },
  { id: "actors", title: "Actor", description: "データ競合を防ぐアクター型", category: "concurrency", order: 3 },
  { id: "async-let", title: "async let", description: "並行処理の結合", category: "concurrency", order: 4 },
  { id: "task-groups", title: "TaskGroup", description: "動的な並行タスクグループ", category: "concurrency", order: 5 },
  { id: "sendable", title: "Sendable", description: "並行処理での型安全性", category: "concurrency", order: 6 },
];

const memoryLessons: Lesson[] = [
  { id: "arc-basics", title: "ARCの基本", description: "Automatic Reference Countingの仕組み", category: "memory", order: 1 },
  { id: "strong-weak-unowned", title: "strong/weak/unowned", description: "参照の種類と使い分け", category: "memory", order: 2 },
  { id: "retain-cycles", title: "循環参照", description: "メモリリークの原因と検出", category: "memory", order: 3 },
  { id: "capture-lists", title: "キャプチャリスト", description: "[weak self]と[unowned self]の使い方", category: "memory", order: 4 },
  { id: "value-vs-reference", title: "値型と参照型", description: "structとclassのメモリ挙動の違い", category: "memory", order: 5 },
];

const swiftuiLessons: Lesson[] = [
  { id: "views", title: "Viewの基本", description: "View プロトコルとbodyプロパティ", category: "swiftui", order: 1 },
  { id: "modifiers", title: "モディファイア", description: ".padding()/.font()/.foregroundColorの適用", category: "swiftui", order: 2 },
  { id: "state", title: "@State", description: "ローカル状態の管理", category: "swiftui", order: 3 },
  { id: "binding", title: "@Binding", description: "親子間のデータバインディング", category: "swiftui", order: 4 },
  { id: "observable", title: "@Observable", description: "@Observable/@Bindableによる状態管理", category: "swiftui", order: 5 },
  { id: "navigation", title: "ナビゲーション", description: "NavigationStackとNavigationLink", category: "swiftui", order: 6 },
  { id: "lists", title: "リストとForEach", description: "List/ForEachでデータを表示", category: "swiftui", order: 7 },
];

const propertyWrappersLessons: Lesson[] = [
  { id: "basics", title: "Property Wrapperの基本", description: "@propertyWrapperと wrappedValue", category: "property-wrappers", order: 1 },
  { id: "state-wrapper", title: "@Stateの内部構造", description: "@Stateがどのように機能するか", category: "property-wrappers", order: 2 },
  { id: "custom", title: "カスタムWrapper作成", description: "独自のProperty Wrapperを実装する", category: "property-wrappers", order: 3 },
  { id: "environment", title: "@Environment", description: "環境値へのアクセスと伝播", category: "property-wrappers", order: 4 },
  { id: "app-storage", title: "@AppStorage", description: "UserDefaultsとの連携", category: "property-wrappers", order: 5 },
];

const testingLessons: Lesson[] = [
  { id: "xctest-basics", title: "XCTestの基本", description: "XCTestCaseとテストメソッドの書き方", category: "testing", order: 1 },
  { id: "assertions", title: "アサーション", description: "XCTAssertEqual/True/Nil/Throwsの使い方", category: "testing", order: 2 },
  { id: "async-tests", title: "非同期テスト", description: "async/awaitを使ったテストの書き方", category: "testing", order: 3 },
  { id: "mocking", title: "モック", description: "プロトコルベースのモック実装", category: "testing", order: 4 },
  { id: "ui-testing", title: "UIテスト", description: "XCUITestでUIを自動テスト", category: "testing", order: 5 },
  { id: "tdd", title: "TDD", description: "Red-Green-RefactorサイクルによるTDD", category: "testing", order: 6 },
];

const patternsLessons: Lesson[] = [
  { id: "singleton", title: "Singleton", description: "static let sharedによる単一インスタンス", category: "patterns", order: 1 },
  { id: "observer", title: "Observer", description: "NotificationCenterとCombineによる通知", category: "patterns", order: 2 },
  { id: "mvvm", title: "MVVM", description: "Model-View-ViewModelアーキテクチャ", category: "patterns", order: 3 },
  { id: "dependency-injection", title: "依存性注入", description: "プロトコルベースのDI実装", category: "patterns", order: 4 },
  { id: "coordinator", title: "Coordinator", description: "画面遷移を管理するCoordinatorパターン", category: "patterns", order: 5 },
  { id: "factory", title: "Factory", description: "オブジェクト生成を抽象化するFactoryパターン", category: "patterns", order: 6 },
];

const spmLessons: Lesson[] = [
  { id: "basics", title: "SPMの基本", description: "swift package initとPackage.swiftの構造", category: "spm", order: 1 },
  { id: "creating-package", title: "パッケージの作成", description: "ライブラリ・実行ファイルパッケージの作成", category: "spm", order: 2 },
  { id: "dependencies", title: "依存関係の追加", description: "Package.swiftへの外部依存パッケージの追加", category: "spm", order: 3 },
  { id: "plugins", title: "プラグイン", description: "ビルドツールプラグインとコマンドプラグイン", category: "spm", order: 4 },
  { id: "targets", title: "ターゲットとプロダクト", description: "targets・products・testTargetsの設定", category: "spm", order: 5 },
];

const algorithmsLessons: Lesson[] = [
  { id: "sorting", title: "ソートアルゴリズム", description: "バブル・クイック・マージソートをSwiftで実装", category: "algorithms", order: 1 },
  { id: "searching", title: "探索アルゴリズム", description: "線形探索と二分探索の実装と比較", category: "algorithms", order: 2 },
  { id: "recursion", title: "再帰", description: "再帰関数とスタックオーバーフロー対策", category: "algorithms", order: 3 },
  { id: "stack-queue", title: "スタックとキュー", description: "配列を使ったStack・Queueの実装", category: "algorithms", order: 4 },
  { id: "linked-list", title: "連結リスト", description: "クラスによるLinkedListの実装", category: "algorithms", order: 5 },
  { id: "hash-table", title: "ハッシュテーブル", description: "DictionaryとカスタムHashableの実装", category: "algorithms", order: 6 },
];

const advancedLessons: Lesson[] = [
  { id: "result-builders", title: "Result Builder", description: "@resultBuilderでDSLを構築する", category: "advanced", order: 1 },
  { id: "macros", title: "Swiftマクロ", description: "#stringifyと@Observableマクロの仕組み", category: "advanced", order: 2 },
  { id: "keypaths", title: "KeyPath", description: "KeyPath<Root,Value>によるプロパティアクセス", category: "advanced", order: 3 },
  { id: "opaque-types", title: "Opaque型", description: "some Protocolによるopaque戻り値型", category: "advanced", order: 4 },
  { id: "existential-types", title: "Existential型", description: "any Protocolによるexistential型", category: "advanced", order: 5 },
  { id: "metatypes", title: "メタタイプ", description: "Type.self・.Type・メタタイプの活用", category: "advanced", order: 6 },
];

const iosLessons: Lesson[] = [
  { id: "app-lifecycle", title: "アプリのライフサイクル", description: "@main AppとUIApplicationDelegateの仕組み", category: "ios", order: 1 },
  { id: "uikit-basics", title: "UIKitの基本", description: "UIViewControllerとViewの階層", category: "ios", order: 2 },
  { id: "storyboard", title: "Storyboard", description: "Storyboard/XIBによるUI構築", category: "ios", order: 3 },
  { id: "auto-layout", title: "Auto Layout", description: "NSLayoutConstraintとアンカーによるレイアウト", category: "ios", order: 4 },
  { id: "table-view", title: "UITableView", description: "UITableViewDataSourceとセルの実装", category: "ios", order: 5 },
  { id: "navigation-controller", title: "UINavigationController", description: "画面遷移とナビゲーションスタック", category: "ios", order: 6 },
  { id: "core-data", title: "Core Data", description: "CoreDataスタックとNSManagedObjectの基本", category: "ios", order: 7 },
];

const ecosystemLessons: Lesson[] = [
  { id: "xcode", title: "Xcode", description: "ワークスペース・プロジェクト・スキームの構成", category: "ecosystem", order: 1 },
  { id: "debugging", title: "デバッグ", description: "LLDB・ブレークポイント・poコマンドの活用", category: "ecosystem", order: 2 },
  { id: "instruments", title: "Instruments", description: "Time Profiler・Leaks・Allocationsでプロファイリング", category: "ecosystem", order: 3 },
  { id: "swift-format", title: "コード品質ツール", description: "swift-format・SwiftLintによるコード品質管理", category: "ecosystem", order: 4 },
  { id: "ci-cd", title: "CI/CD", description: "Xcode Cloud・GitHub ActionsによるSwift CI/CD", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "basics",
    name: "Swift基礎",
    path: "/learn/basics",
    color: "blue",
    difficulty: "beginner",
    lessons: basicsLessons,
  },
  {
    id: "control",
    name: "制御構文",
    path: "/learn/control",
    color: "cyan",
    difficulty: "beginner",
    lessons: controlLessons,
  },
  {
    id: "functions",
    name: "関数",
    path: "/learn/functions",
    color: "teal",
    difficulty: "beginner",
    lessons: functionsLessons,
  },
  {
    id: "collections",
    name: "コレクション",
    path: "/learn/collections",
    color: "green",
    difficulty: "beginner",
    lessons: collectionsLessons,
  },
  {
    id: "strings",
    name: "文字列操作",
    path: "/learn/strings",
    color: "purple",
    difficulty: "beginner",
    lessons: stringsLessons,
  },
  {
    id: "optionals",
    name: "Optional型",
    path: "/learn/optionals",
    color: "pink",
    difficulty: "intermediate",
    lessons: optionalsLessons,
  },
  {
    id: "closures",
    name: "クロージャ",
    path: "/learn/closures",
    color: "violet",
    difficulty: "intermediate",
    lessons: closuresLessons,
  },
  {
    id: "structs",
    name: "構造体",
    path: "/learn/structs",
    color: "orange",
    difficulty: "intermediate",
    lessons: structsLessons,
  },
  {
    id: "classes",
    name: "クラス",
    path: "/learn/classes",
    color: "red",
    difficulty: "intermediate",
    lessons: classesLessons,
  },
  {
    id: "enums",
    name: "列挙型",
    path: "/learn/enums",
    color: "indigo",
    difficulty: "intermediate",
    lessons: enumsLessons,
  },
  {
    id: "protocols",
    name: "プロトコル",
    path: "/learn/protocols",
    color: "teal",
    difficulty: "intermediate",
    lessons: protocolsLessons,
  },
  {
    id: "extensions",
    name: "拡張",
    path: "/learn/extensions",
    color: "cyan",
    difficulty: "intermediate",
    lessons: extensionsLessons,
  },
  {
    id: "generics",
    name: "ジェネリクス",
    path: "/learn/generics",
    color: "blue",
    difficulty: "advanced",
    lessons: genericsLessons,
  },
  {
    id: "error-handling",
    name: "エラー処理",
    path: "/learn/error-handling",
    color: "orange",
    difficulty: "intermediate",
    lessons: errorHandlingLessons,
  },
  {
    id: "concurrency",
    name: "並行処理",
    path: "/learn/concurrency",
    color: "teal",
    difficulty: "advanced",
    lessons: concurrencyLessons,
  },
  {
    id: "memory",
    name: "メモリ管理",
    path: "/learn/memory",
    color: "pink",
    difficulty: "intermediate",
    lessons: memoryLessons,
  },
  {
    id: "swiftui",
    name: "SwiftUI入門",
    path: "/learn/swiftui",
    color: "blue",
    difficulty: "intermediate",
    lessons: swiftuiLessons,
  },
  {
    id: "property-wrappers",
    name: "Property Wrapper",
    path: "/learn/property-wrappers",
    color: "violet",
    difficulty: "advanced",
    lessons: propertyWrappersLessons,
  },
  {
    id: "testing",
    name: "テスト",
    path: "/learn/testing",
    color: "indigo",
    difficulty: "intermediate",
    lessons: testingLessons,
  },
  {
    id: "patterns",
    name: "デザインパターン",
    path: "/learn/patterns",
    color: "purple",
    difficulty: "advanced",
    lessons: patternsLessons,
  },
  {
    id: "spm",
    name: "Swift Package Manager",
    path: "/learn/spm",
    color: "green",
    difficulty: "intermediate",
    lessons: spmLessons,
  },
  {
    id: "algorithms",
    name: "アルゴリズム",
    path: "/learn/algorithms",
    color: "indigo",
    difficulty: "advanced",
    lessons: algorithmsLessons,
  },
  {
    id: "advanced",
    name: "上級機能",
    path: "/learn/advanced",
    color: "red",
    difficulty: "advanced",
    lessons: advancedLessons,
  },
  {
    id: "ios",
    name: "iOS開発基礎",
    path: "/learn/ios",
    color: "blue",
    difficulty: "intermediate",
    lessons: iosLessons,
  },
  {
    id: "ecosystem",
    name: "Swiftエコシステム",
    path: "/learn/ecosystem",
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
