import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function InlinePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インライン関数</h1>
        <p className="text-gray-400">inline指定による最適化ヒントを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インライン関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">inline</code> キーワードは、
          関数呼び出しのオーバーヘッドを避けるために、関数本体を呼び出し箇所に展開するようコンパイラに提案します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          ただし、これはあくまで<strong className="text-white">ヒント</strong>であり、コンパイラが最終的に判断します。
          小さく頻繁に呼ばれる関数に適しています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          現代のコンパイラは最適化が優秀なため、inlineの有無に関係なく適切にインライン展開を行うことが多いです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インライン関数の基本</h2>
        <p className="text-gray-400 mb-4">小さな関数をinlineとして定義します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// インライン関数
inline int square(int x) {
    return x * x;
}

inline int maxOf(int a, int b) {
    return (a > b) ? a : b;
}

inline double celsiusToFahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

int main() {
    // インライン関数の呼び出し
    cout << "3の二乗: " << square(3) << endl;
    cout << "5の二乗: " << square(5) << endl;

    cout << "10と20の最大値: " << maxOf(10, 20) << endl;

    cout << "0°C = " << celsiusToFahrenheit(0) << "°F" << endl;
    cout << "100°C = " << celsiusToFahrenheit(100) << "°F" << endl;

    return 0;
}`}
          expectedOutput={`3の二乗: 9
5の二乗: 25
10と20の最大値: 20
0°C = 32°F
100°C = 212°F`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">constexprとの比較</h2>
        <p className="text-gray-400 mb-4">C++11以降のconstexprはコンパイル時に評価される関数です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// inline: 実行時にインライン展開のヒント
inline int runtimeDouble(int x) {
    return x * 2;
}

// constexpr: コンパイル時に計算可能
constexpr int compiletimeSquare(int x) {
    return x * x;
}

// constexpr再帰（コンパイル時計算）
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

int main() {
    cout << "double(7): " << runtimeDouble(7) << endl;
    cout << "square(8): " << compiletimeSquare(8) << endl;

    // constexprはコンパイル時定数として使える
    constexpr int size = compiletimeSquare(4);
    cout << "配列サイズ: " << size << endl;

    cout << "5! = " << factorial(5) << endl;
    cout << "10! = " << factorial(10) << endl;

    return 0;
}`}
          expectedOutput={`double(7): 14
square(8): 64
配列サイズ: 16
5! = 120
10! = 3628800`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="inline" />
      </div>
      <LessonNav lessons={lessons} currentId="inline" basePath="/learn/functions" />
    </div>
  );
}
