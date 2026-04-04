import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function ConditionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">プリプロセッサ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件付きコンパイル</h1>
        <p className="text-gray-400">#ifdef・#ifndef・#ifによる条件コンパイルを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件付きコンパイルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件付きコンパイルを使うと、コンパイル時の条件に応じて特定のコードブロックを含めたり除外したりできます。
          プラットフォーム依存のコードやデバッグ用コードの切り替えに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#ifdef / #ifndef</h2>
        <p className="text-gray-400 mb-4">マクロの定義の有無に基づく条件コンパイルです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

#define JAPANESE
// #define DEBUG  // コメントアウトでデバッグ無効

int main() {
#ifdef JAPANESE
    cout << "こんにちは！" << endl;
#else
    cout << "Hello!" << endl;
#endif

#ifdef DEBUG
    cout << "[DEBUG] デバッグモード有効" << endl;
#endif

#ifndef RELEASE
    cout << "リリースビルドではありません" << endl;
#endif

    return 0;
}`}
          expectedOutput={`こんにちは！
リリースビルドではありません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#if / #elif / #else</h2>
        <p className="text-gray-400 mb-4">式を評価して条件を判定する高度な条件コンパイルです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

#define VERSION 3

int main() {
#if VERSION >= 3
    cout << "バージョン3以上の機能" << endl;
#elif VERSION >= 2
    cout << "バージョン2以上の機能" << endl;
#else
    cout << "バージョン1の機能" << endl;
#endif

    // __cplusplusマクロでC++バージョンを検出
#if __cplusplus >= 202002L
    cout << "C++20以降" << endl;
#elif __cplusplus >= 201703L
    cout << "C++17以降" << endl;
#elif __cplusplus >= 201402L
    cout << "C++14以降" << endl;
#elif __cplusplus >= 201103L
    cout << "C++11以降" << endl;
#else
    cout << "C++03以前" << endl;
#endif

    return 0;
}`}
          expectedOutput={`バージョン3以上の機能
C++17以降`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="conditional" />
      </div>
      <LessonNav lessons={lessons} currentId="conditional" basePath="/learn/preprocessor" />
    </div>
  );
}
