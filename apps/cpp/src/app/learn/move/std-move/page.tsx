import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

export default function StdMovePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ムーブセマンティクス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::move</h1>
        <p className="text-gray-400">左辺値を右辺値にキャストするstd::moveの仕組みと使いどころを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::moveの正体</h2>
        <p className="text-gray-400 mb-4">
          std::moveは実際にはデータの移動を行いません。左辺値を右辺値参照にキャスト（static_cast&lt;T&&&gt;）するだけです。
          これにより、ムーブコンストラクタやムーブ代入演算子が選択されるようになります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <utility>
using namespace std;

int main() {
    string s1 = "Hello, World!";
    cout << "s1: " << s1 << " (size=" << s1.size() << ")" << endl;

    // std::move は右辺値参照にキャストするだけ
    string s2 = std::move(s1);
    cout << "ムーブ後:" << endl;
    cout << "s1: \"" << s1 << "\" (size=" << s1.size() << ")" << endl;
    cout << "s2: " << s2 << " (size=" << s2.size() << ")" << endl;

    // moveした後の変数は使えるが中身は不定
    s1 = "Reused!";  // 再代入は安全
    cout << "再代入後 s1: " << s1 << endl;

    return 0;
}`}
          expectedOutput={`s1: Hello, World! (size=13)
ムーブ後:
s1: "" (size=0)
s2: Hello, World! (size=13)
再代入後 s1: Reused!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::moveの活用例</h2>
        <p className="text-gray-400 mb-4">
          コンテナへの挿入、関数への引数渡し、コンテナ間の要素移動などでstd::moveが役立ちます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
#include <utility>
using namespace std;

int main() {
    // vectorへのムーブ挿入
    vector<string> vec;
    string s = "Large String Data";

    vec.push_back(s);              // コピー
    vec.push_back(std::move(s));   // ムーブ（効率的）

    cout << "s: \"" << s << "\" (ムーブ済み)" << endl;
    cout << "vec[0]: " << vec[0] << endl;
    cout << "vec[1]: " << vec[1] << endl;

    // vectorごとのムーブ
    vector<int> v1 = {1, 2, 3, 4, 5};
    cout << "v1サイズ: " << v1.size() << endl;

    vector<int> v2 = std::move(v1);
    cout << "ムーブ後 v1サイズ: " << v1.size() << endl;
    cout << "v2: ";
    for (int n : v2) cout << n << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`s: "" (ムーブ済み)
vec[0]: Large String Data
vec[1]: Large String Data
v1サイズ: 5
ムーブ後 v1サイズ: 0
v2: 1 2 3 4 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::moveを使うべき場面</h2>
        <p className="text-gray-400 mb-4">
          std::moveは「もうこの変数は使わない」と明示するときに使います。
          ムーブ後の変数を使い続けるのは危険です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

class Widget {
    string name;
    vector<int> data;
public:
    // ムーブで受け取って格納（効率的）
    Widget(string n, vector<int> d)
        : name(std::move(n)), data(std::move(d)) {}

    void print() const {
        cout << name << ": ";
        for (int x : data) cout << x << " ";
        cout << endl;
    }
};

int main() {
    string name = "Widget1";
    vector<int> values = {10, 20, 30};

    // コンストラクタに渡すときにムーブ
    Widget w(std::move(name), std::move(values));
    w.print();

    // ムーブ後の変数は使わない
    cout << "name: \"" << name << "\" (ムーブ済み)" << endl;
    cout << "values.size(): " << values.size() << " (ムーブ済み)" << endl;

    return 0;
}`}
          expectedOutput={`Widget1: 10 20 30
name: "" (ムーブ済み)
values.size(): 0 (ムーブ済み)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="move" lessonId="std-move" />
      </div>
      <LessonNav lessons={lessons} currentId="std-move" basePath="/learn/move" />
    </div>
  );
}
