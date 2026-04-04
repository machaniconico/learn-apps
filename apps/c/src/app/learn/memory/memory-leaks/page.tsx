import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function MemoryLeaksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メモリリーク</h1>
        <p className="text-gray-400">リーク検出・valgrind・よくあるパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メモリリークとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メモリリークとは、確保したメモリを free() せずにポインタを失うことです。
          プログラムが動き続けるとメモリ消費が増え続け、最終的にシステムが不安定になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>全ての malloc/calloc に対応する free が必要</li>
          <li>エラーパスでも free を忘れずに</li>
          <li>valgrind でリークを検出: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">valgrind --leak-check=full ./program</code></li>
          <li>free 後にポインタを NULL にする習慣</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リークの典型的なパターン</h2>
        <p className="text-gray-400 mb-4">
          よくあるメモリリークのパターンと正しい書き方を比較します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

// 悪い例: メモリリーク
void leaky(int n) {
    int *arr = (int *)malloc(n * sizeof(int));
    // ... 処理 ...
    // free(arr); ← 忘れた！リーク発生
    (void)arr;
}

// 良い例: 正しく解放
void safe(int n) {
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) return;
    // ... 処理 ...
    free(arr);
    arr = NULL;
}

int main() {
    // leaky(100);  // リーク発生
    safe(100);      // 正しく解放
    printf("正しく解放しました\\n");
    return 0;
}`}
          expectedOutput={`正しく解放しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーパスでのリーク</h2>
        <p className="text-gray-400 mb-4">
          エラー処理でも確保済みのメモリを解放する必要があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int process(int n) {
    int *a = (int *)malloc(n * sizeof(int));
    if (a == NULL) return -1;

    int *b = (int *)malloc(n * sizeof(int));
    if (b == NULL) {
        free(a);  // a を解放してから戻る
        return -1;
    }

    for (int i = 0; i < n; i++) {
        a[i] = i;
        b[i] = i * 2;
        printf("a[%d]=%d b[%d]=%d\\n", i, a[i], i, b[i]);
    }

    free(a);
    free(b);
    return 0;
}

int main() {
    process(3);
    return 0;
}`}
          expectedOutput={`a[0]=0 b[0]=0
a[1]=1 b[1]=2
a[2]=2 b[2]=4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループでの確保と解放</h2>
        <p className="text-gray-400 mb-4">
          ループ内で確保する場合はループ内で必ず解放します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    for (int i = 0; i < 3; i++) {
        int *buf = (int *)malloc(10 * sizeof(int));
        if (buf == NULL) continue;

        for (int j = 0; j < 10; j++) buf[j] = i * 10 + j;
        printf("iter %d: buf[0]=%d\\n", i, buf[0]);

        free(buf);  // ループ内で必ず解放
        buf = NULL;
    }
    printf("完了\\n");
    return 0;
}`}
          expectedOutput={`iter 0: buf[0]=0
iter 1: buf[0]=10
iter 2: buf[0]=20
完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="memory-leaks" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-leaks" basePath="/learn/memory" />
    </div>
  );
}
