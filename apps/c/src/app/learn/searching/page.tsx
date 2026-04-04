import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

const quizQuestions: QuizQuestion[] = [
  {
    question: "二分探索を使うための前提条件はどれですか？",
    options: [
      "配列がランダムな順序である",
      "配列がソート済みである",
      "配列の要素数が偶数である",
      "配列が循環している",
    ],
    answer: 1,
    explanation: "二分探索は配列がソート済みであることを前提とします。中央の要素と比較して探索範囲を半分に絞るため、未ソートの配列には使えません。",
  },
  {
    question: "線形探索の時間計算量はどれですか？",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)",
    ],
    answer: 2,
    explanation: "線形探索は最悪の場合すべての要素を確認するため O(n) です。ソート不要で実装が簡単ですが、大量データには向きません。",
  },
  {
    question: "ハッシュ表の探索の平均時間計算量はどれですか？",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(1)",
    ],
    answer: 3,
    explanation: "ハッシュ表の探索は衝突がない理想的な場合 O(1) です。衝突が多発すると最悪 O(n) になりますが、良いハッシュ関数を使えば平均 O(1) を維持できます。",
  },
  {
    question: "二分探索木（BST）の中順走査（in-order）で要素を訪問する順序はどれですか？",
    options: [
      "ランダムな順序",
      "挿入した順序",
      "昇順（ソート済み順）",
      "降順",
    ],
    answer: 2,
    explanation: "BST の中順走査（左→根→右）は昇順で要素を訪問します。これは BST の性質（左 < 根 < 右）から導かれます。",
  },
];

export default function SearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">探索アルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語でさまざまな探索アルゴリズムを実装しましょう。線形探索・二分探索・ハッシュ探索・二分探索木まで、
          それぞれの特性と使い分けを理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="searching" totalLessons={5} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/searching" color="violet" categoryId="searching" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索</h2>
        <p className="text-gray-400 mb-4">
          配列を先頭から順に確認する最もシンプルな探索方法です。ソート不要で実装が簡単ですが、
          O(n) のため大量データには不向きです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    int arr[] = {3, 7, 1, 9, 4, 6};
    int n = 6;
    int idx = linearSearch(arr, n, 9);
    if (idx != -1)
        printf("Found at index %d\\n", idx);
    else
        printf("Not found\\n");
    return 0;
}`}
          expectedOutput={`Found at index 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">
          ソート済み配列に対して中央の要素と比較し、探索範囲を半分に絞ります。O(log n) で非常に高速です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int n = 7;
    int idx = binarySearch(arr, n, 7);
    printf("7 found at index %d\\n", idx);
    return 0;
}`}
          expectedOutput={`7 found at index 3`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
