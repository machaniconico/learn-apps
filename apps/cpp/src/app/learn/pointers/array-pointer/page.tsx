import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function ArrayPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列とポインタ</h1>
        <p className="text-gray-400">配列名とポインタの関係</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列名はポインタに変換される</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++では配列名はほとんどの文脈で「先頭要素へのポインタ」に暗黙変換されます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">arr[i]</code> は
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*(arr + i)</code> と等価です。
          ただし <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof</code> や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&amp;</code> の対象としては配列のまま扱われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列名とポインタの等価性</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};

    // arr は &arr[0] と同じ
    cout << "arr     = " << arr << endl;
    cout << "&arr[0] = " << &arr[0] << endl;
    cout << "同じ？ " << (arr == &arr[0] ? "Yes" : "No") << endl;
    cout << endl;

    // arr[i] と *(arr + i) は等価
    for (int i = 0; i < 5; i++) {
        cout << "arr[" << i << "]=" << arr[i]
             << "  *(arr+" << i << ")=" << *(arr + i) << endl;
    }
    cout << endl;

    // sizeof の違い
    int* ptr = arr;
    cout << "sizeof(arr) = " << sizeof(arr) << " bytes (配列全体)" << endl;
    cout << "sizeof(ptr) = " << sizeof(ptr) << " bytes (ポインタ)" << endl;

    return 0;
}`}
          expectedOutput={`arr     = 0x7ffd...
&arr[0] = 0x7ffd...
同じ？ Yes

arr[0]=10  *(arr+0)=10
arr[1]=20  *(arr+1)=20
arr[2]=30  *(arr+2)=30
arr[3]=40  *(arr+3)=40
arr[4]=50  *(arr+4)=50

sizeof(arr) = 20 bytes (配列全体)
sizeof(ptr) = 8 bytes (ポインタ)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数に配列を渡す</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

// 配列を受け取る関数（実際にはポインタとして渡される）
void printArray(int arr[], int size) {
    // sizeof(arr) はポインタサイズになる点に注意
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// ポインタで受け取っても同じ
void doubleArray(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // 元の配列が変更される
    }
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    int size = sizeof(nums) / sizeof(nums[0]);

    cout << "元の配列: ";
    printArray(nums, size);

    doubleArray(nums, size);
    cout << "2倍後: ";
    printArray(nums, size);

    return 0;
}`}
          expectedOutput={`元の配列: 1 2 3 4 5
2倍後: 2 4 6 8 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="array-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="array-pointer" basePath="/learn/pointers" />
    </div>
  );
}
