import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function StdArrayPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::array</h1>
        <p className="text-gray-400">固定サイズの安全な配列コンテナ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::arrayとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::array&lt;T, N&gt;</code> はC++11で導入された固定サイズ配列のラッパーです。
          C配列と同じパフォーマンスを持ちながら、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">size()</code>メソッド、
          境界チェック付きの<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">at()</code>、イテレータなどの機能を提供します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::arrayの基本操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <array>
using namespace std;

int main() {
    // 宣言と初期化
    array<int, 5> arr = {10, 20, 30, 40, 50};

    // サイズ取得
    cout << "サイズ: " << arr.size() << endl;
    cout << "空？: " << (arr.empty() ? "Yes" : "No") << endl;

    // アクセス方法
    cout << "arr[0] = " << arr[0] << endl;         // 境界チェックなし
    cout << "arr.at(1) = " << arr.at(1) << endl;   // 境界チェックあり
    cout << "先頭: " << arr.front() << endl;
    cout << "末尾: " << arr.back() << endl;

    // 範囲for
    cout << "全要素: ";
    for (const auto& x : arr) cout << x << " ";
    cout << endl;

    // fill で全要素を同じ値に
    array<int, 3> zeros;
    zeros.fill(0);
    cout << "zeros: ";
    for (int x : zeros) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`サイズ: 5
空？: No
arr[0] = 10
arr.at(1) = 20
先頭: 10
末尾: 50
全要素: 10 20 30 40 50
zeros: 0 0 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::arrayの比較と関数渡し</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <array>
#include <algorithm>
using namespace std;

// std::arrayは値渡しでサイズ情報を保持
void printArray(const array<int, 4>& arr) {
    cout << "size=" << arr.size() << ": ";
    for (int x : arr) cout << x << " ";
    cout << endl;
}

int main() {
    array<int, 4> a = {3, 1, 4, 1};
    array<int, 4> b = {3, 1, 4, 1};
    array<int, 4> c = {2, 7, 1, 8};

    // 比較演算子が使える
    cout << "a == b ? " << (a == b ? "Yes" : "No") << endl;
    cout << "a == c ? " << (a == c ? "Yes" : "No") << endl;
    cout << "a < c  ? " << (a < c ? "Yes" : "No") << endl;

    // ソート
    sort(a.begin(), a.end());
    cout << "ソート後: ";
    printArray(a);

    // data()で内部配列へのポインタ取得
    int* ptr = a.data();
    cout << "ptr[0] = " << ptr[0] << endl;

    return 0;
}`}
          expectedOutput={`a == b ? Yes
a == c ? No
a < c  ? No
ソート後: size=4: 1 1 3 4
ptr[0] = 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="std-array" />
      </div>
      <LessonNav lessons={lessons} currentId="std-array" basePath="/learn/arrays" />
    </div>
  );
}
