import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function ReverseIteratorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">逆イテレータ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        rbegin()とrend()を使って、コンテナの要素を逆順に走査できます。
        逆イテレータは++で後方に、--で前方に移動します。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">rbegin/rendの基本</h2>
        <p className="text-gray-400 mb-4">
          rbegin()は最後の要素を、rend()は先頭の前を指す逆イテレータを返します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // 逆順走査
    cout << "逆順: ";
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;

    // 文字列の逆順
    string s = "Hello C++";
    string reversed(s.rbegin(), s.rend());
    cout << "元: " << s << endl;
    cout << "逆: " << reversed << endl;

    return 0;
}`}
          expectedOutput={`逆順: 5 4 3 2 1
元: Hello C++
逆: ++C olleH`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">逆イテレータとアルゴリズム</h2>
        <p className="text-gray-400 mb-4">
          逆イテレータをSTLアルゴリズムに渡すことで、逆方向の検索や処理ができます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 3, 5, 3, 7, 3, 9};

    // 最後の3を見つける（逆方向にfind）
    auto rit = find(v.rbegin(), v.rend(), 3);
    if (rit != v.rend()) {
        // baseで通常のイテレータに変換
        auto pos = distance(v.begin(), rit.base()) - 1;
        cout << "最後の3の位置: " << pos << endl;
    }

    // 最初の3を見つける（通常方向）
    auto it = find(v.begin(), v.end(), 3);
    cout << "最初の3の位置: " << distance(v.begin(), it) << endl;

    return 0;
}`}
          expectedOutput={`最後の3の位置: 5
最初の3の位置: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">base()による変換</h2>
        <p className="text-gray-400 mb-4">
          逆イテレータのbase()メソッドで通常のイテレータに変換できます。ただし1つずれることに注意が必要です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    auto rit = v.rbegin();
    ++rit;  // 40を指す

    cout << "逆イテレータ: " << *rit << endl;
    cout << "base(): " << *rit.base() << endl;
    cout << "※ base()は1つ先(50)を指す" << endl;

    // eraseに使う場合はbase()-1が必要
    // ただしprev(rit.base())が安全
    auto it = prev(rit.base());
    cout << "prev(base()): " << *it << endl;

    return 0;
}`}
          expectedOutput={`逆イテレータ: 40
base(): 50
※ base()は1つ先(50)を指す
prev(base()): 40`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="reverse-iterators" />
      <LessonNav lessons={lessons} currentId="reverse-iterators" basePath="/learn/iterators" />
    </div>
  );
}
