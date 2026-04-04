import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function UnorderedMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">std::unordered_map</h1>
        <p className="text-gray-400">ハッシュテーブルベースの高速マップの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">std::unordered_mapとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::unordered_map</code> はハッシュテーブルで実装された連想コンテナです。
          要素はソートされませんが、平均的な検索・挿入・削除が O(1) で行えます。
          順序が不要で高速アクセスが必要な場合に <code className="text-pink-400">std::map</code> の代わりに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    unordered_map<string, int> wordCount;

    // 単語の出現回数をカウント
    string words[] = {"apple", "banana", "apple", "cherry",
                      "banana", "apple", "cherry", "cherry"};

    for (const auto& word : words) {
        wordCount[word]++;
    }

    // 結果表示（順序は不定）
    cout << "--- 単語カウント ---" << endl;
    for (const auto& [word, count] : wordCount) {
        cout << word << ": " << count << "回" << endl;
    }

    // 要素の存在チェック
    if (wordCount.contains("apple")) {
        cout << "appleは存在します" << endl;
    }

    return 0;
}`}
          expectedOutput={`--- 単語カウント ---
cherry: 3回
banana: 2回
apple: 3回
appleは存在します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapとunordered_mapの使い分け</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <map>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    // map: キーがソートされる
    map<int, string> orderedMap = {
        {3, "three"}, {1, "one"}, {4, "four"}, {2, "two"}
    };
    cout << "map (sorted):" << endl;
    for (const auto& [k, v] : orderedMap) {
        cout << "  " << k << " -> " << v << endl;
    }

    // unordered_map: 順序は不定だが高速
    unordered_map<int, string> hashMap = {
        {3, "three"}, {1, "one"}, {4, "four"}, {2, "two"}
    };
    cout << "unordered_map:" << endl;
    for (const auto& [k, v] : hashMap) {
        cout << "  " << k << " -> " << v << endl;
    }

    // バケット情報
    cout << "バケット数: " << hashMap.bucket_count() << endl;
    cout << "負荷率: " << hashMap.load_factor() << endl;

    return 0;
}`}
          expectedOutput={`map (sorted):
  1 -> one
  2 -> two
  3 -> three
  4 -> four
unordered_map:
  2 -> two
  4 -> four
  1 -> one
  3 -> three
バケット数: 7
負荷率: 0.571429`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="unordered-map" />
      </div>
      <LessonNav lessons={lessons} currentId="unordered-map" basePath="/learn/containers" />
    </div>
  );
}
