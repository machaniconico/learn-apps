import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function DebuggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビルド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デバッグ</h1>
        <p className="text-gray-400">gdbの基本操作・ブレークポイント・ステップ実行・変数表示を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">gdbの基本コマンド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GDB（GNU Debugger）はCプログラムのデバッグに使う強力なツールです。
          まず <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">gcc -g</code> でデバッグ情報付きでコンパイルします。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`gdb ./myprogram      # gdb起動
break main           # main関数にブレークポイント
break 42             # 42行目にブレークポイント
run                  # プログラム実行
next (n)             # 次の行へ（関数呼び出しをスキップ）
step (s)             # 次の行へ（関数内に入る）
print x              # 変数xの値を表示
print *ptr           # ポインタが指す値を表示
backtrace (bt)       # コールスタックを表示
continue (c)         # 次のブレークポイントまで実行
quit (q)             # gdb終了`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグしやすいコードの書き方</h2>
        <p className="text-gray-400 mb-4">
          デバッグのために <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fprintf(stderr, ...)</code> や
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__LINE__</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__func__</code> マクロを活用します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* デバッグマクロ */
#ifdef DEBUG
  #define DBG(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\\n", __func__, __LINE__, ##__VA_ARGS__)
#else
  #define DBG(fmt, ...)
#endif

int factorial(int n) {
    DBG("factorial(%d) called", n);
    if (n <= 1) return 1;
    int result = n * factorial(n - 1);
    DBG("factorial(%d) = %d", n, result);
    return result;
}

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}`}
          expectedOutput={`1! = 1
2! = 2
3! = 6
4! = 24
5! = 120`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくあるバグパターンとデバッグ</h2>
        <p className="text-gray-400 mb-4">
          配列の境界外アクセス、NULLポインタ参照、整数オーバーフローなどがよくあるバグです。
          適切なチェックでバグを防ぎましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* バグを含むコードと修正版 */
char *safe_copy(const char *src, size_t max_len) {
    if (src == NULL) {
        fprintf(stderr, "エラー: NULLポインタ\\n");
        return NULL;
    }

    size_t len = strlen(src);
    if (len >= max_len) {
        fprintf(stderr, "エラー: 文字列が長すぎる(%zu >= %zu)\\n", len, max_len);
        return NULL;
    }

    char *dst = malloc(len + 1);
    if (dst == NULL) {
        fprintf(stderr, "エラー: malloc失敗\\n");
        return NULL;
    }

    strcpy(dst, src);
    return dst;
}

int main(void) {
    char *s = safe_copy("Hello", 64);
    if (s) {
        printf("コピー成功: %s\\n", s);
        free(s);
    }

    /* NULLポインタのテスト */
    char *s2 = safe_copy(NULL, 64);
    printf("NULLテスト: %s\\n", s2 == NULL ? "NULL（正常）" : s2);

    return 0;
}`}
          expectedOutput={`コピー成功: Hello
エラー: NULLポインタ
NULLテスト: NULL（正常）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">valgrindによるメモリデバッグ</h2>
        <p className="text-gray-400 mb-4">
          valgrindはメモリリークや不正なメモリアクセスを検出します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">valgrind --leak-check=full ./myprogram</code> で実行します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

/* valgrind で検出できるメモリ問題の例 */

void good_malloc(void) {
    int *p = malloc(sizeof(int) * 5);
    if (p == NULL) return;

    for (int i = 0; i < 5; i++) {
        p[i] = i * 10;
    }

    for (int i = 0; i < 5; i++) {
        printf("p[%d] = %d\\n", i, p[i]);
    }

    free(p);  /* 必ずfreeする */
    p = NULL; /* ダングリングポインタ防止 */
}

int main(void) {
    good_malloc();
    printf("メモリ管理OK\\n");
    /* valgrind: 0 errors, 0 bytes leaked */
    return 0;
}`}
          expectedOutput={`p[0] = 0
p[1] = 10
p[2] = 20
p[3] = 30
p[4] = 40
メモリ管理OK`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="debugging" basePath="/learn/build" />
    </div>
  );
}
