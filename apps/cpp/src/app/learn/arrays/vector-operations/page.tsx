import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function VectorOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">vectorの操作</h1>
        <p className="text-gray-400">push_back・erase・insertなどの操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">vectorの変更操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::vector</code> は末尾への追加・削除が高速（O(1)均等償却）です。
          先頭や中間への挿入・削除は要素のシフトが必要なためO(n)です。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">emplace_back</code> はオブジェクトをその場で構築するため
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">push_back</code> より効率的な場合があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">追加・挿入・削除</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

void print(const string& label, const vector<int>& v) {
    cout << label << ": ";
    for (int x : v) cout << x << " ";
    cout << endl;
}

int main() {
    vector<int> v = {10, 20, 30};
    print("初期", v);

    // 末尾に追加
    v.push_back(40);
    v.push_back(50);
    print("push_back後", v);

    // 末尾を削除
    v.pop_back();
    print("pop_back後", v);

    // 位置を指定して挿入
    v.insert(v.begin() + 1, 15);  // インデックス1に挿入
    print("insert(1,15)後", v);

    // 位置を指定して削除
    v.erase(v.begin() + 2);  // インデックス2を削除
    print("erase(2)後", v);

    // 範囲削除
    v.erase(v.begin(), v.begin() + 2);  // 先頭2要素を削除
    print("範囲erase後", v);

    // 全削除
    v.clear();
    cout << "clear後 size: " << v.size() << endl;

    return 0;
}`}
          expectedOutput={`初期: 10 20 30
push_back後: 10 20 30 40 50
pop_back後: 10 20 30 40
insert(1,15)後: 10 15 20 30 40
erase(2)後: 10 15 30 40
範囲erase後: 30 40
clear後 size: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">emplace_backとその他の操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {
        cout << "構築: (" << x << ", " << y << ")" << endl;
    }
};

int main() {
    vector<Point> points;

    // emplace_back: コンストラクタ引数を直接渡す
    cout << "--- emplace_back ---" << endl;
    points.emplace_back(1.0, 2.0);
    points.emplace_back(3.0, 4.0);

    // resize: サイズ変更
    vector<int> v = {1, 2, 3, 4, 5};
    cout << "resize前: size=" << v.size() << endl;

    v.resize(3);  // 縮小
    cout << "resize(3): ";
    for (int x : v) cout << x << " ";
    cout << endl;

    v.resize(6, 99);  // 拡大（新要素は99）
    cout << "resize(6,99): ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // assign: 全置換
    v.assign(4, 0);
    cout << "assign(4,0): ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // swap: 2つのvectorを入れ替え
    vector<int> a = {1, 2};
    vector<int> b = {9, 8, 7};
    a.swap(b);
    cout << "swap後 a: ";
    for (int x : a) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`--- emplace_back ---
構築: (1, 2)
構築: (3, 4)
resize前: size=5
resize(3): 1 2 3
resize(6,99): 1 2 3 99 99 99
assign(4,0): 0 0 0 0
swap後 a: 9 8 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="vector-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="vector-operations" basePath="/learn/arrays" />
    </div>
  );
}
