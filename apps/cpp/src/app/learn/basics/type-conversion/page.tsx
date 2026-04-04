import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">暗黙的・明示的な型変換とstatic_castの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          異なる型の間でデータを変換することを型変換（キャスト）と言います。
          C++には<strong className="text-white">暗黙的変換</strong>（コンパイラが自動で行う）と
          <strong className="text-white">明示的変換</strong>（プログラマが指定する）があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的な型変換</h2>
        <p className="text-gray-400 mb-4">コンパイラが自動的に行う型変換です。精度の低い型から高い型への変換は安全です。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // 整数 → 浮動小数点（安全・精度が上がる）
    int intVal = 42;
    double doubleVal = intVal;  // 暗黙的変換
    std::cout << "int → double: " << doubleVal << std::endl;

    // 浮動小数点 → 整数（注意・小数部が失われる）
    double pi = 3.14;
    int truncated = pi;  // 暗黙的変換（小数部切り捨て）
    std::cout << "double → int: " << truncated << std::endl;

    // 演算時の自動昇格
    int a = 5;
    double b = 2.5;
    double result = a + b;  // aがdoubleに昇格
    std::cout << "5 + 2.5 = " << result << std::endl;

    // char → int
    char ch = 'A';
    int asciiVal = ch;
    std::cout << "'A' → int: " << asciiVal << std::endl;

    return 0;
}`}
          expectedOutput={`int → double: 42
double → int: 3
5 + 2.5 = 7.5
'A' → int: 65`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static_cast による明示的変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">static_cast&lt;型&gt;(値)</code> はC++で推奨される型変換方法です。
          意図を明確にし、コンパイラの警告を回避できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // static_cast の基本
    double price = 19.99;
    int rounded = static_cast<int>(price);
    std::cout << "価格: " << price << " → 切り捨て: " << rounded << std::endl;

    // 整数の割り算で小数結果を得る
    int a = 7, b = 2;
    // 整数同士の割り算は整数になる
    std::cout << "7 / 2 = " << (a / b) << std::endl;
    // static_castで一方をdoubleにする
    double result = static_cast<double>(a) / b;
    std::cout << "7.0 / 2 = " << result << std::endl;

    // char と int の変換
    int code = 66;
    char letter = static_cast<char>(code);
    std::cout << "ASCII " << code << " → '" << letter << "'" << std::endl;

    return 0;
}`}
          expectedOutput={`価格: 19.99 → 切り捨て: 19
7 / 2 = 3
7.0 / 2 = 3.5
ASCII 66 → 'B'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Cスタイルキャストと注意点</h2>
        <p className="text-gray-400 mb-4">
          Cスタイルのキャストも使えますが、C++では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">static_cast</code> が推奨されます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    double value = 9.87;

    // Cスタイルキャスト（非推奨）
    int cStyle = (int)value;
    std::cout << "Cスタイル: " << cStyle << std::endl;

    // 関数スタイルキャスト
    int funcStyle = int(value);
    std::cout << "関数スタイル: " << funcStyle << std::endl;

    // static_cast（推奨）
    int modern = static_cast<int>(value);
    std::cout << "static_cast: " << modern << std::endl;

    // 一様初期化での変換（ナロイング変換はエラー）
    // int narrow{9.87};  // エラー: ナロイング変換
    int safe{42};  // OK: 情報の欠落がない
    std::cout << "一様初期化: " << safe << std::endl;

    std::cout << "\\n推奨: static_cast を使いましょう" << std::endl;

    return 0;
}`}
          expectedOutput={`Cスタイル: 9
関数スタイル: 9
static_cast: 9
一様初期化: 42

推奨: static_cast を使いましょう`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
