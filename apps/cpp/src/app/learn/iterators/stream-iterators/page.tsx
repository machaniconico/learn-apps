import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function StreamIteratorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">ストリームイテレータ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        istream_iteratorとostream_iteratorはストリームをイテレータとして扱えます。
        ファイルや標準入出力とSTLアルゴリズムを直接組み合わせることができます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ostream_iteratorで出力</h2>
        <p className="text-gray-400 mb-4">
          ostream_iteratorに代入すると、ストリームに出力されます。区切り文字も指定できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // ostream_iteratorで出力
    cout << "スペース区切り: ";
    copy(v.begin(), v.end(), ostream_iterator<int>(cout, " "));
    cout << endl;

    // カンマ区切り
    cout << "カンマ区切り: ";
    copy(v.begin(), v.end(), ostream_iterator<int>(cout, ", "));
    cout << endl;

    // transformと組み合わせて直接出力
    cout << "2乗: ";
    transform(v.begin(), v.end(), ostream_iterator<int>(cout, " "),
              [](int x) { return x * x; });
    cout << endl;

    return 0;
}`}
          expectedOutput={`スペース区切り: 1 2 3 4 5
カンマ区切り: 1, 2, 3, 4, 5,
2乗: 1 4 9 16 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">istream_iteratorで入力</h2>
        <p className="text-gray-400 mb-4">
          istream_iteratorはストリームから値を読み取るイテレータです。stringstreamと組み合わせて使えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // stringstreamからistream_iteratorで読み取り
    istringstream iss("10 20 30 40 50");
    vector<int> v(istream_iterator<int>(iss), istream_iterator<int>());

    cout << "読み取り: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    cout << "合計: " << accumulate(v.begin(), v.end(), 0) << endl;

    // 文字列を単語に分割
    istringstream words("hello world cpp");
    vector<string> tokens(istream_iterator<string>(words), istream_iterator<string>());
    cout << "単語数: " << tokens.size() << endl;
    for (const auto& w : tokens) cout << "[" << w << "] ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`読み取り: 10 20 30 40 50
合計: 150
単語数: 3
[hello] [world] [cpp]`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="stream-iterators" />
      <LessonNav lessons={lessons} currentId="stream-iterators" basePath="/learn/iterators" />
    </div>
  );
}
