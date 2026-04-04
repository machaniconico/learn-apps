import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function VariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変引数テンプレート</h1>
        <p className="text-gray-400">パラメータパックを使った可変個の引数を扱うテンプレートを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変引数テンプレートとは</h2>
        <p className="text-gray-300 leading-relaxed">
          可変引数テンプレート（Variadic Templates）は、任意の数の型パラメータや引数を受け取れるテンプレートです。
          <code className="text-pink-400">typename... Args</code> のようにパラメータパックを宣言し、
          再帰やフォールド式で展開します。C++11で導入された強力な機能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰による展開</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 基底ケース（引数が0個のとき）
void printAll() {
    cout << endl;
}

// 可変引数テンプレート（再帰展開）
template <typename T, typename... Args>
void printAll(const T& first, const Args&... rest) {
    cout << first;
    if constexpr (sizeof...(rest) > 0) {
        cout << ", ";
    }
    printAll(rest...);
}

int main() {
    printAll(1, 2.5, "hello", 'A');
    printAll("名前", "年齢", 25);
    printAll(42);

    return 0;
}`}
          expectedOutput={`1, 2.5, hello, A
名前, 年齢, 25
42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォールド式（C++17）</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 左フォールド: (... op pack)
template <typename... Args>
auto sum(Args... args) {
    return (... + args); // ((a + b) + c) + d
}

// 右フォールド: (pack op ...)
template <typename... Args>
void printComma(const Args&... args) {
    // カンマ演算子を使った出力
    ((cout << args << " "), ...);
    cout << endl;
}

// sizeof... でパック内の要素数を取得
template <typename... Args>
void countArgs(Args... args) {
    cout << "引数の数: " << sizeof...(args) << endl;
}

int main() {
    cout << "sum(1,2,3,4,5) = " << sum(1, 2, 3, 4, 5) << endl;
    cout << "sum(1.1, 2.2) = " << sum(1.1, 2.2) << endl;

    printComma("Hello", 42, 3.14, 'A');

    countArgs(1, 2, 3);
    countArgs("a", "b", "c", "d", "e");

    return 0;
}`}
          expectedOutput={`sum(1,2,3,4,5) = 15
sum(1.1, 2.2) = 3.3
Hello 42 3.14 A
引数の数: 3
引数の数: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/templates" />
    </div>
  );
}
