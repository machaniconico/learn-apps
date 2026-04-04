import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::mapの要素の順序について正しいものはどれですか？",
    options: [
      "キーの昇順に自動的にソートされる",
      "挿入した順序が保持される",
      "順序は不定である",
      "値の順序でソートされる",
    ],
    answer: 0,
    explanation: "std::mapは内部的に赤黒木で実装されており、キーの昇順（デフォルト比較）で自動的にソートされます。",
  },
  {
    question: "std::unordered_mapがstd::mapより高速な場合があるのはなぜですか？",
    options: [
      "ハッシュテーブルによる平均O(1)のアクセスが可能だから",
      "要素がソートされているから",
      "メモリ使用量が少ないから",
      "イテレータが高速だから",
    ],
    answer: 0,
    explanation: "std::unordered_mapはハッシュテーブルベースで、平均的な検索・挿入がO(1)で行えます。ただしハッシュ衝突時はO(n)になります。",
  },
  {
    question: "std::setの特徴として正しいものはどれですか？",
    options: [
      "重複する要素を自動的に排除する",
      "重複する要素を許可する",
      "挿入順序を保持する",
      "キーと値のペアを格納する",
    ],
    answer: 0,
    explanation: "std::setは重複なしの順序付き集合です。同じ値を挿入しようとしても無視されます。",
  },
  {
    question: "std::stackとstd::queueの違いとして正しいものはどれですか？",
    options: [
      "stackはLIFO、queueはFIFOの順序でアクセスする",
      "stackはFIFO、queueはLIFOの順序でアクセスする",
      "どちらもランダムアクセスが可能",
      "stackのみイテレータが使える",
    ],
    answer: 0,
    explanation: "stackはLast In First Out（後入れ先出し）、queueはFirst In First Out（先入れ先出し）の順序でアクセスします。",
  },
];

export default function ContainersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">コンテナ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のSTLコンテナを学びましょう。map・unordered_map・set・stack・queue・deque・listなど、
          データ構造の特徴と使い分けを理解して適切なコンテナを選べるようになります。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="containers" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/containers" color="red" categoryId="containers" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">STLコンテナの概要</h2>
        <p className="text-gray-400 mb-4">
          STLコンテナは用途に応じたデータ構造を提供します。連想コンテナ（map/set）とコンテナアダプタ（stack/queue）を見てみましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <map>
#include <set>
using namespace std;

int main() {
    // std::map: キーと値のペア
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 28;

    for (const auto& [name, age] : ages) {
        cout << name << ": " << age << "歳" << endl;
    }

    // std::set: 重複なしの集合
    set<int> nums = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    cout << "set: ";
    for (int n : nums) {
        cout << n << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`Alice: 25歳
Bob: 30歳
Charlie: 28歳
set: 1 2 3 4 5 6 9`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コンテナアダプタ</h2>
        <p className="text-gray-400 mb-4">
          stack（LIFO）とqueue（FIFO）は既存のコンテナを内部で使用するアダプタです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // stack: 後入れ先出し (LIFO)
    stack<int> stk;
    stk.push(10);
    stk.push(20);
    stk.push(30);

    cout << "stack: ";
    while (!stk.empty()) {
        cout << stk.top() << " ";
        stk.pop();
    }
    cout << endl;

    // queue: 先入れ先出し (FIFO)
    queue<int> que;
    que.push(10);
    que.push(20);
    que.push(30);

    cout << "queue: ";
    while (!que.empty()) {
        cout << que.front() << " ";
        que.pop();
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`stack: 30 20 10
queue: 10 20 30`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
