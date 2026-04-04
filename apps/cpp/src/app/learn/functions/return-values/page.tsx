import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">関数から値を返す方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">return</code> 文で値を呼び出し元に返せます。
          戻り値の型は関数定義の先頭に指定します。
          値を返さない関数は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">void</code> 型を使います。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++17では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">auto</code> を戻り値の型に使って、
          コンパイラに推論させることもできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な戻り値</h2>
        <p className="text-gray-400 mb-4">さまざまな型の戻り値を持つ関数です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int square(int x) {
    return x * x;
}

bool isEven(int n) {
    return n % 2 == 0;
}

string getGrade(int score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
}

int main() {
    cout << "5の二乗: " << square(5) << endl;
    cout << "4は偶数? " << (isEven(4) ? "はい" : "いいえ") << endl;
    cout << "7は偶数? " << (isEven(7) ? "はい" : "いいえ") << endl;
    cout << "85点の成績: " << getGrade(85) << endl;

    return 0;
}`}
          expectedOutput={`5の二乗: 25
4は偶数? はい
7は偶数? いいえ
85点の成績: B`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体やpairで複数の値を返す</h2>
        <p className="text-gray-400 mb-4">C++で複数の値を返すテクニックです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <tuple>
#include <string>
using namespace std;

// pairで2つの値を返す
pair<int, int> divide(int a, int b) {
    return {a / b, a % b};
}

// 構造体で複数の値を返す
struct Stats {
    double average;
    int min;
    int max;
};

Stats calcStats(int arr[], int size) {
    int sum = 0, lo = arr[0], hi = arr[0];
    for (int i = 0; i < size; i++) {
        sum += arr[i];
        if (arr[i] < lo) lo = arr[i];
        if (arr[i] > hi) hi = arr[i];
    }
    return {static_cast<double>(sum) / size, lo, hi};
}

int main() {
    auto [quotient, remainder] = divide(17, 5);
    cout << "17 / 5 = " << quotient << " 余り " << remainder << endl;

    int data[] = {45, 23, 67, 12, 89};
    Stats s = calcStats(data, 5);
    cout << "平均: " << s.average << endl;
    cout << "最小: " << s.min << ", 最大: " << s.max << endl;

    return 0;
}`}
          expectedOutput={`17 / 5 = 3 余り 2
平均: 47.2
最小: 12, 最大: 89`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}
