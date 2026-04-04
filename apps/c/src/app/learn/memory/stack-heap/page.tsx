import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function StackHeapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタックとヒープ</h1>
        <p className="text-gray-400">スタックとヒープのメモリ、自動変数と動的確保の違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">2種類のメモリ領域</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語プログラムは主に2つのメモリ領域を使います。
          スタックは関数呼び出しに伴い自動管理される高速な領域、
          ヒープはプログラマが明示的に確保・解放する自由度の高い領域です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スタック: ローカル変数・関数引数・戻り先アドレスを格納、自動管理</li>
          <li>ヒープ: malloc/calloc/reallocで確保、free()で解放が必要</li>
          <li>スタックは高速だがサイズ制限あり（通常数MB）</li>
          <li>ヒープは大きなデータや動的サイズに向く</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタック上の変数</h2>
        <p className="text-gray-400 mb-4">
          関数内のローカル変数はスタックに確保され、関数終了時に自動解放されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void funcA() {
    int x = 10;  // スタックに確保
    int y = 20;
    printf("funcA: x=%d, y=%d\\n", x, y);
    // 関数終了時に自動解放
}

void funcB(int n) {
    int arr[5] = {1, 2, 3, 4, 5};  // スタックに確保
    printf("funcB: n=%d, arr[0]=%d\\n", n, arr[0]);
}

int main() {
    funcA();
    funcB(42);
    printf("main終了\\n");
    return 0;
}`}
          expectedOutput={`funcA: x=10, y=20
funcB: n=42, arr[0]=1
main終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヒープ上の動的確保</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">malloc()</code> でヒープにメモリを確保します。関数を越えても有効です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int *createArray(int size) {
    // ヒープに確保 - 関数終了後も有効
    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL) return NULL;
    for (int i = 0; i < size; i++) {
        arr[i] = i * i;
    }
    return arr;
}

int main() {
    int *data = createArray(5);

    for (int i = 0; i < 5; i++) {
        printf("data[%d] = %d\\n", i, data[i]);
    }

    free(data);  // 手動で解放必須
    return 0;
}`}
          expectedOutput={`data[0] = 0
data[1] = 1
data[2] = 4
data[3] = 9
data[4] = 16`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックとヒープの比較</h2>
        <p className="text-gray-400 mb-4">
          両者のアドレスを比較すると、スタックとヒープが異なるメモリ領域にあることがわかります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int global_var = 100;  // データセグメント

int main() {
    int stack_var = 200;           // スタック
    int *heap_var = (int *)malloc(sizeof(int));
    *heap_var = 300;

    printf("グローバル変数アドレス: %p\\n", (void *)&global_var);
    printf("スタック変数アドレス:   %p\\n", (void *)&stack_var);
    printf("ヒープ変数アドレス:     %p\\n", (void *)heap_var);

    printf("\\nグローバル: %d\\n", global_var);
    printf("スタック:   %d\\n", stack_var);
    printf("ヒープ:     %d\\n", *heap_var);

    free(heap_var);
    return 0;
}`}
          expectedOutput={`グローバル変数アドレス: 0x...
スタック変数アドレス:   0x...
ヒープ変数アドレス:     0x...

グローバル: 100
スタック:   200
ヒープ:     300`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="stack-heap" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-heap" basePath="/learn/memory" />
    </div>
  );
}
