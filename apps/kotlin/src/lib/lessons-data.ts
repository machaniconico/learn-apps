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

// 1. basics - Kotlin基礎
const BASICS_LESSONS: Lesson[] = [
  { id: "hello-world", title: "Hello, World!", description: "Kotlinで最初のプログラムを作成し、画面に文字を出力する方法を学びます。", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "varとvalを使った変数宣言と、変数への値の代入方法を学びます。", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "Kotlinの基本的なデータ型（Int、Double、String、Booleanなど）の概要を学びます。", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "Int、Long、Float、Doubleなど各数値型の特徴と使い分けを学びます。", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列基礎", description: "文字列の宣言、連結、長さ取得など文字列操作の基本を学びます。", category: "basics", order: 5 },
  { id: "boolean", title: "論理型", description: "Boolean型の値と論理演算子（&&、||、!）の使い方を学びます。", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "constとvalを使った定数の定義とその用途の違いを学びます。", category: "basics", order: 7 },
  { id: "type-inference", title: "型推論", description: "Kotlinの型推論機能を使って型注釈を省略する方法を学びます。", category: "basics", order: 8 },
  { id: "operators", title: "演算子", description: "算術・比較・代入演算子など、Kotlinで使える各種演算子を学びます。", category: "basics", order: 9 },
  { id: "input-output", title: "入出力", description: "printlnやreadLine()を使った標準入出力の基本的な操作を学びます。", category: "basics", order: 10 },
  { id: "comments", title: "コメント", description: "一行コメントとブロックコメントの書き方とKDocの基本を学びます。", category: "basics", order: 11 },
  { id: "null-basics", title: "null基礎", description: "Kotlinにおけるnullの概念とnull許容型・非null型の基本を学びます。", category: "basics", order: 12 },
];

// 2. control - 制御構文
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件分岐の基本であるif-else文の構文と使い方を学びます。", category: "control", order: 1 },
  { id: "else-if", title: "else-if", description: "複数条件を扱うelse-ifチェーンの書き方と活用方法を学びます。", category: "control", order: 2 },
  { id: "when-expression", title: "when式（基本）", description: "switch文に代わるKotlinのwhen式の基本的な使い方を学びます。", category: "control", order: 3 },
  { id: "when-advanced", title: "when式（応用）", description: "型チェックや範囲指定など、when式の高度な活用方法を学びます。", category: "control", order: 4 },
  { id: "for-loop", title: "forループ", description: "範囲やコレクションを使ったforループの繰り返し処理を学びます。", category: "control", order: 5 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileループの使い方を学びます。", category: "control", order: 6 },
  { id: "do-while", title: "do-whileループ", description: "少なくとも一度は実行されるdo-whileループの構文を学びます。", category: "control", order: 7 },
  { id: "ranges", title: "範囲（Ranges）", description: "..演算子やuntil、downToを使った範囲オブジェクトの作り方を学びます。", category: "control", order: 8 },
  { id: "break-continue", title: "break・continue", description: "ループを中断するbreakと次の繰り返しにスキップするcontinueを学びます。", category: "control", order: 9 },
  { id: "labels", title: "ラベル", description: "ネストしたループを制御するためのラベル付きbreak・continueを学びます。", category: "control", order: 10 },
];

// 3. functions - 関数
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "funキーワードを使った関数の定義と呼び出しの基本を学びます。", category: "functions", order: 1 },
  { id: "parameters", title: "パラメータ", description: "関数に引数を渡す方法と複数パラメータの扱い方を学びます。", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "関数から値を返すreturn文と戻り値の型指定を学びます。", category: "functions", order: 3 },
  { id: "default-params", title: "デフォルト引数", description: "引数にデフォルト値を設定して省略可能にする方法を学びます。", category: "functions", order: 4 },
  { id: "named-args", title: "名前付き引数", description: "引数名を指定して関数を呼び出す名前付き引数の使い方を学びます。", category: "functions", order: 5 },
  { id: "single-expression", title: "単式関数", description: "ブロックなしで1つの式を返す単式関数の簡潔な書き方を学びます。", category: "functions", order: 6 },
  { id: "varargs", title: "可変長引数", description: "varargキーワードを使って任意の数の引数を受け取る関数を学びます。", category: "functions", order: 7 },
  { id: "local-functions", title: "ローカル関数", description: "関数内に定義するローカル関数の概念と活用シーンを学びます。", category: "functions", order: 8 },
];

// 4. classes - クラス基礎
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったクラスの定義とインスタンスの生成方法を学びます。", category: "classes", order: 1 },
  { id: "constructors", title: "コンストラクタ", description: "プライマリコンストラクタとセカンダリコンストラクタの書き方を学びます。", category: "classes", order: 2 },
  { id: "properties", title: "プロパティ", description: "クラスのプロパティ宣言、getter/setterのカスタマイズ方法を学びます。", category: "classes", order: 3 },
  { id: "visibility", title: "可視性修飾子", description: "public、private、protected、internalの各可視性修飾子の使い方を学びます。", category: "classes", order: 4 },
  { id: "companion-objects", title: "コンパニオンオブジェクト", description: "companion objectを使ったクラスレベルのメンバーの定義方法を学びます。", category: "classes", order: 5 },
  { id: "init-blocks", title: "initブロック", description: "initブロックを使ったオブジェクト生成時の初期化処理の書き方を学びます。", category: "classes", order: 6 },
  { id: "inner-classes", title: "内部クラス", description: "innerキーワードを使った内部クラスとネストクラスの違いを学びます。", category: "classes", order: 7 },
  { id: "enum-classes", title: "列挙型クラス", description: "enum classを使った列挙型の定義とプロパティ・メソッドの追加を学びます。", category: "classes", order: 8 },
];

// 5. inheritance - 継承・インターフェース
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "openキーワードを使ったクラスの継承とオーバーライドの基本を学びます。", category: "inheritance", order: 1 },
  { id: "method-overriding", title: "メソッドのオーバーライド", description: "親クラスのメソッドをoverrideキーワードで上書きする方法を学びます。", category: "inheritance", order: 2 },
  { id: "abstract-classes", title: "抽象クラス", description: "abstractクラスと抽象メソッドを使った設計パターンを学びます。", category: "inheritance", order: 3 },
  { id: "interfaces", title: "インターフェース", description: "interfaceキーワードを使ったインターフェースの定義と実装を学びます。", category: "inheritance", order: 4 },
  { id: "interface-default", title: "インターフェースのデフォルト実装", description: "インターフェースにデフォルトのメソッド実装を追加する方法を学びます。", category: "inheritance", order: 5 },
  { id: "polymorphism", title: "ポリモーフィズム", description: "継承を活用した多態性の概念と実践的な使い方を学びます。", category: "inheritance", order: 6 },
  { id: "sealed-classes", title: "sealedクラス", description: "sealed classを使って継承階層を制限する方法と使いどころを学びます。", category: "inheritance", order: 7 },
  { id: "object-declarations", title: "objectキーワード", description: "object宣言を使ったシングルトンオブジェクトの作成方法を学びます。", category: "inheritance", order: 8 },
];

// 6. generics - ジェネリクス
const GENERICS_LESSONS: Lesson[] = [
  { id: "basics", title: "ジェネリクスの基本", description: "型パラメータを使った汎用的なクラスや関数の作り方を学びます。", category: "generics", order: 1 },
  { id: "generic-functions", title: "ジェネリック関数", description: "型パラメータを持つ汎用関数の定義と呼び出し方を学びます。", category: "generics", order: 2 },
  { id: "constraints", title: "型制約", description: "whereキーワードやコロン記法を使った型パラメータへの制約の設定を学びます。", category: "generics", order: 3 },
  { id: "variance", title: "変性（Variance）", description: "inとoutキーワードを使った共変・反変の概念と使い方を学びます。", category: "generics", order: 4 },
  { id: "star-projection", title: "スタープロジェクション", description: "型が不明な場合に使うスタープロジェクション（*）の使い方を学びます。", category: "generics", order: 5 },
  { id: "reified", title: "reified型パラメータ", description: "inlineとreifiedを組み合わせて実行時に型情報を保持する方法を学びます。", category: "generics", order: 6 },
];

// 7. arrays - 配列・リスト
const ARRAYS_LESSONS: Lesson[] = [
  { id: "array-basics", title: "配列の基本", description: "arrayOfや配列初期化関数を使ったKotlinの配列の作り方を学びます。", category: "arrays", order: 1 },
  { id: "array-operations", title: "配列の操作", description: "配列要素へのアクセス、更新、サイズ取得などの基本操作を学びます。", category: "arrays", order: 2 },
  { id: "list-basics", title: "リストの基本", description: "listOfを使ったイミュータブルなリストの作成と操作方法を学びます。", category: "arrays", order: 3 },
  { id: "mutable-lists", title: "ミュータブルリスト", description: "mutableListOfを使った変更可能なリストの作成と要素の追加・削除を学びます。", category: "arrays", order: 4 },
  { id: "array-list-conversion", title: "配列とリストの変換", description: "配列とリストを相互に変換するtoList()、toTypedArray()などの方法を学びます。", category: "arrays", order: 5 },
  { id: "multidimensional", title: "多次元配列", description: "二次元・多次元配列の作成方法と要素へのアクセス方法を学びます。", category: "arrays", order: 6 },
  { id: "list-operations", title: "リスト操作", description: "インデックス取得、contains、subListなどリストの便利な操作を学びます。", category: "arrays", order: 7 },
  { id: "destructuring", title: "分割代入", description: "コレクションや配列の値を複数の変数に一度に代入する分割代入を学びます。", category: "arrays", order: 8 },
];

// 8. collections - コレクション
const COLLECTIONS_LESSONS: Lesson[] = [
  { id: "set-basics", title: "Setの基本", description: "重複を許さないsetOfとmutableSetOfの使い方と特性を学びます。", category: "collections", order: 1 },
  { id: "map-basics", title: "Mapの基本", description: "キーと値のペアを扱うmapOfとmutableMapOfの使い方を学びます。", category: "collections", order: 2 },
  { id: "mutable-collections", title: "ミュータブルコレクション", description: "変更可能なSet・Mapに対する追加・削除・更新操作を学びます。", category: "collections", order: 3 },
  { id: "collection-builders", title: "コレクションビルダー", description: "buildList、buildSet、buildMapを使ったコレクション構築パターンを学びます。", category: "collections", order: 4 },
  { id: "iteration", title: "コレクションの反復処理", description: "forEach、forEachIndexed、iteratorを使ったコレクションの反復方法を学びます。", category: "collections", order: 5 },
  { id: "grouping", title: "グルーピング", description: "groupBy、partition、associateByを使ったコレクションの分類・グループ化を学びます。", category: "collections", order: 6 },
];

// 9. strings - 文字列操作
const STRINGS_LESSONS: Lesson[] = [
  { id: "string-basics", title: "文字列の基本", description: "Kotlinの文字列の内部構造と基本的なプロパティ・メソッドを学びます。", category: "strings", order: 1 },
  { id: "string-templates", title: "文字列テンプレート", description: "ドル記号変数名やドル記号{式}を使った文字列テンプレートの活用方法を学びます。", category: "strings", order: 2 },
  { id: "string-methods", title: "文字列メソッド", description: "split、replace、trim、uppercaseなど文字列操作の主要メソッドを学びます。", category: "strings", order: 3 },
  { id: "string-comparison", title: "文字列比較", description: "==演算子とequalsメソッドを使った文字列の等価・辞書順比較を学びます。", category: "strings", order: 4 },
  { id: "regex", title: "正規表現", description: "Regexクラスを使ったパターンマッチングと文字列置換の方法を学びます。", category: "strings", order: 5 },
  { id: "multiline-strings", title: "複数行文字列", description: "トリプルクォートを使った複数行文字列とtrimIndentの活用を学びます。", category: "strings", order: 6 },
];

// 10. null-safety - Null安全
const NULL_SAFETY_LESSONS: Lesson[] = [
  { id: "nullable-types", title: "Null許容型", description: "型名に?を付けてnullを許可するNull許容型の宣言と扱いを学びます。", category: "null-safety", order: 1 },
  { id: "safe-call", title: "安全呼び出し演算子", description: "?.演算子を使ってnullチェックを省略しながら安全にメソッドを呼ぶ方法を学びます。", category: "null-safety", order: 2 },
  { id: "elvis-operator", title: "エルビス演算子", description: "?:演算子を使ってnullのときにデフォルト値を返す処理を簡潔に書く方法を学びます。", category: "null-safety", order: 3 },
  { id: "not-null-assertion", title: "非nullアサーション", description: "!!演算子を使った強制的な非null化とその危険性と使いどころを学びます。", category: "null-safety", order: 4 },
  { id: "safe-cast", title: "安全なキャスト", description: "as?演算子を使ってキャスト失敗時にnullを返す安全なキャストを学びます。", category: "null-safety", order: 5 },
  { id: "platform-types", title: "プラットフォーム型", description: "JavaコードとのInteropで現れるプラットフォーム型の扱い方と注意点を学びます。", category: "null-safety", order: 6 },
];

// 11. extensions - 拡張関数
const EXTENSIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "拡張関数の基本", description: "既存クラスを変更せずにメソッドを追加できる拡張関数の書き方を学びます。", category: "extensions", order: 1 },
  { id: "extension-properties", title: "拡張プロパティ", description: "既存クラスに新しいプロパティを追加する拡張プロパティの定義方法を学びます。", category: "extensions", order: 2 },
  { id: "companion-extensions", title: "コンパニオン拡張", description: "companion objectに対して拡張関数を定義する方法とその活用を学びます。", category: "extensions", order: 3 },
  { id: "generic-extensions", title: "ジェネリック拡張関数", description: "型パラメータを持つ汎用的な拡張関数の書き方と応用を学びます。", category: "extensions", order: 4 },
  { id: "scope", title: "拡張関数のスコープ", description: "拡張関数のインポート、スコープ制限、優先順位のルールを学びます。", category: "extensions", order: 5 },
  { id: "best-practices", title: "拡張関数のベストプラクティス", description: "拡張関数を適切に使うためのガイドラインとアンチパターンを学びます。", category: "extensions", order: 6 },
];

// 12. data-sealed - データクラス・Sealed
const DATA_SEALED_LESSONS: Lesson[] = [
  { id: "data-class-basics", title: "データクラスの基本", description: "data classキーワードで自動生成されるequals・hashCode・toStringを学びます。", category: "data-sealed", order: 1 },
  { id: "copy-destructuring", title: "copy・分割代入", description: "データクラスのcopyメソッドと分割代入（component関数）の使い方を学びます。", category: "data-sealed", order: 2 },
  { id: "sealed-class-basics", title: "sealedクラスの基本", description: "sealed classを使った閉じた型階層の定義と管理方法を学びます。", category: "data-sealed", order: 3 },
  { id: "sealed-with-when", title: "sealedクラスとwhen式", description: "when式でsealed classのすべてのサブタイプを網羅的に処理する方法を学びます。", category: "data-sealed", order: 4 },
  { id: "value-classes", title: "値クラス", description: "@JvmInlineとvalue classを使ったラッパー型のインライン化を学びます。", category: "data-sealed", order: 5 },
  { id: "type-aliases", title: "型エイリアス", description: "typealiasキーワードを使って既存の型に別名をつける方法と活用を学びます。", category: "data-sealed", order: 6 },
];

// 13. lambda - ラムダ式
const LAMBDA_LESSONS: Lesson[] = [
  { id: "basics", title: "ラムダ式の基本", description: "{ }で書くラムダ式の基本構文と変数への代入方法を学びます。", category: "lambda", order: 1 },
  { id: "lambda-syntax", title: "ラムダ構文の詳細", description: "itによる暗黙のパラメータや末尾ラムダ構文などの書き方を学びます。", category: "lambda", order: 2 },
  { id: "higher-order", title: "高階関数", description: "関数を引数や戻り値として扱う高階関数の定義と活用方法を学びます。", category: "lambda", order: 3 },
  { id: "function-types", title: "関数型", description: "(Int) -> Stringのような関数型の宣言とnull許容関数型の扱い方を学びます。", category: "lambda", order: 4 },
  { id: "closures", title: "クロージャ", description: "ラムダが外部スコープの変数をキャプチャするクロージャの仕組みを学びます。", category: "lambda", order: 5 },
  { id: "inline-functions", title: "インライン関数", description: "inlineキーワードを使ってラムダのオーバーヘッドを削減する方法を学びます。", category: "lambda", order: 6 },
  { id: "it-keyword", title: "itキーワード", description: "単一引数のラムダで使える暗黙のパラメータ名itの使い方と注意点を学びます。", category: "lambda", order: 7 },
  { id: "with-apply-let", title: "with・apply・let", description: "スコープ関数with・apply・let・run・alsoの使い分けを学びます。", category: "lambda", order: 8 },
];

// 14. collection-ops - コレクション操作
const COLLECTION_OPS_LESSONS: Lesson[] = [
  { id: "filter-map", title: "filter・map", description: "filterで要素を絞り込み、mapで各要素を変換するコレクション操作を学びます。", category: "collection-ops", order: 1 },
  { id: "flatmap-zip", title: "flatMap・zip", description: "ネストしたコレクションを平坦化するflatMapと2つのリストを結合するzipを学びます。", category: "collection-ops", order: 2 },
  { id: "reduce-fold", title: "reduce・fold", description: "コレクションの要素を集約するreduceとfoldの違いと使い方を学びます。", category: "collection-ops", order: 3 },
  { id: "sorting", title: "ソート", description: "sorted、sortedBy、sortedWithを使ったコレクションの並べ替え方法を学びます。", category: "collection-ops", order: 4 },
  { id: "grouping-partition", title: "グルーピング・パーティション", description: "groupByで分類しpartitionで2つのリストに分割する操作を学びます。", category: "collection-ops", order: 5 },
  { id: "sequence-basics", title: "Sequenceの基本", description: "遅延評価を行うSequenceの作成方法と基本的な操作を学びます。", category: "collection-ops", order: 6 },
  { id: "sequence-vs-list", title: "SequenceとListの比較", description: "Sequenceと通常のListの処理の違いとパフォーマンス上の使い分けを学びます。", category: "collection-ops", order: 7 },
  { id: "custom-operators", title: "カスタム操作", description: "独自の拡張関数を使ってコレクション操作をチェーンする応用テクニックを学びます。", category: "collection-ops", order: 8 },
];

// 15. scope-functions - スコープ関数
const SCOPE_FUNCTIONS_LESSONS: Lesson[] = [
  { id: "let-function", title: "let関数", description: "オブジェクトをラムダに渡して変換・処理するlet関数の使い方を学びます。", category: "scope-functions", order: 1 },
  { id: "run-function", title: "run関数", description: "オブジェクトのスコープ内で処理しラムダの結果を返すrun関数を学びます。", category: "scope-functions", order: 2 },
  { id: "with-function", title: "with関数", description: "レシーバを明示的に渡して複数操作をまとめるwith関数の使い方を学びます。", category: "scope-functions", order: 3 },
  { id: "apply-also", title: "apply・also関数", description: "オブジェクト自身を返すapplyとalsoの使い方と使い分けを学びます。", category: "scope-functions", order: 4 },
  { id: "comparison", title: "スコープ関数の比較", description: "let・run・with・apply・alsoの違いを整理し適切に選ぶ方法を学びます。", category: "scope-functions", order: 5 },
];

// 16. coroutines - Coroutines
const COROUTINES_LESSONS: Lesson[] = [
  { id: "basics", title: "コルーチンの基本", description: "コルーチンの概念と非同期プログラミングにおける役割を学びます。", category: "coroutines", order: 1 },
  { id: "launch-async", title: "launch・async", description: "launchで起動するコルーチンとasyncで結果を返すコルーチンの違いを学びます。", category: "coroutines", order: 2 },
  { id: "suspend-functions", title: "suspend関数", description: "suspendキーワードを使った一時停止可能な関数の定義と呼び出しを学びます。", category: "coroutines", order: 3 },
  { id: "coroutine-context", title: "コルーチンコンテキスト", description: "Dispatchers.IO・Main・Defaultなどのコルーチンコンテキストとスレッド切り替えを学びます。", category: "coroutines", order: 4 },
  { id: "structured-concurrency", title: "構造化された並行処理", description: "スコープとジョブを使った構造化並行処理とキャンセルの仕組みを学びます。", category: "coroutines", order: 5 },
  { id: "channels", title: "チャネル", description: "コルーチン間でデータをやり取りするChannelの種類と使い方を学びます。", category: "coroutines", order: 6 },
  { id: "exception-handling", title: "例外処理", description: "コルーチン内でのtry-catchとCoroutineExceptionHandlerによる例外処理を学びます。", category: "coroutines", order: 7 },
  { id: "flow-intro", title: "Flow入門", description: "複数の値を非同期で流すFlowの基本概念と簡単な使い方を学びます。", category: "coroutines", order: 8 },
];

// 17. flow - Flow
const FLOW_LESSONS: Lesson[] = [
  { id: "basics", title: "Flowの基本", description: "flowビルダーを使ったFlowの作成とcollectによる収集方法を学びます。", category: "flow", order: 1 },
  { id: "flow-operators", title: "Flow演算子", description: "map・filter・transform・takeなどFlowに使える中間演算子を学びます。", category: "flow", order: 2 },
  { id: "flow-context", title: "Flowのコンテキスト", description: "flowOnを使ったFlowの実行コンテキストの切り替え方法を学びます。", category: "flow", order: 3 },
  { id: "stateflow-sharedflow", title: "StateFlow・SharedFlow", description: "状態保持のStateFlowとイベント共有のSharedFlowの違いと使い方を学びます。", category: "flow", order: 4 },
  { id: "flow-error-handling", title: "Flowのエラー処理", description: "catch演算子とretryを使ったFlowのエラーハンドリング方法を学びます。", category: "flow", order: 5 },
  { id: "flow-testing", title: "Flowのテスト", description: "turbineライブラリを使ったFlowの単体テストの書き方を学びます。", category: "flow", order: 6 },
];

// 18. testing - テスト
const TESTING_LESSONS: Lesson[] = [
  { id: "junit-basics", title: "JUnit基礎", description: "@Testアノテーションを使ったJUnit5によるKotlinの単体テストの書き方を学びます。", category: "testing", order: 1 },
  { id: "assertions", title: "アサーション", description: "assertEquals、assertTrue、assertThrowsなど主要なアサーションの使い方を学びます。", category: "testing", order: 2 },
  { id: "mocking", title: "モッキング", description: "MockKライブラリを使った依存オブジェクトのモック化とスタブの作り方を学びます。", category: "testing", order: 3 },
  { id: "coroutine-testing", title: "コルーチンのテスト", description: "runTestとTestCoroutineSchedulerを使ったコルーチンの単体テスト方法を学びます。", category: "testing", order: 4 },
  { id: "parameterized", title: "パラメータ化テスト", description: "@ParameterizedTestを使って複数のデータセットで同一テストを実行する方法を学びます。", category: "testing", order: 5 },
  { id: "test-patterns", title: "テストパターン", description: "AAA（Arrange-Act-Assert）パターンなどKotlinでよく使われるテスト設計を学びます。", category: "testing", order: 6 },
];

// 19. debug - デバッグ
const DEBUG_LESSONS: Lesson[] = [
  { id: "print-debugging", title: "printデバッグ", description: "println、print、logを活用したシンプルなprintデバッグのテクニックを学びます。", category: "debug", order: 1 },
  { id: "debugger-basics", title: "デバッガの基本", description: "IntelliJ IDEAのデバッガを使ったKotlinコードのステップ実行方法を学びます。", category: "debug", order: 2 },
  { id: "breakpoints", title: "ブレークポイント", description: "条件付きブレークポイントやログポイントを活用した効率的なデバッグを学びます。", category: "debug", order: 3 },
  { id: "coroutine-debugging", title: "コルーチンのデバッグ", description: "コルーチンダンプとDebuggerプラグインを使ったコルーチンのデバッグ方法を学びます。", category: "debug", order: 4 },
  { id: "common-errors", title: "よくあるエラーと対処法", description: "NullPointerException、ClassCastExceptionなどKotlinでよく遭遇するエラーの解決策を学びます。", category: "debug", order: 5 },
];

// 20. exceptions - 例外処理
const EXCEPTIONS_LESSONS: Lesson[] = [
  { id: "try-catch", title: "try-catch", description: "try-catch-finallyブロックを使った例外の捕捉と後処理の書き方を学びます。", category: "exceptions", order: 1 },
  { id: "throw", title: "throw式", description: "throwを使った例外のスローと例外オブジェクトの生成方法を学びます。", category: "exceptions", order: 2 },
  { id: "custom-exceptions", title: "カスタム例外", description: "Exceptionクラスを継承した独自の例外クラスを作成する方法を学びます。", category: "exceptions", order: 3 },
  { id: "checked-unchecked", title: "検査例外・非検査例外", description: "JavaとKotlinの例外体系の違いと@Throwsアノテーションの使い方を学びます。", category: "exceptions", order: 4 },
  { id: "try-as-expression", title: "try式", description: "tryを式として使って例外時の値をnullや別の値で代替する方法を学びます。", category: "exceptions", order: 5 },
  { id: "use-function", title: "use関数", description: "AutoCloseableリソースを安全に解放するuse関数の使い方を学びます。", category: "exceptions", order: 6 },
];

// 21. fileio - ファイルI/O
const FILEIO_LESSONS: Lesson[] = [
  { id: "read-files", title: "ファイルの読み込み", description: "File.readText()やreadLines()を使ったテキストファイルの読み込み方法を学びます。", category: "fileio", order: 1 },
  { id: "write-files", title: "ファイルへの書き込み", description: "File.writeText()やappendText()を使ったファイルへの書き込み方法を学びます。", category: "fileio", order: 2 },
  { id: "paths", title: "パス操作", description: "java.nio.file.Pathを使ったファイルパスの構築と操作方法を学びます。", category: "fileio", order: 3 },
  { id: "buffered-io", title: "バッファI/O", description: "BufferedReaderとBufferedWriterを使った効率的なI/O処理を学びます。", category: "fileio", order: 4 },
  { id: "file-operations", title: "ファイル操作", description: "ファイルのコピー、移動、削除、存在確認などのファイルシステム操作を学びます。", category: "fileio", order: 5 },
  { id: "resource-management", title: "リソース管理", description: "use関数とtry-with-resourcesパターンを使ったストリームの安全なクローズを学びます。", category: "fileio", order: 6 },
];

// 22. delegation - 委譲
const DELEGATION_LESSONS: Lesson[] = [
  { id: "delegation-pattern", title: "委譲パターン", description: "Kotlinでクラスの機能を別オブジェクトに委譲するデザインパターンを学びます。", category: "delegation", order: 1 },
  { id: "by-keyword", title: "byキーワード", description: "byキーワードを使ってインターフェースの実装を別クラスに委譲する方法を学びます。", category: "delegation", order: 2 },
  { id: "lazy-delegation", title: "lazyデリゲート", description: "by lazyを使って初回アクセス時に初期化される遅延プロパティの作り方を学びます。", category: "delegation", order: 3 },
  { id: "observable", title: "observableデリゲート", description: "Delegates.observableとvetoableを使ってプロパティ変更を監視する方法を学びます。", category: "delegation", order: 4 },
  { id: "map-delegation", title: "Mapへの委譲", description: "Mapにプロパティ値を格納してクラスをMapに委譲するパターンを学びます。", category: "delegation", order: 5 },
];

// 23. build - Gradle・ビルド
const BUILD_LESSONS: Lesson[] = [
  { id: "gradle-basics", title: "Gradleの基本", description: "KotlinプロジェクトにおけるGradleビルドシステムの基本構造を学びます。", category: "build", order: 1 },
  { id: "dependencies", title: "依存関係の管理", description: "build.gradle.ktsでライブラリの依存関係を追加・管理する方法を学びます。", category: "build", order: 2 },
  { id: "build-scripts", title: "ビルドスクリプト", description: "Kotlin DSLを使ったbuild.gradle.ktsの書き方とカスタムタスクの追加を学びます。", category: "build", order: 3 },
  { id: "plugins", title: "プラグイン", description: "Kotlinプラグインやその他のGradleプラグインの適用と設定方法を学びます。", category: "build", order: 4 },
  { id: "multi-module", title: "マルチモジュール", description: "大規模プロジェクト向けのGradleマルチモジュール構成の作り方を学びます。", category: "build", order: 5 },
];

// 24. design - デザインパターン
const DESIGN_LESSONS: Lesson[] = [
  { id: "singleton", title: "シングルトンパターン", description: "object宣言を使ってKotlinらしいシングルトンパターンを実装する方法を学びます。", category: "design", order: 1 },
  { id: "factory", title: "ファクトリパターン", description: "companion objectとfactory関数を使ったオブジェクト生成の委譲パターンを学びます。", category: "design", order: 2 },
  { id: "builder", title: "ビルダーパターン", description: "apply関数やDSLスタイルを活用したKotlinらしいビルダーパターンを学びます。", category: "design", order: 3 },
  { id: "observer", title: "オブザーバーパターン", description: "Delegates.observableやFlowを活用したイベント通知の実装方法を学びます。", category: "design", order: 4 },
  { id: "strategy", title: "ストラテジーパターン", description: "高階関数とラムダを使ってアルゴリズムを差し替えるストラテジーパターンを学びます。", category: "design", order: 5 },
  { id: "decorator", title: "デコレーターパターン", description: "拡張関数とインターフェース委譲を活用したデコレーターパターンの実装を学びます。", category: "design", order: 6 },
];

// 25. ecosystem - Kotlinエコシステム
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "kotlin-versions", title: "Kotlinのバージョン履歴", description: "Kotlin各バージョンで追加された主要機能とリリース履歴の概要を学びます。", category: "ecosystem", order: 1 },
  { id: "android-development", title: "Android開発", description: "KotlinをAndroid開発で使う際の基本とJetpack Composeとの連携を学びます。", category: "ecosystem", order: 2 },
  { id: "server-side", title: "サーバーサイドKotlin", description: "KtorやSpring BootなどKotlinを使ったサーバーサイド開発の概要を学びます。", category: "ecosystem", order: 3 },
  { id: "multiplatform-overview", title: "Kotlin Multiplatform", description: "iOS・Android・Webでコードを共有できるKotlin Multiplatformの仕組みを学びます。", category: "ecosystem", order: 4 },
  { id: "community-resources", title: "コミュニティとリソース", description: "公式ドキュメント、コミュニティフォーラム、学習リソースなどKotlinの情報源を学びます。", category: "ecosystem", order: 5 },
];

export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "Kotlin基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "blue", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "functions", name: "関数", path: "/learn/functions", color: "blue", difficulty: "beginner", lessons: FUNCTIONS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "violet", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・インターフェース", path: "/learn/inheritance", color: "violet", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "generics", name: "ジェネリクス", path: "/learn/generics", color: "violet", difficulty: "intermediate", lessons: GENERICS_LESSONS },
  { id: "arrays", name: "配列・リスト", path: "/learn/arrays", color: "green", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "collections", name: "コレクション", path: "/learn/collections", color: "green", difficulty: "intermediate", lessons: COLLECTIONS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "green", difficulty: "intermediate", lessons: STRINGS_LESSONS },
  { id: "null-safety", name: "Null安全", path: "/learn/null-safety", color: "cyan", difficulty: "intermediate", lessons: NULL_SAFETY_LESSONS },
  { id: "extensions", name: "拡張関数", path: "/learn/extensions", color: "cyan", difficulty: "intermediate", lessons: EXTENSIONS_LESSONS },
  { id: "data-sealed", name: "データクラス・Sealed", path: "/learn/data-sealed", color: "cyan", difficulty: "intermediate", lessons: DATA_SEALED_LESSONS },
  { id: "lambda", name: "ラムダ式", path: "/learn/lambda", color: "pink", difficulty: "intermediate", lessons: LAMBDA_LESSONS },
  { id: "collection-ops", name: "コレクション操作", path: "/learn/collection-ops", color: "pink", difficulty: "intermediate", lessons: COLLECTION_OPS_LESSONS },
  { id: "scope-functions", name: "スコープ関数", path: "/learn/scope-functions", color: "pink", difficulty: "intermediate", lessons: SCOPE_FUNCTIONS_LESSONS },
  { id: "coroutines", name: "Coroutines", path: "/learn/coroutines", color: "indigo", difficulty: "advanced", lessons: COROUTINES_LESSONS },
  { id: "flow", name: "Flow", path: "/learn/flow", color: "indigo", difficulty: "advanced", lessons: FLOW_LESSONS },
  { id: "testing", name: "テスト", path: "/learn/testing", color: "teal", difficulty: "intermediate", lessons: TESTING_LESSONS },
  { id: "debug", name: "デバッグ", path: "/learn/debug", color: "teal", difficulty: "intermediate", lessons: DEBUG_LESSONS },
  { id: "exceptions", name: "例外処理", path: "/learn/exceptions", color: "red", difficulty: "intermediate", lessons: EXCEPTIONS_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "red", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "delegation", name: "委譲", path: "/learn/delegation", color: "red", difficulty: "intermediate", lessons: DELEGATION_LESSONS },
  { id: "build", name: "Gradle・ビルド", path: "/learn/build", color: "indigo", difficulty: "intermediate", lessons: BUILD_LESSONS },
  { id: "design", name: "デザインパターン", path: "/learn/design", color: "purple", difficulty: "advanced", lessons: DESIGN_LESSONS },
  { id: "ecosystem", name: "Kotlinエコシステム", path: "/learn/ecosystem", color: "purple", difficulty: "advanced", lessons: ECOSYSTEM_LESSONS },
];

export function getAllLessons(categoryId: string): Lesson[] {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.lessons : [];
}

export function getDifficultyLabel(d: Difficulty): string {
  const labels: Record<Difficulty, string> = { beginner: "初級", intermediate: "中級", advanced: "上級" };
  return labels[d];
}
