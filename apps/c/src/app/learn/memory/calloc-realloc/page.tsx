import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function CallocReallocPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">calloc・realloc</h1>
        <p className="text-gray-400">ゼロ初期化のcalloc()とサイズ変更のrealloc()を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">calloc と realloc の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">calloc(n, size)</code> はn個のsize バイト要素を確保しゼロ初期化します。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">realloc(ptr, newsize)</code> は既存のメモリブロックのサイズを変更します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>calloc: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">calloc(n, sizeof(型))</code> - ゼロ初期化</li>
          <li>realloc: 成功時は新しいポインタを返す（元と異なる場合あり）</li>
          <li>realloc失敗時はNULLを返す（元のポインタは有効）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">realloc(ptr, 0)</code> は free と同等</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">calloc でゼロ初期化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">calloc</code> は確保したメモリを全て0に初期化します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;

    // calloc: ゼロ初期化あり
    int *arr = (int *)calloc(n, sizeof(int));

    printf("calloc後（初期化確認）:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    // 使用例: カウンタ配列
    arr[2]++;
    arr[2]++;
    arr[4]++;
    printf("\\nカウント後:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    free(arr);
    return 0;
}`}
          expectedOutput={`calloc後（初期化確認）:
arr[0] = 0
arr[1] = 0
arr[2] = 0
arr[3] = 0
arr[4] = 0

カウント後:
arr[0] = 0
arr[1] = 0
arr[2] = 2
arr[3] = 0
arr[4] = 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">realloc でサイズ変更</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">realloc</code> で動的配列を拡張します。失敗に備えて一時変数に受けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int capacity = 3;
    int size = 0;
    int *arr = (int *)malloc(capacity * sizeof(int));

    // 要素を追加（必要なら拡張）
    for (int val = 1; val <= 6; val++) {
        if (size == capacity) {
            capacity *= 2;
            int *tmp = (int *)realloc(arr, capacity * sizeof(int));
            if (tmp == NULL) { free(arr); return 1; }
            arr = tmp;
            printf("拡張: capacity=%d\\n", capacity);
        }
        arr[size++] = val * 10;
    }

    printf("要素数: %d\\n", size);
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`}
          expectedOutput={`拡張: capacity=6
要素数: 6
10 20 30 40 50 60`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="calloc-realloc" />
      </div>
      <LessonNav lessons={lessons} currentId="calloc-realloc" basePath="/learn/memory" />
    </div>
  );
}
