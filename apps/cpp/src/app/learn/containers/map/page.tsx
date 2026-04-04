import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::map</h1>
        <p className="text-gray-400">キーと値のペアで管理する順序付きマップの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::mapとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::map</code> はキーと値のペアを格納する連想コンテナです。
          内部的に赤黒木（バランス二分探索木）で実装されており、キーの昇順に自動ソートされます。
          検索・挿入・削除の計算量はすべて O(log n) です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapの基本操作</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    // 初期化
    map<string, int> scores = {
        {"Alice", 90},
        {"Bob", 85},
        {"Charlie", 78}
    };

    // 要素の追加
    scores["Diana"] = 92;
    scores.insert({"Eve", 88});

    // 要素へのアクセス
    cout << "Alice: " << scores["Alice"] << endl;
    cout << "Bob: " << scores.at("Bob") << endl;

    // 全要素の表示（キー順にソート済み）
    cout << "--- 全員のスコア ---" << endl;
    for (const auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }

    return 0;
}`}
          expectedOutput={`Alice: 90
Bob: 85
--- 全員のスコア ---
Alice: 90
Bob: 85
Charlie: 78
Diana: 92
Eve: 88`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索と削除</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> inventory = {
        {"りんご", 5},
        {"バナナ", 3},
        {"みかん", 8},
        {"ぶどう", 2}
    };

    // find で検索
    auto it = inventory.find("みかん");
    if (it != inventory.end()) {
        cout << it->first << ": " << it->second << "個" << endl;
    }

    // count でキーの存在確認
    cout << "バナナあり: " << (inventory.count("バナナ") ? "Yes" : "No") << endl;
    cout << "メロンあり: " << (inventory.count("メロン") ? "Yes" : "No") << endl;

    // 削除
    inventory.erase("バナナ");
    cout << "--- バナナ削除後 ---" << endl;
    for (const auto& [item, qty] : inventory) {
        cout << item << ": " << qty << "個" << endl;
    }

    cout << "要素数: " << inventory.size() << endl;

    return 0;
}`}
          expectedOutput={`みかん: 8個
バナナあり: Yes
メロンあり: No
--- バナナ削除後 ---
ぶどう: 2個
みかん: 8個
りんご: 5個
要素数: 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="map" />
      </div>
      <LessonNav lessons={lessons} currentId="map" basePath="/learn/containers" />
    </div>
  );
}
