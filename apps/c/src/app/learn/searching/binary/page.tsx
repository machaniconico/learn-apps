import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

export default function BinaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">探索アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">二分探索</h1>
        <p className="text-gray-400">ソート済み配列に対して O(log n) で探索する二分探索を実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">二分探索の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          二分探索はソート済み配列の中央要素と目標値を比較して、探索範囲を半分に絞ります。
          これを繰り返すことで対数時間で探索できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>前提条件：配列がソート済みであること</li>
          <li>時間計算量：O(log n)</li>
          <li>空間計算量：O(1)（反復）または O(log n)（再帰）</li>
          <li>1000万要素でも最大約23回の比較で済む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">反復による二分探索</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">lo</code> と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">hi</code> で探索範囲を管理し、
          中央値と比較して範囲を半分に絞ります。
          オーバーフローを防ぐため <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">mid = lo + (hi - lo) / 2</code> を使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int n = 10;

    printf("Search 7:  index %d\\n", binarySearch(arr, n, 7));
    printf("Search 1:  index %d\\n", binarySearch(arr, n, 1));
    printf("Search 19: index %d\\n", binarySearch(arr, n, 19));
    printf("Search 6:  index %d\\n", binarySearch(arr, n, 6));
    return 0;
}`}
          expectedOutput={`Search 7:  index 3
Search 1:  index 0
Search 19: index 9
Search 6:  index -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰による二分探索</h2>
        <p className="text-gray-400 mb-4">
          再帰版はコードが簡潔ですが、再帰呼び出しのスタックが O(log n) 使われます。
          大きな配列ではスタックオーバーフローの可能性があるため、反復版が推奨されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int binarySearchRec(int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, mid + 1, hi, target);
    return binarySearchRec(arr, lo, mid - 1, target);
}

int main() {
    int arr[] = {2, 4, 6, 8, 10, 12, 14, 16};
    int n = 8;

    printf("Search 10: index %d\\n", binarySearchRec(arr, 0, n-1, 10));
    printf("Search 2:  index %d\\n", binarySearchRec(arr, 0, n-1, 2));
    printf("Search 16: index %d\\n", binarySearchRec(arr, 0, n-1, 16));
    printf("Search 5:  index %d\\n", binarySearchRec(arr, 0, n-1, 5));
    return 0;
}`}
          expectedOutput={`Search 10: index 4
Search 2:  index 0
Search 16: index 7
Search 5:  index -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">lower_bound: 最初の一致位置</h2>
        <p className="text-gray-400 mb-4">
          重複する要素がある場合に最初（左端）の位置を見つける二分探索の応用です。
          C++ の <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">lower_bound</code> に相当します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* target 以上の最初のインデックスを返す */
int lowerBound(int arr[], int n, int target) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

int main() {
    int arr[] = {1, 2, 2, 2, 3, 4, 5};
    int n = 7;

    printf("lowerBound(2): %d\\n", lowerBound(arr, n, 2));
    printf("lowerBound(3): %d\\n", lowerBound(arr, n, 3));
    printf("lowerBound(0): %d\\n", lowerBound(arr, n, 0));
    return 0;
}`}
          expectedOutput={`lowerBound(2): 1
lowerBound(3): 4
lowerBound(0): 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="searching" lessonId="binary" />
      </div>
      <LessonNav lessons={lessons} currentId="binary" basePath="/learn/searching" />
    </div>
  );
}
