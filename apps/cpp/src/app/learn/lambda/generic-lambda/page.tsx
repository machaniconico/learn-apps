import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function GenericLambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックラムダ</h1>
        <p className="text-gray-400">autoパラメータによる汎用ラムダの書き方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">autoパラメータ（C++14）</h2>
        <p className="text-gray-400 mb-4">
          C++14からパラメータにautoを使えるようになりました。
          テンプレート関数のように複数の型で使えるラムダを簡潔に書けます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // ジェネリックラムダ: 任意の型を受け取る
    auto print = [](const auto& value) {
        cout << value << endl;
    };

    print(42);
    print(3.14);
    print("Hello");
    print(string("World"));

    // 2つのautoパラメータ
    auto add = [](auto a, auto b) {
        return a + b;
    };

    cout << "int: " << add(3, 4) << endl;
    cout << "double: " << add(1.5, 2.5) << endl;
    cout << "string: " << add(string("Hello, "), string("C++")) << endl;

    return 0;
}`}
          expectedOutput={`42
3.14
Hello
World
int: 7
double: 4
string: Hello, C++`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートラムダ（C++20）</h2>
        <p className="text-gray-400 mb-4">
          C++20ではラムダにテンプレートパラメータを直接指定できます。型制約をより明確に記述できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // C++20テンプレートラムダ
    auto maxOf = []<typename T>(const T& a, const T& b) {
        return (a > b) ? a : b;
    };

    cout << "max(3, 7) = " << maxOf(3, 7) << endl;
    cout << "max(2.5, 1.8) = " << maxOf(2.5, 1.8) << endl;

    // コンテナを受け取るジェネリックラムダ
    auto printAll = [](const auto& container) {
        for (const auto& elem : container) {
            cout << elem << " ";
        }
        cout << endl;
    };

    vector<int> nums = {5, 3, 8, 1};
    vector<string> words = {"C++", "Lambda", "Generic"};

    cout << "数値: ";
    printAll(nums);
    cout << "文字列: ";
    printAll(words);

    return 0;
}`}
          expectedOutput={`max(3, 7) = 7
max(2.5, 1.8) = 2.5
数値: 5 3 8 1
文字列: C++ Lambda Generic`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックラムダの応用</h2>
        <p className="text-gray-400 mb-4">
          ジェネリックラムダを使って、型に依存しない汎用的な処理を簡潔に記述できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 比較関数としてのジェネリックラムダ
    auto descending = [](auto a, auto b) { return a > b; };

    vector<int> nums = {3, 1, 4, 1, 5, 9};
    sort(nums.begin(), nums.end(), descending);
    cout << "降順: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    // 変換ラムダ
    auto transform_print = [](const auto& vec, auto func) {
        for (const auto& x : vec) {
            cout << func(x) << " ";
        }
        cout << endl;
    };

    vector<int> data = {1, 2, 3, 4, 5};
    cout << "2乗: ";
    transform_print(data, [](int x) { return x * x; });
    cout << "3倍: ";
    transform_print(data, [](int x) { return x * 3; });

    return 0;
}`}
          expectedOutput={`降順: 9 5 4 3 1 1
2乗: 1 4 9 16 25
3倍: 3 6 9 12 15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="generic-lambda" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-lambda" basePath="/learn/lambda" />
    </div>
  );
}
