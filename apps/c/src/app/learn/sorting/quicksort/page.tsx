import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function QuicksortPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クイックソート</h1>
        <p className="text-gray-400">ピボットによる分割と再帰を使ったクイックソートを実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クイックソートの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クイックソートは「分割統治法」を使います。ピボット（基準値）を選び、
          ピボット以下を左側、ピボット以上を右側に分割してから再帰的にソートします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：平均 O(n log n)、最悪 O(n²)（ピボット選択が悪い場合）</li>
          <li>空間計算量：O(log n)（再帰スタック）</li>
          <li>不安定ソート</li>
          <li>平均的に最も高速な比較ソート</li>
          <li>ピボット選択が重要（ランダム・中央値の中央値など）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">partition 関数</h2>
        <p className="text-gray-400 mb-4">
          Lomuto 分割スキームを使います。末尾要素をピボットとして選び、
          ピボット以下の要素を左側に集めます。最後にピボットを正しい位置に置きます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[hi]);
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = 6;

    quickSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 5 7 8 9 10 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ランダムピボットによる改善</h2>
        <p className="text-gray-400 mb-4">
          ピボットをランダムに選ぶことで最悪ケース O(n²) になる確率を下げられます。
          ランダムピボットを末尾と交換してから通常の partition を呼ぶだけで実現できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) { int t=*a; *a=*b; *b=t; }

int partition(int arr[], int lo, int hi) {
    /* ランダムなピボットを末尾と交換 */
    int r = lo + rand() % (hi - lo + 1);
    swap(&arr[r], &arr[hi]);
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot) swap(&arr[++i], &arr[j]);
    swap(&arr[i + 1], &arr[hi]);
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

int main() {
    srand(42);
    int arr[] = {3, 6, 8, 10, 1, 2, 1};
    int n = 7;
    quickSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 1 2 3 6 8 10 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="quicksort" />
      </div>
      <LessonNav lessons={lessons} currentId="quicksort" basePath="/learn/sorting" />
    </div>
  );
}
