import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function PointerArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタ配列</h1>
        <p className="text-gray-400">int *arr[10] — ポインタを要素とする配列の宣言と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ配列と配列へのポインタの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          見た目が似ていますが意味が異なります。優先順位ルールで読み解きましょう。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">int *arr[10]</code>
            <p className="text-gray-400 mt-1">「intへのポインタ」を10個持つ配列。各arr[i]はint*。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">int (*arr)[10]</code>
            <p className="text-gray-400 mt-1">「10要素のint配列」へのポインタ。2次元配列の操作で使う。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ配列の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int *arr[5]</code> の各要素は独立したint変数を指せます。
          バラバラなメモリ上の変数をまとめて管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int a = 10, b = 20, c = 30, d = 40, e = 50;

    // 5つの独立した変数へのポインタを配列に格納
    int *ptrs[5] = {&a, &b, &c, &d, &e};

    printf("値の表示:\\n");
    for (int i = 0; i < 5; i++) {
        printf("ptrs[%d] -> %d\\n", i, *ptrs[i]);
    }

    // ポインタ経由で変更
    *ptrs[2] = 999;
    printf("c = %d\\n", c);

    return 0;
}`}
          expectedOutput={`値の表示:
ptrs[0] -> 10
ptrs[1] -> 20
ptrs[2] -> 30
ptrs[3] -> 40
ptrs[4] -> 50
c = 999`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列へのポインタ（2次元配列操作）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int (*p)[4]</code> は「4要素のint配列へのポインタ」で、
          2次元配列の行を指すのに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int matrix[3][4] = {
        {1,  2,  3,  4},
        {5,  6,  7,  8},
        {9, 10, 11, 12}
    };

    // int (*p)[4]: 4要素のint配列へのポインタ
    int (*p)[4] = matrix;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%3d", p[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`}
          expectedOutput={`  1  2  3  4
  5  6  7  8
  9 10 11 12`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="pointer-arrays" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-arrays" basePath="/learn/pointer-apps" />
    </div>
  );
}
