import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function SearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索・二分探索の実装と使いどころを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">探索アルゴリズムの選択</h2>
        <p className="text-gray-300 leading-relaxed">
          線形探索はO(n)で未ソートデータにも使えます。二分探索はO(log n)ですがソート済みデータが前提です。
          STLでは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::find</code> や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::binary_search</code> が利用できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索</h2>
        <p className="text-gray-400 mb-4">先頭から順に要素を比較する最もシンプルな探索です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    vector<int> data = {4, 2, 7, 1, 9, 3, 6};

    int idx1 = linearSearch(data, 7);
    cout << "7 のインデックス: " << idx1 << endl;

    int idx2 = linearSearch(data, 5);
    cout << "5 のインデックス: " << idx2 << " (見つからず)" << endl;

    cout << "計算量: O(n)" << endl;
    return 0;
}`}
          expectedOutput={`7 のインデックス: 2
5 のインデックス: -1 (見つからず)
計算量: O(n)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">ソート済み配列を半分ずつ絞り込んで探索します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> data = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};

    cout << "データ: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    // 自作の二分探索
    cout << "binarySearch(11) = index " << binarySearch(data, 11) << endl;
    cout << "binarySearch(6)  = index " << binarySearch(data, 6) << endl;

    // STLの二分探索
    cout << "binary_search(13) = "
         << (binary_search(data.begin(), data.end(), 13) ? "true" : "false") << endl;

    // lower_bound: target以上の最初の位置
    auto it = lower_bound(data.begin(), data.end(), 10);
    cout << "lower_bound(10) = " << *it << " (index "
         << (it - data.begin()) << ")" << endl;

    cout << "計算量: O(log n)" << endl;
    return 0;
}`}
          expectedOutput={`データ: 1 3 5 7 9 11 13 15 17 19
binarySearch(11) = index 5
binarySearch(6)  = index -1
binary_search(13) = true
lower_bound(10) = 11 (index 5)
計算量: O(log n)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algo" />
    </div>
  );
}
