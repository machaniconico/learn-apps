import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

const quizQuestions: QuizQuestion[] = [
  {
    question: "バブルソートの平均・最悪時間計算量はどれですか？",
    options: [
      "O(n log n)",
      "O(n)",
      "O(n²)",
      "O(log n)",
    ],
    answer: 2,
    explanation: "バブルソートは隣接要素を比較・交換する操作を繰り返すため、平均・最悪ともに O(n²) です。ただしすでにソート済みの場合はフラグ最適化で O(n) になります。",
  },
  {
    question: "クイックソートの平均時間計算量はどれですか？",
    options: [
      "O(n²)",
      "O(n log n)",
      "O(n)",
      "O(log n)",
    ],
    answer: 1,
    explanation: "クイックソートの平均計算量は O(n log n) です。ピボット選択が悪いと最悪 O(n²) になりますが、ランダムなデータでは一般的に最速の比較ソートです。",
  },
  {
    question: "マージソートの特徴として正しいのはどれですか？",
    options: [
      "インプレース（追加メモリ不要）で動作する",
      "最悪でも O(n log n) を保証する安定ソート",
      "ピボット選択が重要な要素になる",
      "小さな配列に最も適している",
    ],
    answer: 1,
    explanation: "マージソートは常に O(n log n) を保証し、かつ安定ソート（同じ値の相対順序が保たれる）です。ただし O(n) の追加メモリが必要です。",
  },
  {
    question: "挿入ソートが他のO(n²)ソートより優れている状況はどれですか？",
    options: [
      "大量のランダムデータのソート",
      "ほぼソート済みの少量データのソート",
      "逆順データのソート",
      "文字列のソート",
    ],
    answer: 1,
    explanation: "挿入ソートはほぼソート済みのデータに対して非常に効率よく、O(n) に近い性能を発揮します。また少量データでは定数係数が小さいため実用的です。",
  },
];

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">ソートアルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語でソートアルゴリズムを実装しながら理解しましょう。バブル・選択・挿入・クイック・マージソートまで、
          それぞれの仕組みと計算量を学び、使い分けができるようになります。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="sorting" totalLessons={6} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/sorting" color="pink" categoryId="sorting" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソートの基本</h2>
        <p className="text-gray-400 mb-4">
          隣接する要素を比較して大きい方を後ろに移動させます。パスごとに最大値が末尾に「泡のように」浮かび上がります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = 5;
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`12 22 25 34 64 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クイックソートの概要</h2>
        <p className="text-gray-400 mb-4">
          ピボットを基準に配列を分割し、再帰的にソートします。平均 O(n log n) で実用的に最速のソートアルゴリズムです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot) swap(&arr[++i], &arr[j]);
    swap(&arr[i + 1], &arr[hi]);
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = 6;
    quickSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`}
          expectedOutput={`1 5 7 8 9 10 `}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
