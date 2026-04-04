import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function SelectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">選択ソート</h1>
        <p className="text-gray-400">未ソート部分から最小値を選んで先頭と交換する選択ソートを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">選択ソートの仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          選択ソートは未ソート部分の最小値を見つけて、未ソート部分の先頭と交換します。
          これを繰り返すことで左から順にソートされた部分が増えていきます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：常に O(n²)（最良・平均・最悪すべて同じ）</li>
          <li>空間計算量：O(1)（インプレース）</li>
          <li>不安定ソート（同じ値の相対順序が保証されない）</li>
          <li>交換回数が最大 n-1 回で少ない（書き込みコストが高い場合に有利）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">選択ソートの実装</h2>
        <p className="text-gray-400 mb-4">
          外側のループで「未ソート部分の先頭」を決め、内側のループで最小値のインデックスを探します。
          最小値のインデックスと先頭のインデックスが異なる場合だけ交換します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        if (minIdx != i) {
            int tmp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = tmp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;

    selectionSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`11 12 22 25 64 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各パスの過程を表示</h2>
        <p className="text-gray-400 mb-4">
          各パス後の配列の状態を表示してみましょう。ソート済み部分（左側）が1つずつ増えていくのがわかります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void printArr(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%2d ", arr[i]);
    printf("\\n");
}

void selectionSortVerbose(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        if (minIdx != i) {
            int tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
        }
        printf("pass %d: ", i + 1);
        printArr(arr, n);
    }
}

int main() {
    int arr[] = {5, 3, 1, 4, 2};
    int n = 5;
    printf("init:   ");
    printArr(arr, n);
    selectionSortVerbose(arr, n);
    return 0;
}`}
          expectedOutput={`init:    5  3  1  4  2
pass 1:  1  3  5  4  2
pass 2:  1  2  5  4  3
pass 3:  1  2  3  4  5
pass 4:  1  2  3  4  5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="selection" />
      </div>
      <LessonNav lessons={lessons} currentId="selection" basePath="/learn/sorting" />
    </div>
  );
}
