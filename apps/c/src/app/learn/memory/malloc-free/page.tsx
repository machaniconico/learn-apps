import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function MallocFreePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">malloc・free</h1>
        <p className="text-gray-400">malloc()・free()・void*のキャストを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">malloc と free の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">malloc(size)</code> は指定バイト数のメモリをヒープに確保し、
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void *</code> を返します。
          失敗時はNULLを返すので必ずチェックしましょう。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">free(ptr)</code> で解放します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">malloc(n * sizeof(型))</code> でn要素分確保</li>
          <li>戻り値の <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void *</code> を適切な型にキャスト</li>
          <li>確保したメモリは初期化されない（ランダム値）</li>
          <li>必ず <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">free()</code> で解放する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な malloc・free</h2>
        <p className="text-gray-400 mb-4">
          整数配列を動的確保して使用後に解放するパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        fprintf(stderr, "メモリ確保失敗\\n");
        return 1;
    }

    // 初期化して使用
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    free(arr);
    arr = NULL;  // ダングリングポインタ防止
    printf("解放完了\\n");

    return 0;
}`}
          expectedOutput={`arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50
解放完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の動的確保</h2>
        <p className="text-gray-400 mb-4">
          ポインタのポインタで2次元配列を動的に確保できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;

    // ポインタ配列を確保
    int **matrix = (int **)malloc(rows * sizeof(int *));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int *)malloc(cols * sizeof(int));
    }

    // 値を設定
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j;
        }
    }

    // 表示
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%3d", matrix[i][j]);
        }
        printf("\\n");
    }

    // 解放（逆順）
    for (int i = 0; i < rows; i++) free(matrix[i]);
    free(matrix);

    return 0;
}`}
          expectedOutput={`  0  1  2  3
  4  5  6  7
  8  9 10 11`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">void * とキャスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">void *</code> は型なしポインタです。malloc の戻り値を適切な型にキャストして使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    // void* を各型にキャスト
    void *ptr = malloc(16);

    char *cp = (char *)ptr;
    cp[0] = 'H'; cp[1] = 'i'; cp[2] = '\\0';
    printf("文字列: %s\\n", cp);

    int *ip = (int *)ptr;
    *ip = 12345;
    printf("整数: %d\\n", *ip);

    double *dp = (double *)ptr;
    *dp = 3.14;
    printf("倍精度: %.2f\\n", *dp);

    free(ptr);
    return 0;
}`}
          expectedOutput={`文字列: Hi
整数: 12345
倍精度: 3.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="malloc-free" />
      </div>
      <LessonNav lessons={lessons} currentId="malloc-free" basePath="/learn/memory" />
    </div>
  );
}
