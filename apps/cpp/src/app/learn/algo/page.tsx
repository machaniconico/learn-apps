import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

const quizQuestions: QuizQuestion[] = [
  {
    question: "クイックソートの平均計算量はどれですか？",
    options: [
      "O(n log n)",
      "O(n^2)",
      "O(n)",
      "O(log n)",
    ],
    answer: 0,
    explanation: "クイックソートは分割統治法を使い、平均的にO(n log n)の計算量で動作します。最悪の場合はO(n^2)になりますが、ピボットの選び方で改善できます。",
  },
  {
    question: "二分探索の前提条件として正しいものはどれですか？",
    options: [
      "データがソート済みである必要がある",
      "データが連結リストに格納されている必要がある",
      "データの要素数が2のべき乗である必要がある",
      "前提条件は特にない",
    ],
    answer: 0,
    explanation: "二分探索は中央の要素と比較して探索範囲を半分に絞るため、データが事前にソートされている必要があります。",
  },
  {
    question: "動的計画法の特徴として正しいものはどれですか？",
    options: [
      "部分問題の結果を保存して再計算を避ける",
      "常に再帰を使わなければならない",
      "メモリを使わない高速な手法である",
      "グラフの問題にしか適用できない",
    ],
    answer: 0,
    explanation: "動的計画法は「重複する部分問題」の結果をメモリに保存(メモ化)することで、同じ計算を繰り返さずに効率的に問題を解きます。",
  },
  {
    question: "幅優先探索(BFS)と深さ優先探索(DFS)の違いとして正しいものはどれですか？",
    options: [
      "BFSはキューを使い、DFSはスタックを使う",
      "BFSはスタックを使い、DFSはキューを使う",
      "BFSの方が常に高速である",
      "DFSでのみ最短経路が求まる",
    ],
    answer: 0,
    explanation: "BFSはキューで近い頂点から順に探索するため最短経路に適しています。DFSはスタック(または再帰)で深く探索し、経路の存在確認などに適しています。",
  },
];

export default function AlgoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">アルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++で実装する基本的なアルゴリズムとデータ構造を学びましょう。ソート・探索アルゴリズム、
          スタック・キューの活用、再帰と分割統治法、動的計画法、グラフ探索まで、問題解決の基礎力を養います。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algo" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algo" color="cyan" categoryId="algo" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソートの実装</h2>
        <p className="text-gray-400 mb-4">
          最もシンプルなソートアルゴリズムであるバブルソートの実装です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    vector<int> data = {64, 34, 25, 12, 22, 11, 90};

    cout << "ソート前: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    bubbleSort(data);

    cout << "ソート後: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`ソート前: 64 34 25 12 22 11 90
ソート後: 11 12 22 25 34 64 90`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索の実装</h2>
        <p className="text-gray-400 mb-4">
          ソート済み配列から効率的に要素を見つける二分探索です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> data = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    int target1 = 23;
    int result1 = binarySearch(data, target1);
    cout << target1 << " のインデックス: " << result1 << endl;

    int target2 = 50;
    int result2 = binarySearch(data, target2);
    cout << target2 << " のインデックス: " << result2 << " (見つからず)" << endl;

    return 0;
}`}
          expectedOutput={`23 のインデックス: 5
50 のインデックス: -1 (見つからず)`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
