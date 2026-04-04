import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function InsertIteratorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">挿入イテレータ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        挿入イテレータは出力イテレータの一種で、代入操作がコンテナへの挿入になります。
        back_inserter、front_inserter、inserterの3種類があります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">back_inserter</h2>
        <p className="text-gray-400 mb-4">
          push_backを呼び出す挿入イテレータです。vectorやdequeなど末尾追加が可能なコンテナで使えます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5};
    vector<int> dst;

    // back_inserterで末尾に追加しながらコピー
    copy(src.begin(), src.end(), back_inserter(dst));
    cout << "コピー: ";
    for (int x : dst) cout << x << " ";
    cout << endl;

    // transformと組み合わせ
    vector<int> doubled;
    transform(src.begin(), src.end(), back_inserter(doubled),
              [](int x) { return x * 2; });
    cout << "2倍: ";
    for (int x : doubled) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`コピー: 1 2 3 4 5
2倍: 2 4 6 8 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">front_inserterとinserter</h2>
        <p className="text-gray-400 mb-4">
          front_inserterは先頭に挿入し（deque/listで使用）、inserterは指定位置に挿入します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <list>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3};

    // front_inserter: 先頭に挿入（逆順になる）
    list<int> lst;
    copy(src.begin(), src.end(), front_inserter(lst));
    cout << "front_inserter: ";
    for (int x : lst) cout << x << " ";
    cout << endl;

    // inserter: 指定位置に挿入
    vector<int> dst = {10, 20, 30};
    auto pos = next(dst.begin(), 1);  // 位置1に挿入
    copy(src.begin(), src.end(), inserter(dst, pos));
    cout << "inserter: ";
    for (int x : dst) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`front_inserter: 3 2 1
inserter: 10 1 2 3 20 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setへの挿入</h2>
        <p className="text-gray-400 mb-4">
          inserterをsetで使うと、重複を除去しながら要素を追加できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    set<int> s;

    // inserterでsetに追加（重複排除される）
    copy(v.begin(), v.end(), inserter(s, s.begin()));
    cout << "重複排除: ";
    for (int x : s) cout << x << " ";
    cout << endl;
    cout << "元の要素数: " << v.size() << ", set要素数: " << s.size() << endl;

    return 0;
}`}
          expectedOutput={`重複排除: 1 2 3 4 5 6 9
元の要素数: 10, set要素数: 7`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="insert-iterators" />
      <LessonNav lessons={lessons} currentId="insert-iterators" basePath="/learn/iterators" />
    </div>
  );
}
