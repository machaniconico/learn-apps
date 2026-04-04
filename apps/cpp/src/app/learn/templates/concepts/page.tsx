import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function ConceptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンセプト</h1>
        <p className="text-gray-400">C++20のコンセプトによるテンプレート制約の定義と使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンセプトとは</h2>
        <p className="text-gray-300 leading-relaxed">
          コンセプト（Concepts）はC++20で導入された機能で、テンプレート引数が満たすべき要件を名前付きの制約として定義します。
          これにより、テンプレートの制約がコード上で明示的になり、型が制約を満たさないときのエラーメッセージも
          大幅に改善されます。<code className="text-pink-400">requires</code> 節と組み合わせて使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンセプトの定義と使用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <concepts>
#include <string>
using namespace std;

// カスタムコンセプトの定義
template <typename T>
concept Printable = requires(T t) {
    { cout << t } -> same_as<ostream&>;
};

// コンセプトでテンプレートを制約
template <Printable T>
void display(const T& value) {
    cout << "値: " << value << endl;
}

// 標準ライブラリのコンセプト
template <integral T>
T doubleValue(T x) {
    return x * 2;
}

int main() {
    display(42);
    display(3.14);
    display(string("Hello"));

    cout << "double(5) = " << doubleValue(5) << endl;
    cout << "double(100) = " << doubleValue(100) << endl;

    return 0;
}`}
          expectedOutput={`値: 42
値: 3.14
値: Hello
double(5) = 10
double(100) = 200`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">requires節とコンセプトの組み合わせ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <concepts>
#include <vector>
#include <numeric>
using namespace std;

// requires節による複合制約
template <typename T>
concept Summable = requires(T a, T b) {
    { a + b } -> convertible_to<T>;
    { a - b } -> convertible_to<T>;
};

// requires節を関数に直接適用
template <typename Container>
    requires requires(Container c) {
        c.begin();
        c.end();
        c.size();
    }
auto containerSum(const Container& c) {
    using T = typename Container::value_type;
    return accumulate(c.begin(), c.end(), T{});
}

// 簡略記法: auto + コンセプト
void printNumber(integral auto n) {
    cout << "整数: " << n << endl;
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    cout << "合計: " << containerSum(nums) << endl;

    vector<double> vals = {1.5, 2.5, 3.0};
    cout << "合計: " << containerSum(vals) << endl;

    printNumber(42);
    printNumber(100L);

    return 0;
}`}
          expectedOutput={`合計: 15
合計: 7
整数: 42
整数: 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="concepts" />
      </div>
      <LessonNav lessons={lessons} currentId="concepts" basePath="/learn/templates" />
    </div>
  );
}
