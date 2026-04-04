import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function SetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::set</h1>
        <p className="text-gray-400">重複なしの順序付き集合の使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::setとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::set</code> は重複を許さない順序付き集合です。
          内部的に赤黒木で実装され、要素は自動的にソートされます。
          検索・挿入・削除はすべて O(log n) です。重複を許す場合は
          <code className="text-pink-400">std::multiset</code> を使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setの基本操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <set>
using namespace std;

int main() {
    // 初期化（重複は自動排除）
    set<int> nums = {5, 3, 8, 1, 3, 9, 5, 2};

    cout << "要素: ";
    for (int n : nums) {
        cout << n << " ";
    }
    cout << endl;
    cout << "サイズ: " << nums.size() << endl;

    // 挿入
    auto [it, inserted] = nums.insert(7);
    cout << "7を挿入: " << (inserted ? "成功" : "既存") << endl;

    auto [it2, inserted2] = nums.insert(3);
    cout << "3を挿入: " << (inserted2 ? "成功" : "既存") << endl;

    // 検索
    if (nums.count(8)) {
        cout << "8は存在します" << endl;
    }

    // 削除
    nums.erase(5);
    cout << "5を削除後: ";
    for (int n : nums) {
        cout << n << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`要素: 1 2 3 5 8 9
サイズ: 6
7を挿入: 成功
3を挿入: 既存
8は存在します
5を削除後: 1 2 3 7 8 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">集合演算</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <set>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    set<int> a = {1, 2, 3, 4, 5};
    set<int> b = {3, 4, 5, 6, 7};

    // 和集合
    set<int> unionSet;
    set_union(a.begin(), a.end(), b.begin(), b.end(),
              inserter(unionSet, unionSet.begin()));
    cout << "和集合: ";
    for (int n : unionSet) cout << n << " ";
    cout << endl;

    // 積集合
    set<int> interSet;
    set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                     inserter(interSet, interSet.begin()));
    cout << "積集合: ";
    for (int n : interSet) cout << n << " ";
    cout << endl;

    // 差集合 (a - b)
    set<int> diffSet;
    set_difference(a.begin(), a.end(), b.begin(), b.end(),
                   inserter(diffSet, diffSet.begin()));
    cout << "差集合: ";
    for (int n : diffSet) cout << n << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`和集合: 1 2 3 4 5 6 7
積集合: 3 4 5
差集合: 1 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="set" />
      </div>
      <LessonNav lessons={lessons} currentId="set" basePath="/learn/containers" />
    </div>
  );
}
