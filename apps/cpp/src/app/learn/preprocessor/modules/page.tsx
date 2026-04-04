import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function ModulesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">プリプロセッサ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モジュール</h1>
        <p className="text-gray-400">C++20のモジュールシステムの概要を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++20モジュール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モジュールはC++20で導入された新しいコード組織化の仕組みです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include</code> に代わり、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">import</code> でモジュールを読み込みます。
          コンパイル時間の短縮、マクロの漏洩防止、明確な依存関係の定義が可能になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モジュールの概念</h2>
        <p className="text-gray-400 mb-4">モジュールの基本的な構文とヘッダファイルとの比較です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// C++20 モジュールの構文（概念説明用）
//
// === math_module.cppm ===
// export module math;        // モジュール宣言
//
// export int add(int a, int b) {
//     return a + b;
// }
//
// export int multiply(int a, int b) {
//     return a * b;
// }
//
// // exportしない関数は外部から見えない
// int internal_helper() { return 0; }
//
// === main.cpp ===
// import math;               // モジュールをインポート
// int result = add(3, 5);

// 従来の方法で同等の機能を示す
namespace math {
    int add(int a, int b) { return a + b; }
    int multiply(int a, int b) { return a * b; }
}

int main() {
    cout << "=== モジュール vs ヘッダ ===" << endl;
    cout << endl;
    cout << "ヘッダ方式:" << endl;
    cout << "  #include \"math.h\"" << endl;
    cout << endl;
    cout << "モジュール方式:" << endl;
    cout << "  import math;" << endl;
    cout << endl;

    cout << "add(3, 5) = " << math::add(3, 5) << endl;
    cout << "multiply(4, 6) = " << math::multiply(4, 6) << endl;

    cout << endl;
    cout << "モジュールの利点:" << endl;
    cout << "1. コンパイル時間の大幅短縮" << endl;
    cout << "2. マクロの漏洩なし" << endl;
    cout << "3. インクルード順序に依存しない" << endl;
    cout << "4. 明確なexport/privateの制御" << endl;

    return 0;
}`}
          expectedOutput={`=== モジュール vs ヘッダ ===

ヘッダ方式:
  #include "math.h"

モジュール方式:
  import math;

add(3, 5) = 8
multiply(4, 6) = 24

モジュールの利点:
1. コンパイル時間の大幅短縮
2. マクロの漏洩なし
3. インクルード順序に依存しない
4. 明確なexport/privateの制御`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">モジュールパーティション</h2>
        <p className="text-gray-400 mb-4">大きなモジュールをパーティションに分割する概念です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// モジュールパーティションの概念
//
// === math:basic.cppm ===
// export module math:basic;
// export int add(int a, int b) { return a + b; }
//
// === math:advanced.cppm ===
// export module math:advanced;
// export double power(double base, int exp) { ... }
//
// === math.cppm ===
// export module math;
// export import :basic;      // パーティションを再エクスポート
// export import :advanced;

// シミュレーション
namespace math_basic {
    int add(int a, int b) { return a + b; }
    int sub(int a, int b) { return a - b; }
}

namespace math_advanced {
    double power(double base, int exp) {
        double result = 1.0;
        for (int i = 0; i < exp; i++) result *= base;
        return result;
    }
}

int main() {
    cout << "基本パーティション:" << endl;
    cout << "  add(10, 20) = " << math_basic::add(10, 20) << endl;
    cout << "  sub(30, 15) = " << math_basic::sub(30, 15) << endl;

    cout << "高度パーティション:" << endl;
    cout << "  power(2, 10) = " << math_advanced::power(2, 10) << endl;

    return 0;
}`}
          expectedOutput={`基本パーティション:
  add(10, 20) = 30
  sub(30, 15) = 15
高度パーティション:
  power(2, 10) = 1024`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="modules" />
      </div>
      <LessonNav lessons={lessons} currentId="modules" basePath="/learn/preprocessor" />
    </div>
  );
}
