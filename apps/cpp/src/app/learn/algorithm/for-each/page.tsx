import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function ForEachPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">for_each</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::for_eachは範囲の各要素に対して指定した関数を適用します。
        範囲forループと似ていますが、アルゴリズムとして使えるため、他のSTL関数との一貫性があります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なfor_each</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式や関数オブジェクトを渡して、各要素に対する処理を定義します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // ラムダで各要素を表示
    cout << "要素: ";
    for_each(v.begin(), v.end(), [](int x) {
        cout << x << " ";
    });
    cout << endl;

    // 各要素を2倍にする（参照キャプチャ）
    for_each(v.begin(), v.end(), [](int& x) {
        x *= 2;
    });
    cout << "2倍: ";
    for_each(v.begin(), v.end(), [](int x) {
        cout << x << " ";
    });
    cout << endl;

    return 0;
}`}
          expectedOutput={`要素: 1 2 3 4 5
2倍: 2 4 6 8 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">for_eachの戻り値</h2>
        <p className="text-gray-400 mb-4">
          for_eachは適用した関数オブジェクトを返します。これを利用して状態を持つ関数オブジェクトの結果を取得できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Counter {
    int count = 0;
    int sum = 0;
    void operator()(int x) {
        count++;
        sum += x;
    }
};

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // 関数オブジェクトの状態を取得
    Counter result = for_each(v.begin(), v.end(), Counter());
    cout << "要素数: " << result.count << endl;
    cout << "合計: " << result.sum << endl;
    cout << "平均: " << (double)result.sum / result.count << endl;

    return 0;
}`}
          expectedOutput={`要素数: 5
合計: 150
平均: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">for_each_n（C++17）</h2>
        <p className="text-gray-400 mb-4">
          for_each_nは先頭からn個の要素にだけ関数を適用します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};

    // 先頭5個だけ処理
    cout << "先頭5個: ";
    for_each_n(v.begin(), 5, [](int x) {
        cout << x * 10 << " ";
    });
    cout << endl;

    return 0;
}`}
          expectedOutput={`先頭5個: 10 20 30 40 50`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="for-each" />
      <LessonNav lessons={lessons} currentId="for-each" basePath="/learn/algorithm" />
    </div>
  );
}
