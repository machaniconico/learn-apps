import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function GccClangPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビルド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">GCC・Clang</h1>
        <p className="text-gray-400">gccの重要なフラグ（-Wall、-O2、-g）とclangとの違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なgccフラグ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GCCとClangはどちらも強力なCコンパイラです。基本的なフラグは共通して使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-Wall</code> — 一般的な警告をすべて有効化</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-Wextra</code> — 追加の警告を有効化</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-Werror</code> — 警告をエラーとして扱う</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-g</code> — デバッグ情報を付加（gdb用）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-O2</code> — 標準的な最適化</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-std=c11</code> — C11標準を使用</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-fsanitize=address</code> — AddressSanitizer（Clangのみ完全対応）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">警告を活用したコード改善</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-Wall -Wextra</code> を常に有効にすることで
          バグになりやすいコードを早期発見できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* gcc -Wall -Wextra -std=c11 -o prog prog.c */

int safe_divide(int a, int b, int *result) {
    if (b == 0) {
        return -1;  /* エラー */
    }
    *result = a / b;
    return 0;
}

int main(void) {
    int result;
    int ret = safe_divide(10, 2, &result);
    if (ret == 0) {
        printf("10 / 2 = %d\\n", result);
    }

    ret = safe_divide(5, 0, &result);
    if (ret != 0) {
        printf("ゼロ除算エラー\\n");
    }

    return 0;
}`}
          expectedOutput={`10 / 2 = 5
ゼロ除算エラー`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GCC vs Clang</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GCCとClangはどちらも高品質なコンパイラですが、いくつかの違いがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Clangはより読みやすいエラーメッセージを出力する</li>
          <li>ClangはLLVMバックエンドを使いApple製品で標準採用</li>
          <li>GCCはLinux/GNUツールチェインの標準</li>
          <li>AddressSanitizerはClangが先行実装（GCCも対応）</li>
          <li>コンパイルフラグは大部分が共通</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグビルドとリリースビルド</h2>
        <p className="text-gray-400 mb-4">
          開発中は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-g -O0</code>、
          本番では <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-O2 -DNDEBUG</code> を使い分けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

/* デバッグビルド: gcc -g -O0 -DDEBUG prog.c
 * リリースビルド: gcc -O2 -DNDEBUG prog.c  */

void process(int value) {
    assert(value >= 0);  /* NDEBUGで無効化 */

#ifdef DEBUG
    printf("[DEBUG] processing value=%d\\n", value);
#endif

    printf("結果: %d\\n", value * 2);
}

int main(void) {
    process(5);
    process(10);
    return 0;
}`}
          expectedOutput={`結果: 10
結果: 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">-std フラグでC標準を指定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-std=c99</code> や
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-std=c11</code> でコンパイルするC標準バージョンを指定します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>   /* C99 */
#include <stdbool.h>  /* C99 */

/* gcc -std=c11 -Wall -o prog prog.c */

int main(void) {
    /* C99: for文内での変数宣言 */
    for (int i = 0; i < 3; i++) {
        printf("i=%d\\n", i);
    }

    /* C99: bool型 */
    bool ok = true;
    printf("ok=%s\\n", ok ? "true" : "false");

    /* C99: 固定幅整数 */
    int32_t x = 1000;
    printf("int32_t: %d\\n", x);

    /* C11: _Static_assert */
    _Static_assert(sizeof(int) >= 2, "int too small");
    printf("C11 static assert OK\\n");

    return 0;
}`}
          expectedOutput={`i=0
i=1
i=2
ok=true
int32_t: 1000
C11 static assert OK`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="gcc-clang" />
      </div>
      <LessonNav lessons={lessons} currentId="gcc-clang" basePath="/learn/build" />
    </div>
  );
}
