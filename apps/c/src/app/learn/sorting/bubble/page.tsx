import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function BubblePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バブルソート</h1>
        <p className="text-gray-400">隣接要素を比較・交換するバブルソートとフラグによる最適化を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バブルソートの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          バブルソートは隣接する要素を比較して、大きい方を後ろに移動させます。
          これを繰り返すと最大値が「泡のように」末尾に浮かび上がります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：平均・最悪 O(n²)、最良（ソート済み・フラグあり）O(n)</li>
          <li>空間計算量：O(1)（インプレース）</li>
          <li>安定ソート（同じ値の相対順序が保たれる）</li>
          <li>実用的な大規模データには不向き</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なバブルソート</h2>
        <p className="text-gray-400 mb-4">
          外側のループでパス数を管理し、内側のループで隣接要素を比較・交換します。
          i 回目のパス後、末尾 i 個の要素は確定します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;

    bubbleSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`11 12 22 25 34 64 90 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フラグによる最適化</h2>
        <p className="text-gray-400 mb-4">
          1パス全体で交換が1度も行われなかった場合、配列はすでにソート済みです。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">swapped</code> フラグでこれを検出し、
          早期に終了することで最良ケースを O(n) にできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubbleSortOpt(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        /* 交換がなければソート済み */
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {1, 2, 3, 5, 4};  /* ほぼソート済み */
    int n = 5;

    bubbleSortOpt(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 2 3 4 5 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">降順のバブルソート</h2>
        <p className="text-gray-400 mb-4">
          比較演算子を逆にするだけで降順にソートできます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">arr[j] &lt; arr[j+1]</code> に変更します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubbleSortDesc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {  /* < で降順 */
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;

    bubbleSortDesc(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`9 8 5 3 2 1 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="bubble" />
      </div>
      <LessonNav lessons={lessons} currentId="bubble" basePath="/learn/sorting" />
    </div>
  );
}
