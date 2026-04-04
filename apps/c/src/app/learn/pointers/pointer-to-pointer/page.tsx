import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointerToPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタのポインタ</h1>
        <p className="text-gray-400">int **ppの仕組みと2次元配列・関数引数での活用例を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">二重ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタ変数自体もメモリ上のアドレスを持ちます。そのアドレスを格納するポインタが
          <strong className="text-teal-400">ポインタのポインタ（二重ポインタ）</strong>です。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int **pp</code> と宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int x = 5;</code> → xはint値</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *p = &x;</code> → pはxのアドレス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int **pp = &p;</code> → ppはpのアドレス</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">**pp</code> → xの値（二重デリファレンス）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二重ポインタの基本</h2>
        <p className="text-gray-400 mb-4">
          3段階のアドレス・値の関係を確認してみましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;    // xへのポインタ
    int **pp = &p;  // pへのポインタ

    printf("x    = %d\\n", x);
    printf("*p   = %d\\n", *p);
    printf("**pp = %d\\n", **pp);

    // ppから値を変更
    **pp = 100;
    printf("変更後: x = %d\\n", x);

    printf("\\nアドレスの確認:\\n");
    printf("&x  = %p\\n", (void*)&x);
    printf("p   = %p\\n", (void*)p);
    printf("*pp = %p\\n", (void*)*pp);

    return 0;
}`}
          expectedOutput={`x    = 42
*p   = 42
**pp = 42
変更後: x = 100

アドレスの確認:
&x  = 0x7ffd...（環境依存）
p   = 0x7ffd...（環境依存）
*pp = 0x7ffd...（環境依存）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数内でポインタを変更する</h2>
        <p className="text-gray-400 mb-4">
          関数の引数でポインタ変数自体を変更するには、そのポインタのアドレス（二重ポインタ）を渡します。
          動的メモリ確保でよく使われるパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void init_pointer(int **pp, int *target) {
    *pp = target;   // ポインタの指す先を変更
}

int main() {
    int a = 10, b = 20;
    int *p = &a;

    printf("変更前: *p = %d\\n", *p);

    init_pointer(&p, &b);   // pをbへ向ける

    printf("変更後: *p = %d\\n", *p);

    return 0;
}`}
          expectedOutput={`変更前: *p = 10
変更後: *p = 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列配列と二重ポインタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">char **argv</code> はコマンドライン引数の型です。
          文字列（charへのポインタ）の配列をchar**で表せます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void print_strings(char **strs, int count) {
    for (int i = 0; i < count; i++) {
        printf("[%d] %s\\n", i, strs[i]);
    }
}

int main() {
    const char *names[] = {"Alice", "Bob", "Charlie"};
    // const char** として渡す
    print_strings((char **)names, 3);

    return 0;
}`}
          expectedOutput={`[0] Alice
[1] Bob
[2] Charlie`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="pointer-to-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-to-pointer" basePath="/learn/pointers" />
    </div>
  );
}
