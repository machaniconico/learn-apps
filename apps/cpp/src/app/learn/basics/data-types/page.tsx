import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">C++の基本的なデータ型の種類と特徴を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++のデータ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++は<strong className="text-white">静的型付け言語</strong>です。すべての変数にはコンパイル時に決まる型があり、
          型によって格納できるデータの種類やサイズが異なります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 pr-4">カテゴリ</th>
                <th className="py-2 pr-4">型</th>
                <th className="py-2">説明</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2 pr-4">整数</td><td className="py-2 pr-4 font-mono text-blue-400">int</td><td className="py-2">整数（通常32ビット）</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 pr-4">浮動小数点</td><td className="py-2 pr-4 font-mono text-blue-400">double</td><td className="py-2">倍精度浮動小数点数</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 pr-4">文字</td><td className="py-2 pr-4 font-mono text-blue-400">char</td><td className="py-2">1文字（1バイト）</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 pr-4">真偽値</td><td className="py-2 pr-4 font-mono text-blue-400">bool</td><td className="py-2">true または false</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 pr-4">文字列</td><td className="py-2 pr-4 font-mono text-blue-400">std::string</td><td className="py-2">文字列（標準ライブラリ）</td></tr>
              <tr><td className="py-2 pr-4">なし</td><td className="py-2 pr-4 font-mono text-blue-400">void</td><td className="py-2">値を持たない型</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本データ型の使い方</h2>
        <p className="text-gray-400 mb-4">各データ型の変数を宣言して値を確認してみましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    int age = 30;              // 整数
    double weight = 65.5;      // 浮動小数点数
    char initial = 'T';        // 文字
    bool isActive = true;      // 真偽値
    std::string city = "東京";  // 文字列

    std::cout << "年齢: " << age << std::endl;
    std::cout << "体重: " << weight << "kg" << std::endl;
    std::cout << "イニシャル: " << initial << std::endl;
    std::cout << "アクティブ: " << std::boolalpha << isActive << std::endl;
    std::cout << "都市: " << city << std::endl;

    return 0;
}`}
          expectedOutput={`年齢: 30
体重: 65.5kg
イニシャル: T
アクティブ: true
都市: 東京`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sizeof演算子でサイズを確認</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> 演算子を使うと、各型のメモリサイズ（バイト数）を確認できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    std::cout << "bool:    " << sizeof(bool) << " バイト" << std::endl;
    std::cout << "char:    " << sizeof(char) << " バイト" << std::endl;
    std::cout << "int:     " << sizeof(int) << " バイト" << std::endl;
    std::cout << "long:    " << sizeof(long) << " バイト" << std::endl;
    std::cout << "float:   " << sizeof(float) << " バイト" << std::endl;
    std::cout << "double:  " << sizeof(double) << " バイト" << std::endl;

    // 変数のサイズも確認できる
    int x = 42;
    std::cout << "変数x:   " << sizeof(x) << " バイト" << std::endl;

    return 0;
}`}
          expectedOutput={`bool:    1 バイト
char:    1 バイト
int:     4 バイト
long:    8 バイト
float:   4 バイト
double:  8 バイト
変数x:   4 バイト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型の範囲を確認する</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;climits&gt;</code> と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;cfloat&gt;</code> ヘッダで各型の最小値・最大値を調べられます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <climits>
#include <cfloat>

int main() {
    std::cout << "int の範囲:" << std::endl;
    std::cout << "  最小: " << INT_MIN << std::endl;
    std::cout << "  最大: " << INT_MAX << std::endl;

    std::cout << "double の範囲:" << std::endl;
    std::cout << "  最小: " << DBL_MIN << std::endl;
    std::cout << "  最大: " << DBL_MAX << std::endl;

    std::cout << "char の範囲:" << std::endl;
    std::cout << "  最小: " << CHAR_MIN << std::endl;
    std::cout << "  最大: " << CHAR_MAX << std::endl;

    return 0;
}`}
          expectedOutput={`int の範囲:
  最小: -2147483648
  最大: 2147483647
double の範囲:
  最小: 2.22507e-308
  最大: 1.79769e+308
char の範囲:
  最小: -128
  最大: 127`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}
