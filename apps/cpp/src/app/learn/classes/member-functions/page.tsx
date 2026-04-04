import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function MemberFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メンバ関数</h1>
        <p className="text-gray-400">クラスに属する関数の定義と呼び出しを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メンバ関数の種類</h2>
        <p className="text-gray-300 leading-relaxed">
          メンバ関数はクラスの内部で宣言し、クラスのデータに直接アクセスできます。
          constメンバ関数はオブジェクトの状態を変更しないことを保証します。
          クラス内で定義するインライン定義と、クラス外で定義する分離定義の2つの方法があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インライン定義と分離定義</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Counter {
    int count;

public:
    Counter() : count(0) {}

    // インライン定義（クラス内）
    void increment() { count++; }
    int getCount() const { return count; }

    // 宣言のみ（定義はクラス外）
    void reset();
    void addMultiple(int n);
    void display() const;
};

// クラス外での定義（スコープ解決演算子 ::）
void Counter::reset() {
    count = 0;
}

void Counter::addMultiple(int n) {
    for (int i = 0; i < n; i++) {
        increment();  // 他のメンバ関数を呼べる
    }
}

void Counter::display() const {
    cout << "カウント: " << count << endl;
}

int main() {
    Counter c;
    c.increment();
    c.increment();
    c.increment();
    c.display();

    c.addMultiple(5);
    c.display();

    c.reset();
    c.display();

    return 0;
}`}
          expectedOutput={`カウント: 3
カウント: 8
カウント: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">constメンバ関数とオーバーロード</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <vector>
using namespace std;

class StringList {
    vector<string> items;

public:
    void add(const string& item) {
        items.push_back(item);
    }

    // constバージョン（読み取り専用アクセス）
    const string& at(int index) const {
        cout << "[const版] ";
        return items[index];
    }

    // 非constバージョン（書き込み可能）
    string& at(int index) {
        cout << "[非const版] ";
        return items[index];
    }

    // constメンバ関数: オブジェクトを変更しない
    int size() const { return items.size(); }
    bool empty() const { return items.empty(); }

    void display() const {
        for (const auto& item : items)
            cout << item << " ";
        cout << endl;
    }
};

int main() {
    StringList list;
    list.add("Apple");
    list.add("Banana");
    list.add("Cherry");

    // 非constオブジェクト → 非const版が呼ばれる
    cout << list.at(0) << endl;
    list.at(1) = "Blueberry";  // 書き込み可能

    // constオブジェクト → const版が呼ばれる
    const StringList& cref = list;
    cout << cref.at(0) << endl;

    list.display();

    return 0;
}`}
          expectedOutput={`[非const版] Apple
[const版] Apple
Apple Blueberry Cherry`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="member-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="member-functions" basePath="/learn/classes" />
    </div>
  );
}
