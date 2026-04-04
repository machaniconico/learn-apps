import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">bool型とtrue/falseの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">bool型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">bool</code> 型は真偽値を表すデータ型で、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code>（真）または
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code>（偽）の2つの値のみを持ちます。
          条件分岐やループの制御に欠かせない型です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          内部的には <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">true</code> は1、
          <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">false</code> は0として扱われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bool型の基本</h2>
        <p className="text-gray-400 mb-4">bool型の宣言と出力方法を確認しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    bool isReady = true;
    bool isFinished = false;

    // デフォルトでは 1/0 で出力
    std::cout << "isReady: " << isReady << std::endl;
    std::cout << "isFinished: " << isFinished << std::endl;

    // boolalpha で true/false 表示
    std::cout << std::boolalpha;
    std::cout << "isReady: " << isReady << std::endl;
    std::cout << "isFinished: " << isFinished << std::endl;

    // noboolalpha で元に戻す
    std::cout << std::noboolalpha;
    std::cout << "isReady: " << isReady << std::endl;

    return 0;
}`}
          expectedOutput={`isReady: 1
isFinished: 0
isReady: true
isFinished: false
isReady: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子とbool</h2>
        <p className="text-gray-400 mb-4">比較演算子の結果はbool型になります。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    int a = 10, b = 20;
    std::cout << std::boolalpha;

    // 比較演算子はboolを返す
    std::cout << "a == b: " << (a == b) << std::endl;
    std::cout << "a != b: " << (a != b) << std::endl;
    std::cout << "a < b:  " << (a < b) << std::endl;
    std::cout << "a > b:  " << (a > b) << std::endl;
    std::cout << "a <= b: " << (a <= b) << std::endl;
    std::cout << "a >= b: " << (a >= b) << std::endl;

    // 結果をbool変数に格納
    bool isEqual = (a == b);
    bool isLess = (a < b);
    std::cout << "\\n等しい?: " << isEqual << std::endl;
    std::cout << "小さい?: " << isLess << std::endl;

    return 0;
}`}
          expectedOutput={`a == b: false
a != b: true
a < b:  true
a > b:  false
a <= b: true
a >= b: false

等しい?: false
小さい?: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">boolと数値の変換</h2>
        <p className="text-gray-400 mb-4">C++ではboolと整数の間で暗黙的な変換が行われます。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    std::cout << std::boolalpha;

    // 整数 → bool: 0はfalse、それ以外はtrue
    bool fromZero = 0;
    bool fromOne = 1;
    bool fromNegative = -5;
    bool fromLarge = 100;

    std::cout << "0 → bool: " << fromZero << std::endl;
    std::cout << "1 → bool: " << fromOne << std::endl;
    std::cout << "-5 → bool: " << fromNegative << std::endl;
    std::cout << "100 → bool: " << fromLarge << std::endl;

    // bool → 整数: trueは1、falseは0
    int fromTrue = true;
    int fromFalse = false;
    std::cout << "\\ntrue → int: " << fromTrue << std::endl;
    std::cout << "false → int: " << fromFalse << std::endl;

    // 算術での使用
    std::cout << "true + true = " << (true + true) << std::endl;

    return 0;
}`}
          expectedOutput={`0 → bool: false
1 → bool: true
-5 → bool: true
100 → bool: true

true → int: 1
false → int: 0
true + true = 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
