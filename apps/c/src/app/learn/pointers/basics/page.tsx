import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointerBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタの基本</h1>
        <p className="text-gray-400">アドレス演算子とポインタ変数の宣言・使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタとは何か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタとは、変数の<strong className="text-teal-400">メモリアドレス</strong>を格納する変数です。
          プログラムの各変数はメモリ上の特定の場所（アドレス）に配置されています。
          ポインタはそのアドレスを値として保持します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *p;</code> - intへのポインタを宣言</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&x</code> - 変数xのアドレスを取得（アドレス演算子）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*p</code> - pが指す先の値にアクセス（デリファレンス）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%p</code> - printfでアドレスを表示するフォーマット指定子</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの宣言とアドレス取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">型名 *変数名</code> でポインタを宣言します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&</code> でアドレスを取得してポインタに代入します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 42;
    int *p;      // intへのポインタを宣言

    p = &x;      // xのアドレスをpに代入

    printf("xの値:          %d\\n", x);
    printf("xのアドレス:    %p\\n", (void*)&x);
    printf("pの値(アドレス): %p\\n", (void*)p);
    printf("pとxは同じアドレス: %s\\n", (p == &x) ? "YES" : "NO");

    return 0;
}`}
          expectedOutput={`xの値:          42
xのアドレス:    0x7ffd5e3c1234（環境依存）
pの値(アドレス): 0x7ffd5e3c1234（環境依存）
pとxは同じアドレス: YES`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタを使った値の読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">*p</code> でポインタが指す先の値を読み書きできます。
          これを<strong className="text-teal-400">デリファレンス</strong>といいます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;

    printf("変更前: a = %d\\n", a);

    *p = 99;     // ポインタ経由で値を変更

    printf("変更後: a = %d\\n", a);
    printf("*p = %d\\n", *p);

    // aとpが同じ変数を参照している
    a = 200;
    printf("a変更後: *p = %d\\n", *p);

    return 0;
}`}
          expectedOutput={`変更前: a = 10
変更後: a = 99
*p = 99
a変更後: *p = 200`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型へのポインタ</h2>
        <p className="text-gray-400 mb-4">
          ポインタは任意の型に対して宣言できます。型によってデリファレンス時に読み取るバイト数が決まります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int   n = 100;
    double d = 3.14;
    char  c = 'A';

    int    *pi = &n;
    double *pd = &d;
    char   *pc = &c;

    printf("int:    %d (size: %zu bytes)\\n", *pi, sizeof(int));
    printf("double: %.2f (size: %zu bytes)\\n", *pd, sizeof(double));
    printf("char:   %c (size: %zu bytes)\\n", *pc, sizeof(char));

    return 0;
}`}
          expectedOutput={`int:    100 (size: 4 bytes)
double: 3.14 (size: 8 bytes)
char:   A (size: 1 bytes)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/pointers" />
    </div>
  );
}
