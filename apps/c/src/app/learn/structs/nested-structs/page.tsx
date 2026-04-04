import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function NestedStructsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストした構造体</h1>
        <p className="text-gray-400">構造体の中に構造体を入れる方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストした構造体とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体のメンバとして別の構造体を持つことができます。
          これにより複雑なデータ構造を階層的に表現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>メンバの型として別の構造体を指定できる</li>
          <li>アクセスは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">outer.inner.member</code> とドットを連結</li>
          <li>初期化子リストもネストできる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なネスト</h2>
        <p className="text-gray-400 mb-4">
          座標を表す <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Point</code> を <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Rectangle</code> にネストします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Point {
    int x;
    int y;
};

struct Rectangle {
    struct Point topLeft;
    struct Point bottomRight;
};

int main() {
    struct Rectangle rect = {
        {10, 20},   // topLeft
        {100, 80},  // bottomRight
    };

    printf("左上: (%d, %d)\\n", rect.topLeft.x, rect.topLeft.y);
    printf("右下: (%d, %d)\\n", rect.bottomRight.x, rect.bottomRight.y);

    int width  = rect.bottomRight.x - rect.topLeft.x;
    int height = rect.bottomRight.y - rect.topLeft.y;
    printf("サイズ: %dx%d\\n", width, height);

    return 0;
}`}
          expectedOutput={`左上: (10, 20)
右下: (100, 80)
サイズ: 90x60`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数レベルのネスト</h2>
        <p className="text-gray-400 mb-4">
          住所を持つ人物情報など、現実のデータ構造を表現できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Address {
    char city[30];
    char country[20];
};

struct Person {
    char name[30];
    int age;
    struct Address address;
};

int main() {
    struct Person p = {
        "Alice",
        28,
        {"Tokyo", "Japan"},
    };

    printf("名前: %s\\n", p.name);
    printf("年齢: %d\\n", p.age);
    printf("都市: %s\\n", p.address.city);
    printf("国: %s\\n", p.address.country);

    return 0;
}`}
          expectedOutput={`名前: Alice
年齢: 28
都市: Tokyo
国: Japan`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">指示付き初期化子でのネスト</h2>
        <p className="text-gray-400 mb-4">
          C99の指示付き初期化子はネストした構造体にも使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Color {
    unsigned char r, g, b;
};

struct Pixel {
    int x;
    int y;
    struct Color color;
};

int main() {
    struct Pixel px = {
        .x = 100,
        .y = 200,
        .color = {.r = 255, .g = 128, .b = 0},
    };

    printf("位置: (%d, %d)\\n", px.x, px.y);
    printf("色: rgb(%d, %d, %d)\\n", px.color.r, px.color.g, px.color.b);

    return 0;
}`}
          expectedOutput={`位置: (100, 200)
色: rgb(255, 128, 0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="nested-structs" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-structs" basePath="/learn/structs" />
    </div>
  );
}
