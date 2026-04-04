import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++11で導入された重要な機能として正しいものはどれですか？",
    options: [
      "auto型推論、ラムダ式、スマートポインタ",
      "モジュール、コンセプト、コルーチン",
      "std::format、std::span",
      "std::expected、std::print",
    ],
    answer: 0,
    explanation: "C++11はモダンC++の始まりとされ、auto、ラムダ式、unique_ptr/shared_ptr、range-based for、move semanticsなど多くの重要な機能が導入されました。",
  },
  {
    question: "GCC、Clang、MSVCの共通点として正しいものはどれですか？",
    options: [
      "いずれもC++標準規格に準拠したコンパイラである",
      "すべてLinuxでのみ動作する",
      "すべてオープンソースである",
      "すべて同じバックエンドを使っている",
    ],
    answer: 0,
    explanation: "GCC、Clang、MSVCはいずれもISO C++標準に準拠したコンパイラです。GCCとClangはオープンソースですが、MSVCはMicrosoft製の商用コンパイラです。",
  },
  {
    question: "vcpkgやConanの役割として正しいものはどれですか？",
    options: [
      "C++ライブラリの依存関係を管理し、簡単にインストールできるようにする",
      "C++コードをコンパイルする",
      "C++コードのフォーマットを整える",
      "デバッグ情報を解析する",
    ],
    answer: 0,
    explanation: "vcpkgとConanはC++のパッケージマネージャで、サードパーティライブラリのダウンロード、ビルド、依存関係の管理を自動化します。",
  },
  {
    question: "C++ Core Guidelinesとは何ですか？",
    options: [
      "Bjarne StroustrupとHerb Sutterが中心となってまとめたC++のベストプラクティス集",
      "C++の公式仕様書",
      "特定のコンパイラのドキュメント",
      "C++の標準ライブラリのリファレンス",
    ],
    answer: 0,
    explanation: "C++ Core GuidelinesはC++の作者Bjarne Stroustrupらが中心となって作成した、安全で効率的なC++コードを書くためのガイドラインです。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">C++エコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++を取り巻くエコシステムを学びましょう。C++11から最新標準までの進化、主要コンパイラの違い、
          パッケージ管理ツール、テストフレームワーク、そしてモダンC++のベストプラクティスを理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="blue" categoryId="ecosystem" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C++標準の進化</h2>
        <p className="text-gray-400 mb-4">
          各C++バージョンで導入された主要な機能を確認しましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <memory>
using namespace std;

int main() {
    // C++11: auto, range-based for, smart pointers
    auto numbers = vector<int>{1, 2, 3, 4, 5};
    auto ptr = make_unique<int>(42);

    cout << "=== C++11の機能 ===" << endl;
    cout << "auto + range-for: ";
    for (const auto& n : numbers) cout << n << " ";
    cout << endl;
    cout << "unique_ptr: " << *ptr << endl;

    // C++11: ラムダ式
    auto square = [](int x) { return x * x; };
    cout << "ラムダ: 5^2 = " << square(5) << endl;

    // C++14: ジェネリックラムダ
    auto add = [](auto a, auto b) { return a + b; };
    cout << "ジェネリックラムダ: " << add(3, 4) << endl;

    // C++17: 構造化束縛（概念のみ）
    cout << endl;
    cout << "=== C++標準の歴史 ===" << endl;
    cout << "C++11: モダンC++の始まり" << endl;
    cout << "C++14: 小さな改善" << endl;
    cout << "C++17: filesystem, optional, variant" << endl;
    cout << "C++20: concepts, ranges, coroutines" << endl;
    cout << "C++23: print, expected, flat_map" << endl;

    return 0;
}`}
          expectedOutput={`=== C++11の機能 ===
auto + range-for: 1 2 3 4 5
unique_ptr: 42
ラムダ: 5^2 = 25
ジェネリックラムダ: 7

=== C++標準の歴史 ===
C++11: モダンC++の始まり
C++14: 小さな改善
C++17: filesystem, optional, variant
C++20: concepts, ranges, coroutines
C++23: print, expected, flat_map`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの基本概念</h2>
        <p className="text-gray-400 mb-4">
          ユニットテストの基本的な考え方をシンプルなアサーション関数で体験しましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <cmath>
using namespace std;

// 簡易テストフレームワーク
int passed = 0, failed = 0;

void assertEqual(int actual, int expected, const string& name) {
    if (actual == expected) {
        cout << "[PASS] " << name << endl;
        passed++;
    } else {
        cout << "[FAIL] " << name
             << " (expected=" << expected
             << ", actual=" << actual << ")" << endl;
        failed++;
    }
}

// テスト対象の関数
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    assertEqual(factorial(0), 1, "factorial(0)");
    assertEqual(factorial(1), 1, "factorial(1)");
    assertEqual(factorial(5), 120, "factorial(5)");
    assertEqual(factorial(10), 3628800, "factorial(10)");

    cout << endl;
    cout << passed << " passed, " << failed << " failed" << endl;
    return 0;
}`}
          expectedOutput={`[PASS] factorial(0)
[PASS] factorial(1)
[PASS] factorial(5)
[PASS] factorial(10)

4 passed, 0 failed`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
