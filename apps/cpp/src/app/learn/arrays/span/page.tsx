import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SpanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::span</h1>
        <p className="text-gray-400">メモリの連続範囲への非所有ビュー</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::spanとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::span&lt;T&gt;</code>（C++20）は連続メモリ領域への非所有ビューです。
          C配列・<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::array</code>・
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::vector</code> など、
          メモリが連続するあらゆるコンテナを統一的な方法で参照できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          spanはメモリを所有しないため、コピーコストは「ポインタ+サイズ」のみで非常に軽量です。
          関数の引数として「配列的なもの」を受け取る汎用的なインターフェースを提供します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">spanの基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <span>
#include <vector>
#include <array>
using namespace std;

// span を使えば配列の種類を問わない関数が書ける
void printSpan(span<const int> s) {
    cout << "size=" << s.size() << ": ";
    for (int x : s) cout << x << " ";
    cout << endl;
}

int main() {
    // C配列
    int cArr[] = {1, 2, 3};
    printSpan(cArr);

    // std::array
    array<int, 4> stdArr = {10, 20, 30, 40};
    printSpan(stdArr);

    // std::vector
    vector<int> vec = {100, 200, 300, 400, 500};
    printSpan(vec);

    // span の基本操作
    span<int> sp(vec);
    cout << "front: " << sp.front() << endl;
    cout << "back: " << sp.back() << endl;
    cout << "sp[2]: " << sp[2] << endl;
    cout << "empty: " << (sp.empty() ? "Yes" : "No") << endl;

    return 0;
}`}
          expectedOutput={`size=3: 1 2 3
size=4: 10 20 30 40
size=5: 100 200 300 400 500
front: 100
back: 500
sp[2]: 300
empty: No`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">部分ビューと書き込み</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <span>
#include <vector>
using namespace std;

void doubleValues(span<int> s) {
    for (int& x : s) {
        x *= 2;  // span経由で元のデータを変更できる
    }
}

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    span<int> sp(v);

    // first / last で部分ビュー
    cout << "先頭3つ: ";
    for (int x : sp.first(3)) cout << x << " ";
    cout << endl;

    cout << "末尾3つ: ";
    for (int x : sp.last(3)) cout << x << " ";
    cout << endl;

    // subspan(offset, count) で範囲指定
    cout << "中央部分 [2,5): ";
    for (int x : sp.subspan(2, 3)) cout << x << " ";
    cout << endl;

    // span経由で元のvectorを変更
    doubleValues(sp.first(4));
    cout << "先頭4つを2倍後: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`先頭3つ: 1 2 3
末尾3つ: 6 7 8
中央部分 [2,5): 3 4 5
先頭4つを2倍後: 2 4 6 8 5 6 7 8`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="span" />
      </div>
      <LessonNav lessons={lessons} currentId="span" basePath="/learn/arrays" />
    </div>
  );
}
