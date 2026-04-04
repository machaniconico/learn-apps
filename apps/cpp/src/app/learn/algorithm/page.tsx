import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::sortのデフォルトのソート順はどれですか？",
    options: [
      "昇順（小さい順）",
      "降順（大きい順）",
      "挿入順",
      "ランダム",
    ],
    answer: 0,
    explanation: "std::sortはデフォルトでoperator<を使い、昇順にソートします。降順にするにはstd::greater<>()を渡します。",
  },
  {
    question: "std::findが要素を見つけられなかった場合、何を返しますか？",
    options: [
      "範囲の末尾イテレータ（end）",
      "nullptr",
      "-1",
      "例外をスロー",
    ],
    answer: 0,
    explanation: "std::findは要素が見つからなかった場合、範囲の末尾イテレータ（end）を返します。",
  },
  {
    question: "std::transformの役割はどれですか？",
    options: [
      "各要素に関数を適用し、結果を出力範囲に書き込む",
      "条件を満たす要素だけを抽出する",
      "要素を昇順に並び替える",
      "要素の合計を計算する",
    ],
    answer: 0,
    explanation: "std::transformは入力範囲の各要素に関数を適用し、その結果を出力範囲に書き込みます。",
  },
  {
    question: "C++20のRangesの利点として正しいものはどれですか？",
    options: [
      "パイプ演算子（|）でアルゴリズムを連鎖できる",
      "実行速度が必ず向上する",
      "テンプレートが不要になる",
      "ヘッダのインクルードが不要になる",
    ],
    answer: 0,
    explanation: "C++20のRangesではパイプ演算子（|）を使ってビューを連鎖でき、コードの可読性が大幅に向上します。",
  },
];

export default function AlgorithmPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">STLアルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++標準ライブラリが提供する豊富なアルゴリズムを学びましょう。ソート・探索・変換・集約・フィルタリングなど、
          コンテナの要素を効率的に操作するための関数群を習得します。C++20のRangesも扱います。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algorithm" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algorithm" color="green" categoryId="algorithm" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートと探索の概要</h2>
        <p className="text-gray-400 mb-4">
          std::sortとstd::findは最も基本的なSTLアルゴリズムです。コンテナの要素を並び替えたり、特定の値を検索できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // ソート
    sort(v.begin(), v.end());
    cout << "ソート後: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // 探索
    auto it = find(v.begin(), v.end(), 8);
    if (it != v.end())
        cout << "8が見つかりました (位置: " << distance(v.begin(), it) << ")" << endl;

    // 二分探索（ソート済みが前提）
    bool found = binary_search(v.begin(), v.end(), 5);
    cout << "5の二分探索: " << (found ? "見つかった" : "見つからない") << endl;

    return 0;
}`}
          expectedOutput={`ソート後: 1 2 3 5 8 9
8が見つかりました (位置: 4)
5の二分探索: 見つかった`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変換と集約の概要</h2>
        <p className="text-gray-400 mb-4">
          transformで要素を変換し、accumulateで集計を行います。ラムダ式と組み合わせると強力です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5};
    vector<int> dst(src.size());

    // transform: 各要素を2倍にする
    transform(src.begin(), src.end(), dst.begin(),
              [](int x) { return x * 2; });
    cout << "2倍: ";
    for (int x : dst) cout << x << " ";
    cout << endl;

    // accumulate: 合計を計算
    int sum = accumulate(src.begin(), src.end(), 0);
    cout << "合計: " << sum << endl;

    // accumulate: 積を計算
    int product = accumulate(src.begin(), src.end(), 1, multiplies<int>());
    cout << "積: " << product << endl;

    return 0;
}`}
          expectedOutput={`2倍: 2 4 6 8 10
合計: 15
積: 120`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
