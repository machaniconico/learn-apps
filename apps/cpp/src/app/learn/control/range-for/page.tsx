import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function RangeForPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">範囲forループ</h1>
        <p className="text-gray-400">コンテナの要素を順番に処理する範囲forを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">範囲forループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++11で導入された<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">範囲for（range-based for）</code>は、
          配列やSTLコンテナの全要素を簡潔に処理できます。
          インデックスの管理が不要で、バグも減ります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          構文: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"for (auto& elem : container) { ... }"}</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な範囲for</h2>
        <p className="text-gray-400 mb-4">配列やvectorの要素を順に処理します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // 配列での範囲for
    int numbers[] = {10, 20, 30, 40, 50};
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << endl;

    // vectorでの範囲for
    vector<string> fruits = {"りんご", "バナナ", "みかん"};
    for (const string& fruit : fruits) {
        cout << fruit << " ";
    }
    cout << endl;

    // autoを使った簡潔な書き方
    vector<double> prices = {100.5, 200.3, 300.7};
    double total = 0;
    for (auto price : prices) {
        total += price;
    }
    cout << "合計: " << total << endl;

    return 0;
}`}
          expectedOutput={`10 20 30 40 50
りんご バナナ みかん
合計: 601.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照とconstの使い分け</h2>
        <p className="text-gray-400 mb-4">要素を変更するかどうかで参照の種類を使い分けます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};

    // 参照で要素を変更
    for (int& n : nums) {
        n *= 2;
    }

    // const参照で読み取り（コピーを避ける）
    cout << "2倍後: ";
    for (const auto& n : nums) {
        cout << n << " ";
    }
    cout << endl;

    // 初期化リストでの範囲for
    cout << "直接リスト: ";
    for (int x : {100, 200, 300}) {
        cout << x << " ";
    }
    cout << endl;

    // mapでの範囲for
    // ※ mapは後のレッスンで詳しく学びます
    cout << "文字カウント: ";
    string text = "hello";
    int vowels = 0;
    for (char c : text) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            vowels++;
    }
    cout << "\"" << text << "\"の母音数: " << vowels << endl;

    return 0;
}`}
          expectedOutput={`2倍後: 2 4 6 8 10
直接リスト: 100 200 300
"hello"の母音数: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="range-for" />
      </div>
      <LessonNav lessons={lessons} currentId="range-for" basePath="/learn/control" />
    </div>
  );
}
