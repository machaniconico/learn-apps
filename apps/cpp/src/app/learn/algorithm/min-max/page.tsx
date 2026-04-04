import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function MinMaxPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">最小・最大</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        min_element、max_element、minmax_elementで範囲内の最小・最大要素を効率的に見つけられます。
        また、std::clampで値を範囲内に制限できます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">min_elementとmax_element</h2>
        <p className="text-gray-400 mb-4">
          範囲内の最小・最大要素を指すイテレータを返します。カスタム比較関数も指定できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

    auto minIt = min_element(v.begin(), v.end());
    auto maxIt = max_element(v.begin(), v.end());

    cout << "最小値: " << *minIt << " (位置: " << distance(v.begin(), minIt) << ")" << endl;
    cout << "最大値: " << *maxIt << " (位置: " << distance(v.begin(), maxIt) << ")" << endl;

    // minmax_elementで同時に取得
    auto [lo, hi] = minmax_element(v.begin(), v.end());
    cout << "minmax: [" << *lo << ", " << *hi << "]" << endl;

    return 0;
}`}
          expectedOutput={`最小値: 1 (位置: 1)
最大値: 9 (位置: 5)
minmax: [1, 9]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">clampと初期化子リスト版</h2>
        <p className="text-gray-400 mb-4">
          std::clampは値を指定した範囲内に制限します。min/maxは初期化子リストでも使えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    // clamp: 値を範囲内に制限
    cout << "clamp(15, 0, 10) = " << clamp(15, 0, 10) << endl;
    cout << "clamp(-5, 0, 10) = " << clamp(-5, 0, 10) << endl;
    cout << "clamp(5, 0, 10) = " << clamp(5, 0, 10) << endl;

    // 初期化子リスト版 min/max
    int smallest = min({5, 3, 8, 1, 9});
    int largest = max({5, 3, 8, 1, 9});
    cout << "min: " << smallest << ", max: " << largest << endl;

    return 0;
}`}
          expectedOutput={`clamp(15, 0, 10) = 10
clamp(-5, 0, 10) = 0
clamp(5, 0, 10) = 5
min: 1, max: 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム比較による最大・最小</h2>
        <p className="text-gray-400 mb-4">
          構造体の特定のフィールドで最大・最小を求めるには、カスタム比較関数を指定します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {
        {"太郎", 85}, {"花子", 92}, {"次郎", 78}, {"美咲", 95}
    };

    // スコアが最高の学生
    auto best = max_element(students.begin(), students.end(),
        [](const Student& a, const Student& b) {
            return a.score < b.score;
        });
    cout << "最高点: " << best->name << " (" << best->score << "点)" << endl;

    // スコアが最低の学生
    auto worst = min_element(students.begin(), students.end(),
        [](const Student& a, const Student& b) {
            return a.score < b.score;
        });
    cout << "最低点: " << worst->name << " (" << worst->score << "点)" << endl;

    return 0;
}`}
          expectedOutput={`最高点: 美咲 (95点)
最低点: 次郎 (78点)`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="min-max" />
      <LessonNav lessons={lessons} currentId="min-max" basePath="/learn/algorithm" />
    </div>
  );
}
