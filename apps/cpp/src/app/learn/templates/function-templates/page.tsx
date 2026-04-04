import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function FunctionTemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数テンプレート</h1>
        <p className="text-gray-400">型パラメータを使った汎用関数の定義方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数テンプレートとは</h2>
        <p className="text-gray-300 leading-relaxed">
          関数テンプレートは、型をパラメータとして受け取る汎用的な関数の設計図です。
          <code className="text-pink-400">template &lt;typename T&gt;</code> を関数の前に記述することで、
          異なる型に対して同じロジックを再利用できます。コンパイラがテンプレート引数から型を推論し、
          具体的な関数を自動生成（実体化）します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な関数テンプレート</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 関数テンプレートの定義
template <typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // 型推論による呼び出し
    cout << "max(3, 7) = " << maxValue(3, 7) << endl;
    cout << "max(3.14, 2.71) = " << maxValue(3.14, 2.71) << endl;
    cout << "max('a', 'z') = " << maxValue('a', 'z') << endl;

    // 型を明示的に指定
    cout << "max<double>(3, 2.5) = " << maxValue<double>(3, 2.5) << endl;

    return 0;
}`}
          expectedOutput={`max(3, 7) = 7
max(3.14, 2.71) = 3.14
max('a', 'z') = z
max<double>(3, 2.5) = 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// 複数の型パラメータ
template <typename T, typename U>
void printPair(const T& first, const U& second) {
    cout << "(" << first << ", " << second << ")" << endl;
}

// 戻り値の型も推論（C++14以降の auto）
template <typename T, typename U>
auto add(T a, U b) {
    return a + b;
}

int main() {
    printPair(42, "Hello");
    printPair(3.14, 100);
    printPair(string("Name"), 25);

    cout << "add(3, 4.5) = " << add(3, 4.5) << endl;
    cout << "add(10, 20) = " << add(10, 20) << endl;

    return 0;
}`}
          expectedOutput={`(42, Hello)
(3.14, 100)
(Name, 25)
add(3, 4.5) = 7.5
add(10, 20) = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非型テンプレートパラメータ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <array>
using namespace std;

// 非型パラメータ（値をテンプレート引数にする）
template <typename T, int N>
T arraySum(const array<T, N>& arr) {
    T sum = 0;
    for (int i = 0; i < N; i++) {
        sum += arr[i];
    }
    return sum;
}

int main() {
    array<int, 5> nums = {1, 2, 3, 4, 5};
    cout << "合計: " << arraySum(nums) << endl;

    array<double, 3> vals = {1.1, 2.2, 3.3};
    cout << "合計: " << arraySum(vals) << endl;

    return 0;
}`}
          expectedOutput={`合計: 15
合計: 6.6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="function-templates" />
      </div>
      <LessonNav lessons={lessons} currentId="function-templates" basePath="/learn/templates" />
    </div>
  );
}
