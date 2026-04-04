import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function AutoInferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">auto推論</h1>
        <p className="text-gray-400">autoキーワードによる型推論を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">autoキーワードとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++11で導入された <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">auto</code> キーワードは、
          コンパイラに初期化式から変数の型を自動的に推論させる機能です。
          型が複雑な場合や、冗長な型名を避けたい場合に便利です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">重要:</strong> autoは型を省略しているだけで、コンパイル時に型が確定します。
          動的型付けではなく、型安全性は完全に保たれます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">autoの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">初期化式の型をコンパイラが自動的に推論します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    auto integer = 42;          // int と推論
    auto decimal = 3.14;        // double と推論
    auto character = 'A';       // char と推論
    auto flag = true;           // bool と推論
    auto text = std::string("Hello");  // std::string と推論

    std::cout << "integer: " << integer << std::endl;
    std::cout << "decimal: " << decimal << std::endl;
    std::cout << "character: " << character << std::endl;
    std::cout << std::boolalpha;
    std::cout << "flag: " << flag << std::endl;
    std::cout << "text: " << text << std::endl;

    // autoは初期化が必須
    // auto x;  // エラー: 型を推論できない

    return 0;
}`}
          expectedOutput={`integer: 42
decimal: 3.14
character: A
flag: true
text: Hello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">autoと式の型推論</h2>
        <p className="text-gray-400 mb-4">演算結果や関数の戻り値の型も自動推論できます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>

int main() {
    // 演算結果の型推論
    auto sum = 10 + 20;           // int
    auto mixed = 10 + 3.14;       // double（intがdoubleに昇格）
    auto concat = std::string("Hello") + " World";  // std::string

    std::cout << "sum: " << sum << std::endl;
    std::cout << "mixed: " << mixed << std::endl;
    std::cout << "concat: " << concat << std::endl;

    // イテレータでの使用（autoが特に便利）
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // autoがない場合: std::vector<int>::iterator it = numbers.begin();
    // autoを使う場合:
    auto it = numbers.begin();
    std::cout << "先頭: " << *it << std::endl;

    // 範囲forループでの使用
    std::cout << "要素: ";
    for (auto num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}`}
          expectedOutput={`sum: 30
mixed: 13.14
concat: Hello World
先頭: 1
要素: 1 2 3 4 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">autoの注意点とベストプラクティス</h2>
        <p className="text-gray-400 mb-4">autoを使うべき場面と避けるべき場面を理解しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 注意: 文字列リテラルはconst char*になる
    auto cStr = "Hello";              // const char* と推論
    auto cppStr = std::string("Hello");  // std::string と推論

    // 型を明確にしたい場合は明示的に書く
    int explicitInt = 42;      // 意図が明確
    auto inferredInt = 42;     // intだが読み手に不明確な場合も

    // autoが便利な場面
    // 1. 型名が長い場合
    // 2. イテレータの型
    // 3. ラムダ式の格納
    auto greet = [](const std::string& name) {
        return "Hello, " + name + "!";
    };

    std::cout << greet("World") << std::endl;
    std::cout << greet("C++") << std::endl;

    // decltype: 式の型を取得
    int x = 10;
    decltype(x) y = 20;  // xと同じ型（int）
    std::cout << "y = " << y << std::endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
Hello, C++!
y = 20`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="auto-inference" />
      </div>
      <LessonNav lessons={lessons} currentId="auto-inference" basePath="/learn/basics" />
    </div>
  );
}
