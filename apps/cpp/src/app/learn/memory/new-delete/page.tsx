import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function NewDeletePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">new・delete</h1>
        <p className="text-gray-400">動的メモリの確保（new）と解放（delete）の基本を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">newによるメモリ確保</h2>
        <p className="text-gray-400 mb-4">
          new演算子はヒープ上にメモリを確保し、そのアドレスを返します。
          単一オブジェクト用のnewと配列用のnew[]があります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 単一オブジェクトの確保
    int* pInt = new int(42);
    double* pDouble = new double(3.14);

    cout << "int: " << *pInt << endl;
    cout << "double: " << *pDouble << endl;

    // 配列の確保
    int* arr = new int[5]{10, 20, 30, 40, 50};
    cout << "配列: ";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    delete pInt;
    delete pDouble;
    delete[] arr;

    return 0;
}`}
          expectedOutput={`int: 42
double: 3.14
配列: 10 20 30 40 50`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deleteによるメモリ解放</h2>
        <p className="text-gray-400 mb-4">
          newで確保したメモリは必ずdeleteで解放します。配列はdelete[]を使います。
          deleteとdelete[]を間違えると未定義動作になります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {
        cout << "Point(" << x << ", " << y << ") 構築" << endl;
    }
    ~Point() {
        cout << "Point(" << x << ", " << y << ") 破棄" << endl;
    }
};

int main() {
    // 単一オブジェクト
    Point* p = new Point(1.0, 2.0);
    cout << "座標: (" << p->x << ", " << p->y << ")" << endl;
    delete p;  // デストラクタが呼ばれる

    cout << "---" << endl;

    // 配列
    Point* arr = new Point[2]{{3.0, 4.0}, {5.0, 6.0}};
    delete[] arr;  // 全要素のデストラクタが呼ばれる

    return 0;
}`}
          expectedOutput={`Point(1, 2) 構築
座標: (1, 2)
Point(1, 2) 破棄
---
Point(3, 4) 構築
Point(5, 6) 構築
Point(5, 6) 破棄
Point(3, 4) 破棄`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nothrow版new</h2>
        <p className="text-gray-400 mb-4">
          通常のnewはメモリ確保に失敗するとstd::bad_alloc例外を投げますが、
          nothrow版はnullptrを返します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <new>
using namespace std;

int main() {
    // nothrow版: 失敗時にnullptrを返す
    int* p = new(nothrow) int(100);
    if (p != nullptr) {
        cout << "確保成功: " << *p << endl;
        delete p;
    } else {
        cout << "確保失敗" << endl;
    }

    // 通常の確保（小さいサイズなので成功する）
    int* arr = new(nothrow) int[3]{1, 2, 3};
    if (arr) {
        cout << "配列: " << arr[0] << ", " << arr[1] << ", " << arr[2] << endl;
        delete[] arr;
    }

    cout << "nothrow版は安全にエラー処理できる" << endl;
    return 0;
}`}
          expectedOutput={`確保成功: 100
配列: 1, 2, 3
nothrow版は安全にエラー処理できる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="new-delete" />
      </div>
      <LessonNav lessons={lessons} currentId="new-delete" basePath="/learn/memory" />
    </div>
  );
}
