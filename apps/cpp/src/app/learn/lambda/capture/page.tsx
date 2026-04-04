import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function CapturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ラムダ・関数オブジェクト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">キャプチャ</h1>
        <p className="text-gray-400">ラムダ式での変数キャプチャ方法（値・参照）を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値キャプチャと参照キャプチャ</h2>
        <p className="text-gray-400 mb-4">
          [=]で値キャプチャ（コピー）、[&]で参照キャプチャを行います。
          個別に指定することもできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 20;

    // 値キャプチャ: コピーされる
    auto byValue = [x, y]() {
        cout << "値: x=" << x << ", y=" << y << endl;
    };

    // 参照キャプチャ: 元の変数を参照
    auto byRef = [&x, &y]() {
        x += 100;
        y += 200;
    };

    byValue();       // x=10, y=20
    byRef();         // x, yを変更
    cout << "変更後: x=" << x << ", y=" << y << endl;
    byValue();       // コピーなので元の値のまま

    return 0;
}`}
          expectedOutput={`値: x=10, y=20
変更後: x=110, y=220
値: x=10, y=20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトキャプチャ</h2>
        <p className="text-gray-400 mb-4">
          [=]はすべての変数を値で、[&]はすべてを参照でキャプチャします。
          個別指定と組み合わせることもできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int a = 1, b = 2, c = 3;

    // [=]: 全て値キャプチャ
    auto allByValue = [=]() {
        cout << "a=" << a << ", b=" << b << ", c=" << c << endl;
    };
    allByValue();

    // [&]: 全て参照キャプチャ
    auto allByRef = [&]() {
        a *= 10; b *= 10; c *= 10;
    };
    allByRef();
    cout << "10倍: a=" << a << ", b=" << b << ", c=" << c << endl;

    // [=, &c]: cだけ参照、他は値
    auto mixed = [=, &c]() {
        // a, bはコピー（変更不可）
        c = a + b;  // cだけ変更可能
    };
    mixed();
    cout << "混合キャプチャ後: c=" << c << endl;

    return 0;
}`}
          expectedOutput={`a=1, b=2, c=3
10倍: a=10, b=20, c=30
混合キャプチャ後: c=30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mutableラムダ</h2>
        <p className="text-gray-400 mb-4">
          値キャプチャした変数はデフォルトでconstです。mutableを付けるとラムダ内でコピーを変更できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int counter = 0;

    // mutableで値キャプチャのコピーを変更可能に
    auto increment = [counter]() mutable {
        counter++;
        cout << "ラムダ内: " << counter << endl;
    };

    increment();  // 1
    increment();  // 2
    increment();  // 3
    cout << "元の変数: " << counter << endl;  // 0（コピーなので変わらない）

    return 0;
}`}
          expectedOutput={`ラムダ内: 1
ラムダ内: 2
ラムダ内: 3
元の変数: 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="capture" />
      </div>
      <LessonNav lessons={lessons} currentId="capture" basePath="/learn/lambda" />
    </div>
  );
}
