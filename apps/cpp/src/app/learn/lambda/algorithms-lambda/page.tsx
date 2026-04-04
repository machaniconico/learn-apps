import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function AlgorithmsLambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アルゴリズムとラムダ</h1>
        <p className="text-gray-400">STLアルゴリズムでのラムダ活用パターンを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索・フィルタ系アルゴリズム</h2>
        <p className="text-gray-400 mb-4">
          find_if、count_if、any_of、all_ofなどの述語を取るアルゴリズムとラムダの組み合わせは非常に便利です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {12, 5, 23, 8, 17, 3, 42};

    // find_if: 条件に合う最初の要素
    auto it = find_if(nums.begin(), nums.end(),
        [](int n) { return n > 20; });
    cout << "20超の最初: " << *it << endl;

    // count_if: 条件に合う要素数
    int cnt = count_if(nums.begin(), nums.end(),
        [](int n) { return n % 2 == 0; });
    cout << "偶数の数: " << cnt << endl;

    // any_of / all_of / none_of
    bool hasNeg = any_of(nums.begin(), nums.end(),
        [](int n) { return n < 0; });
    cout << "負の数あり: " << (hasNeg ? "はい" : "いいえ") << endl;

    bool allPos = all_of(nums.begin(), nums.end(),
        [](int n) { return n > 0; });
    cout << "全て正: " << (allPos ? "はい" : "いいえ") << endl;

    return 0;
}`}
          expectedOutput={`20超の最初: 23
偶数の数: 3
負の数あり: いいえ
全て正: はい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変換・ソート系アルゴリズム</h2>
        <p className="text-gray-400 mb-4">
          transform、sort、partitionなどでラムダを使って柔軟な変換・並べ替えができます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5};

    // transform: 変換
    vector<int> squared(src.size());
    transform(src.begin(), src.end(), squared.begin(),
        [](int n) { return n * n; });
    cout << "2乗: ";
    for (int n : squared) cout << n << " ";
    cout << endl;

    // sort: カスタムソート（偶数優先、その中で昇順）
    vector<int> data = {7, 2, 5, 8, 3, 6, 1, 4};
    sort(data.begin(), data.end(), [](int a, int b) {
        if (a % 2 != b % 2) return a % 2 == 0;
        return a < b;
    });
    cout << "偶数優先: ";
    for (int n : data) cout << n << " ";
    cout << endl;

    // partition: 条件で分割
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};
    auto mid = partition(nums.begin(), nums.end(),
        [](int n) { return n <= 4; });
    cout << "4以下: ";
    for (auto it = nums.begin(); it != mid; ++it) cout << *it << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`2乗: 1 4 9 16 25
偶数優先: 2 4 6 8 1 3 5 7
4以下: 1 2 3 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">accumulate・reduceとラムダ</h2>
        <p className="text-gray-400 mb-4">
          accumulateやreduce（C++17）にラムダを渡して集約処理をカスタマイズできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
#include <string>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};

    // accumulate + ラムダで合計
    int sum = accumulate(nums.begin(), nums.end(), 0,
        [](int acc, int n) { return acc + n; });
    cout << "合計: " << sum << endl;

    // 積を計算
    int product = accumulate(nums.begin(), nums.end(), 1,
        [](int acc, int n) { return acc * n; });
    cout << "積: " << product << endl;

    // 文字列の連結
    vector<string> words = {"C++", "Lambda", "Awesome"};
    string joined = accumulate(words.begin(), words.end(), string(""),
        [](const string& acc, const string& w) {
            return acc.empty() ? w : acc + " " + w;
        });
    cout << "結合: " << joined << endl;

    // 最大値
    int maxVal = accumulate(nums.begin(), nums.end(), nums[0],
        [](int a, int b) { return (a > b) ? a : b; });
    cout << "最大値: " << maxVal << endl;

    return 0;
}`}
          expectedOutput={`合計: 15
積: 120
結合: C++ Lambda Awesome
最大値: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="algorithms-lambda" />
      </div>
      <LessonNav lessons={lessons} currentId="algorithms-lambda" basePath="/learn/lambda" />
    </div>
  );
}
