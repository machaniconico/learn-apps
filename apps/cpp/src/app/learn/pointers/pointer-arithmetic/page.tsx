import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointerArithmeticPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタ演算</h1>
        <p className="text-gray-400">ポインタの加減算と配列へのアクセス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポインタ演算の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタに整数を加算すると、ポインタが指す型のサイズ分だけアドレスが進みます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int*</code> に +1 すると 4 バイト（int のサイズ）進み、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">double*</code> に +1 すると 8 バイト進みます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          2つのポインタの差を取ると、要素数（距離）が得られます。
          インクリメント <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">++</code> やデクリメント <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">--</code> も使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なポインタ演算</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // 先頭を指す

    cout << "ptr が指す値: " << *ptr << endl;
    cout << "ptr+1 が指す値: " << *(ptr + 1) << endl;
    cout << "ptr+2 が指す値: " << *(ptr + 2) << endl;
    cout << "ptr+4 が指す値: " << *(ptr + 4) << endl;

    // インクリメント
    ptr++;
    cout << "ptr++ 後: " << *ptr << endl;
    ptr += 2;
    cout << "ptr+=2 後: " << *ptr << endl;

    // デクリメント
    ptr--;
    cout << "ptr-- 後: " << *ptr << endl;

    return 0;
}`}
          expectedOutput={`ptr が指す値: 10
ptr+1 が指す値: 20
ptr+2 が指す値: 30
ptr+4 が指す値: 50
ptr++ 後: 20
ptr+=2 後: 40
ptr-- 後: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの差と比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {100, 200, 300, 400, 500};
    int* begin = arr;
    int* end = arr + 5;  // 末尾の次を指す

    // ポインタの差 = 要素数
    cout << "要素数: " << (end - begin) << endl;

    // ポインタの比較でループ
    cout << "全要素: ";
    for (int* p = begin; p < end; p++) {
        cout << *p << " ";
    }
    cout << endl;

    // 逆順
    cout << "逆順: ";
    for (int* p = end - 1; p >= begin; p--) {
        cout << *p << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`要素数: 5
全要素: 100 200 300 400 500
逆順: 500 400 300 200 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="pointer-arithmetic" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-arithmetic" basePath="/learn/pointers" />
    </div>
  );
}
