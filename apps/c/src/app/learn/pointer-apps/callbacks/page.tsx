import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function CallbacksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コールバック</h1>
        <p className="text-gray-400">関数を引数として渡すコールバックパターンとqsortの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コールバックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コールバックとは、ある関数に別の関数を引数として渡し、処理の中で呼び出してもらうパターンです。
          Cの標準ライブラリ <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">qsort()</code> は比較関数をコールバックとして受け取ります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>汎用的な処理に具体的な動作を注入できる</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">qsort(arr, n, size, compare)</code> — 比較関数を渡してソート</li>
          <li>コールバック関数のシグネチャは呼び出し側が決める</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">qsortとコールバック</h2>
        <p className="text-gray-400 mb-4">
          標準ライブラリの <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">qsort()</code> は比較関数のポインタを受け取り、
          任意の型の配列をソートできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

// 昇順比較コールバック
int cmp_asc(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

// 降順比較コールバック
int cmp_desc(const void *a, const void *b) {
    return *(int*)b - *(int*)a;
}

void print_array(int *arr, int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int data[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int n = 9;

    qsort(data, n, sizeof(int), cmp_asc);
    printf("昇順: ");
    print_array(data, n);

    qsort(data, n, sizeof(int), cmp_desc);
    printf("降順: ");
    print_array(data, n);

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 4 5 6 7 8 9
降順: 9 8 7 6 5 4 3 2 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムコールバックの実装</h2>
        <p className="text-gray-400 mb-4">
          自分でコールバックを受け取る関数を実装してみましょう。
          配列の各要素に任意の処理を適用する <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">forEach</code> パターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef void (*IntAction)(int);

void for_each(int *arr, int n, IntAction action) {
    for (int i = 0; i < n; i++) {
        action(arr[i]);
    }
}

void print_item(int x)   { printf("%d\\n", x); }
void print_doubled(int x) { printf("%d\\n", x * 2); }
void print_square(int x)  { printf("%d\\n", x * x); }

int main() {
    int data[] = {1, 2, 3, 4, 5};
    int n = 5;

    printf("元の値:\\n");
    for_each(data, n, print_item);

    printf("2倍:\\n");
    for_each(data, n, print_doubled);

    printf("2乗:\\n");
    for_each(data, n, print_square);

    return 0;
}`}
          expectedOutput={`元の値:
1
2
3
4
5
2倍:
2
4
6
8
10
2乗:
1
4
9
16
25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="callbacks" />
      </div>
      <LessonNav lessons={lessons} currentId="callbacks" basePath="/learn/pointer-apps" />
    </div>
  );
}
