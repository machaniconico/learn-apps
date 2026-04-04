import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function OptimizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビルド レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">最適化</h1>
        <p className="text-gray-400">-O0から-O3・-Osのフラグと代表的なコンパイラ最適化を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">最適化レベル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GCC/Clangは複数の最適化レベルをサポートします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-O0</code> — 最適化なし（デバッグに最適、デフォルト）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-O1</code> — 基本的な最適化（コード削減・速度改善）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-O2</code> — 標準的な最適化（本番推奨）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-O3</code> — 積極的な最適化（インライン展開・ベクトル化）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-Os</code> — サイズ優先（組込み向け）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-Og</code> — デバッグしやすい最適化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">定数畳み込みとデッドコード削除</h2>
        <p className="text-gray-400 mb-4">
          コンパイラは定数式をコンパイル時に計算（定数畳み込み）し、
          実行されないコードを削除（デッドコード削除）します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main(void) {
    /* 定数畳み込み: コンパイル時に計算される */
    int a = 2 * 3 * 7;  /* コンパイル時に42 */
    double pi_approx = 355.0 / 113.0;  /* コンパイル時計算 */

    printf("2*3*7 = %d\\n", a);
    printf("355/113 = %.6f\\n", pi_approx);

    /* デッドコード削除 */
    int x = 10;
    if (0) {
        /* -O1以上で削除される */
        printf("この行は実行されない\\n");
    }

    if (x > 5) {
        printf("x=%d は5より大きい\\n", x);
    }

    return 0;
}`}
          expectedOutput={`2*3*7 = 42
355/113 = 3.141593
x=10 は5より大きい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インライン展開</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">inline</code> ヒントや-O2以上でコンパイラが関数呼び出しをコードに展開します。
          小さな関数で効果的です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* inlineヒント: コンパイラに展開を提案 */
static inline int square(int x) {
    return x * x;
}

static inline int clamp(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

int main(void) {
    /* -O2以上でsquare()の呼び出しがインライン展開される */
    for (int i = 1; i <= 5; i++) {
        printf("%d^2 = %d\\n", i, square(i));
    }

    printf("clamp(15, 0, 10) = %d\\n", clamp(15, 0, 10));
    printf("clamp(-5, 0, 10) = %d\\n", clamp(-5, 0, 10));
    printf("clamp(7, 0, 10) = %d\\n", clamp(7, 0, 10));

    return 0;
}`}
          expectedOutput={`1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25
clamp(15, 0, 10) = 10
clamp(-5, 0, 10) = 0
clamp(7, 0, 10) = 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループ最適化</h2>
        <p className="text-gray-400 mb-4">
          コンパイラはループ不変コードの外出し（ループ外移動）や
          ループ展開を自動で行います。キャッシュフレンドリーなコードも重要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define N 1000

int arr[N];

void init_array(void) {
    for (int i = 0; i < N; i++) {
        arr[i] = i;
    }
}

long long sum_array(void) {
    long long total = 0;
    /* コンパイラはこのループを自動ベクトル化（-O3）する場合がある */
    for (int i = 0; i < N; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    init_array();
    long long s = sum_array();
    printf("0から%dの合計: %lld\\n", N - 1, s);
    /* N*(N-1)/2 = 1000*999/2 = 499500 */
    printf("期待値: %d\\n", N * (N - 1) / 2);
    return 0;
}`}
          expectedOutput={`0から999の合計: 499500
期待値: 499500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="optimization" />
      </div>
      <LessonNav lessons={lessons} currentId="optimization" basePath="/learn/build" />
    </div>
  );
}
