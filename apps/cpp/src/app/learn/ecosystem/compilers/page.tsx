import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CompilersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++エコシステム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパイラ</h1>
        <p className="text-gray-400">GCC・Clang・MSVCの特徴と違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なC++コンパイラ</h2>
        <p className="text-gray-300 leading-relaxed">
          C++の三大コンパイラは<strong>GCC</strong>（GNU Compiler Collection）、
          <strong>Clang</strong>（LLVMベース）、<strong>MSVC</strong>（Microsoft Visual C++）です。
          いずれもISO C++標準に準拠していますが、対応バージョンや拡張機能に違いがあります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンパイラの比較</h2>
        <p className="text-gray-400 mb-4">各コンパイラの特徴を確認しましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== GCC (g++) ===" << endl;
    cout << "開発: GNU Project" << endl;
    cout << "対応: Linux, macOS, Windows (MinGW)" << endl;
    cout << "特徴: 最も広く使われるオープンソースコンパイラ" << endl;
    cout << "コマンド: g++ -std=c++20 main.cpp" << endl;
    cout << endl;

    cout << "=== Clang (clang++) ===" << endl;
    cout << "開発: LLVM Project" << endl;
    cout << "対応: Linux, macOS, Windows" << endl;
    cout << "特徴: 高速なコンパイル、優れたエラーメッセージ" << endl;
    cout << "コマンド: clang++ -std=c++20 main.cpp" << endl;
    cout << endl;

    cout << "=== MSVC (cl.exe) ===" << endl;
    cout << "開発: Microsoft" << endl;
    cout << "対応: Windows" << endl;
    cout << "特徴: Visual Studioに統合、Windows開発に最適" << endl;
    cout << "コマンド: cl /std:c++20 main.cpp" << endl;
    cout << endl;

    // コンパイラの検出
#if defined(__GNUC__) && !defined(__clang__)
    cout << "現在のコンパイラ: GCC " << __GNUC__ << "." << __GNUC_MINOR__ << endl;
#elif defined(__clang__)
    cout << "現在のコンパイラ: Clang " << __clang_major__ << "." << __clang_minor__ << endl;
#elif defined(_MSC_VER)
    cout << "現在のコンパイラ: MSVC " << _MSC_VER << endl;
#else
    cout << "現在のコンパイラ: 不明" << endl;
#endif

    return 0;
}`}
          expectedOutput={`=== GCC (g++) ===
開発: GNU Project
対応: Linux, macOS, Windows (MinGW)
特徴: 最も広く使われるオープンソースコンパイラ
コマンド: g++ -std=c++20 main.cpp

=== Clang (clang++) ===
開発: LLVM Project
対応: Linux, macOS, Windows
特徴: 高速なコンパイル、優れたエラーメッセージ
コマンド: clang++ -std=c++20 main.cpp

=== MSVC (cl.exe) ===
開発: Microsoft
対応: Windows
特徴: Visual Studioに統合、Windows開発に最適
コマンド: cl /std:c++20 main.cpp

現在のコンパイラ: GCC 13.2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">サニタイザ</h2>
        <p className="text-gray-400 mb-4">GCCとClangで使えるバグ検出ツールです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== サニタイザ ===" << endl;
    cout << endl;
    cout << "AddressSanitizer (ASan):" << endl;
    cout << "  -fsanitize=address" << endl;
    cout << "  バッファオーバーフロー、use-after-free検出" << endl;
    cout << endl;
    cout << "UndefinedBehaviorSanitizer (UBSan):" << endl;
    cout << "  -fsanitize=undefined" << endl;
    cout << "  未定義動作の検出" << endl;
    cout << endl;
    cout << "ThreadSanitizer (TSan):" << endl;
    cout << "  -fsanitize=thread" << endl;
    cout << "  データ競合の検出" << endl;
    cout << endl;
    cout << "MemorySanitizer (MSan):" << endl;
    cout << "  -fsanitize=memory" << endl;
    cout << "  未初期化メモリの読み取り検出" << endl;
    cout << endl;
    cout << "使い方: g++ -fsanitize=address -g main.cpp" << endl;
    return 0;
}`}
          expectedOutput={`=== サニタイザ ===

AddressSanitizer (ASan):
  -fsanitize=address
  バッファオーバーフロー、use-after-free検出

UndefinedBehaviorSanitizer (UBSan):
  -fsanitize=undefined
  未定義動作の検出

ThreadSanitizer (TSan):
  -fsanitize=thread
  データ競合の検出

MemorySanitizer (MSan):
  -fsanitize=memory
  未初期化メモリの読み取り検出

使い方: g++ -fsanitize=address -g main.cpp`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="compilers" />
      </div>
      <LessonNav lessons={lessons} currentId="compilers" basePath="/learn/ecosystem" />
    </div>
  );
}
