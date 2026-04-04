import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function InitializerListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">初期化子リスト</h1>
        <p className="text-gray-400">std::initializer_listの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::initializer_listとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::initializer_list&lt;T&gt;</code>（C++11）は
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{1, 2, 3}"}</code> のような波括弧初期化リストを受け取るための軽量コンテナです。
          vectorなどのコンテナが <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"= {1, 2, 3}"}</code> で初期化できるのは、
          このinitializer_listを受け取るコンストラクタがあるためです。
        </p>
        <p className="text-gray-300 leading-relaxed">
          自作クラスでもinitializer_listを受け取るコンストラクタや関数を定義すれば、
          同様の波括弧初期化構文をサポートできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">initializer_listの基本</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <initializer_list>
#include <vector>
using namespace std;

// initializer_list を受け取る関数
void printAll(initializer_list<int> list) {
    cout << "要素数: " << list.size() << " → ";
    for (int x : list) {
        cout << x << " ";
    }
    cout << endl;
}

int sum(initializer_list<int> list) {
    int total = 0;
    for (int x : list) total += x;
    return total;
}

int main() {
    // 関数に波括弧リストを渡す
    printAll({10, 20, 30});
    printAll({1, 2, 3, 4, 5});

    cout << "合計: " << sum({1, 2, 3, 4, 5}) << endl;

    // vectorの初期化もinitializer_listを使っている
    vector<int> v = {100, 200, 300};
    cout << "vector: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // auto で受け取るとinitializer_list になる
    auto list = {7, 8, 9};
    cout << "auto list: ";
    for (int x : list) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`要素数: 3 → 10 20 30
要素数: 5 → 1 2 3 4 5
合計: 15
vector: 100 200 300
auto list: 7 8 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自作クラスでの活用</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <initializer_list>
#include <vector>
using namespace std;

class IntSet {
    vector<int> data;
public:
    // initializer_list コンストラクタ
    IntSet(initializer_list<int> list) : data(list) {
        cout << "IntSet構築: " << data.size() << "要素" << endl;
    }

    // initializer_list で代入
    IntSet& operator=(initializer_list<int> list) {
        data.assign(list);
        return *this;
    }

    bool contains(int value) const {
        for (int x : data) {
            if (x == value) return true;
        }
        return false;
    }

    void print() const {
        cout << "{ ";
        for (int x : data) cout << x << " ";
        cout << "}" << endl;
    }
};

int main() {
    // 波括弧で初期化
    IntSet s1 = {3, 1, 4, 1, 5};
    s1.print();

    cout << "3を含む？ " << (s1.contains(3) ? "Yes" : "No") << endl;
    cout << "7を含む？ " << (s1.contains(7) ? "Yes" : "No") << endl;

    // 波括弧で再代入
    s1 = {10, 20, 30};
    s1.print();

    return 0;
}`}
          expectedOutput={`IntSet構築: 5要素
{ 3 1 4 1 5 }
3を含む？ Yes
7を含む？ No
{ 10 20 30 }`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="initializer-list" />
      </div>
      <LessonNav lessons={lessons} currentId="initializer-list" basePath="/learn/arrays" />
    </div>
  );
}
