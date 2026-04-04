import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function ConstPointerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">constとポインタ</h1>
        <p className="text-gray-400">const修飾子とポインタの組み合わせ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">3つのconstパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ポインタと const の組み合わせには3パターンあります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">const int* ptr</code> は「指す先の値を変更できない」、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">int* const ptr</code> は「ポインタ自体を変更できない」、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">const int* const ptr</code> は「両方変更できない」です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          覚え方: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> の左にある const は「指す先」、
          右にある const は「ポインタ自体」を修飾します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pointer to const（指す先がconst）</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int x = 10, y = 20;

    // pointer to const: 指す先の値を変更できない
    const int* ptr = &x;
    // *ptr = 100;  // コンパイルエラー！

    cout << "*ptr = " << *ptr << endl;

    // ポインタ自体は変更できる（別の変数を指せる）
    ptr = &y;
    cout << "*ptr = " << *ptr << " (yを指すように変更)" << endl;

    // 配列の読み取り専用アクセスに便利
    int arr[] = {1, 2, 3, 4, 5};
    const int* p = arr;
    cout << "配列: ";
    for (int i = 0; i < 5; i++) {
        cout << p[i] << " ";
        // p[i] = 0;  // コンパイルエラー！
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`*ptr = 10
*ptr = 20 (yを指すように変更)
配列: 1 2 3 4 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const pointer と const pointer to const</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void printSafe(const int* const arr, int size) {
    // arr も *arr も変更できない（最も安全）
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int x = 10, y = 20;

    // const pointer: ポインタ自体を変更できない
    int* const cptr = &x;
    *cptr = 100;   // OK: 指す先は変更可能
    // cptr = &y;  // コンパイルエラー！ポインタ変更不可
    cout << "x = " << x << endl;

    // const pointer to const: 両方変更不可
    const int* const ccptr = &y;
    // *ccptr = 200;  // コンパイルエラー！
    // ccptr = &x;    // コンパイルエラー！
    cout << "*ccptr = " << *ccptr << endl;

    int nums[] = {5, 10, 15};
    cout << "安全な表示: ";
    printSafe(nums, 3);

    return 0;
}`}
          expectedOutput={`x = 100
*ccptr = 20
安全な表示: 5 10 15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="const-pointer" />
      </div>
      <LessonNav lessons={lessons} currentId="const-pointer" basePath="/learn/pointers" />
    </div>
  );
}
