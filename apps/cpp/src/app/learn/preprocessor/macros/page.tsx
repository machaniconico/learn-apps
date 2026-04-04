import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function MacrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">プリプロセッサ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マクロ</h1>
        <p className="text-gray-400">#defineによるマクロ定義とその落とし穴を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マクロとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#define</code> はプリプロセッサに
          テキスト置換を指示します。定数マクロと関数マクロがありますが、
          モダンC++では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">constexpr</code> や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">inline</code> 関数を使うのが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">定数マクロと関数マクロ</h2>
        <p className="text-gray-400 mb-4">基本的なマクロの定義と使い方です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 定数マクロ
#define PI 3.14159265
#define MAX_SIZE 100

// 関数マクロ（括弧が重要！）
#define SQUARE(x) ((x) * (x))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// 文字列化演算子 #
#define STRINGIFY(x) #x

// トークン連結演算子 ##
#define MAKE_VAR(name) var_##name

int main() {
    cout << "PI = " << PI << endl;
    cout << "MAX_SIZE = " << MAX_SIZE << endl;
    cout << "SQUARE(5) = " << SQUARE(5) << endl;
    cout << "MIN(3, 7) = " << MIN(3, 7) << endl;
    cout << "STRINGIFY(hello) = " << STRINGIFY(hello) << endl;

    int MAKE_VAR(count) = 42;
    cout << "var_count = " << var_count << endl;

    return 0;
}`}
          expectedOutput={`PI = 3.14159
MAX_SIZE = 100
SQUARE(5) = 25
MIN(3, 7) = 3
STRINGIFY(hello) = hello
var_count = 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マクロの落とし穴とconstexprの推奨</h2>
        <p className="text-gray-400 mb-4">マクロの問題点と、モダンC++での代替方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 危険なマクロ（括弧なし）
#define BAD_SQUARE(x) x * x

// 安全なconstexpr関数
constexpr int safeSquare(int x) { return x * x; }
constexpr double pi = 3.14159265;

int main() {
    // マクロの落とし穴
    // BAD_SQUARE(3+2) は 3+2*3+2 = 11 になる
    cout << "BAD_SQUARE(3+2) = " << BAD_SQUARE(3+2) << endl;

    // constexprなら安全
    cout << "safeSquare(3+2) = " << safeSquare(3+2) << endl;

    // constexprは型安全
    cout << "pi = " << pi << endl;

    // 事前定義マクロ
    cout << "ファイル: " << __FILE__ << endl;
    cout << "行番号: " << __LINE__ << endl;
    cout << "日付: " << __DATE__ << endl;

    return 0;
}`}
          expectedOutput={`BAD_SQUARE(3+2) = 11
safeSquare(3+2) = 25
pi = 3.14159
ファイル: main.cpp
行番号: 18
日付: Jan  1 2025`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="macros" />
      </div>
      <LessonNav lessons={lessons} currentId="macros" basePath="/learn/preprocessor" />
    </div>
  );
}
