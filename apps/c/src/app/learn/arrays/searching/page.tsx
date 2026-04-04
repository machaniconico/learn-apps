import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索</h1>
        <p className="text-gray-400">線形探索の実装と二分探索の基礎を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">線形探索と二分探索の比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列から目的の値を見つけるアルゴリズムには2種類の基本的な方法があります。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <p className="text-teal-400 font-semibold">線形探索 O(n)</p>
            <p className="text-gray-400">先頭から順に調べる。ソート不要。最悪n回比較。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <p className="text-teal-400 font-semibold">二分探索 O(log n)</p>
            <p className="text-gray-400">ソート済み配列で中央から比較。最悪log₂(n)回比較。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索の実装</h2>
        <p className="text-gray-400 mb-4">
          先頭から順に全要素を調べます。見つかればインデックスを、見つからなければ-1を返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;  // 見つからない
}

int main() {
    int data[] = {15, 42, 8, 73, 29, 55, 17, 91};
    int n = 8;

    int targets[] = {29, 100, 91};
    int t = 3;

    for (int i = 0; i < t; i++) {
        int idx = linear_search(data, n, targets[i]);
        if (idx != -1) {
            printf("%d が見つかりました: インデックス %d\\n", targets[i], idx);
        } else {
            printf("%d は見つかりませんでした\\n", targets[i]);
        }
    }

    return 0;
}`}
          expectedOutput={`29 が見つかりました: インデックス 4
100 は見つかりませんでした
91 が見つかりました: インデックス 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索の実装</h2>
        <p className="text-gray-400 mb-4">
          ソート済み配列に対して使える高速な探索です。毎回探索範囲を半分に絞ります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int left = 0, right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)  left = mid + 1;
        else                    right = mid - 1;
    }
    return -1;
}

int main() {
    int sorted[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10;

    printf("配列: ");
    for (int i = 0; i < n; i++) printf("%d ", sorted[i]);
    printf("\\n");

    int idx;
    idx = binary_search(sorted, n, 23);
    printf("23: インデックス %d\\n", idx);

    idx = binary_search(sorted, n, 50);
    printf("50: インデックス %d (見つからず)\\n", idx);

    return 0;
}`}
          expectedOutput={`配列: 2 5 8 12 16 23 38 56 72 91
23: インデックス 5
50: インデックス -1 (見つからず)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/arrays" />
    </div>
  );
}
