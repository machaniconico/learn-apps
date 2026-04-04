import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function MergesortPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マージソート</h1>
        <p className="text-gray-400">分割統治法による安定した O(n log n) ソートを実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マージソートの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マージソートは配列を半分に分割し、それぞれを再帰的にソートしてからマージします。
          「分割して解決し、結果を統合する」分割統治法の典型例です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：常に O(n log n)（最良・平均・最悪すべて）</li>
          <li>空間計算量：O(n)（追加配列が必要）</li>
          <li>安定ソート</li>
          <li>大規模データや連結リストのソートに向いている</li>
          <li>クイックソートより遅いことが多いが保証された性能が強み</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">merge 関数</h2>
        <p className="text-gray-400 mb-4">
          2つのソート済みの部分配列を1つにマージします。
          一時配列を使って比較しながら元の配列に書き戻します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

void merge(int arr[], int lo, int mid, int hi) {
    int n1 = mid - lo + 1;
    int n2 = hi - mid;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[lo + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = lo;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else               arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        mergeSort(arr, lo, mid);
        mergeSort(arr, mid + 1, hi);
        merge(arr, lo, mid, hi);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;

    mergeSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`3 9 10 27 38 43 82 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2つのソート済み配列のマージ</h2>
        <p className="text-gray-400 mb-4">
          マージ操作の核心は2つのソート済み配列を1つにまとめることです。
          2つのポインタを使い、小さい方から順に取り出します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void mergeTwoArrays(int a[], int na, int b[], int nb, int out[]) {
    int i = 0, j = 0, k = 0;
    while (i < na && j < nb) {
        if (a[i] <= b[j]) out[k++] = a[i++];
        else               out[k++] = b[j++];
    }
    while (i < na) out[k++] = a[i++];
    while (j < nb) out[k++] = b[j++];
}

int main() {
    int a[] = {1, 3, 5, 7};
    int b[] = {2, 4, 6, 8};
    int out[8];

    mergeTwoArrays(a, 4, b, 4, out);

    for (int i = 0; i < 8; i++)
        printf("%d ", out[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 2 3 4 5 6 7 8 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="mergesort" />
      </div>
      <LessonNav lessons={lessons} currentId="mergesort" basePath="/learn/sorting" />
    </div>
  );
}
