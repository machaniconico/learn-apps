import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

export default function PerformancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">イディオム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンス</h1>
        <p className="text-gray-400">キャッシュフレンドリーなコード・分岐予測・ループ展開などの最適化技法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パフォーマンス最適化の原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最初に正しく動くコードを書き、プロファイリングでボトルネックを特定してから最適化します。
          「早すぎる最適化は諸悪の根源」（Knuth）を忘れずに。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">空間的局所性</strong>: 近いメモリを連続アクセス（キャッシュ効率）</li>
          <li><strong className="text-white">時間的局所性</strong>: 同じデータを繰り返し使用</li>
          <li><strong className="text-white">分岐予測</strong>: 予測しやすいパターンのif文</li>
          <li><strong className="text-white">ループ展開</strong>: 手動またはコンパイラによる展開</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キャッシュフレンドリーなアクセス</h2>
        <p className="text-gray-400 mb-4">
          2次元配列は行優先（row-major）でアクセスするとキャッシュミスが減ります。
          C言語の配列は行優先で格納されています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define N 4

int matrix[N][N];

/* キャッシュフレンドリー: 行優先アクセス */
long long sum_row_major(void) {
    long long sum = 0;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            sum += matrix[i][j];  /* 連続メモリアクセス */
        }
    }
    return sum;
}

/* キャッシュ非効率: 列優先アクセス */
long long sum_col_major(void) {
    long long sum = 0;
    for (int j = 0; j < N; j++) {
        for (int i = 0; i < N; i++) {
            sum += matrix[i][j];  /* ストライドアクセス */
        }
    }
    return sum;
}

int main(void) {
    /* 初期化 */
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            matrix[i][j] = i * N + j + 1;

    /* 行列表示 */
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            printf("%3d", matrix[i][j]);
        printf("\\n");
    }

    printf("行優先合計: %lld\\n", sum_row_major());
    printf("列優先合計: %lld\\n", sum_col_major());
    printf("(同じ結果、異なるキャッシュ効率)\\n");

    return 0;
}`}
          expectedOutput={`  1  2  3  4
  5  6  7  8
  9 10 11 12
 13 14 15 16
行優先合計: 136
列優先合計: 136
(同じ結果、異なるキャッシュ効率)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">分岐予測のヒント</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__builtin_expect</code>（GCC/Clang）でコンパイラに分岐予測ヒントを与えます。
          エラーパスなど「めったに通らない」分岐に使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

/* 分岐予測ヒントマクロ */
#ifdef __GNUC__
  #define LIKELY(x)   __builtin_expect(!!(x), 1)
  #define UNLIKELY(x) __builtin_expect(!!(x), 0)
#else
  #define LIKELY(x)   (x)
  #define UNLIKELY(x) (x)
#endif

void *safe_malloc(size_t size) {
    void *ptr = malloc(size);
    if (UNLIKELY(ptr == NULL)) {  /* めったに起きない */
        fprintf(stderr, "malloc failed\\n");
        return NULL;
    }
    return ptr;
}

int process(int x) {
    if (LIKELY(x > 0)) {  /* 通常はtrue */
        return x * 2;
    }
    return 0;
}

int main(void) {
    /* 通常パス */
    for (int i = 1; i <= 5; i++) {
        printf("process(%d) = %d\\n", i, process(i));
    }

    void *p = safe_malloc(1024);
    if (p) {
        printf("malloc成功\\n");
        free(p);
    }

    return 0;
}`}
          expectedOutput={`process(1) = 2
process(2) = 4
process(3) = 6
process(4) = 8
process(5) = 10
malloc成功`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループ最適化テクニック</h2>
        <p className="text-gray-400 mb-4">
          ループ不変コードの外出し、ループ展開、SIMDフレンドリーなコードなどで
          ループのパフォーマンスを改善できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define N 8

/* ループ不変コードの外出し */
void normalize(float *arr, int n) {
    float max = arr[0];

    /* max の計算を先に（ループ不変でない場合は外出し不可） */
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }

    /* max は定数として最適化される */
    for (int i = 0; i < n; i++) {
        arr[i] /= max;
    }
}

/* 手動ループ展開 (unrolling) */
void sum_unrolled(const int *arr, int n, long long *result) {
    long long s0 = 0, s1 = 0, s2 = 0, s3 = 0;
    int i = 0;

    /* 4要素ずつ処理 */
    for (; i <= n - 4; i += 4) {
        s0 += arr[i];
        s1 += arr[i + 1];
        s2 += arr[i + 2];
        s3 += arr[i + 3];
    }
    /* 残りを処理 */
    for (; i < n; i++) s0 += arr[i];

    *result = s0 + s1 + s2 + s3;
}

int main(void) {
    float data[] = {2.0f, 4.0f, 1.0f, 8.0f, 6.0f};
    normalize(data, 5);
    printf("正規化: ");
    for (int i = 0; i < 5; i++) printf("%.2f ", data[i]);
    printf("\\n");

    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    long long s;
    sum_unrolled(arr, 8, &s);
    printf("sum(1..8) = %lld\\n", s);

    return 0;
}`}
          expectedOutput={`正規化: 0.25 0.50 0.12 1.00 0.75
sum(1..8) = 36`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="idioms" lessonId="performance" />
      </div>
      <LessonNav lessons={lessons} currentId="performance" basePath="/learn/idioms" />
    </div>
  );
}
