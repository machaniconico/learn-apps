import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function DereferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デリファレンス</h1>
        <p className="text-gray-400">*演算子でポインタが指す値にアクセスし、値を変更する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デリファレンスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デリファレンス（間接参照）とは、ポインタが指すアドレスにある値にアクセスする操作です。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*</code> 演算子を使います。
          宣言時の <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *p</code> の <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*</code> とは異なる意味です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>宣言: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *p;</code> → pはintへのポインタ型</li>
          <li>デリファレンス: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*p</code> → pが指すint値</li>
          <li>代入: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*p = 10;</code> → pが指す場所に10を書き込む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デリファレンスで値を変更する</h2>
        <p className="text-gray-400 mb-4">
          ポインタ経由で変数の値を変更できます。関数に変数のアドレスを渡して値を変更するパターンの基礎です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void double_value(int *p) {
    *p = *p * 2;   // ポインタ経由で値を2倍に
}

int main() {
    int x = 5;
    printf("変更前: x = %d\\n", x);

    double_value(&x);   // xのアドレスを渡す
    printf("変更後: x = %d\\n", x);

    // 直接デリファレンスで変更
    int y = 100;
    int *py = &y;
    *py += 50;
    printf("y = %d\\n", y);

    return 0;
}`}
          expectedOutput={`変更前: x = 5
変更後: x = 10
y = 150`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">swapの実装</h2>
        <p className="text-gray-400 mb-4">
          2つの変数の値を交換するswap関数はポインタなしでは実現できません。
          ポインタ渡しにより関数から元の変数を変更できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    printf("swap前: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("swap後: x=%d, y=%d\\n", x, y);

    return 0;
}`}
          expectedOutput={`swap前: x=10, y=20
swap後: x=20, y=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体へのポインタとアロー演算子</h2>
        <p className="text-gray-400 mb-4">
          構造体へのポインタから メンバにアクセスするには
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-&gt;</code> 演算子を使います。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">(*p).member</code> と同じ意味です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main() {
    Point pt = {3, 4};
    Point *pp = &pt;

    // 2通りの書き方（同じ意味）
    printf("(*pp).x = %d\\n", (*pp).x);
    printf("pp->x = %d\\n", pp->x);

    // ポインタ経由で変更
    pp->x = 10;
    pp->y = 20;
    printf("変更後: (%d, %d)\\n", pt.x, pt.y);

    return 0;
}`}
          expectedOutput={`(*pp).x = 3
pp->x = 3
変更後: (10, 20)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="dereference" />
      </div>
      <LessonNav lessons={lessons} currentId="dereference" basePath="/learn/pointers" />
    </div>
  );
}
