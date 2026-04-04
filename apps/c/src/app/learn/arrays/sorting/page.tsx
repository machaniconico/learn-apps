import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソート</h1>
        <p className="text-gray-400">バブルソートの実装と動作原理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バブルソートのアルゴリズム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          バブルソートは隣り合う要素を比較して、順序が逆なら交換する操作を繰り返します。
          計算量は <strong className="text-teal-400">O(n²)</strong> で、大きなデータには不向きですが、
          シンプルで理解しやすいアルゴリズムです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>外側ループ: n-1回繰り返す</li>
          <li>内側ループ: 隣接要素を比較・交換</li>
          <li>1パスごとに最大値が末尾に確定する</li>
          <li>最適化: スワップがなければ早期終了</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なバブルソート</h2>
        <p className="text-gray-400 mb-4">
          シンプルなバブルソートの実装です。各ステップで最大値が末尾に「浮かび上がる」様子がわかります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 隣接要素を交換
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;

    printf("ソート前: ");
    print_array(data, n);

    bubble_sort(data, n);

    printf("ソート後: ");
    print_array(data, n);

    return 0;
}`}
          expectedOutput={`ソート前: 64 34 25 12 22 11 90
ソート後: 11 12 22 25 34 64 90`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最適化バブルソート（早期終了）</h2>
        <p className="text-gray-400 mb-4">
          スワップが1回も発生しなかった場合、配列はすでにソート済みです。
          フラグを使って早期終了するとほぼソート済みのデータで高速になります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubble_sort_opt(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;  // 交換なし→ソート完了
    }
}

int main() {
    int data[] = {1, 2, 4, 3, 5};  // ほぼソート済み
    int n = 5;

    printf("前: ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");

    bubble_sort_opt(data, n);

    printf("後: ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");

    return 0;
}`}
          expectedOutput={`前: 1 2 4 3 5
後: 1 2 3 4 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/arrays" />
    </div>
  );
}
