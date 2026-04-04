import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointerToPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタのポインタ</h1>
        <p className="text-gray-400">二重ポインタの仕組みと使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">二重ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタのポインタ（二重ポインタ）は、別のポインタ変数のアドレスを格納するポインタです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int**</code> のように <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> を2つ付けて宣言します。
          関数内でポインタ自体を変更したい場合や、動的な2次元配列を扱う場合に使われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な二重ポインタ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;    // x を指すポインタ
    int** pptr = &ptr; // ptr を指すポインタのポインタ

    cout << "x の値:       " << x << endl;
    cout << "*ptr の値:     " << *ptr << endl;
    cout << "**pptr の値:   " << **pptr << endl;
    cout << endl;

    cout << "x のアドレス:    " << &x << endl;
    cout << "ptr の値:       " << ptr << endl;
    cout << "*pptr の値:     " << *pptr << endl;
    cout << endl;

    // 二重ポインタ経由で値を変更
    **pptr = 100;
    cout << "変更後の x: " << x << endl;

    return 0;
}`}
          expectedOutput={`x の値:       42
*ptr の値:     42
**pptr の値:   42

x のアドレス:    0x7ffd...
ptr の値:       0x7ffd...
*pptr の値:     0x7ffd...

変更後の x: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数でポインタ自体を変更する</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void findMax(int* arr, int size, int** result) {
    *result = &arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > **result) {
            *result = &arr[i];  // ポインタの指す先を変更
        }
    }
}

int main() {
    int nums[] = {3, 7, 1, 9, 4};
    int* maxPtr = nullptr;

    findMax(nums, 5, &maxPtr);

    cout << "最大値: " << *maxPtr << endl;
    cout << "インデックス: " << (maxPtr - nums) << endl;

    // 文字列配列（ポインタの配列）
    const char* words[] = {"Hello", "World", "C++"};
    const char** wp = words;
    for (int i = 0; i < 3; i++) {
        cout << wp[i] << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`最大値: 9
インデックス: 3
Hello World C++`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="pointer-to-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-to-pointer" basePath="/learn/pointers" />
    </div>
  );
}
