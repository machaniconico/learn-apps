import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

export default function LinkingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">マルチファイル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リンク</h1>
        <p className="text-gray-400">複数の.oファイルをリンクする方法とexternキーワードの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リンクとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各.cファイルをコンパイルすると.oファイル（オブジェクトファイル）ができます。
          リンカはこれらの.oファイルと必要なライブラリを組み合わせて実行ファイルを生成します。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`# 各ファイルをコンパイル（.o生成）
gcc -c main.c    -o main.o
gcc -c utils.c   -o utils.o
gcc -c math_lib.c -o math_lib.o

# リンク（実行ファイル生成）
gcc main.o utils.o math_lib.o -o myprogram

# 数学ライブラリをリンク
gcc main.o -lm -o myprogram`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">externによるグローバル変数の共有</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">extern</code> で別ファイルで定義された変数や関数を参照します。
          定義は1ファイル、宣言は複数ファイルで可能です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* ---- config.c の内容 ----
 * int debug_level = 1;
 * const char *app_name = "MyApp";
 * -------------------------------- */

/* ---- config.h の内容 ----
 * extern int debug_level;
 * extern const char *app_name;
 * -------------------------------- */

/* ここでは同一ファイルで模倣 */
int debug_level = 1;
const char *app_name = "MyApp";

/* 別ファイルからexternで参照する形 */
extern int debug_level;
extern const char *app_name;

void log_debug(const char *msg) {
    if (debug_level > 0) {
        printf("[%s DEBUG] %s\\n", app_name, msg);
    }
}

int main(void) {
    log_debug("アプリ起動");

    debug_level = 0;  /* ログを無効化 */
    log_debug("このメッセージは表示されない");

    debug_level = 2;  /* 再有効化 */
    log_debug("デバッグレベル2");

    return 0;
}`}
          expectedOutput={`[MyApp DEBUG] アプリ起動
[MyApp DEBUG] デバッグレベル2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">静的ライブラリと動的ライブラリ</h2>
        <p className="text-gray-400 mb-4">
          ライブラリには静的（.a）と動的（.so/.dll）の2種類があります。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-l</code> フラグでリンクします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>    /* -lm でリンク */
#include <string.h>  /* libc に含まれる */

/* 静的ライブラリ (.a): コンパイル時にリンク
 * 動的ライブラリ (.so/.dll): 実行時にロード
 *
 * gcc main.c -lm -o program
 * gcc main.c -L./lib -lmylib -o program
 */

int main(void) {
    /* math.h の関数 (-lm) */
    printf("sqrt(2) = %.6f\\n", sqrt(2.0));
    printf("pow(2,10) = %.0f\\n", pow(2.0, 10.0));
    printf("sin(PI/2) = %.6f\\n", sin(3.14159265 / 2.0));

    /* string.h の関数 (libc) */
    char buf[32];
    strcpy(buf, "Hello, Linker!");
    printf("strlen: %zu\\n", strlen(buf));

    return 0;
}`}
          expectedOutput={`sqrt(2) = 1.414214
pow(2,10) = 1024
sin(PI/2) = 1.000000
strlen: 14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リンクエラーの理解</h2>
        <p className="text-gray-400 mb-4">
          「undefined reference」はリンクエラーの典型です。
          宣言はあるが定義がない場合に発生します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* リンクエラーが起きる典型的なケース:
 *
 * // header.h
 * void missing_func(void);  // 宣言あり
 *
 * // main.c
 * #include "header.h"
 * int main(void) {
 *     missing_func();  // 定義が見つからない!
 *     // エラー: undefined reference to 'missing_func'
 * }
 *
 * 解決策:
 * 1. 定義が含まれる.cファイルをコンパイル・リンクする
 * 2. 対応するライブラリをリンクする (-lm など)
 * 3. 関数名のスペルを確認する
 */

/* 正しい例: 宣言と定義が揃っている */
void greet(const char *name);  /* 宣言 */

void greet(const char *name) { /* 定義 */
    printf("こんにちは、%s！\\n", name);
}

int main(void) {
    greet("リンカ");
    greet("プログラマ");
    return 0;
}`}
          expectedOutput={`こんにちは、リンカ！
こんにちは、プログラマ！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="multifile" lessonId="linking" />
      </div>
      <LessonNav lessons={lessons} currentId="linking" basePath="/learn/multifile" />
    </div>
  );
}
