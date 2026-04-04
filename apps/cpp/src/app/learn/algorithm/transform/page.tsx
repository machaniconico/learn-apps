import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function TransformPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">変換（transform）</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::transformは入力範囲の各要素に関数を適用し、結果を出力範囲に書き込みます。
        単項変換と二項変換の2つの形式があります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単項transform</h2>
        <p className="text-gray-400 mb-4">
          1つの入力範囲の各要素に関数を適用して、結果を出力先に書き込みます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5};
    vector<int> dst(src.size());

    // 各要素を2乗する
    transform(src.begin(), src.end(), dst.begin(),
              [](int x) { return x * x; });
    cout << "2乗: ";
    for (int x : dst) cout << x << " ";
    cout << endl;

    // 文字列を大文字に変換
    string s = "hello c++";
    transform(s.begin(), s.end(), s.begin(), ::toupper);
    cout << "大文字: " << s << endl;

    return 0;
}`}
          expectedOutput={`2乗: 1 4 9 16 25
大文字: HELLO C++`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二項transform</h2>
        <p className="text-gray-400 mb-4">
          2つの入力範囲の要素をペアにして関数を適用できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3, 4, 5};
    vector<int> b = {10, 20, 30, 40, 50};
    vector<int> result(a.size());

    // 2つのベクターの要素を足す
    transform(a.begin(), a.end(), b.begin(), result.begin(),
              [](int x, int y) { return x + y; });
    cout << "合計: ";
    for (int x : result) cout << x << " ";
    cout << endl;

    // 2つのベクターの要素を掛ける
    transform(a.begin(), a.end(), b.begin(), result.begin(),
              [](int x, int y) { return x * y; });
    cout << "積: ";
    for (int x : result) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`合計: 11 22 33 44 55
積: 10 40 90 160 250`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">back_inserterとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          出力先のサイズを事前に確保せず、back_inserterで動的に追加できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5};
    vector<string> dst;

    // 数値を文字列に変換
    transform(src.begin(), src.end(), back_inserter(dst),
              [](int x) { return "No." + to_string(x); });

    for (const auto& s : dst) cout << s << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`No.1 No.2 No.3 No.4 No.5`}
        />
      </section>

      <LessonCompleteButton categoryId="algorithm" lessonId="transform" />
      <LessonNav lessons={lessons} currentId="transform" basePath="/learn/algorithm" />
    </div>
  );
}
