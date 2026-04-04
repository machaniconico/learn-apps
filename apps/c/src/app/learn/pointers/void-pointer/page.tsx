import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function VoidPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタ レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">voidポインタ</h1>
        <p className="text-gray-400">型なし汎用ポインタvoid*とキャストによる使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">void*とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">void *</code> は型情報を持たない汎用ポインタです。
          任意の型のポインタを代入できますが、デリファレンスするには明示的な型キャストが必要です。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">malloc()</code> の戻り値型として使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>任意の型のポインタを代入できる（キャスト不要）</li>
          <li>デリファレンスにはキャストが必要: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*(int*)vp</code></li>
          <li>ポインタ演算はできない（型サイズが不明なため）</li>
          <li>汎用的なデータ構造・アルゴリズムの実装に使われる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">void*の基本操作</h2>
        <p className="text-gray-400 mb-4">
          任意の型のポインタを <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">void*</code> に代入し、
          使用時にキャストして元の型に戻します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int   i = 42;
    double d = 3.14;
    char  c = 'A';

    void *vp;

    // 任意の型を代入できる
    vp = &i;
    printf("int:    %d\\n", *(int*)vp);

    vp = &d;
    printf("double: %.2f\\n", *(double*)vp);

    vp = &c;
    printf("char:   %c\\n", *(char*)vp);

    return 0;
}`}
          expectedOutput={`int:    42
double: 3.14
char:   A`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">汎用の値表示関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">void*</code> と型を示す列挙型を組み合わせると、
          任意の型を扱う汎用関数が作れます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef enum { TYPE_INT, TYPE_DOUBLE, TYPE_CHAR } DataType;

void print_value(void *ptr, DataType type) {
    switch (type) {
        case TYPE_INT:
            printf("int: %d\\n", *(int*)ptr);
            break;
        case TYPE_DOUBLE:
            printf("double: %.2f\\n", *(double*)ptr);
            break;
        case TYPE_CHAR:
            printf("char: %c\\n", *(char*)ptr);
            break;
    }
}

int main() {
    int    n = 100;
    double x = 2.718;
    char   ch = 'Z';

    print_value(&n,  TYPE_INT);
    print_value(&x,  TYPE_DOUBLE);
    print_value(&ch, TYPE_CHAR);

    return 0;
}`}
          expectedOutput={`int: 100
double: 2.72
char: Z`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="void-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="void-pointer" basePath="/learn/pointers" />
    </div>
  );
}
