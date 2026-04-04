import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データ型</h1>
        <p className="text-gray-400">Cの基本的なデータ型の概要を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語の基本データ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には様々なデータ型があります。それぞれ格納できる値の範囲とメモリサイズが異なります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int</code> - 整数（通常4バイト）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">float</code> - 単精度浮動小数点数（4バイト）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">double</code> - 倍精度浮動小数点数（8バイト）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">char</code> - 文字（1バイト）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各データ型のサイズと範囲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> 演算子でデータ型のバイト数を確認できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("=== データ型のサイズ ===\\n");
    printf("char:   %zu バイト\\n", sizeof(char));
    printf("int:    %zu バイト\\n", sizeof(int));
    printf("float:  %zu バイト\\n", sizeof(float));
    printf("double: %zu バイト\\n", sizeof(double));

    // 各型の変数
    char   c = 'A';
    int    n = 42;
    float  f = 3.14f;
    double d = 3.141592653589793;

    printf("\\n=== 各型の値 ===\\n");
    printf("char:   %c\\n", c);
    printf("int:    %d\\n", n);
    printf("float:  %f\\n", f);
    printf("double: %.15f\\n", d);

    return 0;
}`}
          expectedOutput={`=== データ型のサイズ ===
char:   1 バイト
int:    4 バイト
float:  4 バイト
double: 8 バイト

=== 各型の値 ===
char:   A
int:    42
float:  3.140000
double: 3.141592653589793`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printfのフォーマット指定子</h2>
        <p className="text-gray-400 mb-4">
          各データ型に対応するフォーマット指定子を使って正しく出力します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int    i = 255;
    float  f = 1.5f;
    double d = 2.71828;
    char   c = 'Z';

    printf("%d  (10進数整数)\\n", i);
    printf("%x  (16進数)\\n", i);
    printf("%o  (8進数)\\n", i);
    printf("%f  (浮動小数点)\\n", f);
    printf("%.3f (小数点以下3桁)\\n", d);
    printf("%e  (指数表記)\\n", d);
    printf("%c  (文字)\\n", c);

    return 0;
}`}
          expectedOutput={`255  (10進数整数)
ff  (16進数)
377  (8進数)
1.500000  (浮動小数点)
2.718 (小数点以下3桁)
2.718280e+00  (指数表記)
Z  (文字)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="data-types" />
      </div>
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}
