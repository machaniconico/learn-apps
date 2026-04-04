import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function StructBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体の基本</h1>
        <p className="text-gray-400">struct定義と初期化の基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体（struct）は異なる型の複数のデータをひとまとめにしたユーザー定義型です。
          関連するデータを一つの単位として扱えるため、コードの整理と可読性が向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct 名前 {"{ ... };"}</code> で構造体型を定義</li>
          <li>メンバ変数には任意の型を使用可能</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct 名前 変数名;</code> で変数を宣言</li>
          <li>初期化子リスト <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{"{ }"}</code> で一括初期化可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な構造体定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct Person</code> で人物情報をまとめた構造体を定義します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Person {
    char name[50];
    int age;
    float height;
};

int main() {
    struct Person p1;
    strcpy(p1.name, "Alice");
    p1.age = 30;
    p1.height = 165.5f;

    printf("名前: %s\\n", p1.name);
    printf("年齢: %d\\n", p1.age);
    printf("身長: %.1f cm\\n", p1.height);

    return 0;
}`}
          expectedOutput={`名前: Alice
年齢: 30
身長: 165.5 cm`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">初期化子リストによる初期化</h2>
        <p className="text-gray-400 mb-4">
          宣言と同時に <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{ }"}</code> で初期化できます。メンバの順番に対応します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Rectangle {
    int width;
    int height;
};

int area(struct Rectangle r) {
    return r.width * r.height;
}

int main() {
    struct Rectangle r1 = {10, 5};
    struct Rectangle r2 = {20, 8};

    printf("r1: %dx%d = %d\\n", r1.width, r1.height, area(r1));
    printf("r2: %dx%d = %d\\n", r2.width, r2.height, area(r2));

    return 0;
}`}
          expectedOutput={`r1: 10x5 = 50
r2: 20x8 = 160`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のサイズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> で構造体のメモリサイズを確認できます。アライメントにより各メンバの合計より大きくなることがあります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct A {
    char c;
    int n;
};

struct B {
    int n;
    char c;
};

int main() {
    printf("char: %zu bytes\\n", sizeof(char));
    printf("int:  %zu bytes\\n", sizeof(int));
    printf("struct A: %zu bytes\\n", sizeof(struct A));
    printf("struct B: %zu bytes\\n", sizeof(struct B));

    return 0;
}`}
          expectedOutput={`char: 1 bytes
int:  4 bytes
struct A: 8 bytes
struct B: 8 bytes`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/structs" />
    </div>
  );
}
