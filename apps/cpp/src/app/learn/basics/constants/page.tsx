import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ConstantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定数</h1>
        <p className="text-gray-400">constとconstexprによる定数の定義方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">定数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          定数は一度値を設定すると変更できない変数です。C++では主に2つの方法で定数を定義します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">const</code> - 実行時に値が決まる定数（実行時定数）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">constexpr</code> - コンパイル時に値が決まる定数（コンパイル時定数、C++11以降）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const の使い方</h2>
        <p className="text-gray-400 mb-4">constで宣言した変数は初期化後に値を変更できません。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // const 定数の定義
    const double PI = 3.14159265358979;
    const int MAX_SCORE = 100;
    const std::string APP_NAME = "MyApp";

    std::cout << "円周率: " << PI << std::endl;
    std::cout << "最高点: " << MAX_SCORE << std::endl;
    std::cout << "アプリ名: " << APP_NAME << std::endl;

    // const は初期化が必須
    // const int x;  // エラー：初期化されていない

    // const は再代入不可
    // PI = 3.14;  // エラー：constは変更できない

    // 計算に使用
    double radius = 5.0;
    double area = PI * radius * radius;
    std::cout << "半径" << radius << "の円の面積: " << area << std::endl;

    return 0;
}`}
          expectedOutput={`円周率: 3.14159
最高点: 100
アプリ名: MyApp
半径5の円の面積: 78.5398`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">constexpr の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">constexpr</code> はコンパイル時に値が確定する定数です。
          パフォーマンスの最適化に役立ちます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

// constexpr 関数（コンパイル時に計算可能）
constexpr int square(int x) {
    return x * x;
}

constexpr double circleArea(double r) {
    return 3.14159265358979 * r * r;
}

int main() {
    // コンパイル時定数
    constexpr int SIZE = 10;
    constexpr double PI = 3.14159265358979;
    constexpr int SQUARED = square(5);
    constexpr double AREA = circleArea(3.0);

    std::cout << "SIZE: " << SIZE << std::endl;
    std::cout << "PI: " << PI << std::endl;
    std::cout << "5の2乗: " << SQUARED << std::endl;
    std::cout << "半径3の円の面積: " << AREA << std::endl;

    // 配列サイズにも使える
    int arr[SIZE];
    std::cout << "配列サイズ: " << SIZE << std::endl;

    return 0;
}`}
          expectedOutput={`SIZE: 10
PI: 3.14159
5の2乗: 25
半径3の円の面積: 28.2743
配列サイズ: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const と constexpr の違い</h2>
        <p className="text-gray-400 mb-4">どちらを使うべきか、違いを理解しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <ctime>

int main() {
    // constexpr: コンパイル時に確定（リテラルや他のconstexprから）
    constexpr int COMPILE_TIME = 42;
    constexpr int DOUBLED = COMPILE_TIME * 2;

    // const: 実行時に確定してもOK
    const int RUNTIME_VALUE = std::time(nullptr) % 100;

    // constexpr int BAD = std::time(nullptr);
    // ↑ エラー：実行時の値はconstexprに代入できない

    std::cout << "コンパイル時定数: " << COMPILE_TIME << std::endl;
    std::cout << "コンパイル時計算: " << DOUBLED << std::endl;
    std::cout << "実行時定数: " << RUNTIME_VALUE << std::endl;

    // どちらも使い分けが大切
    // - 値がコンパイル時に分かる → constexpr
    // - 実行時に決まる値 → const

    std::cout << "\\nconstexpr → コンパイル時に確定" << std::endl;
    std::cout << "const → 一度設定したら変更不可" << std::endl;

    return 0;
}`}
          expectedOutput={`コンパイル時定数: 42
コンパイル時計算: 84
実行時定数: (実行時の値)

constexpr → コンパイル時に確定
const → 一度設定したら変更不可`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="constants" />
      </div>
      <LessonNav lessons={lessons} currentId="constants" basePath="/learn/basics" />
    </div>
  );
}
