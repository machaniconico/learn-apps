import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">暗黙的・明示的なキャストの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語では異なる型間で値を変換できます。自動で行われる<strong className="text-blue-400">暗黙的変換</strong>と、
          明示的に指定する<strong className="text-blue-400">キャスト（明示的変換）</strong>があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>暗黙的変換：小さい型から大きい型へは自動変換（int → double）</li>
          <li>明示的キャスト：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">(型名)式</code> で型を変換</li>
          <li>大きい型から小さい型への変換はデータが失われる可能性あり</li>
          <li>整数同士の割り算は小数点以下が切り捨てられる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的な型変換</h2>
        <p className="text-gray-400 mb-4">
          異なる型の演算では、より大きい型に自動的に変換されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int i = 5;
    double d = 2.5;

    // int + double → double（暗黙的変換）
    double result = i + d;
    printf("%d + %.1f = %.1f\\n", i, d, result);

    // 整数除算の落とし穴
    int a = 7, b = 2;
    int div_int = a / b;      // 整数除算
    double div_double = a / b; // まだ整数除算！

    printf("\\n7 / 2 (int):    %d\\n", div_int);
    printf("7 / 2 (double): %.1f (注意！)\\n", div_double);

    return 0;
}`}
          expectedOutput={`5 + 2.5 = 7.5

7 / 2 (int):    3
7 / 2 (double): 3.0 (注意！)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">明示的キャスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">(型名)</code> を使って明示的に型変換します。
          整数除算を浮動小数点にするにはキャストが必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int a = 7, b = 2;

    // 正しい浮動小数点除算
    double result = (double)a / b;
    printf("(double)7 / 2 = %.1f\\n", result);

    // doubleをintにキャスト（小数点以下は切り捨て）
    double pi = 3.14159;
    int pi_int = (int)pi;
    printf("(int)3.14159 = %d\\n", pi_int);

    // charとintの変換
    char c = 'A';
    int ascii = (int)c;
    char back = (char)(ascii + 1);
    printf("'A' = %d, next = %c\\n", ascii, back);

    return 0;
}`}
          expectedOutput={`(double)7 / 2 = 3.5
(int)3.14159 = 3
'A' = 65, next = B`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
