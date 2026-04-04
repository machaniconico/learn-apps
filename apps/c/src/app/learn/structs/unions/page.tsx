import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function UnionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">共用体（union）</h1>
        <p className="text-gray-400">union定義、共有メモリ、タグ付き共用体を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">共用体とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          共用体（union）は全メンバが同じメモリ領域を共有する特殊な型です。
          一度に有効なメンバは1つだけで、サイズは最も大きいメンバのサイズになります。
          異なる型として同じメモリを解釈したい場合に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">union</code> キーワードで定義</li>
          <li>全メンバが同じアドレスに配置される</li>
          <li>サイズは最大メンバのサイズ</li>
          <li>タグ付き共用体で安全に使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な union</h2>
        <p className="text-gray-400 mb-4">
          共用体の全メンバは同じメモリ領域を共有します。一方を変更すると他のメンバの値も変わります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

union Data {
    int i;
    float f;
    unsigned char bytes[4];
};

int main() {
    union Data d;
    printf("sizeof(union Data) = %zu\\n", sizeof(d));

    d.i = 0x41424344;
    printf("int: %d\\n", d.i);
    printf("bytes: %c %c %c %c\\n",
        d.bytes[3], d.bytes[2], d.bytes[1], d.bytes[0]);

    d.f = 3.14f;
    printf("float: %.2f\\n", d.f);

    return 0;
}`}
          expectedOutput={`sizeof(union Data) = 4
int: 1094861636
bytes: A B C D
float: 3.14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タグ付き共用体</h2>
        <p className="text-gray-400 mb-4">
          構造体に型タグと共用体を組み合わせた「タグ付き共用体」で安全に型を判別できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef enum { INT_VAL, FLOAT_VAL, STR_VAL } ValueType;

typedef struct {
    ValueType type;
    union {
        int i;
        float f;
        char s[32];
    } data;
} Value;

void printValue(Value v) {
    switch (v.type) {
        case INT_VAL:   printf("int: %d\\n", v.data.i); break;
        case FLOAT_VAL: printf("float: %.2f\\n", v.data.f); break;
        case STR_VAL:   printf("str: %s\\n", v.data.s); break;
    }
}

int main() {
    Value a = {INT_VAL,   {.i = 42}};
    Value b = {FLOAT_VAL, {.f = 3.14f}};

    printValue(a);
    printValue(b);

    return 0;
}`}
          expectedOutput={`int: 42
float: 3.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="unions" />
      </div>
      <LessonNav lessons={lessons} currentId="unions" basePath="/learn/structs" />
    </div>
  );
}
