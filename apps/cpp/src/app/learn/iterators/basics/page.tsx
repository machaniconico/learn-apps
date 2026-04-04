import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function IteratorBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">イテレータの基本</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        イテレータはコンテナの要素を指し示すポインタのようなオブジェクトです。
        begin()で先頭、end()で末尾の次の位置を取得し、++で次の要素へ進み、*でデリファレンスします。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">begin/endの基本</h2>
        <p className="text-gray-400 mb-4">
          すべてのSTLコンテナはbegin()とend()メンバ関数を持ち、イテレータの範囲を定義します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // イテレータで走査
    cout << "走査: ";
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    // cbegin/cendはconst版
    cout << "const走査: ";
    for (auto it = v.cbegin(); it != v.cend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    // イテレータで値を変更
    *v.begin() = 100;
    cout << "先頭変更後: " << v[0] << endl;

    return 0;
}`}
          expectedOutput={`走査: 10 20 30 40 50
const走査: 10 20 30 40 50
先頭変更後: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イテレータの操作</h2>
        <p className="text-gray-400 mb-4">
          advance、distance、nextなどのユーティリティ関数でイテレータを操作できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <iterator>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // next: n個先のイテレータを取得
    auto it = next(v.begin(), 2);
    cout << "3番目: " << *it << endl;

    // prev: n個前のイテレータを取得
    auto it2 = prev(v.end(), 1);
    cout << "最後: " << *it2 << endl;

    // distance: 2つのイテレータ間の距離
    cout << "距離: " << distance(v.begin(), v.end()) << endl;

    // advance: イテレータを進める
    auto it3 = v.begin();
    advance(it3, 3);
    cout << "3つ進めた: " << *it3 << endl;

    return 0;
}`}
          expectedOutput={`3番目: 30
最後: 50
距離: 5
3つ進めた: 40`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々なコンテナのイテレータ</h2>
        <p className="text-gray-400 mb-4">
          vector、map、setなど、すべてのSTLコンテナで同じイテレータインターフェースが使えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <map>
#include <set>
using namespace std;

int main() {
    // vectorのイテレータ
    vector<string> fruits = {"りんご", "バナナ", "みかん"};
    cout << "vector: ";
    for (auto it = fruits.begin(); it != fruits.end(); ++it)
        cout << *it << " ";
    cout << endl;

    // mapのイテレータ（pair）
    map<string, int> scores = {{"太郎", 90}, {"花子", 85}};
    cout << "map: ";
    for (auto it = scores.begin(); it != scores.end(); ++it)
        cout << it->first << "=" << it->second << " ";
    cout << endl;

    // setのイテレータ
    set<int> s = {3, 1, 4, 1, 5};
    cout << "set: ";
    for (auto it = s.begin(); it != s.end(); ++it)
        cout << *it << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`vector: りんご バナナ みかん
map: 太郎=90 花子=85
set: 1 3 4 5`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="basics" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/iterators" />
    </div>
  );
}
