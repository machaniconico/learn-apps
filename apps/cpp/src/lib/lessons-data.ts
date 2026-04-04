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
  { id: "hello-world", title: "Hello World", description: "最初のC++プログラムを作成して実行する", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "変数の宣言と値の代入の基本", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "C++の基本的なデータ型の概要", category: "basics", order: 3 },
  { id: "numeric-types", title: "数値型", description: "int・double・float など数値型の使い分け", category: "basics", order: 4 },
  { id: "strings-basics", title: "文字列の基本", description: "std::stringの作成・結合・基本操作", category: "basics", order: 5 },
  { id: "boolean", title: "真偽値", description: "bool型とtrue/falseの使い方", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "constとconstexprによる定数の定義", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "暗黙的・明示的な型変換とstatic_cast", category: "basics", order: 8 },
  { id: "auto-inference", title: "auto推論", description: "autoキーワードによる型推論", category: "basics", order: 9 },
  { id: "operators", title: "演算子", description: "算術・比較・論理演算子を使いこなす", category: "basics", order: 10 },
  { id: "input-output", title: "入出力", description: "cin・coutを使った標準入出力", category: "basics", order: 11 },
  { id: "comments", title: "コメント", description: "単一行・複数行コメントの書き方", category: "basics", order: 12 },
];

// ── Control (10) ────────────────────────────────────────────────────────────────
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件に応じて処理を分岐させる基本構文", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件を順番にチェックする方法", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値に基づく多分岐処理のswitch構文", category: "control", order: 3 },
  { id: "for-loop", title: "forループ", description: "カウンタベースの繰り返し処理", category: "control", order: 4 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileの使い方", category: "control", order: 5 },
  { id: "do-while", title: "do-whileループ", description: "最低1回は実行するdo-while構文", category: "control", order: 6 },
  { id: "range-for", title: "範囲forループ", description: "コンテナの要素を順番に処理する範囲for", category: "control", order: 7 },
  { id: "break-continue", title: "break・continue", description: "ループを中断・スキップする制御文", category: "control", order: 8 },
  { id: "ternary", title: "三項演算子", description: "条件式を使った簡潔な分岐の書き方", category: "control", order: 9 },
  { id: "goto-label", title: "goto文", description: "goto文の使い方と避けるべき理由", category: "control", order: 10 },
];

// ── Functions (8) ───────────────────────────────────────────────────────────────
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "関数の定義と呼び出し方", category: "functions", order: 1 },
  { id: "parameters", title: "引数", description: "関数に値を渡す方法（値渡し・参照渡し）", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "関数から値を返す方法", category: "functions", order: 3 },
  { id: "overloading", title: "オーバーロード", description: "同名関数の異なるシグネチャ定義", category: "functions", order: 4 },
  { id: "default-args", title: "デフォルト引数", description: "引数にデフォルト値を設定する方法", category: "functions", order: 5 },
  { id: "inline", title: "インライン関数", description: "inline指定による最適化ヒント", category: "functions", order: 6 },
  { id: "recursion", title: "再帰", description: "自分自身を呼び出す再帰関数の設計", category: "functions", order: 7 },
  { id: "function-pointers", title: "関数ポインタ", description: "関数のアドレスを保持し間接的に呼び出す", category: "functions", order: 8 },
];

// ── Pointers (8) ────────────────────────────────────────────────────────────────
const POINTERS_LESSONS: Lesson[] = [
  { id: "basics", title: "ポインタの基本", description: "アドレスとポインタ変数の基礎", category: "pointers", order: 1 },
  { id: "dereference", title: "デリファレンス", description: "*演算子によるポインタの参照先アクセス", category: "pointers", order: 2 },
  { id: "nullptr", title: "nullptr", description: "nullポインタの安全な扱い方", category: "pointers", order: 3 },
  { id: "pointer-arithmetic", title: "ポインタ演算", description: "ポインタの加減算と配列へのアクセス", category: "pointers", order: 4 },
  { id: "array-pointer", title: "配列とポインタ", description: "配列名とポインタの関係", category: "pointers", order: 5 },
  { id: "pointer-to-pointer", title: "ポインタのポインタ", description: "二重ポインタの仕組みと使い方", category: "pointers", order: 6 },
  { id: "const-pointer", title: "constとポインタ", description: "const修飾子とポインタの組み合わせ", category: "pointers", order: 7 },
  { id: "void-pointer", title: "voidポインタ", description: "型を持たない汎用ポインタの使い方", category: "pointers", order: 8 },
];

// ── References (5) ──────────────────────────────────────────────────────────────
const REFERENCES_LESSONS: Lesson[] = [
  { id: "basics", title: "参照の基本", description: "参照変数の宣言と基本的な使い方", category: "references", order: 1 },
  { id: "const-reference", title: "const参照", description: "変更不可な参照によるコピー回避", category: "references", order: 2 },
  { id: "reference-vs-pointer", title: "参照 vs ポインタ", description: "参照とポインタの違いと使い分け", category: "references", order: 3 },
  { id: "rvalue-reference", title: "右辺値参照", description: "&&を使った右辺値参照の基礎", category: "references", order: 4 },
  { id: "perfect-forwarding", title: "完全転送", description: "std::forwardを使ったテンプレート引数の転送", category: "references", order: 5 },
];

// ── Arrays & Vectors (8) ────────────────────────────────────────────────────────
const ARRAYS_LESSONS: Lesson[] = [
  { id: "c-array", title: "C配列", description: "C言語スタイルの配列の宣言と操作", category: "arrays", order: 1 },
  { id: "std-array", title: "std::array", description: "固定サイズの安全な配列コンテナ", category: "arrays", order: 2 },
  { id: "vector-basics", title: "vectorの基本", description: "動的配列std::vectorの使い方", category: "arrays", order: 3 },
  { id: "vector-operations", title: "vectorの操作", description: "push_back・erase・insertなどの操作", category: "arrays", order: 4 },
  { id: "multidimensional", title: "多次元配列", description: "2次元配列とvectorのネスト", category: "arrays", order: 5 },
  { id: "array-algorithms", title: "配列アルゴリズム", description: "sort・reverse・findなどの配列操作", category: "arrays", order: 6 },
  { id: "span", title: "std::span", description: "メモリの連続範囲への非所有ビュー", category: "arrays", order: 7 },
  { id: "initializer-list", title: "初期化子リスト", description: "std::initializer_listの使い方", category: "arrays", order: 8 },
];

// ── Strings (6) ─────────────────────────────────────────────────────────────────
const STRINGS_LESSONS: Lesson[] = [
  { id: "std-string", title: "std::string", description: "C++標準文字列の作成と基本操作", category: "strings", order: 1 },
  { id: "string-methods", title: "文字列メソッド", description: "find・substr・replaceなどの文字列操作", category: "strings", order: 2 },
  { id: "c-string", title: "C文字列", description: "char配列によるC文字列とstd::stringの変換", category: "strings", order: 3 },
  { id: "string-stream", title: "文字列ストリーム", description: "std::stringstreamによる文字列の構築と解析", category: "strings", order: 4 },
  { id: "string-view", title: "std::string_view", description: "文字列の非所有軽量参照", category: "strings", order: 5 },
  { id: "format", title: "std::format", description: "C++20のフォーマット文字列", category: "strings", order: 6 },
];

// ── Classes (8) ─────────────────────────────────────────────────────────────────
const CLASSES_LESSONS: Lesson[] = [
  { id: "basics", title: "クラスの基本", description: "classキーワードを使ったオブジェクトの設計図", category: "classes", order: 1 },
  { id: "constructors", title: "コンストラクタ", description: "オブジェクト初期化のためのコンストラクタ定義", category: "classes", order: 2 },
  { id: "destructor", title: "デストラクタ", description: "オブジェクト破棄時のリソース解放", category: "classes", order: 3 },
  { id: "access-modifiers", title: "アクセス修飾子", description: "public・private・protectedの使い分け", category: "classes", order: 4 },
  { id: "member-functions", title: "メンバ関数", description: "クラスに属する関数の定義と呼び出し", category: "classes", order: 5 },
  { id: "static-members", title: "静的メンバ", description: "staticフィールド・メソッドの使い方", category: "classes", order: 6 },
  { id: "struct-vs-class", title: "structとclass", description: "構造体とクラスの違いと使い分け", category: "classes", order: 7 },
  { id: "enum-class", title: "enum class", description: "スコープ付き列挙型の定義と活用", category: "classes", order: 8 },
];

// ── Inheritance (8) ─────────────────────────────────────────────────────────────
const INHERITANCE_LESSONS: Lesson[] = [
  { id: "basics", title: "継承の基本", description: "基底クラスを引き継ぐ派生クラスの定義", category: "inheritance", order: 1 },
  { id: "virtual-functions", title: "仮想関数", description: "virtualキーワードによるポリモーフィズム", category: "inheritance", order: 2 },
  { id: "pure-virtual", title: "純粋仮想関数", description: "抽象クラスと純粋仮想関数の定義", category: "inheritance", order: 3 },
  { id: "override-final", title: "override・final", description: "オーバーライドの明示と継承の制限", category: "inheritance", order: 4 },
  { id: "multiple-inheritance", title: "多重継承", description: "複数クラスの同時継承とダイヤモンド問題", category: "inheritance", order: 5 },
  { id: "virtual-inheritance", title: "仮想継承", description: "virtual継承によるダイヤモンド問題の解決", category: "inheritance", order: 6 },
  { id: "rtti", title: "RTTI", description: "dynamic_castとtypeidによる実行時型情報", category: "inheritance", order: 7 },
  { id: "operator-overloading", title: "演算子オーバーロード", description: "クラスに対する演算子の定義", category: "inheritance", order: 8 },
];

// ── Templates (6) ───────────────────────────────────────────────────────────────
const TEMPLATES_LESSONS: Lesson[] = [
  { id: "function-templates", title: "関数テンプレート", description: "型パラメータを使った汎用関数の定義", category: "templates", order: 1 },
  { id: "class-templates", title: "クラステンプレート", description: "テンプレートクラスの定義と特殊化", category: "templates", order: 2 },
  { id: "specialization", title: "テンプレート特殊化", description: "完全特殊化と部分特殊化", category: "templates", order: 3 },
  { id: "variadic", title: "可変引数テンプレート", description: "パラメータパックを使った可変引数テンプレート", category: "templates", order: 4 },
  { id: "concepts", title: "コンセプト", description: "C++20のコンセプトによるテンプレート制約", category: "templates", order: 5 },
  { id: "sfinae", title: "SFINAE", description: "置換失敗はエラーではないの原則と活用", category: "templates", order: 6 },
];

// ── Containers (6) ──────────────────────────────────────────────────────────────
const CONTAINERS_LESSONS: Lesson[] = [
  { id: "map", title: "std::map", description: "キーと値のペアで管理する順序付きマップ", category: "containers", order: 1 },
  { id: "unordered-map", title: "std::unordered_map", description: "ハッシュテーブルベースの高速マップ", category: "containers", order: 2 },
  { id: "set", title: "std::set", description: "重複なしの順序付き集合", category: "containers", order: 3 },
  { id: "stack-queue", title: "stack・queue", description: "スタックとキューのアダプタ", category: "containers", order: 4 },
  { id: "deque-list", title: "deque・list", description: "両端キューと双方向リスト", category: "containers", order: 5 },
  { id: "comparison", title: "コンテナ比較", description: "各コンテナの特徴と選び方ガイド", category: "containers", order: 6 },
];

// ── Smart Pointers (6) ──────────────────────────────────────────────────────────
const SMARTPTR_LESSONS: Lesson[] = [
  { id: "unique-ptr", title: "unique_ptr", description: "排他的所有権を持つスマートポインタ", category: "smartptr", order: 1 },
  { id: "shared-ptr", title: "shared_ptr", description: "共有所有権を持つ参照カウント方式のスマートポインタ", category: "smartptr", order: 2 },
  { id: "weak-ptr", title: "weak_ptr", description: "循環参照を防ぐ弱い参照", category: "smartptr", order: 3 },
  { id: "make-functions", title: "make関数", description: "make_unique・make_sharedの使い方と利点", category: "smartptr", order: 4 },
  { id: "custom-deleter", title: "カスタムデリータ", description: "独自のリソース解放処理の指定", category: "smartptr", order: 5 },
  { id: "ownership-patterns", title: "所有権パターン", description: "所有権の設計パターンとベストプラクティス", category: "smartptr", order: 6 },
];

// ── Memory (6) ──────────────────────────────────────────────────────────────────
const MEMORY_LESSONS: Lesson[] = [
  { id: "stack-heap", title: "スタックとヒープ", description: "メモリレイアウトとスタック・ヒープの違い", category: "memory", order: 1 },
  { id: "new-delete", title: "new・delete", description: "動的メモリの確保と解放", category: "memory", order: 2 },
  { id: "memory-leak", title: "メモリリーク", description: "メモリリークの原因と対策", category: "memory", order: 3 },
  { id: "raii", title: "RAII", description: "リソース管理の基本原則RAII", category: "memory", order: 4 },
  { id: "alignment", title: "アライメント", description: "メモリアライメントとalignasの使い方", category: "memory", order: 5 },
  { id: "allocators", title: "アロケータ", description: "カスタムアロケータの基礎", category: "memory", order: 6 },
];

// ── Lambda (6) ──────────────────────────────────────────────────────────────────
const LAMBDA_LESSONS: Lesson[] = [
  { id: "basics", title: "ラムダ式の基本", description: "ラムダ式の構文と基本的な使い方", category: "lambda", order: 1 },
  { id: "capture", title: "キャプチャ", description: "変数のキャプチャ方法（値・参照）", category: "lambda", order: 2 },
  { id: "generic-lambda", title: "ジェネリックラムダ", description: "autoパラメータによる汎用ラムダ", category: "lambda", order: 3 },
  { id: "std-function", title: "std::function", description: "ラムダを格納する汎用関数ラッパー", category: "lambda", order: 4 },
  { id: "functors", title: "関数オブジェクト", description: "operator()を持つクラスによる関数オブジェクト", category: "lambda", order: 5 },
  { id: "algorithms-lambda", title: "アルゴリズムとラムダ", description: "STLアルゴリズムでのラムダ活用", category: "lambda", order: 6 },
];

// ── Move Semantics (6) ──────────────────────────────────────────────────────────
const MOVE_LESSONS: Lesson[] = [
  { id: "lvalue-rvalue", title: "左辺値と右辺値", description: "lvalueとrvalueの基本概念", category: "move", order: 1 },
  { id: "move-constructor", title: "ムーブコンストラクタ", description: "ムーブコンストラクタの定義と動作", category: "move", order: 2 },
  { id: "move-assignment", title: "ムーブ代入", description: "ムーブ代入演算子の実装", category: "move", order: 3 },
  { id: "std-move", title: "std::move", description: "左辺値を右辺値にキャストする", category: "move", order: 4 },
  { id: "rule-of-five", title: "5の規則", description: "コピー・ムーブ・デストラクタの5つの特殊関数", category: "move", order: 5 },
  { id: "noexcept", title: "noexcept", description: "例外を投げない保証とムーブの関係", category: "move", order: 6 },
];

// ── STL Algorithms (8) ──────────────────────────────────────────────────────────
const ALGORITHM_LESSONS: Lesson[] = [
  { id: "sort-search", title: "ソートと探索", description: "sort・binary_searchの使い方", category: "algorithm", order: 1 },
  { id: "transform", title: "変換", description: "transformによる要素の変換操作", category: "algorithm", order: 2 },
  { id: "accumulate", title: "集約", description: "accumulateとreduce による集計操作", category: "algorithm", order: 3 },
  { id: "filter", title: "フィルタ", description: "copy_if・remove_ifによるフィルタリング", category: "algorithm", order: 4 },
  { id: "for-each", title: "for_each", description: "各要素に対する操作の適用", category: "algorithm", order: 5 },
  { id: "min-max", title: "最小・最大", description: "min_element・max_element・minmaxの使い方", category: "algorithm", order: 6 },
  { id: "numeric", title: "数値アルゴリズム", description: "iota・partial_sum・inner_productの活用", category: "algorithm", order: 7 },
  { id: "ranges", title: "Ranges", description: "C++20のRangesライブラリによるパイプライン処理", category: "algorithm", order: 8 },
];

// ── Iterators (6) ───────────────────────────────────────────────────────────────
const ITERATORS_LESSONS: Lesson[] = [
  { id: "basics", title: "イテレータの基本", description: "begin/endとイテレータの基本概念", category: "iterators", order: 1 },
  { id: "categories", title: "イテレータカテゴリ", description: "入力・出力・前方・双方向・ランダムアクセス", category: "iterators", order: 2 },
  { id: "insert-iterators", title: "挿入イテレータ", description: "back_inserter・front_inserterの使い方", category: "iterators", order: 3 },
  { id: "stream-iterators", title: "ストリームイテレータ", description: "istream_iterator・ostream_iteratorの活用", category: "iterators", order: 4 },
  { id: "reverse-iterators", title: "逆イテレータ", description: "rbegin/rendと逆方向の走査", category: "iterators", order: 5 },
  { id: "custom-iterator", title: "カスタムイテレータ", description: "自作クラスへのイテレータの実装", category: "iterators", order: 6 },
];

// ── Exceptions (5) ──────────────────────────────────────────────────────────────
const EXCEPTIONS_LESSONS: Lesson[] = [
  { id: "try-catch", title: "try-catch", description: "例外処理の基本構文と使い方", category: "exceptions", order: 1 },
  { id: "throw", title: "throw", description: "例外を投げる方法と標準例外クラス", category: "exceptions", order: 2 },
  { id: "custom-exceptions", title: "カスタム例外", description: "独自の例外クラスの作成方法", category: "exceptions", order: 3 },
  { id: "exception-safety", title: "例外安全性", description: "基本保証・強い保証・例外を投げない保証", category: "exceptions", order: 4 },
  { id: "noexcept-spec", title: "noexcept指定", description: "noexcept指定による例外仕様の明示", category: "exceptions", order: 5 },
];

// ── File I/O (6) ────────────────────────────────────────────────────────────────
const FILEIO_LESSONS: Lesson[] = [
  { id: "ifstream-ofstream", title: "ifstream・ofstream", description: "テキストファイルの読み書きの基本", category: "fileio", order: 1 },
  { id: "fstream", title: "fstream", description: "読み書き両用のファイルストリーム", category: "fileio", order: 2 },
  { id: "binary-io", title: "バイナリI/O", description: "バイナリモードでのファイル読み書き", category: "fileio", order: 3 },
  { id: "filesystem", title: "std::filesystem", description: "C++17のファイルシステムライブラリ", category: "fileio", order: 4 },
  { id: "string-stream-io", title: "文字列ストリーム", description: "sstream を使った文字列の入出力", category: "fileio", order: 5 },
  { id: "error-handling", title: "エラーハンドリング", description: "ファイルI/Oのエラー処理とフラグ", category: "fileio", order: 6 },
];

// ── Threads (6) ─────────────────────────────────────────────────────────────────
const THREADS_LESSONS: Lesson[] = [
  { id: "basics", title: "スレッドの基本", description: "std::threadの作成と結合", category: "threads", order: 1 },
  { id: "mutex", title: "mutex", description: "std::mutexによる排他制御", category: "threads", order: 2 },
  { id: "lock-guard", title: "lock_guard", description: "RAIIベースのロック管理", category: "threads", order: 3 },
  { id: "condition-variable", title: "条件変数", description: "std::condition_variableによるスレッド間通信", category: "threads", order: 4 },
  { id: "future-promise", title: "future・promise", description: "非同期結果の受け渡し", category: "threads", order: 5 },
  { id: "async", title: "std::async", description: "手軽な非同期タスクの実行", category: "threads", order: 6 },
];

// ── Preprocessor (5) ────────────────────────────────────────────────────────────
const PREPROCESSOR_LESSONS: Lesson[] = [
  { id: "include", title: "#include", description: "ヘッダファイルのインクルードの仕組み", category: "preprocessor", order: 1 },
  { id: "macros", title: "マクロ", description: "#defineによるマクロ定義と落とし穴", category: "preprocessor", order: 2 },
  { id: "conditional", title: "条件付きコンパイル", description: "#ifdef・#ifndef・#ifによる条件コンパイル", category: "preprocessor", order: 3 },
  { id: "pragma", title: "#pragma", description: "#pragma onceとコンパイラ固有のプラグマ", category: "preprocessor", order: 4 },
  { id: "modules", title: "モジュール", description: "C++20のモジュールシステムの概要", category: "preprocessor", order: 5 },
];

// ── Build (5) ───────────────────────────────────────────────────────────────────
const BUILD_LESSONS: Lesson[] = [
  { id: "compile-process", title: "コンパイルプロセス", description: "前処理・コンパイル・リンクの流れ", category: "build", order: 1 },
  { id: "header-source", title: "ヘッダとソース", description: ".hと.cppの分離とインクルードガード", category: "build", order: 2 },
  { id: "makefile", title: "Makefile", description: "Makeによるビルドの自動化", category: "build", order: 3 },
  { id: "cmake", title: "CMake", description: "CMakeによるクロスプラットフォームビルド", category: "build", order: 4 },
  { id: "linking", title: "リンク", description: "静的リンクと動的リンクの仕組み", category: "build", order: 5 },
];

// ── Design Patterns (6) ─────────────────────────────────────────────────────────
const DESIGN_LESSONS: Lesson[] = [
  { id: "singleton", title: "Singletonパターン", description: "インスタンスを1つに制限するSingletonの実装", category: "design", order: 1 },
  { id: "factory", title: "Factoryパターン", description: "オブジェクト生成を抽象化するFactoryの実装", category: "design", order: 2 },
  { id: "observer", title: "Observerパターン", description: "イベント通知のためのObserverパターン", category: "design", order: 3 },
  { id: "strategy", title: "Strategyパターン", description: "アルゴリズムの切り替えを可能にするStrategy", category: "design", order: 4 },
  { id: "decorator", title: "Decoratorパターン", description: "機能を動的に追加するDecoratorの実装", category: "design", order: 5 },
  { id: "pimpl", title: "Pimplイディオム", description: "実装の隠蔽によるコンパイル時間の短縮", category: "design", order: 6 },
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

// ── C++ Ecosystem (5) ───────────────────────────────────────────────────────────
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "standards", title: "C++標準", description: "C++11/14/17/20/23の主要な変更点", category: "ecosystem", order: 1 },
  { id: "compilers", title: "コンパイラ", description: "GCC・Clang・MSVCの特徴と違い", category: "ecosystem", order: 2 },
  { id: "package-managers", title: "パッケージ管理", description: "vcpkg・Conanによるライブラリ管理", category: "ecosystem", order: 3 },
  { id: "testing", title: "テスト", description: "Google Test・Catch2によるユニットテスト", category: "ecosystem", order: 4 },
  { id: "best-practices", title: "ベストプラクティス", description: "C++ Core GuidelinesとモダンC++の指針", category: "ecosystem", order: 5 },
];

// ── Category definitions ───────────────────────────────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "C++基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御構文", path: "/learn/control", color: "cyan", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "functions", name: "関数", path: "/learn/functions", color: "teal", difficulty: "beginner", lessons: FUNCTIONS_LESSONS },
  { id: "pointers", name: "ポインタ", path: "/learn/pointers", color: "orange", difficulty: "intermediate", lessons: POINTERS_LESSONS },
  { id: "references", name: "参照", path: "/learn/references", color: "yellow", difficulty: "intermediate", lessons: REFERENCES_LESSONS },
  { id: "arrays", name: "配列・ベクター", path: "/learn/arrays", color: "green", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "strings", name: "文字列操作", path: "/learn/strings", color: "purple", difficulty: "intermediate", lessons: STRINGS_LESSONS },
  { id: "classes", name: "クラス基礎", path: "/learn/classes", color: "indigo", difficulty: "intermediate", lessons: CLASSES_LESSONS },
  { id: "inheritance", name: "継承・多態性", path: "/learn/inheritance", color: "violet", difficulty: "intermediate", lessons: INHERITANCE_LESSONS },
  { id: "templates", name: "テンプレート", path: "/learn/templates", color: "pink", difficulty: "advanced", lessons: TEMPLATES_LESSONS },
  { id: "containers", name: "コンテナ", path: "/learn/containers", color: "red", difficulty: "intermediate", lessons: CONTAINERS_LESSONS },
  { id: "smartptr", name: "スマートポインタ", path: "/learn/smartptr", color: "teal", difficulty: "intermediate", lessons: SMARTPTR_LESSONS },
  { id: "memory", name: "メモリ管理", path: "/learn/memory", color: "orange", difficulty: "advanced", lessons: MEMORY_LESSONS },
  { id: "lambda", name: "ラムダ・関数オブジェクト", path: "/learn/lambda", color: "cyan", difficulty: "intermediate", lessons: LAMBDA_LESSONS },
  { id: "move", name: "ムーブセマンティクス", path: "/learn/move", color: "blue", difficulty: "advanced", lessons: MOVE_LESSONS },
  { id: "algorithm", name: "STLアルゴリズム", path: "/learn/algorithm", color: "green", difficulty: "intermediate", lessons: ALGORITHM_LESSONS },
  { id: "iterators", name: "イテレータ", path: "/learn/iterators", color: "purple", difficulty: "intermediate", lessons: ITERATORS_LESSONS },
  { id: "exceptions", name: "例外処理", path: "/learn/exceptions", color: "red", difficulty: "intermediate", lessons: EXCEPTIONS_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "indigo", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "threads", name: "マルチスレッド", path: "/learn/threads", color: "violet", difficulty: "advanced", lessons: THREADS_LESSONS },
  { id: "preprocessor", name: "プリプロセッサ", path: "/learn/preprocessor", color: "yellow", difficulty: "beginner", lessons: PREPROCESSOR_LESSONS },
  { id: "build", name: "コンパイル・ビルド", path: "/learn/build", color: "pink", difficulty: "beginner", lessons: BUILD_LESSONS },
  { id: "design", name: "デザインパターン", path: "/learn/design", color: "violet", difficulty: "advanced", lessons: DESIGN_LESSONS },
  { id: "algo", name: "アルゴリズム", path: "/learn/algo", color: "cyan", difficulty: "intermediate", lessons: ALGO_LESSONS },
  { id: "ecosystem", name: "C++エコシステム", path: "/learn/ecosystem", color: "blue", difficulty: "beginner", lessons: ECOSYSTEM_LESSONS },
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
