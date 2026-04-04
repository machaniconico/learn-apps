import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "int arr[5] = {1, 2, 3}; において arr[4] の値はいくつですか？",
    options: [
      "未定義（ゴミ値）",
      "3",
      "0",
      "コンパイルエラー",
    ],
    answer: 2,
    explanation: "配列を部分的に初期化した場合、残りの要素は自動的に0で初期化されます。arr[4]は0になります。",
  },
  {
    question: "C言語で2次元配列 int matrix[3][4]; の総要素数はいくつですか？",
    options: [
      "3",
      "4",
      "7",
      "12",
    ],
    answer: 3,
    explanation: "2次元配列int matrix[3][4]は3行4列の配列で、総要素数は3×4=12個です。",
  },
  {
    question: "関数に配列を渡すとき、C言語では何が渡されますか？",
    options: [
      "配列全体のコピー",
      "配列の先頭要素へのポインタ",
      "配列のサイズ",
      "配列の最後の要素",
    ],
    answer: 1,
    explanation: "C言語では配列を関数に渡すと、配列の先頭要素へのポインタが渡されます（配列の減衰）。そのためサイズは別途渡す必要があります。",
  },
  {
    question: "C99のVLA（可変長配列）の特徴として正しいものはどれですか？",
    options: [
      "ヒープ領域に確保される",
      "スタック領域に確保され、サイズは実行時に決まる",
      "グローバル変数として使える",
      "C89から使える機能である",
    ],
    answer: 1,
    explanation: "VLA（Variable Length Array）はC99で導入され、スタック領域に確保されます。サイズはコンパイル時ではなく実行時に決まります。ただし大きなサイズはスタックオーバーフローに注意が必要です。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の配列を基礎から学びましょう。宣言・初期化・多次元配列・関数への受け渡し、そしてソートや探索アルゴリズムの実装まで、配列操作の全体を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の基本</h2>
        <p className="text-gray-400 mb-4">
          配列は同じ型の要素を連続したメモリに格納するデータ構造です。
          インデックスは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">0</code> から始まります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 配列の宣言と初期化
    int scores[5] = {85, 92, 78, 96, 88};

    // 要素へのアクセス
    printf("scores[0] = %d\\n", scores[0]);
    printf("scores[4] = %d\\n", scores[4]);

    // ループで全要素を処理
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("合計: %d\\n", sum);
    printf("平均: %.1f\\n", (double)sum / 5);

    return 0;
}`}
          expectedOutput={`scores[0] = 85
scores[4] = 88
合計: 439
平均: 87.8`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int matrix[行][列]</code> で2次元配列を宣言します。
          行列やグリッドデータの表現に使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("行列の表示:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`}
          expectedOutput={`行列の表示:
1 2 3
4 5 6
7 8 9`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
