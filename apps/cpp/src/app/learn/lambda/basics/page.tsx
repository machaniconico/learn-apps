import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function LambdaBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ式の基本</h1>
        <p className="text-gray-400">ラムダ式の構文と基本的な使い方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の構文</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式は <code className="text-cyan-300">[キャプチャ](引数) -&gt; 戻り値型 &#123; 本体 &#125;</code> という構文です。
          戻り値型は省略可能で、コンパイラが推論します。C++11で導入されました。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 最もシンプルなラムダ
    auto hello = []() {
        cout << "Hello, Lambda!" << endl;
    };
    hello();

    // 引数を取るラムダ
    auto add = [](int a, int b) {
        return a + b;
    };
    cout << "3 + 4 = " << add(3, 4) << endl;

    // 戻り値型を明示
    auto divide = [](double a, double b) -> double {
        return a / b;
    };
    cout << "10.0 / 3.0 = " << divide(10.0, 3.0) << endl;

    return 0;
}`}
          expectedOutput={`Hello, Lambda!
3 + 4 = 7
10.0 / 3.0 = 3.33333`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">即時実行ラムダ（IIFE）</h2>
        <p className="text-gray-400 mb-4">
          ラムダを定義した直後に呼び出すこともできます。初期化時の複雑なロジックに便利です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 即時実行ラムダ
    int result = [](int x, int y) {
        return x * y + 10;
    }(5, 3);

    cout << "5 * 3 + 10 = " << result << endl;

    // const変数の初期化に活用
    const string greeting = []() {
        string s = "こんにちは";
        s += "、世界！";
        return s;
    }();

    cout << greeting << endl;

    return 0;
}`}
          expectedOutput={`5 * 3 + 10 = 25
こんにちは、世界！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダを引数に渡す</h2>
        <p className="text-gray-400 mb-4">
          ラムダは関数の引数として渡せます。テンプレートやstd::functionで受け取ります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {5, 2, 8, 1, 9, 3};

    // sort にラムダを渡す
    sort(nums.begin(), nums.end(), [](int a, int b) {
        return a < b;
    });

    cout << "昇順: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    // for_each にラムダを渡す
    cout << "2倍: ";
    for_each(nums.begin(), nums.end(), [](int n) {
        cout << n * 2 << " ";
    });
    cout << endl;

    return 0;
}`}
          expectedOutput={`昇順: 1 2 3 5 8 9
2倍: 2 4 6 10 16 18`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/lambda" />
    </div>
  );
}
