import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンテナ比較</h1>
        <p className="text-gray-400">各コンテナの特徴と選び方ガイドを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンテナの選び方</h2>
        <p className="text-gray-300 leading-relaxed">
          STLコンテナにはそれぞれ得意・不得意があります。ランダムアクセスが必要なら <code className="text-pink-400">vector</code> や
          <code className="text-pink-400">deque</code>、高速な検索が必要なら <code className="text-pink-400">unordered_map</code>、
          順序付きの一意な要素が必要なら <code className="text-pink-400">set</code>、
          中間への頻繁な挿入・削除なら <code className="text-pink-400">list</code> を選びます。
          まず <code className="text-pink-400">vector</code> を検討し、要件に合わない場合に他のコンテナを選ぶのが定石です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各コンテナの計算量比較</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <deque>
#include <list>
#include <set>
#include <unordered_set>
using namespace std;

int main() {
    // 各コンテナの特徴をまとめて表示
    cout << "=== STLコンテナ比較表 ===" << endl;
    cout << endl;
    cout << "vector:" << endl;
    cout << "  ランダムアクセス: O(1)" << endl;
    cout << "  末尾追加: 償却O(1)" << endl;
    cout << "  中間挿入: O(n)" << endl;
    cout << endl;
    cout << "deque:" << endl;
    cout << "  ランダムアクセス: O(1)" << endl;
    cout << "  両端追加: O(1)" << endl;
    cout << "  中間挿入: O(n)" << endl;
    cout << endl;
    cout << "list:" << endl;
    cout << "  ランダムアクセス: 不可" << endl;
    cout << "  任意位置挿入: O(1)" << endl;
    cout << "  検索: O(n)" << endl;
    cout << endl;
    cout << "set/map:" << endl;
    cout << "  検索: O(log n)" << endl;
    cout << "  挿入: O(log n)" << endl;
    cout << "  順序: ソート済み" << endl;
    cout << endl;
    cout << "unordered_set/map:" << endl;
    cout << "  検索: 平均O(1)" << endl;
    cout << "  挿入: 平均O(1)" << endl;
    cout << "  順序: なし" << endl;

    return 0;
}`}
          expectedOutput={`=== STLコンテナ比較表 ===

vector:
  ランダムアクセス: O(1)
  末尾追加: 償却O(1)
  中間挿入: O(n)

deque:
  ランダムアクセス: O(1)
  両端追加: O(1)
  中間挿入: O(n)

list:
  ランダムアクセス: 不可
  任意位置挿入: O(1)
  検索: O(n)

set/map:
  検索: O(log n)
  挿入: O(log n)
  順序: ソート済み

unordered_set/map:
  検索: 平均O(1)
  挿入: 平均O(1)
  順序: なし`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">用途に応じた選択の実例</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    // 用途1: 順番を保持して格納 → vector
    vector<string> log = {"起動", "接続", "処理", "完了"};
    cout << "ログ(vector): ";
    for (const auto& s : log) cout << s << " -> ";
    cout << "END" << endl;

    // 用途2: 一意な値の高速検索 → unordered_set/set
    set<string> uniqueUsers;
    uniqueUsers.insert("Alice");
    uniqueUsers.insert("Bob");
    uniqueUsers.insert("Alice"); // 重複は無視
    cout << "ユーザー数(set): " << uniqueUsers.size() << endl;

    // 用途3: キーで高速にアクセス → unordered_map
    unordered_map<string, int> config;
    config["width"] = 1920;
    config["height"] = 1080;
    config["fps"] = 60;
    cout << "解像度: " << config["width"] << "x" << config["height"] << endl;

    // 用途4: ソート済みキーで管理 → map
    map<int, string> ranking;
    ranking[3] = "Charlie";
    ranking[1] = "Alice";
    ranking[2] = "Bob";
    cout << "ランキング(map):" << endl;
    for (const auto& [rank, name] : ranking) {
        cout << "  " << rank << "位: " << name << endl;
    }

    return 0;
}`}
          expectedOutput={`ログ(vector): 起動 -> 接続 -> 処理 -> 完了 -> END
ユーザー数(set): 2
解像度: 1920x1080
ランキング(map):
  1位: Alice
  2位: Bob
  3位: Charlie`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/containers" />
    </div>
  );
}
