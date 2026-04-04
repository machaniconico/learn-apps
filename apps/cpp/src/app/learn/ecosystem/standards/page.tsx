import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function StandardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++エコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">C++標準</h1>
        <p className="text-gray-400">C++11/14/17/20/23の主要な変更点を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++の進化</h2>
        <p className="text-gray-300 leading-relaxed">
          C++はISO標準委員会により3年ごとに更新されます。C++11が「モダンC++」の始まりで、
          以降のバージョンで言語機能とライブラリが大幅に拡充されています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C++11の主要機能</h2>
        <p className="text-gray-400 mb-4">モダンC++の始まりとなったC++11の機能です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <memory>
#include <functional>
using namespace std;

int main() {
    // auto型推論
    auto x = 42;
    auto pi = 3.14;

    // 範囲forループ
    vector<int> nums = {1, 2, 3, 4, 5};
    cout << "range-for: ";
    for (const auto& n : nums) cout << n << " ";
    cout << endl;

    // ラムダ式
    auto square = [](int x) { return x * x; };
    cout << "lambda: " << square(7) << endl;

    // スマートポインタ
    auto ptr = make_unique<int>(100);
    cout << "unique_ptr: " << *ptr << endl;

    // 初期化リスト
    vector<string> words{"hello", "world"};
    cout << "initializer_list: " << words[0] << " " << words[1] << endl;

    // nullptr
    int* p = nullptr;
    cout << "nullptr: " << (p == nullptr ? "null" : "not null") << endl;

    return 0;
}`}
          expectedOutput={`range-for: 1 2 3 4 5
lambda: 49
unique_ptr: 100
initializer_list: hello world
nullptr: null`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C++17の主要機能</h2>
        <p className="text-gray-400 mb-4">構造化束縛やoptionalなどC++17の便利な機能です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <optional>
#include <tuple>
#include <map>
#include <string>
using namespace std;

optional<int> findValue(const map<string, int>& m, const string& key) {
    auto it = m.find(key);
    if (it != m.end()) return it->second;
    return nullopt;
}

int main() {
    // 構造化束縛
    auto [a, b, c] = tuple{1, 2.5, "hello"s};
    cout << "構造化束縛: " << a << ", " << b << ", " << c << endl;

    // mapでの構造化束縛
    map<string, int> scores{{"Alice", 90}, {"Bob", 85}};
    for (const auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }

    // std::optional
    auto result = findValue(scores, "Alice");
    cout << "Alice: " << (result ? to_string(*result) : "not found") << endl;

    auto missing = findValue(scores, "Charlie");
    cout << "Charlie: " << (missing ? to_string(*missing) : "not found") << endl;

    // if with initializer
    if (auto it = scores.find("Bob"); it != scores.end()) {
        cout << "Found Bob: " << it->second << endl;
    }

    return 0;
}`}
          expectedOutput={`構造化束縛: 1, 2.5, hello
Alice: 90
Bob: 85
Alice: 90
Charlie: not found
Found Bob: 85`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="standards" />
      </div>
      <LessonNav lessons={lessons} currentId="standards" basePath="/learn/ecosystem" />
    </div>
  );
}
