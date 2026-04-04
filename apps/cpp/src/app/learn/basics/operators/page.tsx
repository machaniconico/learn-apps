import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理演算子を使いこなしましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++の主な演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++には多くの演算子があります。ここでは基本的な算術・比較・論理・代入演算子を学びます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-400 mb-4">基本的な数値計算を行う演算子です。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    int a = 17, b = 5;

    std::cout << "a = " << a << ", b = " << b << std::endl;
    std::cout << "a + b = " << (a + b) << std::endl;   // 加算
    std::cout << "a - b = " << (a - b) << std::endl;   // 減算
    std::cout << "a * b = " << (a * b) << std::endl;   // 乗算
    std::cout << "a / b = " << (a / b) << std::endl;   // 除算（整数）
    std::cout << "a % b = " << (a % b) << std::endl;   // 剰余

    // インクリメント・デクリメント
    int x = 10;
    std::cout << "\\nx = " << x << std::endl;
    std::cout << "++x = " << (++x) << std::endl;  // 前置：先に加算
    std::cout << "x++ = " << (x++) << std::endl;  // 後置：先に使用、後で加算
    std::cout << "x = " << x << std::endl;

    return 0;
}`}
          expectedOutput={`a = 17, b = 5
a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2

x = 10
++x = 11
x++ = 11
x = 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子と論理演算子</h2>
        <p className="text-gray-400 mb-4">条件判定に使う演算子です。結果はbool型になります。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    int a = 10, b = 20;
    std::cout << std::boolalpha;

    // 比較演算子
    std::cout << "--- 比較演算子 ---" << std::endl;
    std::cout << "a == b: " << (a == b) << std::endl;
    std::cout << "a != b: " << (a != b) << std::endl;
    std::cout << "a < b:  " << (a < b) << std::endl;
    std::cout << "a > b:  " << (a > b) << std::endl;

    // 論理演算子
    bool x = true, y = false;
    std::cout << "\\n--- 論理演算子 ---" << std::endl;
    std::cout << "x && y: " << (x && y) << std::endl;  // AND
    std::cout << "x || y: " << (x || y) << std::endl;  // OR
    std::cout << "!x:     " << (!x) << std::endl;      // NOT

    // 組み合わせ
    int age = 25;
    bool hasLicense = true;
    bool canDrive = (age >= 18) && hasLicense;
    std::cout << "\\n運転可能: " << canDrive << std::endl;

    return 0;
}`}
          expectedOutput={`--- 比較演算子 ---
a == b: false
a != b: true
a < b:  true
a > b:  false

--- 論理演算子 ---
x && y: false
x || y: true
!x:     false

運転可能: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">代入演算子とビット演算子</h2>
        <p className="text-gray-400 mb-4">複合代入演算子とビット演算の基本です。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // 複合代入演算子
    int x = 100;
    std::cout << "初期値: " << x << std::endl;

    x += 10;   // x = x + 10
    std::cout << "+= 10: " << x << std::endl;
    x -= 30;   // x = x - 30
    std::cout << "-= 30: " << x << std::endl;
    x *= 2;    // x = x * 2
    std::cout << "*= 2:  " << x << std::endl;
    x /= 4;    // x = x / 4
    std::cout << "/= 4:  " << x << std::endl;
    x %= 3;    // x = x % 3
    std::cout << "%= 3:  " << x << std::endl;

    // ビット演算子
    int a = 0b1100;  // 12
    int b = 0b1010;  // 10
    std::cout << "\\n--- ビット演算 ---" << std::endl;
    std::cout << "a & b = " << (a & b) << std::endl;   // AND: 8
    std::cout << "a | b = " << (a | b) << std::endl;   // OR: 14
    std::cout << "a ^ b = " << (a ^ b) << std::endl;   // XOR: 6
    std::cout << "~a = " << (~a) << std::endl;          // NOT

    return 0;
}`}
          expectedOutput={`初期値: 100
+= 10: 110
-= 30: 80
*= 2:  160
/= 4:  40
%= 3:  1

--- ビット演算 ---
a & b = 8
a | b = 14
a ^ b = 6
~a = -13`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
