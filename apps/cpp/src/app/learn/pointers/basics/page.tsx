import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointersBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタの基本</h1>
        <p className="text-gray-400">アドレスとポインタ変数の基礎を学ぶ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタとは、メモリ上のアドレスを格納する変数です。
          C++では変数がメモリ上に配置され、それぞれ固有のアドレスを持ちます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&amp;</code> 演算子で変数のアドレスを取得し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> を使ってポインタ型の変数を宣言します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          ポインタ変数の型は「指す先の型」に <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> を付けたものです。
          例えば <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int*</code> は「int型の値が格納されたアドレスを持つポインタ」です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの宣言とアドレス取得</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 42;
    double y = 3.14;

    // ポインタの宣言とアドレス代入
    int* px = &x;
    double* py = &y;

    cout << "x の値: " << x << endl;
    cout << "x のアドレス (&x): " << &x << endl;
    cout << "px の値 (xのアドレス): " << px << endl;
    cout << endl;
    cout << "y の値: " << y << endl;
    cout << "y のアドレス (&y): " << &y << endl;
    cout << "py の値 (yのアドレス): " << py << endl;
    cout << endl;

    // ポインタ自身のサイズ（環境依存、通常64bit環境で8バイト）
    cout << "sizeof(px): " << sizeof(px) << " bytes" << endl;
    cout << "sizeof(py): " << sizeof(py) << " bytes" << endl;

    return 0;
}`}
          expectedOutput={`x の値: 42
x のアドレス (&x): 0x7ffd...
px の値 (xのアドレス): 0x7ffd...

y の値: 3.14
y のアドレス (&y): 0x7ffd...
py の値 (yのアドレス): 0x7ffd...

sizeof(px): 8 bytes
sizeof(py): 8 bytes`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ経由で値を変更する</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 20;
    int* ptr = &a;

    cout << "ptr は a を指す: *ptr = " << *ptr << endl;

    *ptr = 50;  // ポインタ経由で a を変更
    cout << "a = " << a << endl;

    ptr = &b;   // ptr の指す先を b に変更
    cout << "ptr は b を指す: *ptr = " << *ptr << endl;

    *ptr = 100;  // ポインタ経由で b を変更
    cout << "b = " << b << endl;

    return 0;
}`}
          expectedOutput={`ptr は a を指す: *ptr = 10
a = 50
ptr は b を指す: *ptr = 20
b = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数にポインタを渡す</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void increment(int* p) {
    (*p)++;  // ポインタ経由で呼び出し元の変数を変更
}

void printArray(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int val = 5;
    cout << "increment前: " << val << endl;
    increment(&val);
    cout << "increment後: " << val << endl;

    int nums[] = {10, 20, 30, 40};
    cout << "配列: ";
    printArray(nums, 4);

    return 0;
}`}
          expectedOutput={`increment前: 5
increment後: 6
配列: 10 20 30 40`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/pointers" />
    </div>
  );
}
