import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">int, double, float など数値型の使い分けを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">整数型の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++にはサイズの異なる複数の整数型があります。用途に応じて適切な型を選びましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">short</code> - 最低16ビット（通常16ビット）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int</code> - 最低16ビット（通常32ビット、最も一般的）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long</code> - 最低32ビット</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long long</code> - 最低64ビット（C++11以降）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">unsigned</code> - 符号なし（0以上の値のみ）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型の使い方</h2>
        <p className="text-gray-400 mb-4">さまざまな整数型を使ってみましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    short smallNum = 32000;
    int normalNum = 2000000000;
    long bigNum = 2000000000L;
    long long hugeNum = 9000000000000000000LL;
    unsigned int positiveOnly = 4000000000U;

    std::cout << "short:         " << smallNum << std::endl;
    std::cout << "int:           " << normalNum << std::endl;
    std::cout << "long:          " << bigNum << std::endl;
    std::cout << "long long:     " << hugeNum << std::endl;
    std::cout << "unsigned int:  " << positiveOnly << std::endl;

    // 桁区切り（C++14以降）
    int million = 1'000'000;
    std::cout << "百万: " << million << std::endl;

    return 0;
}`}
          expectedOutput={`short:         32000
int:           2000000000
long:          2000000000
long long:     9000000000000000000
unsigned int:  4000000000
百万: 1000000`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          小数を扱うには浮動小数点型を使います。精度と用途に応じて選択しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">float</code> - 単精度（約7桁の精度、4バイト）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">double</code> - 倍精度（約15桁の精度、8バイト、推奨）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long double</code> - 拡張精度（環境依存）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型の比較</h2>
        <p className="text-gray-400 mb-4">float と double の精度の違いを確認しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <iomanip>

int main() {
    float f = 3.14159265358979f;
    double d = 3.14159265358979;
    long double ld = 3.14159265358979L;

    // 精度を指定して出力
    std::cout << std::setprecision(15);
    std::cout << "float:       " << f << std::endl;
    std::cout << "double:      " << d << std::endl;
    std::cout << "long double: " << ld << std::endl;

    // 浮動小数点の注意点
    std::cout << "\\n--- 浮動小数点の誤差 ---" << std::endl;
    double result = 0.1 + 0.2;
    std::cout << "0.1 + 0.2 = " << result << std::endl;
    std::cout << "(厳密に0.3ではない)" << std::endl;

    return 0;
}`}
          expectedOutput={`float:       3.14159274101257
double:      3.14159265358979
long double: 3.14159265358979
--- 浮動小数点の誤差 ---
0.1 + 0.2 = 0.300000000000000
(厳密に0.3ではない)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値リテラルの表記法</h2>
        <p className="text-gray-400 mb-4">C++では10進数以外にも様々な基数で数値を表記できます。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    int decimal = 42;        // 10進数
    int octal = 052;         // 8進数（先頭に0）
    int hex = 0x2A;          // 16進数（先頭に0x）
    int binary = 0b101010;   // 2進数（C++14、先頭に0b）

    std::cout << "10進数: " << decimal << std::endl;
    std::cout << "8進数:  " << octal << std::endl;
    std::cout << "16進数: " << hex << std::endl;
    std::cout << "2進数:  " << binary << std::endl;
    std::cout << "(すべて同じ値: 42)" << std::endl;

    // 科学的記数法
    double big = 1.5e6;    // 1.5 × 10^6
    double small = 2.3e-4; // 2.3 × 10^-4
    std::cout << "\\n1.5e6  = " << big << std::endl;
    std::cout << "2.3e-4 = " << small << std::endl;

    return 0;
}`}
          expectedOutput={`10進数: 42
8進数:  42
16進数: 42
2進数:  42
(すべて同じ値: 42)

1.5e6  = 1.5e+06
2.3e-4 = 0.00023`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
