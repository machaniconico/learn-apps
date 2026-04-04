import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function InsertionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">挿入ソート</h1>
        <p className="text-gray-400">ソート済み部分に1つずつ要素を挿入していく挿入ソートを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">挿入ソートの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          挿入ソートはトランプのカードを手に取るイメージです。
          新しいカードを取るたびに、すでに並べたカードの適切な位置に挿入します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：最悪・平均 O(n²)、最良（ソート済み）O(n)</li>
          <li>空間計算量：O(1)（インプレース）</li>
          <li>安定ソート</li>
          <li>ほぼソート済みの小さな配列に最適</li>
          <li>クイックソートやマージソートの内部で小さいサイズに使われることも多い</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">挿入ソートの実装</h2>
        <p className="text-gray-400 mb-4">
          現在の要素（key）を取り出し、その値より大きい要素を1つ右にずらして、
          適切な位置に key を挿入します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        /* key より大きい要素を右にずらす */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = 5;

    insertionSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`5 6 11 12 13 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各ステップの可視化</h2>
        <p className="text-gray-400 mb-4">
          挿入ソートの各ステップでどのように配列が変化するかを確認しましょう。
          左側のソート済み部分が右に向かって伸びていきます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void insertionSortVerbose(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        printf("i=%d key=%d: ", i, key);
        for (int k = 0; k < n; k++) printf("%d ", arr[k]);
        printf("\\n");
    }
}

int main() {
    int arr[] = {5, 2, 4, 6, 1, 3};
    int n = 6;
    insertionSortVerbose(arr, n);
    return 0;
}`}
          expectedOutput={`i=1 key=2: 2 5 4 6 1 3
i=2 key=4: 2 4 5 6 1 3
i=3 key=6: 2 4 5 6 1 3
i=4 key=1: 1 2 4 5 6 3
i=5 key=3: 1 2 3 4 5 6 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="insertion" />
      </div>
      <LessonNav lessons={lessons} currentId="insertion" basePath="/learn/sorting" />
    </div>
  );
}
