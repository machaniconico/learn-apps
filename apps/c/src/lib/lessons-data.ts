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

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "beginner": return "初級";
    case "intermediate": return "中級";
    case "advanced": return "上級";
  }
}

// ── Basics (12) ─────────────────────────────────────────────────────────────────
const BASICS_LESSONS: Lesson[] = [
  { id: "hello-world", title: "Hello World", description: "最初のCプログラムを作成して実行する", category: "basics", order: 1 },
  { id: "variables", title: "変数", description: "変数の宣言と値の代入の基本", category: "basics", order: 2 },
  { id: "data-types", title: "データ型", description: "Cの基本的なデータ型の概要", category: "basics", order: 3 },
  { id: "integer-types", title: "整数型", description: "short・int・long・long long など整数型の使い分け", category: "basics", order: 4 },
  { id: "floating-point", title: "浮動小数点数", description: "float・double・long double の精度と使い分け", category: "basics", order: 5 },
  { id: "char-type", title: "文字型", description: "char型とASCII値・文字操作の基礎", category: "basics", order: 6 },
  { id: "constants", title: "定数", description: "#define・const・enumによる定数の定義", category: "basics", order: 7 },
  { id: "type-conversion", title: "型変換", description: "暗黙的・明示的なキャストの使い方", category: "basics", order: 8 },
  { id: "operators", title: "演算子", description: "算術・比較・論理・代入演算子を使いこなす", category: "basics", order: 9 },
  { id: "input-output", title: "入出力", description: "printfとscanfを使った標準入出力", category: "basics", order: 10 },
  { id: "comments", title: "コメント", description: "単一行・複数行コメントの書き方", category: "basics", order: 11 },
  { id: "sizeof", title: "sizeof演算子", description: "型や変数のサイズを求めるsizeof演算子", category: "basics", order: 12 },
];

// ── Control (10) ────────────────────────────────────────────────────────────────
const CONTROL_LESSONS: Lesson[] = [
  { id: "if-else", title: "if-else文", description: "条件に応じて処理を分岐させる基本構文", category: "control", order: 1 },
  { id: "else-if", title: "else if", description: "複数条件を順番にチェックする方法", category: "control", order: 2 },
  { id: "switch", title: "switch文", description: "値に基づく多分岐処理のswitch構文", category: "control", order: 3 },
  { id: "for-loop", title: "forループ", description: "カウンタベースの繰り返し処理", category: "control", order: 4 },
  { id: "while-loop", title: "whileループ", description: "条件が真の間繰り返すwhileの使い方", category: "control", order: 5 },
  { id: "do-while", title: "do-whileループ", description: "最低1回は実行するdo-while構文", category: "control", order: 6 },
  { id: "nested-loops", title: "ネストしたループ", description: "ループの中にループを書く多重ループ", category: "control", order: 7 },
  { id: "break-continue", title: "break・continue", description: "ループを中断・スキップする制御文", category: "control", order: 8 },
  { id: "ternary", title: "三項演算子", description: "条件式を使った簡潔な分岐の書き方", category: "control", order: 9 },
  { id: "goto-label", title: "goto文", description: "goto文の使い方と避けるべき理由", category: "control", order: 10 },
];

// ── Functions (8) ───────────────────────────────────────────────────────────────
const FUNCTIONS_LESSONS: Lesson[] = [
  { id: "basics", title: "関数の基本", description: "関数の定義と呼び出し方", category: "functions", order: 1 },
  { id: "parameters", title: "引数（値渡し）", description: "関数に値を渡す方法", category: "functions", order: 2 },
  { id: "return-values", title: "戻り値", description: "関数から値を返す方法", category: "functions", order: 3 },
  { id: "prototypes", title: "関数プロトタイプ", description: "関数宣言（プロトタイプ）の書き方", category: "functions", order: 4 },
  { id: "recursion", title: "再帰", description: "自分自身を呼び出す再帰関数の設計", category: "functions", order: 5 },
  { id: "scope", title: "スコープ", description: "ローカル・グローバル・ブロックスコープ", category: "functions", order: 6 },
  { id: "static-functions", title: "static関数・変数", description: "staticキーワードの関数・変数への適用", category: "functions", order: 7 },
  { id: "variadic", title: "可変引数関数", description: "stdarg.hを使った可変個引数の関数", category: "functions", order: 8 },
];

// ── Pointers (8) ────────────────────────────────────────────────────────────────
const POINTERS_LESSONS: Lesson[] = [
  { id: "basics", title: "ポインタの基本", description: "アドレス演算子とポインタ変数の宣言", category: "pointers", order: 1 },
  { id: "dereference", title: "デリファレンス", description: "*演算子でポインタが指す値にアクセスする", category: "pointers", order: 2 },
  { id: "null-pointer", title: "NULLポインタ", description: "NULLの意味と安全なNULLチェック", category: "pointers", order: 3 },
  { id: "pointer-arithmetic", title: "ポインタ演算", description: "p++・p+nによるポインタの移動", category: "pointers", order: 4 },
  { id: "array-pointer", title: "配列とポインタ", description: "配列名はポインタ、arr[i]と*(arr+i)の等価性", category: "pointers", order: 5 },
  { id: "pointer-to-pointer", title: "ポインタのポインタ", description: "int **ppの仕組みと活用例", category: "pointers", order: 6 },
  { id: "const-pointer", title: "constとポインタ", description: "const int*・int* const・const int* constの違い", category: "pointers", order: 7 },
  { id: "void-pointer", title: "voidポインタ", description: "型なし汎用ポインタvoid*とキャスト", category: "pointers", order: 8 },
];

// ── Pointer Applications (6) ────────────────────────────────────────────────────
const POINTER_APPS_LESSONS: Lesson[] = [
  { id: "function-pointers", title: "関数ポインタ", description: "関数のアドレスを保持し間接呼び出しする", category: "pointer-apps", order: 1 },
  { id: "callbacks", title: "コールバック", description: "関数を引数として渡すコールバックパターン", category: "pointer-apps", order: 2 },
  { id: "pointer-strings", title: "ポインタと文字列", description: "char*による文字列リテラルとconst char*", category: "pointer-apps", order: 3 },
  { id: "pointer-arrays", title: "ポインタ配列", description: "int *arr[10]ポインタの配列の宣言と使用", category: "pointer-apps", order: 4 },
  { id: "array-of-pointers", title: "文字列配列", description: "char *names[]による文字列配列の実用例", category: "pointer-apps", order: 5 },
  { id: "complex-declarations", title: "複雑な宣言の読み方", description: "螺旋ルールでC言語の複雑な型宣言を読む", category: "pointer-apps", order: 6 },
];

// ── Arrays (8) ──────────────────────────────────────────────────────────────────
const ARRAYS_LESSONS: Lesson[] = [
  { id: "basics", title: "配列の基本", description: "配列の宣言・初期化・要素アクセス", category: "arrays", order: 1 },
  { id: "multidimensional", title: "多次元配列", description: "2次元配列int matrix[3][4]の使い方", category: "arrays", order: 2 },
  { id: "initialization", title: "配列の初期化", description: "指示付き初期化・部分初期化・{0}による初期化", category: "arrays", order: 3 },
  { id: "arrays-functions", title: "配列と関数", description: "関数への配列の渡し方とサイズパラメータ", category: "arrays", order: 4 },
  { id: "sorting", title: "ソート", description: "バブルソートの実装と動作原理", category: "arrays", order: 5 },
  { id: "searching", title: "探索", description: "線形探索の実装と応用", category: "arrays", order: 6 },
  { id: "char-arrays", title: "文字配列", description: "char str[]とnullターミネータ\\0の仕組み", category: "arrays", order: 7 },
  { id: "vla", title: "可変長配列(VLA)", description: "C99の可変長配列によるスタック上の動的サイズ", category: "arrays", order: 8 },
];

// ── Strings (6) ─────────────────────────────────────────────────────────────────
const STRINGS_LESSONS: Lesson[] = [
  { id: "basics", title: "文字列の基本", description: "char配列と文字列、ヌルターミネータ\\0", category: "strings", order: 1 },
  { id: "string-h", title: "string.h関数", description: "strlen・strcpy・strcat・strcmpの使い方", category: "strings", order: 2 },
  { id: "compare-copy", title: "安全な比較・コピー", description: "strncpy・strncmpによる安全な文字列操作", category: "strings", order: 3 },
  { id: "search-split", title: "検索・分割", description: "strstr・strchr・strtokによる文字列処理", category: "strings", order: 4 },
  { id: "char-functions", title: "文字関数", description: "ctype.h: isalpha・isdigit・toupper・tolower", category: "strings", order: 5 },
  { id: "formatted-strings", title: "書式付き文字列", description: "sprintf・snprintf・sscanfの使い方", category: "strings", order: 6 },
];

// ── stdlib (6) ──────────────────────────────────────────────────────────────────
const STDLIB_LESSONS: Lesson[] = [
  { id: "stdlib-h", title: "stdlib.h", description: "atoi, atof, rand, exit, abs などの標準ユーティリティ", category: "stdlib", order: 1 },
  { id: "math-h", title: "math.h", description: "sqrt, pow, ceil, floor, sin, cos などの数学関数", category: "stdlib", order: 2 },
  { id: "time-h", title: "time.h", description: "time(), clock(), difftime(), strftime() による時間処理", category: "stdlib", order: 3 },
  { id: "ctype-h", title: "ctype.h", description: "isalpha, isdigit, toupper, tolower などの文字分類", category: "stdlib", order: 4 },
  { id: "assert-h", title: "assert.h", description: "assert()マクロとNDEBUGによるデバッグ表明", category: "stdlib", order: 5 },
  { id: "errno-h", title: "errno.h", description: "errno, perror(), strerror() によるエラー処理", category: "stdlib", order: 6 },
];

// ── linked-list (6) ─────────────────────────────────────────────────────────────
const LINKED_LIST_LESSONS: Lesson[] = [
  { id: "singly", title: "単方向リスト", description: "struct Node と next ポインタによる単方向連結リスト", category: "linked-list", order: 1 },
  { id: "doubly", title: "双方向リスト", description: "prev と next ポインタによる双方向連結リスト", category: "linked-list", order: 2 },
  { id: "circular", title: "循環リスト", description: "末尾が先頭を指す循環連結リスト", category: "linked-list", order: 3 },
  { id: "operations", title: "リスト操作", description: "挿入・削除・検索・カウントの実装", category: "linked-list", order: 4 },
  { id: "list-sort", title: "リストのソート", description: "挿入ソートによる連結リストの並び替え", category: "linked-list", order: 5 },
  { id: "applications", title: "応用例", description: "スタック・キュー・多項式表現への連結リスト活用", category: "linked-list", order: 6 },
];

// ── stack-queue (5) ─────────────────────────────────────────────────────────────
const STACK_QUEUE_LESSONS: Lesson[] = [
  { id: "stack-impl", title: "スタックの実装", description: "配列ベースのスタック：push, pop, peek", category: "stack-queue", order: 1 },
  { id: "queue-impl", title: "キューの実装", description: "配列ベースのキュー：enqueue, dequeue, front", category: "stack-queue", order: 2 },
  { id: "circular-queue", title: "循環キュー", description: "循環バッファによるインデックスの折り返し", category: "stack-queue", order: 3 },
  { id: "priority-queue", title: "優先度付きキュー", description: "ソート済み挿入による簡易優先度付きキュー", category: "stack-queue", order: 4 },
  { id: "applications", title: "応用例", description: "括弧の対応チェック・後置評価・BFS", category: "stack-queue", order: 5 },
];

// ── sorting (6) ─────────────────────────────────────────────────────────────────
const SORTING_LESSONS: Lesson[] = [
  { id: "bubble", title: "バブルソート", description: "バブルソートとフラグによる最適化", category: "sorting", order: 1 },
  { id: "selection", title: "選択ソート", description: "最小値を選んで入れ替える選択ソート", category: "sorting", order: 2 },
  { id: "insertion", title: "挿入ソート", description: "ソート済み部分を伸ばす挿入ソート", category: "sorting", order: 3 },
  { id: "quicksort", title: "クイックソート", description: "分割と再帰によるクイックソート", category: "sorting", order: 4 },
  { id: "mergesort", title: "マージソート", description: "分割統治法によるマージソート", category: "sorting", order: 5 },
  { id: "comparison", title: "ソートの比較", description: "計算量比較と使い分けのガイド", category: "sorting", order: 6 },
];

// ── searching (5) ───────────────────────────────────────────────────────────────
const SEARCHING_LESSONS: Lesson[] = [
  { id: "linear", title: "線形探索", description: "O(n) の順次探索アルゴリズム", category: "searching", order: 1 },
  { id: "binary", title: "二分探索", description: "ソート済み配列に対する O(log n) 探索", category: "searching", order: 2 },
  { id: "hash", title: "ハッシュ探索", description: "ハッシュ表・ハッシュ関数・連鎖法による衝突処理", category: "searching", order: 3 },
  { id: "tree-search", title: "二分探索木", description: "BST の挿入・探索・走査", category: "searching", order: 4 },
  { id: "comparison", title: "探索の比較", description: "計算量比較と最適な探索手法の選択", category: "searching", order: 5 },
];

// ── Structs (8) ─────────────────────────────────────────────────────────────────
const STRUCTS_LESSONS: Lesson[] = [
  { id: "basics", title: "構造体の基本", description: "struct定義と初期化、struct Person { char name[50]; int age; };", category: "structs", order: 1 },
  { id: "member-access", title: "メンバアクセス", description: "ドット演算子と指示付き初期化子（C99）", category: "structs", order: 2 },
  { id: "structs-functions", title: "構造体と関数", description: "値渡しとポインタ渡しで構造体を関数に渡す", category: "structs", order: 3 },
  { id: "struct-arrays", title: "構造体の配列", description: "struct Person people[10]; による配列の使い方", category: "structs", order: 4 },
  { id: "nested-structs", title: "ネストした構造体", description: "構造体の中に構造体を入れる", category: "structs", order: 5 },
  { id: "struct-pointers", title: "構造体ポインタ", description: "構造体ポインタと->演算子、mallocによる動的確保", category: "structs", order: 6 },
  { id: "unions", title: "共用体（union）", description: "union定義、共有メモリ、タグ付き共用体", category: "structs", order: 7 },
  { id: "bit-fields", title: "ビットフィールド", description: "struct内でのビットフィールド、unsigned int flag : 1;", category: "structs", order: 8 },
];

// ── Memory (6) ──────────────────────────────────────────────────────────────────
const MEMORY_LESSONS: Lesson[] = [
  { id: "stack-heap", title: "スタックとヒープ", description: "スタックとヒープのメモリ、自動変数と動的確保", category: "memory", order: 1 },
  { id: "malloc-free", title: "malloc・free", description: "malloc()・free()・void*のキャスト", category: "memory", order: 2 },
  { id: "calloc-realloc", title: "calloc・realloc", description: "ゼロ初期化のcalloc()とサイズ変更のrealloc()", category: "memory", order: 3 },
  { id: "memory-leaks", title: "メモリリーク", description: "リーク検出・valgrind・よくあるパターン", category: "memory", order: 4 },
  { id: "memory-layout", title: "メモリレイアウト", description: "テキスト・データ・BSS・ヒープ・スタックセグメント", category: "memory", order: 5 },
  { id: "memory-safety", title: "メモリ安全性", description: "バッファオーバーフロー・ダングリングポインタ・二重解放", category: "memory", order: 6 },
];

// ── Enums (5) ───────────────────────────────────────────────────────────────────
const ENUMS_LESSONS: Lesson[] = [
  { id: "enum-basics", title: "enumの基本", description: "enum Color { RED, GREEN, BLUE }; の定義と使い方", category: "enums", order: 1 },
  { id: "typedef", title: "typedef", description: "typedef unsigned long size_t; typedef struct {} Name;", category: "enums", order: 2 },
  { id: "type-aliases", title: "型エイリアス", description: "関数ポインタのtypedef・可読性向上のテクニック", category: "enums", order: 3 },
  { id: "type-qualifiers", title: "型修飾子", description: "const・volatile・restrict・_Atomic", category: "enums", order: 4 },
  { id: "sizeof-operator", title: "sizeof演算子", description: "sizeof(int)・sizeof(struct)・配列のsizeof", category: "enums", order: 5 },
];

// ── Preprocessor (6) ────────────────────────────────────────────────────────────
const PREPROCESSOR_LESSONS: Lesson[] = [
  { id: "define", title: "#define", description: "#define PI 3.14、オブジェクト形式マクロ", category: "preprocessor", order: 1 },
  { id: "include", title: "#include", description: "#include <stdio.h> と \"myheader.h\" の違い", category: "preprocessor", order: 2 },
  { id: "conditional", title: "条件コンパイル", description: "#ifdef・#ifndef・#if・#endif・#else", category: "preprocessor", order: 3 },
  { id: "macro-functions", title: "関数形式マクロ", description: "#define MAX(a,b) ((a)>(b)?(a):(b)) と落とし穴", category: "preprocessor", order: 4 },
  { id: "pragma", title: "#pragma", description: "#pragma once・#pragma pack・コンパイラ固有指示", category: "preprocessor", order: 5 },
  { id: "predefined-macros", title: "定義済みマクロ", description: "__FILE__・__LINE__・__DATE__・__func__", category: "preprocessor", order: 6 },
];

// ── Stdio (6) ───────────────────────────────────────────────────────────────────
const STDIO_LESSONS: Lesson[] = [
  { id: "printf-format", title: "printf書式", description: "%d・%f・%s・%c・%x・%p・幅と精度指定", category: "stdio", order: 1 },
  { id: "scanf-format", title: "scanf書式", description: "scanf(\"%d\", &x)・書式指定子・戻り値", category: "stdio", order: 2 },
  { id: "char-io", title: "文字入出力", description: "getchar()・putchar()・ungetc()", category: "stdio", order: 3 },
  { id: "line-io", title: "行入出力", description: "fgets()・puts()・gets()の危険性", category: "stdio", order: 4 },
  { id: "sprintf-sscanf", title: "sprintf・sscanf", description: "文字列フォーマットのsprintf、文字列解析のsscanf", category: "stdio", order: 5 },
  { id: "buffering", title: "バッファリング", description: "setbuf・setvbuf・fflush・行/完全/バッファなし", category: "stdio", order: 6 },
];

// ── Fileio (6) ──────────────────────────────────────────────────────────────────
const FILEIO_LESSONS: Lesson[] = [
  { id: "fopen-fclose", title: "fopen・fclose", description: "fopen(\"file.txt\", \"r\")・fclose()・モード一覧", category: "fileio", order: 1 },
  { id: "file-read", title: "ファイル読み込み", description: "fgetc・fgets・fscanf・fread", category: "fileio", order: 2 },
  { id: "file-write", title: "ファイル書き込み", description: "fputc・fputs・fprintf・fwrite", category: "fileio", order: 3 },
  { id: "binary-io", title: "バイナリI/O", description: "\"rb\"/\"wb\"モード、fread/fwriteで構造体を扱う", category: "fileio", order: 4 },
  { id: "file-position", title: "ファイル位置", description: "ftell・fseek・rewind・SEEK_SET/CUR/END", category: "fileio", order: 5 },
  { id: "error-handling", title: "エラー処理", description: "ferror・feof・perror・errno", category: "fileio", order: 6 },
];

// ── Bitwise (6) ─────────────────────────────────────────────────────────────────
const BITWISE_LESSONS: Lesson[] = [
  { id: "operators", title: "ビット演算子", description: "&・|・^・~・AND/OR/XOR/NOT", category: "bitwise", order: 1 },
  { id: "shift", title: "シフト演算", description: "<<・>>・算術シフトと論理シフト", category: "bitwise", order: 2 },
  { id: "bitmask", title: "ビットマスク", description: "ビットマスクの作成と適用", category: "bitwise", order: 3 },
  { id: "bitflags", title: "ビットフラグ", description: "ビットをフラグとして使う、#define FLAG_READ 1", category: "bitwise", order: 4 },
  { id: "bitfields", title: "ビットフィールド", description: "コンパクトなデータのためのstruct bit fields", category: "bitwise", order: 5 },
  { id: "techniques", title: "ビット演算テクニック", description: "一時変数なしのswap・2の累乗チェック・ビットカウント", category: "bitwise", order: 6 },
];

// ── Process (5) ─────────────────────────────────────────────────────────────────
const PROCESS_LESSONS: Lesson[] = [
  { id: "fork", title: "fork", description: "fork()で親子プロセスを作成する方法", category: "process", order: 1 },
  { id: "exec", title: "exec", description: "execファミリーでプロセスイメージを置き換える", category: "process", order: 2 },
  { id: "wait", title: "wait", description: "wait()/waitpid()でゾンビ・孤児プロセスを管理する", category: "process", order: 3 },
  { id: "signals", title: "シグナル", description: "signal()でSIGINT・SIGTERMなどのシグナルを処理する", category: "process", order: 4 },
  { id: "pipes", title: "パイプ", description: "pipe()/dup2()でプロセス間通信を実現する", category: "process", order: 5 },
];

// ── Build (5) ────────────────────────────────────────────────────────────────────
const BUILD_LESSONS: Lesson[] = [
  { id: "compile-process", title: "コンパイルプロセス", description: "前処理・コンパイル・アセンブル・リンクの4段階", category: "build", order: 1 },
  { id: "gcc-clang", title: "GCC・Clang", description: "gccフラグ(-Wall,-O2,-g)とclangの違い", category: "build", order: 2 },
  { id: "makefile", title: "Makefile", description: "Makefileの構文・ターゲット・依存関係・変数・phony", category: "build", order: 3 },
  { id: "debugging", title: "デバッグ", description: "gdbの基本・ブレークポイント・ステップ実行・変数表示", category: "build", order: 4 },
  { id: "optimization", title: "最適化", description: "-O0から-O3・-Os・プロファイルガイド最適化", category: "build", order: 5 },
];

// ── Errors (5) ──────────────────────────────────────────────────────────────────
const ERRORS_LESSONS: Lesson[] = [
  { id: "errno", title: "errno", description: "errno・perror()・strerror()でシステムコールのエラーを確認する", category: "errors", order: 1 },
  { id: "setjmp-longjmp", title: "setjmp・longjmp", description: "setjmp()/longjmp()による非局所ジャンプのエラー回復", category: "errors", order: 2 },
  { id: "assertions", title: "アサーション", description: "assert()・static_assert(C11)・NDEBUGの使い方", category: "errors", order: 3 },
  { id: "error-design", title: "エラー設計", description: "エラーコード・戻り値パターン・gotoクリーンアップ", category: "errors", order: 4 },
  { id: "robust-code", title: "堅牢なコード", description: "防御的プログラミング・入力検証・リソース管理", category: "errors", order: 5 },
];

// ── Multifile (5) ────────────────────────────────────────────────────────────────
const MULTIFILE_LESSONS: Lesson[] = [
  { id: "header-files", title: "ヘッダファイル", description: ".hファイル・宣言と定義の違い・ヘッダに書くべきこと", category: "multifile", order: 1 },
  { id: "source-split", title: "ソース分割", description: "コードを.cファイルに分割する方法と単一定義規則", category: "multifile", order: 2 },
  { id: "linking", title: "リンク", description: "複数の.oファイルをリンクする方法とexternキーワード", category: "multifile", order: 3 },
  { id: "include-guards", title: "インクルードガード", description: "#ifndef/#define/#endifと#pragma onceの使い方", category: "multifile", order: 4 },
  { id: "large-projects", title: "大規模プロジェクト", description: "プロジェクト構造・前方宣言・依存関係の管理", category: "multifile", order: 5 },
];

// ── Idioms (5) ──────────────────────────────────────────────────────────────────
const IDIOMS_LESSONS: Lesson[] = [
  { id: "coding-style", title: "コーディングスタイル", description: "命名規則・インデント・K&RスタイルとAllmanスタイル", category: "idioms", order: 1 },
  { id: "design-patterns", title: "デザインパターン", description: "不透明ポインタ・コールバック・vtable的パターン", category: "idioms", order: 2 },
  { id: "safe-c", title: "安全なC", description: "安全な文字列関数・境界チェック・CERT Cルール", category: "idioms", order: 3 },
  { id: "portability", title: "移植性", description: "stdint.h・エンディアン・プラットフォーム差異・#ifdef", category: "idioms", order: 4 },
  { id: "performance", title: "パフォーマンス", description: "キャッシュフレンドリー・分岐予測・ループ展開", category: "idioms", order: 5 },
];

// ── Ecosystem (5) ────────────────────────────────────────────────────────────────
const ECOSYSTEM_LESSONS: Lesson[] = [
  { id: "c-standards", title: "C言語標準", description: "K&R C・ANSI C(C89)・C99・C11・C17・C23の機能変遷", category: "ecosystem", order: 1 },
  { id: "compilers", title: "コンパイラ", description: "GCC・Clang・MSVC・TCCの比較と特徴", category: "ecosystem", order: 2 },
  { id: "libraries", title: "ライブラリ", description: "glibc・musl・主要Cライブラリ(curl・sqlite・zlib)", category: "ecosystem", order: 3 },
  { id: "testing", title: "テスト", description: "Unity・CUnit・CMockaでテストスイートを書く", category: "ecosystem", order: 4 },
  { id: "c-future", title: "Cの未来", description: "C23の機能・C対C++・組込みシステム・システムプログラミングの将来", category: "ecosystem", order: 5 },
];

const ALL_CATEGORIES: CategoryInfo[] = [
  { id: "basics", name: "C言語基礎", path: "/learn/basics", color: "blue", difficulty: "beginner", lessons: BASICS_LESSONS },
  { id: "control", name: "制御フロー", path: "/learn/control", color: "cyan", difficulty: "beginner", lessons: CONTROL_LESSONS },
  { id: "functions", name: "関数", path: "/learn/functions", color: "teal", difficulty: "beginner", lessons: FUNCTIONS_LESSONS },
  { id: "pointers", name: "ポインタ", path: "/learn/pointers", color: "orange", difficulty: "intermediate", lessons: POINTERS_LESSONS },
  { id: "pointer-apps", name: "ポインタの応用", path: "/learn/pointer-apps", color: "yellow", difficulty: "intermediate", lessons: POINTER_APPS_LESSONS },
  { id: "arrays", name: "配列", path: "/learn/arrays", color: "green", difficulty: "beginner", lessons: ARRAYS_LESSONS },
  { id: "strings", name: "文字列", path: "/learn/strings", color: "purple", difficulty: "intermediate", lessons: STRINGS_LESSONS },
  { id: "stdlib", name: "標準ライブラリ", path: "/learn/stdlib", color: "green", difficulty: "intermediate", lessons: STDLIB_LESSONS },
  { id: "linked-list", name: "連結リスト", path: "/learn/linked-list", color: "cyan", difficulty: "intermediate", lessons: LINKED_LIST_LESSONS },
  { id: "stack-queue", name: "スタック・キュー", path: "/learn/stack-queue", color: "teal", difficulty: "intermediate", lessons: STACK_QUEUE_LESSONS },
  { id: "sorting", name: "ソートアルゴリズム", path: "/learn/sorting", color: "pink", difficulty: "intermediate", lessons: SORTING_LESSONS },
  { id: "searching", name: "探索アルゴリズム", path: "/learn/searching", color: "violet", difficulty: "intermediate", lessons: SEARCHING_LESSONS },
  { id: "structs", name: "構造体", path: "/learn/structs", color: "indigo", difficulty: "intermediate", lessons: STRUCTS_LESSONS },
  { id: "memory", name: "メモリ管理", path: "/learn/memory", color: "orange", difficulty: "advanced", lessons: MEMORY_LESSONS },
  { id: "enums", name: "enum・型", path: "/learn/enums", color: "violet", difficulty: "intermediate", lessons: ENUMS_LESSONS },
  { id: "preprocessor", name: "プリプロセッサ", path: "/learn/preprocessor", color: "yellow", difficulty: "beginner", lessons: PREPROCESSOR_LESSONS },
  { id: "stdio", name: "標準入出力", path: "/learn/stdio", color: "blue", difficulty: "intermediate", lessons: STDIO_LESSONS },
  { id: "fileio", name: "ファイルI/O", path: "/learn/fileio", color: "indigo", difficulty: "intermediate", lessons: FILEIO_LESSONS },
  { id: "bitwise", name: "ビット演算", path: "/learn/bitwise", color: "red", difficulty: "intermediate", lessons: BITWISE_LESSONS },
  { id: "process", name: "プロセス", path: "/learn/process", color: "red", difficulty: "advanced", lessons: PROCESS_LESSONS },
  { id: "build", name: "ビルド", path: "/learn/build", color: "pink", difficulty: "beginner", lessons: BUILD_LESSONS },
  { id: "errors", name: "エラー処理", path: "/learn/errors", color: "orange", difficulty: "intermediate", lessons: ERRORS_LESSONS },
  { id: "multifile", name: "マルチファイル", path: "/learn/multifile", color: "indigo", difficulty: "intermediate", lessons: MULTIFILE_LESSONS },
  { id: "idioms", name: "イディオム", path: "/learn/idioms", color: "cyan", difficulty: "advanced", lessons: IDIOMS_LESSONS },
  { id: "ecosystem", name: "エコシステム", path: "/learn/ecosystem", color: "blue", difficulty: "beginner", lessons: ECOSYSTEM_LESSONS },
];

export function getAllLessons(categoryId: string): Lesson[] {
  const cat = ALL_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.lessons : [];
}

export function getLesson(categoryId: string, lessonId: string): Lesson | undefined {
  return getAllLessons(categoryId).find((l) => l.id === lessonId);
}

export function getAllCategories(): CategoryInfo[] {
  return ALL_CATEGORIES;
}
