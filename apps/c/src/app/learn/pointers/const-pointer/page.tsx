import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function ConstPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">constとポインタ</h1>
        <p className="text-gray-400">const int*・int* const・const int* constの3つのパターンの違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">3つのconstパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          constの位置によって何が変更不可になるかが変わります。
          「<strong className="text-teal-400">*の左のconst</strong>」はポイント先、「<strong className="text-teal-400">*の右のconst</strong>」はポインタ自体を固定します。
        </p>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-start gap-3 p-2 rounded bg-gray-800">
            <code className="text-teal-400 shrink-0">const int *p</code>
            <span className="text-gray-400">— ポイント先が変更不可（ポインタは変更可）</span>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-gray-800">
            <code className="text-teal-400 shrink-0">int * const p</code>
            <span className="text-gray-400">— ポインタが変更不可（ポイント先は変更可）</span>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-gray-800">
            <code className="text-teal-400 shrink-0">const int * const p</code>
            <span className="text-gray-400">— ポイント先もポインタも変更不可</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const int * — ポイント先が定数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">const int *p</code> はポイント先の値を変更できません。
          ただしポインタ自体は別のアドレスを指せます。関数引数でよく使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// const int*：読み取り専用として配列を受け取る
void print_array(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0;  // コンパイルエラー！
    }
    printf("\\n");
}

int main() {
    int a = 10, b = 20;
    const int *p = &a;

    printf("*p = %d\\n", *p);
    // *p = 99;  // コンパイルエラー！ポイント先は変更不可
    p = &b;     // ポインタ自体は変更可
    printf("*p = %d\\n", *p);

    int data[] = {1, 2, 3, 4, 5};
    print_array(data, 5);

    return 0;
}`}
          expectedOutput={`*p = 10
*p = 20
1 2 3 4 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">int * const — ポインタ自体が定数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int * const p</code> はポインタを別のアドレスに変更できません。
          ただしポイント先の値は変更できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 10, y = 20;
    int * const p = &x;  // 初期化が必須

    printf("*p = %d\\n", *p);
    *p = 99;    // ポイント先は変更可
    printf("*p = %d, x = %d\\n", *p, x);

    // p = &y;  // コンパイルエラー！ポインタ自体は変更不可

    // const int * const: 完全に読み取り専用
    const int * const cp = &x;
    printf("*cp = %d\\n", *cp);
    // *cp = 1;  // エラー
    // cp = &y;  // エラー

    return 0;
}`}
          expectedOutput={`*p = 10
*p = 99, x = 99
*cp = 99`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="const-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="const-pointer" basePath="/learn/pointers" />
    </div>
  );
}
