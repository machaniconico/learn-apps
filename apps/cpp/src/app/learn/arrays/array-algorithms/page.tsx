import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayAlgorithmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列アルゴリズム</h1>
        <p className="text-gray-400">sort・reverse・findなどの配列操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">STLアルゴリズム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;algorithm&gt;</code> ヘッダには
          ソート・検索・変換など多数のアルゴリズムが用意されています。
          イテレータを通じて vector、array、C配列など様々なコンテナに適用できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートと検索</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3, 7};

    // ソート（昇順）
    sort(v.begin(), v.end());
    cout << "昇順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // ソート（降順）
    sort(v.begin(), v.end(), greater<int>());
    cout << "降順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // ソート済みで二分探索
    sort(v.begin(), v.end());
    bool found = binary_search(v.begin(), v.end(), 5);
    cout << "5は存在する？ " << (found ? "Yes" : "No") << endl;

    // find（線形探索）
    auto it = find(v.begin(), v.end(), 7);
    if (it != v.end()) {
        cout << "7のインデックス: " << distance(v.begin(), it) << endl;
    }

    // min/max
    cout << "最小: " << *min_element(v.begin(), v.end()) << endl;
    cout << "最大: " << *max_element(v.begin(), v.end()) << endl;

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 5 7 8 9
降順: 9 8 7 5 3 2 1
5は存在する？ Yes
7のインデックス: 4
最小: 1
最大: 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変換・フィルタ・集約</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // accumulate（合計）
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "合計: " << sum << endl;

    // count / count_if
    int evens = count_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; });
    cout << "偶数の数: " << evens << endl;

    // transform（各要素を変換）
    vector<int> doubled(v.size());
    transform(v.begin(), v.end(), doubled.begin(), [](int x) { return x * 2; });
    cout << "2倍: ";
    for (int x : doubled) cout << x << " ";
    cout << endl;

    // remove_if + erase（奇数を削除）
    vector<int> filtered = v;
    auto newEnd = remove_if(filtered.begin(), filtered.end(), [](int x) { return x % 2 != 0; });
    filtered.erase(newEnd, filtered.end());
    cout << "偶数のみ: ";
    for (int x : filtered) cout << x << " ";
    cout << endl;

    // reverse
    reverse(v.begin(), v.end());
    cout << "逆順: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`合計: 55
偶数の数: 5
2倍: 2 4 6 8 10 12 14 16 18 20
偶数のみ: 2 4 6 8 10
逆順: 10 9 8 7 6 5 4 3 2 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-algorithms" />
      </div>
      <LessonNav lessons={lessons} currentId="array-algorithms" basePath="/learn/arrays" />
    </div>
  );
}
