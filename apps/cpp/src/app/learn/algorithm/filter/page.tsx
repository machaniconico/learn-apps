import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function FilterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">フィルタ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        copy_ifで条件を満たす要素をコピーし、remove_ifで条件を満たす要素を除去します。
        これらを組み合わせてコンテナの要素をフィルタリングできます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">copy_ifによるフィルタリング</h2>
        <p className="text-gray-400 mb-4">
          条件を満たす要素だけを別のコンテナにコピーします。元のコンテナは変更されません。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    vector<int> evens, odds;

    // 偶数をコピー
    copy_if(src.begin(), src.end(), back_inserter(evens),
            [](int x) { return x % 2 == 0; });

    // 奇数をコピー
    copy_if(src.begin(), src.end(), back_inserter(odds),
            [](int x) { return x % 2 != 0; });

    cout << "偶数: ";
    for (int x : evens) cout << x << " ";
    cout << endl;

    cout << "奇数: ";
    for (int x : odds) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`偶数: 2 4 6 8 10
奇数: 1 3 5 7 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">remove_ifとeraseイディオム</h2>
        <p className="text-gray-400 mb-4">
          remove_ifは条件を満たす要素を末尾に移動し、新しい末尾イテレータを返します。
          実際に削除するにはeraseと組み合わせます（erase-removeイディオム）。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // erase-removeイディオム: 3の倍数を削除
    v.erase(
        remove_if(v.begin(), v.end(), [](int x) { return x % 3 == 0; }),
        v.end()
    );

    cout << "3の倍数を除去: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    cout << "残り要素数: " << v.size() << endl;

    return 0;
}`}
          expectedOutput={`3の倍数を除去: 1 2 4 5 7 8 10
残り要素数: 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">partition による分割</h2>
        <p className="text-gray-400 mb-4">
          std::partitionは条件を満たす要素を前半に、満たさない要素を後半に並び替えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {8, 3, 5, 1, 9, 2, 7, 4, 6};

    // 5以下を前半に、6以上を後半に分割
    auto boundary = partition(v.begin(), v.end(),
                              [](int x) { return x <= 5; });

    cout << "5以下: ";
    for (auto it = v.begin(); it != boundary; ++it)
        cout << *it << " ";
    cout << endl;

    cout << "6以上: ";
    for (auto it = boundary; it != v.end(); ++it)
        cout << *it << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`5以下: 4 3 5 1 2
6以上: 9 7 8 6`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="filter" />
      <LessonNav lessons={lessons} currentId="filter" basePath="/learn/algorithm" />
    </div>
  );
}
