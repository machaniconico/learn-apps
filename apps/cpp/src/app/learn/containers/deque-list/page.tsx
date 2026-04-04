import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function DequeListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">deque・list</h1>
        <p className="text-gray-400">両端キューと双方向リストの特徴と使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">dequeとlistの違い</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::deque</code>（double-ended queue）は両端からの高速な挿入・削除が可能で、
          ランダムアクセスもサポートします。
          <code className="text-pink-400">std::list</code> は双方向リンクリストで、任意の位置への挿入・削除が O(1) ですが、
          ランダムアクセスはできません。用途に応じて使い分けましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::dequeの使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq = {3, 4, 5};

    // 両端への追加
    dq.push_front(2);
    dq.push_front(1);
    dq.push_back(6);
    dq.push_back(7);

    cout << "deque: ";
    for (int n : dq) cout << n << " ";
    cout << endl;

    // ランダムアクセス
    cout << "dq[0] = " << dq[0] << endl;
    cout << "dq[3] = " << dq[3] << endl;

    // 両端からの削除
    dq.pop_front();
    dq.pop_back();

    cout << "pop後: ";
    for (int n : dq) cout << n << " ";
    cout << endl;

    cout << "front: " << dq.front() << endl;
    cout << "back: " << dq.back() << endl;
    cout << "size: " << dq.size() << endl;

    return 0;
}`}
          expectedOutput={`deque: 1 2 3 4 5 6 7
dq[0] = 1
dq[3] = 4
pop後: 2 3 4 5 6
front: 2
back: 6
size: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::listの使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <list>
#include <algorithm>
using namespace std;

int main() {
    list<int> lst = {5, 2, 8, 1, 9, 3};

    // ソート（listは独自のsortを持つ）
    lst.sort();
    cout << "ソート後: ";
    for (int n : lst) cout << n << " ";
    cout << endl;

    // 任意位置への挿入
    auto it = find(lst.begin(), lst.end(), 5);
    lst.insert(it, 4); // 5の前に4を挿入

    cout << "4挿入後: ";
    for (int n : lst) cout << n << " ";
    cout << endl;

    // 条件に基づく削除
    lst.remove_if([](int n) { return n % 2 == 0; });
    cout << "奇数のみ: ";
    for (int n : lst) cout << n << " ";
    cout << endl;

    // 反転
    lst.reverse();
    cout << "反転: ";
    for (int n : lst) cout << n << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`ソート後: 1 2 3 5 8 9
4挿入後: 1 2 3 4 5 8 9
奇数のみ: 1 3 5 9
反転: 9 5 3 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="deque-list" />
      </div>
      <LessonNav lessons={lessons} currentId="deque-list" basePath="/learn/containers" />
    </div>
  );
}
