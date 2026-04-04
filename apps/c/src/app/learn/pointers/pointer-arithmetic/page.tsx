import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointerArithmeticPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタ演算</h1>
        <p className="text-gray-400">p++やp+nでポインタを移動させる演算を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ演算のルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタに整数を加減算すると、その型のサイズ分だけアドレスが移動します。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">p + 1</code> は
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(*p)</code> バイト先のアドレスを指します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">p + n</code> → n要素分進んだアドレス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">p++</code> → 1要素分進める（インクリメント）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">p - q</code> → 2つのポインタ間の要素数</li>
          <li>intポインタで+1: アドレスが4バイト増加（sizeof(int)=4の場合）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタのインクリメントと加算</h2>
        <p className="text-gray-400 mb-4">
          配列の要素をポインタ演算で走査できます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">p++</code> で次の要素に移動します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("p:   アドレス=%p, 値=%d\\n", (void*)p, *p);
    p++;  // 次の要素へ
    printf("p++: アドレス=%p, 値=%d\\n", (void*)p, *p);

    printf("\\nポインタ演算で配列を走査:\\n");
    p = arr;  // 先頭に戻す
    for (int i = 0; i < 5; i++) {
        printf("*(p+%d) = %d\\n", i, *(p + i));
    }

    return 0;
}`}
          expectedOutput={`p:   アドレス=0x7ffd...（環境依存）, 値=10
p++: アドレス=0x7ffd...（環境依存）, 値=20

ポインタ演算で配列を走査:
*(p+0) = 10
*(p+1) = 20
*(p+2) = 30
*(p+3) = 40
*(p+4) = 50`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの減算</h2>
        <p className="text-gray-400 mb-4">
          2つのポインタを減算すると、それらの間の要素数が得られます。
          配列の範囲内のポインタ同士でのみ有効です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int *start = arr;
    int *end = arr + 9;   // 最後の要素

    printf("start: %p\\n", (void*)start);
    printf("end:   %p\\n", (void*)end);
    printf("end - start = %td (要素数)\\n", end - start);

    // ポインタのデクリメント
    int *p = end;
    printf("\\n逆順:");
    while (p >= start) {
        printf(" %d", *p);
        p--;
    }
    printf("\\n");

    return 0;
}`}
          expectedOutput={`start: 0x7ffd...
end:   0x7ffd...
end - start = 9 (要素数)

逆順: 10 9 8 7 6 5 4 3 2 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="pointer-arithmetic" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-arithmetic" basePath="/learn/pointers" />
    </div>
  );
}
