export interface GlossaryTerm {
  term: string;
  reading?: string;
  description: string;
  category: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── 基礎 ────────────────────────────────────────────────────────────────────
  {
    term: "変数",
    reading: "へんすう",
    description: "データを格納するための名前付きの記憶領域。C言語では宣言時に型を指定する必要がある。",
    category: "基礎",
  },
  {
    term: "型",
    reading: "かた",
    description: "変数が保持するデータの種類を定義する仕組み。C言語は静的型付け言語であり、コンパイル時に型チェックが行われる。",
    category: "基礎",
  },
  {
    term: "int",
    description: "整数型。多くの環境で4バイト（32ビット）のサイズを持つ。",
    category: "基礎",
  },
  {
    term: "char",
    description: "文字型。1バイトのサイズを持ち、ASCII文字や小さな整数を格納できる。",
    category: "基礎",
  },
  {
    term: "float",
    description: "単精度浮動小数点型。4バイトのサイズを持ち、小数点数を格納できる。",
    category: "基礎",
  },
  {
    term: "double",
    description: "倍精度浮動小数点型。8バイトのサイズを持ち、floatより精度が高い。",
    category: "基礎",
  },
  {
    term: "void",
    description: "型なしを表すキーワード。戻り値のない関数や汎用ポインタに使われる。",
    category: "基礎",
  },
  {
    term: "const",
    description: "値を変更できない定数を宣言するキーワード。変数を読み取り専用にする。",
    category: "基礎",
  },
  {
    term: "sizeof",
    description: "型またはオブジェクトのバイト単位のサイズをコンパイル時に返す演算子。",
    category: "基礎",
  },
  {
    term: "typedef",
    description: "既存の型に別名をつけるキーワード。コードの可読性を向上させる。",
    category: "基礎",
  },
  // ── ポインタ ─────────────────────────────────────────────────────────────────
  {
    term: "ポインタ",
    reading: "ぽいんた",
    description: "メモリアドレスを格納する変数。`int *p;` のように宣言し、`&` でアドレスを取得、`*` で間接参照する。",
    category: "ポインタ",
  },
  {
    term: "デリファレンス",
    reading: "でりふぁれんす",
    description: "ポインタが指すアドレスの値にアクセスすること。`*ptr` の形式で使用する。",
    category: "ポインタ",
  },
  {
    term: "アドレス演算子",
    reading: "あどれすえんざんし",
    description: "`&` 演算子。変数のメモリアドレスを取得するために使用する。",
    category: "ポインタ",
  },
  {
    term: "NULL",
    description: "何も指さないポインタを表す定数。ポインタの無効状態を示すために使用する。",
    category: "ポインタ",
  },
  {
    term: "ポインタ演算",
    reading: "ぽいんたえんざん",
    description: "ポインタに整数を加減算してアドレスを移動する操作。配列の走査などに使われる。",
    category: "ポインタ",
  },
  {
    term: "void *",
    description: "汎用ポインタ型。任意の型のポインタを格納できるが、使用時にキャストが必要。",
    category: "ポインタ",
  },
  {
    term: "関数ポインタ",
    reading: "かんすうぽいんた",
    description: "関数のアドレスを格納するポインタ。`int (*fp)(int, int);` のように宣言する。",
    category: "ポインタ",
  },
  // ── メモリ ───────────────────────────────────────────────────────────────────
  {
    term: "malloc",
    description: "ヒープ領域にメモリを動的に確保する関数。`<stdlib.h>` で定義される。",
    category: "メモリ",
  },
  {
    term: "free",
    description: "`malloc` などで確保したメモリを解放する関数。解放後のポインタは使用してはいけない。",
    category: "メモリ",
  },
  {
    term: "calloc",
    description: "メモリを確保しゼロ初期化する関数。`malloc` と異なり要素数と要素サイズを引数に取る。",
    category: "メモリ",
  },
  {
    term: "realloc",
    description: "既に確保したメモリ領域のサイズを変更する関数。",
    category: "メモリ",
  },
  {
    term: "スタック",
    reading: "すたっく",
    description: "ローカル変数や関数の戻りアドレスが格納される自動管理されるメモリ領域。",
    category: "メモリ",
  },
  {
    term: "ヒープ",
    reading: "ひーぷ",
    description: "動的メモリ確保（`malloc`/`free`）で使用されるメモリ領域。プログラマが手動管理する必要がある。",
    category: "メモリ",
  },
  {
    term: "メモリリーク",
    reading: "めもりりーく",
    description: "確保したメモリを解放し忘れることで、プログラム実行中にメモリが枯渇する問題。",
    category: "メモリ",
  },
  {
    term: "バッファオーバーフロー",
    reading: "ばっふぁおーばーふろー",
    description: "配列の範囲外にデータを書き込むことで発生する脆弱性。セキュリティ上の重大な問題となる。",
    category: "メモリ",
  },
  // ── プリプロセッサ ────────────────────────────────────────────────────────────
  {
    term: "#define",
    description: "マクロを定義するプリプロセッサディレクティブ。定数や関数マクロの定義に使われる。",
    category: "プリプロセッサ",
  },
  {
    term: "#include",
    description: "ヘッダファイルをソースコードに取り込むプリプロセッサディレクティブ。",
    category: "プリプロセッサ",
  },
  {
    term: "#ifdef / #ifndef",
    description: "マクロが定義されているか（いないか）を条件としてコードを切り替えるディレクティブ。インクルードガードに使用される。",
    category: "プリプロセッサ",
  },
  {
    term: "#pragma once",
    description: "ヘッダファイルの多重インクルードを防ぐ非標準のディレクティブ。多くのコンパイラでサポートされている。",
    category: "プリプロセッサ",
  },
  {
    term: "マクロ",
    reading: "まくろ",
    description: "`#define` で定義されるテキスト置換の仕組み。コンパイル前にプリプロセッサが展開する。",
    category: "プリプロセッサ",
  },
  {
    term: "インクルードガード",
    reading: "いんくるーどがーど",
    description: "ヘッダファイルが複数回インクルードされるのを防ぐための `#ifndef`/`#define`/`#endif` の組み合わせ。",
    category: "プリプロセッサ",
  },
  // ── 標準ライブラリ ────────────────────────────────────────────────────────────
  {
    term: "stdio.h",
    description: "標準入出力関数（`printf`、`scanf`、`fopen` など）を提供するヘッダファイル。",
    category: "標準ライブラリ",
  },
  {
    term: "stdlib.h",
    description: "汎用ユーティリティ関数（`malloc`、`free`、`exit`、`atoi` など）を提供するヘッダファイル。",
    category: "標準ライブラリ",
  },
  {
    term: "string.h",
    description: "文字列操作関数（`strlen`、`strcpy`、`strcmp`、`memcpy` など）を提供するヘッダファイル。",
    category: "標準ライブラリ",
  },
  {
    term: "math.h",
    description: "数学関数（`sqrt`、`pow`、`sin`、`cos` など）を提供するヘッダファイル。",
    category: "標準ライブラリ",
  },
  {
    term: "printf",
    description: "書式指定文字列に従って標準出力にデータを出力する関数。`%d`、`%s`、`%f` などのフォーマット指定子を使う。",
    category: "標準ライブラリ",
  },
  {
    term: "scanf",
    description: "書式指定文字列に従って標準入力からデータを読み込む関数。引数には変数のアドレスを渡す。",
    category: "標準ライブラリ",
  },
  {
    term: "strlen",
    description: "文字列の長さ（終端の `\\0` を除くバイト数）を返す関数。`<string.h>` で定義される。",
    category: "標準ライブラリ",
  },
  // ── データ構造 ────────────────────────────────────────────────────────────────
  {
    term: "配列",
    reading: "はいれつ",
    description: "同じ型の要素を連続したメモリ領域に格納するデータ構造。インデックスでアクセスする。",
    category: "データ構造",
  },
  {
    term: "構造体",
    reading: "こうぞうたい",
    description: "`struct` キーワードで定義する複合データ型。異なる型の複数のフィールドをひとまとめにできる。",
    category: "データ構造",
  },
  {
    term: "連結リスト",
    reading: "れんけつりすと",
    description: "各ノードが次のノードへのポインタを持つデータ構造。動的なサイズ変更が可能。",
    category: "データ構造",
  },
  {
    term: "スタック",
    reading: "すたっく",
    description: "LIFO（後入れ先出し）方式のデータ構造。push で追加、pop で取り出す。",
    category: "データ構造",
  },
  {
    term: "キュー",
    reading: "きゅー",
    description: "FIFO（先入れ先出し）方式のデータ構造。enqueue で追加、dequeue で取り出す。",
    category: "データ構造",
  },
  {
    term: "enum",
    description: "名前付き整数定数の集合を定義するキーワード。コードの可読性を向上させる。",
    category: "データ構造",
  },
  // ── ビルド ───────────────────────────────────────────────────────────────────
  {
    term: "GCC",
    description: "GNU Compiler Collection の C コンパイラ。`gcc main.c -o main` でコンパイルする。",
    category: "ビルド",
  },
  {
    term: "Makefile",
    description: "`make` コマンドで使用するビルド定義ファイル。依存関係とビルドコマンドを記述する。",
    category: "ビルド",
  },
  {
    term: "コンパイル",
    reading: "こんぱいる",
    description: "ソースコードを機械語（オブジェクトファイル）に変換する処理。GCCの `-c` オプションで行う。",
    category: "ビルド",
  },
  {
    term: "リンク",
    reading: "りんく",
    description: "複数のオブジェクトファイルとライブラリを結合して実行可能ファイルを生成する処理。",
    category: "ビルド",
  },
  {
    term: "ヘッダファイル",
    reading: "へっだふぁいる",
    description: "関数プロトタイプ、型定義、マクロ定義などを含む `.h` 拡張子のファイル。",
    category: "ビルド",
  },
  // ── 入出力 ───────────────────────────────────────────────────────────────────
  {
    term: "fopen",
    description: "ファイルを開く関数。モード（`\"r\"`、`\"w\"`、`\"a\"` など）を指定して `FILE *` を返す。",
    category: "入出力",
  },
  {
    term: "fclose",
    description: "開いたファイルを閉じる関数。`fopen` で開いたファイルは必ず閉じる必要がある。",
    category: "入出力",
  },
  {
    term: "fprintf",
    description: "ファイルストリームに書式指定で出力する関数。`printf` のファイル版。",
    category: "入出力",
  },
  {
    term: "fscanf",
    description: "ファイルストリームから書式指定で読み込む関数。`scanf` のファイル版。",
    category: "入出力",
  },
  {
    term: "fgets",
    description: "ファイルまたは標準入力から1行読み込む関数。`gets` より安全で推奨される。",
    category: "入出力",
  },
  {
    term: "標準入出力",
    reading: "ひょうじゅんにゅうしゅつりょく",
    description: "stdin（標準入力）、stdout（標準出力）、stderr（標準エラー出力）の3つのストリーム。",
    category: "入出力",
  },
];
