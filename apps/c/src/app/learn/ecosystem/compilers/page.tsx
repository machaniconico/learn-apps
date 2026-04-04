import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CompilersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパイラ</h1>
        <p className="text-gray-400">GCC・Clang・MSVC・TCCの特徴と比較を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なCコンパイラ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には複数の高品質なコンパイラが存在します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><strong className="text-white">GCC</strong>: GNU Compiler Collection。Linux/Unixの標準。C23まで対応。-fanalyzerなど高度な解析機能</li>
          <li><strong className="text-white">Clang</strong>: LLVMバックエンド。Apple製品で標準。読みやすいエラーメッセージ。sanitizerが充実</li>
          <li><strong className="text-white">MSVC</strong>: Microsoft Visual C++。Windowsの標準。Visual Studioに統合</li>
          <li><strong className="text-white">TCC</strong>: Tiny C Compiler。超高速コンパイル。組込みスクリプト実行に使える</li>
          <li><strong className="text-white">ICC/ICX</strong>: Intel C Compiler。Intel CPUに特化した最適化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイラが検出する問題</h2>
        <p className="text-gray-400 mb-4">
          現代のコンパイラは多くのバグを静的解析で検出します。
          -Wall -Wextra を常に有効にしましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* コンパイラが警告する典型的なパターン */

/* 警告: 未使用変数 (-Wunused-variable) */
/* int unused = 42; */

/* 警告: 符号なし/符号付き比較 (-Wsign-compare) */
void check_sign(void) {
    unsigned int u = 10;
    int s = -5;
    /* if (u > s) ... -- 符号なしとして比較されるため注意 */
    if ((int)u > s) {
        printf("u(%u) > s(%d)\\n", u, s);
    }
}

/* 警告: フォールスルー (-Wimplicit-fallthrough) */
void switch_example(int x) {
    switch (x) {
        case 1:
            printf("one\\n");
            break;  /* 明示的break */
        case 2:
            printf("two\\n");
            break;
        default:
            printf("other\\n");
    }
}

int main(void) {
    check_sign();
    switch_example(1);
    switch_example(2);
    switch_example(3);
    return 0;
}`}
          expectedOutput={`u(10) > s(-5)
one
two
other`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AddressSanitizerとUBSanitizer</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GCC/Clangにはサニタイザー機能があり、実行時にメモリエラーや未定義動作を検出します。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`# AddressSanitizer: メモリエラー検出
gcc -fsanitize=address -g prog.c

# UBSanitizer: 未定義動作検出
gcc -fsanitize=undefined -g prog.c

# 両方有効
gcc -fsanitize=address,undefined -g prog.c

# ThreadSanitizer: データ競合検出
gcc -fsanitize=thread -g prog.c`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイラの特定フラグ</h2>
        <p className="text-gray-400 mb-4">
          コンパイラ固有の拡張機能は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#ifdef</code> で条件付きに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* コンパイラ検出と固有機能 */
#ifdef __GNUC__
  #define NOINLINE __attribute__((noinline))
  #define PACKED   __attribute__((packed))
  #define NORETURN __attribute__((noreturn))
#elif defined(_MSC_VER)
  #define NOINLINE __declspec(noinline)
  #define PACKED
  #define NORETURN __declspec(noreturn)
#else
  #define NOINLINE
  #define PACKED
  #define NORETURN
#endif

NOINLINE int heavy_compute(int x) {
    /* インライン展開を防ぐ */
    return x * x + x + 1;
}

/* PACKED: パディングなし構造体 */
typedef struct PACKED {
    char a;    /* 通常1バイト */
    int b;     /* 通常4バイト、パディングあり */
    char c;    /* 通常1バイト */
} PackedStruct;

int main(void) {
    printf("heavy_compute(5) = %d\\n", heavy_compute(5));

#ifdef __GNUC__
    printf("GCCコンパイラ使用\\n");
    printf("GCCバージョン: %d.%d\\n", __GNUC__, __GNUC_MINOR__);
#elif defined(__clang__)
    printf("Clangコンパイラ使用\\n");
#endif

    printf("sizeof(PackedStruct) = %zu\\n", sizeof(PackedStruct));
    return 0;
}`}
          expectedOutput={`heavy_compute(5) = 31
GCCコンパイラ使用
GCCバージョン: 13.2
sizeof(PackedStruct) = 6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="compilers" />
      </div>
      <LessonNav lessons={lessons} currentId="compilers" basePath="/learn/ecosystem" />
    </div>
  );
}
