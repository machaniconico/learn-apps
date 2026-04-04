import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function ArrayPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列とポインタ</h1>
        <p className="text-gray-400">配列名がポインタに減衰する仕組みとarr[i]と*(arr+i)の等価性を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列名とポインタの関係</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語では、配列名は式の中で使われると自動的に先頭要素へのポインタに<strong className="text-teal-400">減衰（decay）</strong>します。
          これにより配列とポインタは密接な関係を持ちます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">arr</code> と <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&arr[0]</code> は同じアドレス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">arr[i]</code> と <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*(arr+i)</code> は完全に同じ意味</li>
          <li>例外: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(arr)</code> は配列全体のサイズ（ポインタのサイズではない）</li>
          <li>例外: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&arr</code> は配列全体へのポインタ（型が異なる）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">arr[i] と *(arr+i) の等価性</h2>
        <p className="text-gray-400 mb-4">
          配列アクセス構文 <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">arr[i]</code> はコンパイラ内部で
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">*(arr+i)</code> に変換されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};

    // 3通りの書き方は全て同じ
    printf("arr[2]      = %d\\n", arr[2]);
    printf("*(arr+2)    = %d\\n", *(arr + 2));
    printf("*(2+arr)    = %d\\n", *(2 + arr));   // 加算は交換可能
    printf("2[arr]      = %d\\n", 2[arr]);        // 面白い書き方（非推奨）

    // ポインタを使って同様に
    int *p = arr;
    printf("p[2]        = %d\\n", p[2]);
    printf("*(p+2)      = %d\\n", *(p + 2));

    return 0;
}`}
          expectedOutput={`arr[2]      = 30
*(arr+2)    = 30
*(2+arr)    = 30
2[arr]      = 30
p[2]        = 30
*(p+2)      = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のサイズとポインタのサイズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> を使うと配列とポインタの違いがわかります。
          関数に渡された配列はポインタになるため、サイズを別途渡す必要があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void print_info(int *p, int size) {
    printf("関数内 sizeof(p) = %zu (ポインタのサイズ)\\n", sizeof(p));
    printf("要素数（引数から）= %d\\n", size);
}

int main() {
    int arr[10] = {0};

    printf("sizeof(arr) = %zu (配列全体)\\n", sizeof(arr));
    printf("要素数 = %zu\\n", sizeof(arr) / sizeof(arr[0]));

    // 配列を関数に渡すとポインタに減衰
    print_info(arr, (int)(sizeof(arr) / sizeof(arr[0])));

    return 0;
}`}
          expectedOutput={`sizeof(arr) = 40 (配列全体)
要素数 = 10
関数内 sizeof(p) = 8 (ポインタのサイズ)
要素数（引数から）= 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="array-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="array-pointer" basePath="/learn/pointers" />
    </div>
  );
}
