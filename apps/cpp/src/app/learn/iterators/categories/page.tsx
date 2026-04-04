import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("iterators");

export default function IteratorCategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">イテレータカテゴリ</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        C++のイテレータは5つのカテゴリに分類されます。入力・出力・前方・双方向・ランダムアクセスの順に
        機能が増えていき、使えるアルゴリズムが変わります。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">イテレータカテゴリの階層</h2>
        <p className="text-gray-400 mb-4">
          ランダムアクセスイテレータは最も強力で、vectorやarrayが提供します。
          listは双方向、forward_listは前方イテレータです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <list>
#include <forward_list>
using namespace std;

int main() {
    // ランダムアクセス（vector）: +n, -n, [], <, > が使える
    vector<int> v = {10, 20, 30, 40, 50};
    auto vit = v.begin();
    cout << "vector[2]: " << *(vit + 2) << endl;
    cout << "vector[4]: " << vit[4] << endl;

    // 双方向（list）: ++, -- が使える
    list<int> lst = {10, 20, 30, 40, 50};
    auto lit = lst.end();
    --lit;  // 後退可能
    cout << "list末尾: " << *lit << endl;

    // 前方（forward_list）: ++ のみ
    forward_list<int> fl = {10, 20, 30};
    auto fit = fl.begin();
    ++fit;  // 前進のみ
    cout << "forward_list[1]: " << *fit << endl;

    return 0;
}`}
          expectedOutput={`vector[2]: 30
vector[4]: 50
list末尾: 50
forward_list[1]: 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カテゴリとアルゴリズムの関係</h2>
        <p className="text-gray-400 mb-4">
          sortはランダムアクセスイテレータが必要ですが、findは入力イテレータで十分です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <list>
#include <algorithm>
using namespace std;

int main() {
    // vectorはsort可能（ランダムアクセス）
    vector<int> v = {5, 2, 8, 1, 3};
    sort(v.begin(), v.end());
    cout << "vector sort: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // listはsort不可だが、メンバ関数sortがある
    list<int> lst = {5, 2, 8, 1, 3};
    lst.sort();  // メンバ関数版
    cout << "list sort: ";
    for (int x : lst) cout << x << " ";
    cout << endl;

    // findはどちらでも使える（入力イテレータで十分）
    auto it = find(lst.begin(), lst.end(), 8);
    cout << "listでfind(8): " << *it << endl;

    return 0;
}`}
          expectedOutput={`vector sort: 1 2 3 5 8
list sort: 1 2 3 5 8
listでfind(8): 8`}
        />
      </section>

      <LessonCompleteButton categoryId="iterators" lessonId="categories" />
      <LessonNav lessons={lessons} currentId="categories" basePath="/learn/iterators" />
    </div>
  );
}
