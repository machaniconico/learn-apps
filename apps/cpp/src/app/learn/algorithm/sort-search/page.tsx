import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function SortSearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">ソートと探索</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::sortとstd::findは最も基本的なSTLアルゴリズムです。
        ソートはデフォルトで昇順に並び替え、findは線形探索、binary_searchはソート済みの範囲に対して二分探索を行います。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::sortの基本</h2>
        <p className="text-gray-400 mb-4">
          sort は範囲をイテレータで指定し、デフォルトでは昇順にソートします。
          カスタム比較関数やstd::greater&lt;&gt;()で降順にもできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // 昇順ソート
    sort(v.begin(), v.end());
    cout << "昇順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // 降順ソート
    sort(v.begin(), v.end(), greater<int>());
    cout << "降順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // カスタム比較（絶対値でソート）
    vector<int> v2 = {-3, 1, -5, 2, -1};
    sort(v2.begin(), v2.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });
    cout << "絶対値順: ";
    for (int x : v2) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 5 8 9
降順: 9 8 5 3 2 1
絶対値順: 1 -1 2 -3 -5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">findとbinary_search</h2>
        <p className="text-gray-400 mb-4">
          std::findは線形探索で要素を検索します。ソート済みの範囲にはbinary_searchやlower_boundが高速です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // find: 線形探索
    auto it = find(v.begin(), v.end(), 30);
    if (it != v.end())
        cout << "find: " << *it << " (位置: " << distance(v.begin(), it) << ")" << endl;

    // binary_search: 二分探索（bool）
    cout << "40の存在: " << boolalpha << binary_search(v.begin(), v.end(), 40) << endl;
    cout << "35の存在: " << boolalpha << binary_search(v.begin(), v.end(), 35) << endl;

    // lower_bound: 挿入位置を取得
    auto lb = lower_bound(v.begin(), v.end(), 25);
    cout << "25のlower_bound: 位置" << distance(v.begin(), lb) << " (値: " << *lb << ")" << endl;

    return 0;
}`}
          expectedOutput={`find: 30 (位置: 2)
40の存在: true
35の存在: false
25のlower_bound: 位置2 (値: 30)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">部分ソートとnth_element</h2>
        <p className="text-gray-400 mb-4">
          partial_sortは先頭n個だけソートし、nth_elementはn番目の要素を正しい位置に配置します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {9, 4, 7, 2, 5, 1, 8, 3, 6};

    // partial_sort: 上位3つだけソート
    partial_sort(v.begin(), v.begin() + 3, v.end());
    cout << "上位3: ";
    for (int i = 0; i < 3; i++) cout << v[i] << " ";
    cout << endl;

    // nth_element: 中央値を求める
    vector<int> v2 = {9, 4, 7, 2, 5, 1, 8, 3, 6};
    int mid = v2.size() / 2;
    nth_element(v2.begin(), v2.begin() + mid, v2.end());
    cout << "中央値: " << v2[mid] << endl;

    return 0;
}`}
          expectedOutput={`上位3: 1 2 3
中央値: 5`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="sort-search" />
      <LessonNav lessons={lessons} currentId="sort-search" basePath="/learn/algorithm" />
    </div>
  );
}
