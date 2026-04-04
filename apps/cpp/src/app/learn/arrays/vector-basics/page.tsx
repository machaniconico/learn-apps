import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function VectorBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">vectorの基本</h1>
        <p className="text-gray-400">動的配列std::vectorの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::vectorとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::vector&lt;T&gt;</code> はC++で最もよく使われる動的配列コンテナです。
          要素数を実行時に変更でき、内部的にはヒープ上に連続したメモリを確保します。
          サイズが足りなくなると自動的にメモリを再確保（リアロケーション）します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vectorの作成とアクセス</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 様々な初期化方法
    vector<int> v1;                  // 空のベクター
    vector<int> v2 = {1, 2, 3, 4};  // 初期化リスト
    vector<int> v3(5, 0);           // 5個の0で初期化
    vector<string> v4(3, "hello");  // 3個の"hello"

    // 要素の追加
    v1.push_back(10);
    v1.push_back(20);
    v1.push_back(30);

    // サイズと容量
    cout << "v1 size: " << v1.size() << endl;
    cout << "v1 capacity: " << v1.capacity() << endl;
    cout << "v1 empty: " << (v1.empty() ? "Yes" : "No") << endl;

    // アクセス方法
    cout << "v2[0] = " << v2[0] << endl;
    cout << "v2.at(1) = " << v2.at(1) << endl;
    cout << "v2.front() = " << v2.front() << endl;
    cout << "v2.back() = " << v2.back() << endl;

    // 範囲for
    cout << "v3: ";
    for (int x : v3) cout << x << " ";
    cout << endl;

    cout << "v4: ";
    for (const auto& s : v4) cout << s << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`v1 size: 3
v1 capacity: 4
v1 empty: No
v2[0] = 1
v2.at(1) = 2
v2.front() = 1
v2.back() = 4
v3: 0 0 0 0 0
v4: hello hello hello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sizeとcapacityの関係</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    cout << "初期 size=" << v.size()
         << " capacity=" << v.capacity() << endl;

    for (int i = 1; i <= 10; i++) {
        v.push_back(i);
        cout << "push_back(" << i << ") size=" << v.size()
             << " capacity=" << v.capacity() << endl;
    }

    // reserve で事前にメモリ確保
    vector<int> v2;
    v2.reserve(100);
    cout << "\nreserve(100) 後: size=" << v2.size()
         << " capacity=" << v2.capacity() << endl;

    // shrink_to_fit で余剰メモリを解放
    v.shrink_to_fit();
    cout << "shrink_to_fit 後: size=" << v.size()
         << " capacity=" << v.capacity() << endl;

    return 0;
}`}
          expectedOutput={`初期 size=0 capacity=0
push_back(1) size=1 capacity=1
push_back(2) size=2 capacity=2
push_back(3) size=3 capacity=4
push_back(4) size=4 capacity=4
push_back(5) size=5 capacity=8
push_back(6) size=6 capacity=8
push_back(7) size=7 capacity=8
push_back(8) size=8 capacity=8
push_back(9) size=9 capacity=16
push_back(10) size=10 capacity=16

reserve(100) 後: size=0 capacity=100
shrink_to_fit 後: size=10 capacity=10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="vector-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="vector-basics" basePath="/learn/arrays" />
    </div>
  );
}
