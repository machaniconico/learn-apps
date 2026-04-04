import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function NumericPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">数値アルゴリズム</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        &lt;numeric&gt;ヘッダには数値計算に特化したアルゴリズムが含まれています。
        iota、partial_sum、inner_product、adjacent_differenceなどを学びます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">iotaで連番生成</h2>
        <p className="text-gray-400 mb-4">
          std::iotaは範囲に連番を書き込みます。初期値から1ずつ増加する値で埋められます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v(10);

    // 1から始まる連番
    iota(v.begin(), v.end(), 1);
    cout << "連番: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // 100から始まる連番（5個）
    vector<int> v2(5);
    iota(v2.begin(), v2.end(), 100);
    cout << "100から: ";
    for (int x : v2) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`連番: 1 2 3 4 5 6 7 8 9 10
100から: 100 101 102 103 104`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">partial_sumとadjacent_difference</h2>
        <p className="text-gray-400 mb-4">
          partial_sumは累積和を計算し、adjacent_differenceは隣接要素の差分を求めます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    vector<int> result(v.size());

    // 累積和
    partial_sum(v.begin(), v.end(), result.begin());
    cout << "累積和: ";
    for (int x : result) cout << x << " ";
    cout << endl;

    // 隣接差分
    vector<int> data = {10, 13, 17, 22, 28};
    vector<int> diff(data.size());
    adjacent_difference(data.begin(), data.end(), diff.begin());
    cout << "差分: ";
    for (int x : diff) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`累積和: 1 3 6 10 15
差分: 10 3 4 5 6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">inner_product（内積）</h2>
        <p className="text-gray-400 mb-4">
          2つの範囲の内積（ドット積）を計算します。カスタム演算も指定できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3};
    vector<int> b = {4, 5, 6};

    // 内積: 1*4 + 2*5 + 3*6 = 32
    int dot = inner_product(a.begin(), a.end(), b.begin(), 0);
    cout << "内積: " << dot << endl;

    // カスタム: 差の絶対値の合計（マンハッタン距離）
    vector<int> p1 = {1, 3, 5};
    vector<int> p2 = {4, 1, 8};
    int manhattan = inner_product(
        p1.begin(), p1.end(), p2.begin(), 0,
        plus<int>(),
        [](int x, int y) { return abs(x - y); }
    );
    cout << "マンハッタン距離: " << manhattan << endl;

    return 0;
}`}
          expectedOutput={`内積: 32
マンハッタン距離: 8`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="numeric" />
      <LessonNav lessons={lessons} currentId="numeric" basePath="/learn/algorithm" />
    </div>
  );
}
