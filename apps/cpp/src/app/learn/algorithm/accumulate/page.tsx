import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AccumulatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">集約（accumulate）</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::accumulateは範囲の要素を初期値から順に畳み込みます。
        合計・積・文字列結合など、要素を1つの値にまとめる操作に使います。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なaccumulate</h2>
        <p className="text-gray-400 mb-4">
          デフォルトでは加算を行い、カスタム二項演算を指定することもできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
#include <functional>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // 合計
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "合計: " << sum << endl;

    // 積
    int product = accumulate(v.begin(), v.end(), 1, multiplies<int>());
    cout << "積: " << product << endl;

    // 最大値をaccumulateで
    int maxVal = accumulate(v.begin(), v.end(), v[0],
                            [](int a, int b) { return max(a, b); });
    cout << "最大値: " << maxVal << endl;

    return 0;
}`}
          expectedOutput={`合計: 15
積: 120
最大値: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の結合</h2>
        <p className="text-gray-400 mb-4">
          accumulateは数値以外にも使えます。文字列の結合もカスタム演算で実現できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"C++", "is", "powerful"};

    // 文字列をスペース区切りで結合
    string sentence = accumulate(
        next(words.begin()), words.end(), words[0],
        [](const string& a, const string& b) {
            return a + " " + b;
        });
    cout << sentence << endl;

    // カンマ区切り
    vector<int> nums = {1, 2, 3, 4, 5};
    string csv = accumulate(
        next(nums.begin()), nums.end(), to_string(nums[0]),
        [](const string& a, int b) {
            return a + "," + to_string(b);
        });
    cout << csv << endl;

    return 0;
}`}
          expectedOutput={`C++ is powerful
1,2,3,4,5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">reduceとの違い</h2>
        <p className="text-gray-400 mb-4">
          C++17のstd::reduceはaccumulateと似ていますが、並列実行が可能です。ただし演算の順序が保証されません。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<double> v = {1.5, 2.5, 3.0, 4.0};

    // accumulate: 左から順に畳み込む
    double sum1 = accumulate(v.begin(), v.end(), 0.0);
    cout << "accumulate: " << sum1 << endl;

    // reduce (C++17): 順序不定だが並列化可能
    double sum2 = reduce(v.begin(), v.end(), 0.0);
    cout << "reduce: " << sum2 << endl;

    // 平均値の計算
    double avg = accumulate(v.begin(), v.end(), 0.0) / v.size();
    cout << "平均: " << avg << endl;

    return 0;
}`}
          expectedOutput={`accumulate: 11
reduce: 11
平均: 2.75`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="accumulate" />
      <LessonNav lessons={lessons} currentId="accumulate" basePath="/learn/algorithm" />
    </div>
  );
}
